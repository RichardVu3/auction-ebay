import * as z from "zod";
import { Decimal } from "decimal.js";

// Helper schema for Decimal fields
z.instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value);
    } catch (error) {
      return false;
    }
  })
  .transform((value) => new Decimal(value));

export const AuctionModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullish(),
  published: z.boolean(),
  starting_amount: z.number(),
  start_time: z.date(),
  end_time: z.date(),
  sellerId: z.number().int(),
  createdAt: z.date(),
});
