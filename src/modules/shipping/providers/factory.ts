
import { CarrierProvider } from "./carrier.interface";
import { UPSProvider } from "./ups/ups.provider";

export class ProviderFactory {

  static createUPS(): CarrierProvider {
    return new UPSProvider();
  }

}