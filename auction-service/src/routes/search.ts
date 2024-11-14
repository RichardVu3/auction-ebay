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

/*
This module contains routes related to searching for auctions via the search bar.

*/
const router = new OpenAPIHono();
const searchAuctionsRoute = createRoute({
  method: "get",
  path: "/search",
  request: {
    query: z
      .object({
        term: z.string().optional(),
        category: z.string().optional(),
      })
      .openapi({
        example: {
          term: "rayban sunglasses",
          category: "sunglasses",
        },
      }),
    description:
      "Get auctions that match the search terms either by keyword or item category",
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
      description:
        "Retrieve all Auctions matching the search term either by keyword or by item category",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
      description: "Error searching for auctions that match your request",
    },
  },
});

router.openapi(searchAuctionsRoute, async (c) => {
  console.log(c.req.query());
  const { term, category } = c.req.query();
  if (!term && !category) {
    return c.json({ error: "A query term is required is required" }, 500);
  }

  try {
    const keywordInTitleResults = await prisma.auction.findMany({
      where: {
        title: {
          contains: term,
          mode: "insensitive",
        },
      },
    });

    const taggedWith = await prisma.auction.findMany({
      where: {
        categories: {
          some: { name: term },
        },
      },
    });

    return c.json(
      {
        auctions: [...keywordInTitleResults, ...taggedWith],
      },
      200,
    );
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return c.json({ error: "Failed to fetch auctions" }, 500);
  }
});

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
export { router as searchRouter };
