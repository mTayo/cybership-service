import { RateRequest } from "../types/rate-request";
import { RateQuote } from "../types/rate-quote";
import { CarrierConfig } from "../types/carrier-config";

export interface CarrierProvider {
  
  getConfig(): CarrierConfig;

  authorize(): Promise<string>;

  transformResponse(response: any): RateQuote[];

  getRates(request: RateRequest): Promise<RateQuote[]>;
}
