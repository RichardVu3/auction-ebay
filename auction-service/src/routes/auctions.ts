import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import { AuctionModel, AuctionModelInput } from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

const getAuctionsRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            auctions: z.array(AuctionModel),
          }),
        },
      },
      description: "Retrieve all Auctions",
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

router.openapi(getAuctionsRoute, async (c) => {
  const auctions = await prisma.auction.findMany();
  if (!auctions.length) {
    return c.json({ message: "No Auctions Found" }, 404);
  }
  return c.json({ auctions: auctions }, 200);
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
      // startTime: new Date(body.startTime).toISOString(),
      // endTime: new Date(body.endTime).toISOString(),
      // createdAt: new Date(body.createdAt).toISOString(),
      // updatedAt: new Date(body.updatedAt).toISOString(),
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
      description: "Could not process",
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
