
import {
  Controller,
  Route,
  Post,
  Body,
  Tags
} from "tsoa";
import { RateRequest } from "../types/rate-request";
import { RateQuote } from "../types/rate-quote";
import { RateRequestSchema } from "../validators/rate-request.schema";
import { shippingServiceInstance } from "../../../container";

@Route("shipping")
@Tags("Shipping")
export class ShippingController extends Controller {
  constructor() {
    super();
  }

  @Post("rates")
  public async getRates(@Body() request: RateRequest): Promise<RateQuote[]> {
    RateRequestSchema.parse(request);
    return shippingServiceInstance.getRates(request);
  }
}

