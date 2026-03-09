import { CarrierProvider } from "../carrier.interface";
import { RateRequest } from "../../types/rate-request";
import { RateQuote } from "../../types/rate-quote";
import { mapRateRequestToUPS } from "./ups.mapper";
import { config } from "../../../../infrastructure/config/env.config";
import axios from "axios";

export class UPSProvider implements CarrierProvider {

  constructor() {}

  private token: string | null = null;
  private expiry = 0;

  getConfig() {
    return {
      baseUrl: config.upsBaseUrl,
      authUrl: config.upsAuthUrl,
      clientId: process.env.UPS_CLIENT_ID!,
      clientSecret: process.env.UPS_CLIENT_SECRET!
    };
  }

  transformResponse(res: any): RateQuote[] {
    const rated = res?.RateResponse?.RatedShipment || [];
    return rated.map((r: any) => ({
      carrier: "UPS",
      service: r.Service?.Code || "UNKNOWN",
      amount: Number(r.TotalCharges?.MonetaryValue || 0),
      currency: r.TotalCharges?.CurrencyCode || "USD"
    }));

  }

  async authorize(): Promise<string> {
    if (this.token && Date.now() < this.expiry - 300000) {
      return this.token;
    }

    const cfg = this.getConfig();
    const credentials = Buffer
      .from(`${cfg.clientId}:${cfg.clientSecret}`)
      .toString("base64");

    const response = await axios.post(
      cfg.authUrl!,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "x-merchant-id": process.env.UPS_ACCOUNT_NUMBER,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    this.token = response.data.access_token;
    this.expiry = Date.now() + (response.data.expires_in * 1000);
    return this.token!;
  }

  async getRates(request: RateRequest): Promise<RateQuote[]> {

    const token = await this.authorize();
    const payload = mapRateRequestToUPS(request);
    const cfg = this.getConfig();
    
    const response = await axios.post(
      `${cfg.baseUrl}/rating/Rate`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    return this.transformResponse(response.data);
  }

}
