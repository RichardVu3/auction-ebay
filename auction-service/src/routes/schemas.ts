import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";
export const ParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: 1,
  }),
});
const AuctionSchema = z
  .object({
    id: z.number().int().openapi({
      example: 1,
    }),
    title: z.string().openapi({
      example: "My cool auction",
    }),
    description: z
      .string()
      .nullish()
      .openapi({ example: "My auction is cool" }),
    published: z.boolean().openapi({ example: false }),
    starting_amount: z
      .instanceof(Decimal)
      .or(z.string())
      .or(z.number())
      .refine((value) => {
        return new Decimal(value);
      })
      .openapi({ example: 0.99 }),
    start_time: z
      .string()
      .refine((value) => {
        return new Date(value);
      })
      .openapi({ example: new Date(Date.now()).toString() }),
    end_time: z
      .string()
      .refine((value) => {
        return new Date(value);
      })
      .openapi({ example: new Date(Date.now()).toString() }),
    sellerId: z.number().int().openapi({ example: 1 }),
  })
  .openapi("Auction");
