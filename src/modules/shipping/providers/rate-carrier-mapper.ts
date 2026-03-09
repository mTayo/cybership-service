import { RateQuote } from "../types/rate-quote";

export interface CarrierRateExtractor<TItem = any> {
  getService(item: TItem): string;
  getAmount(item: TItem): number;
  getCurrency(item: TItem): string;
}

export function mapCarrierRates<TItem>(
  carrier: string,
  items: TItem[],
  extractor: CarrierRateExtractor<TItem>
): RateQuote[] {

  return items.map((item) => ({
    carrier,
    service: extractor.getService(item) || "UNKNOWN",
    amount: extractor.getAmount(item) || 0,
    currency: extractor.getCurrency(item) || "USD"
  }));

}