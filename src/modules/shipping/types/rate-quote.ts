export interface RateQuote {
  carrier: string;
  service: string;
  amount: number;
  currency: string;
  deliveryDays?: number;
}
