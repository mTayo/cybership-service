import { z } from "zod";

export const RateRequestSchema = z.object({
  origin: z.object({
    postalCode: z.string(),
    country: z.string()
  }),
  destination: z.object({
    postalCode: z.string(),
    country: z.string()
  }),
  packages: z.array(
    z.object({
      weight: z.number()
    })
  )
});
