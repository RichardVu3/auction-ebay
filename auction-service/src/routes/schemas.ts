import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";
export const ParamsSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      description: "The auction identifier.",
      example: 123,
    }),
});
