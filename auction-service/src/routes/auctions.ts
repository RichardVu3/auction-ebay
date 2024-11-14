import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import {
  AuctionModel,
  AuctionModelInput,
  BidModelWithAuction,
  CategoryModel,
  type IBidModelWithAuction,
} from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
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

const getAuctionByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(AuctionModel) }),
        },
      },
      description: "Retrieve an auction by Id",
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

router.openapi(getAuctionByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const auction = await prisma.auction.findFirst({
    where: {
      id: id,
    },
  });
  if (!auction) {
    return c.json({ message: "Could not find auction" }, 404);
  }
  return c.json(
    {
      auctions: [auction],
    },
    200,
  );
});

const createAuctionRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuctionModelInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(AuctionModel) }),
        },
      },
      description: "Create an auction",
    },
    422: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Could not create auction",
    },
  },
});

router.openapi(createAuctionRoute, async (c) => {
  const body = await c.req.json();
  const newAuction = await prisma.auction.create({
    data: {
      ...body,
    },
  });
  if (!newAuction) {
    return c.json({ message: "Could not create auction" }, 422);
  }

  return c.json({ auctions: [newAuction] }, 200);
});

const updateAuctionRoute = createRoute({
  method: "put",
  path: "/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: AuctionModelInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(AuctionModel) }),
        },
      },
      description: "Update an auction with a matching Id",
    },
    422: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Could not update auction",
    },
  },
});

router.openapi(updateAuctionRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = await c.req.json();

  const updatedAuction = await prisma.auction.update({
    where: {
      id: id,
    },
    data: body,
  });
  if (!updatedAuction) {
    return c.json({ message: "Could not update auction" }, 422);
  }

  const responseData = [
    {
      ...updatedAuction,
      createdAt: updatedAuction.createdAt.toDateString(),
      updatedAt: updatedAuction.updatedAt.toDateString(),
      startTime: updatedAuction.startTime.toDateString(),
      endTime: updatedAuction.endTime.toDateString(),
    },
  ];
  return c.json({ auctions: responseData }, 200);
});

const flagAuctionRoute = createRoute({
  method: "put",
  path: "/{id}/flag",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: AuctionModelInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(AuctionModel) }),
        },
      },
      description: "flag an auction for inappropriate content",
    },
    422: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Could not process body",
    },
  },
});

router.openapi(flagAuctionRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = await c.req.json();
  const updatedAuction = await prisma.auction.update({
    where: {
      id: id,
    },
    data: {
      ...body,
    },
  });
  if (!updatedAuction) {
    return c.json({ message: "Could not update auction" }, 422);
  }
  const responseData = [
    {
      ...updatedAuction,
      createdAt: updatedAuction.createdAt.toDateString(),
      updatedAt: updatedAuction.updatedAt.toDateString(),
      startTime: updatedAuction.startTime.toDateString(),
      endTime: updatedAuction.endTime.toDateString(),
    },
  ];
  return c.json(
    {
      auctions: responseData,
    },
    200,
  );
});

export { router as auctionsRouter };
