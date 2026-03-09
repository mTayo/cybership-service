import { CarrierResolver } from "../resolver/carrier.resolver";
import { RateRequest } from "../types/rate-request";

export class ShippingService {

  constructor(private resolver: CarrierResolver) {}

  async getRates(request: RateRequest) {
    const carrier = request.carrier || "UPS";
    const provider = this.resolver.resolve(carrier);
    return provider.getRates(request);
  }
}

