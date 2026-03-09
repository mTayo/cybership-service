import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { UPSProvider } from "../src/modules/shipping/providers/ups/ups.provider";

vi.mock("axios");

describe("UPS Rate Integration", () => {
  it("parses UPS response into normalized rates", async () => {
    const mockedAxios = vi.mocked(axios);

    (mockedAxios.post as any).mockResolvedValueOnce({
      data: { access_token: "fake_token", expires_in: 3600 }
    });

    const mockUPSResponse = {
      RateResponse: {
        RatedShipment: [{
          Service: { Code: "03" },
          TotalCharges: { MonetaryValue: "12.34", CurrencyCode: "USD" }
        }]
      }
    };
    (mockedAxios.post as any).mockResolvedValueOnce({ data: mockUPSResponse });

    const provider = new UPSProvider();

    const result = await provider.getRates({
      origin: { postalCode: "10001", country: "US" },
      destination: { postalCode: "90001", country: "US" }, 
      packages: [{ weight: 1 }]
    });
    expect(result[0].amount).toBe(12.34);
    expect(result[0].service).toBe("03");
  });
});
