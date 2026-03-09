import { CarrierProvider } from "../providers/carrier.interface";


export class CarrierResolver {
  private readonly DEFAULT_CARRIER = "UPS";
  private providers = new Map<string, CarrierProvider>();

  constructor(initialProviders?: Map<string, CarrierProvider>) {
    if (initialProviders) {
      initialProviders.forEach((provider, key) => {
        this.providers.set(key.toUpperCase(), provider);
      });
    }
  }

  register(name: string, provider: CarrierProvider): void {
    this.providers.set(name.toUpperCase(), provider);
  }

  resolve(carrier?: string): CarrierProvider {
    const searchKey = (carrier || this.DEFAULT_CARRIER).toUpperCase();
    const provider = this.providers.get(searchKey);

    if (!provider) {
      throw new Error(
        `Carrier "${searchKey}" not supported. Available: [${Array.from(this.providers.keys()).join(", ")}]`
      );
    }
    return provider;
  }
}