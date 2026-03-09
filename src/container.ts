import { ProviderFactory } from "./modules/shipping/providers/factory";
import { CarrierResolver } from "./modules/shipping/resolver/carrier.resolver";
import { ShippingService } from "./modules/shipping/service/shipping.service";

const resolver = new CarrierResolver();
resolver.register("UPS", ProviderFactory.createUPS());

export const shippingServiceInstance = new ShippingService(resolver);
