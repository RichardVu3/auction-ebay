import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import { AuctionModel, UserModel, BidModel } from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

const getUserAuctionsRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: z.object({
      userId: z.preprocess((val) => {
        if (typeof val === "string") {
          const num = Number(val);
          if (Number.isInteger(num)) {
            return num;
          } else {
            return NaN;
          }
        }
        return val;
      }, z.number().int()),
    }),
  },

  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            auctions: z.array(AuctionModel),
          }),
        },
      },
      description: "Retrieve all of a user's auction based on their unique ID",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Not found",
    },
  },
});

router.openapi(getUserAuctionsRoute, async (c) => {
  const { userId } = c.req.query();
  const auctions = await prisma.auction.findMany({
    where: {
      sellerId: userId,
    },
  });
  if (!auctions.length) {
    return c.json({ message: "No Users Found" }, 404);
  }
  return c.json({ auctions: auctions }, 200);
});

const getUserByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ data: z.array(UserModel) }),
        },
      },
      description: "Retrieve an auction by Id",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Get an user by Id",
    },
  },
});

export { router as userRouter };
