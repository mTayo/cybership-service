import { ShippingController } from "./modules/shipping/controller/shipping.controller";

const controller = new ShippingController();

(async () => {

  const rates = await controller.getRates({
    origin: { postalCode: "10001", country: "US" },
    destination: { postalCode: "90001", country: "US" },
    packages: [{ weight: 5 }]
  });

  console.log(rates);

})();
