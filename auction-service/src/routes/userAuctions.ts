import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import {
  AuctionModel,
  AuctionModelInput,
  BidModelWithAuction,
  type IBidModelWithAuction,
} from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

/*
This module contains routes related to searching for auctions based on a user via their unique userId
*/

const getAuctionsRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: z
      .object({
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
        includeBidOn: z.coerce.boolean().optional(),
      })
      .openapi({ example: { userId: 1, includeBidOn: false } }),
    description:
      "Get all auctions with optional query params finding auctions that belong to a user via their unique userId",
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            auctions: z.array(AuctionModel),
            bidOnAuctions: z
              .array(BidModelWithAuction)
              .or(z.array(z.unknown())),
          }),
        },
      },
      description: "Retrieve all Auctions",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
      description: "userId is required",
    },
  },
});

router.openapi(getAuctionsRoute, async (c) => {
  const { userId, includeBidOn } = c.req.query();
  if (!userId) {
    return c.json({ error: "userId is required" }, 500);
  }

  try {
    const userAuctions = await prisma.auction.findMany({
      where: {
        sellerId: parseInt(userId),
      },
    });

    let bidOnAuctions: IBidModelWithAuction[] | [] = [];

    if (includeBidOn === "true") {
      bidOnAuctions = await prisma.bid.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          auction: true,
        },
      });
    }
    return c.json(
      {
        auctions: userAuctions,
        bidOnAuctions: bidOnAuctions,
      },
      200,
    );
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return c.json({ error: "Failed to fetch auctions" }, 500);
  }
});
export { router as userAuctionsRouter };
