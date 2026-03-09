import { RateRequest } from "../../types/rate-request";


export function mapRateRequestToUPS(req: RateRequest) {
  return {
    RateRequest: {
      Shipment: {
        Shipper: { Address: { PostalCode: req.origin.postalCode, CountryCode: req.origin.country } },
        ShipTo: { Address: { PostalCode: req.destination.postalCode, CountryCode: req.destination.country } },
        Package: req.packages.map(p => ({
          PackageWeight: { Weight: p.weight }
        }))
      }
    }
  };
}


