import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";
import { AuctionModel } from "../../prisma/zod";

const router = new OpenAPIHono();
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

const ParamsSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: 1,
  }),
});

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
          schema: z.object({ data: z.array(AuctionSchema) }),
        },
      },
      description: "Retrieve an auction by Id",
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
    return c.json({ message: "Could not find auction" }, 400);
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
          schema: AuctionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(AuctionSchema) }),
        },
      },
      description: "Create an auction",
    },
  },
});

router.openapi(createAuctionRoute, async (c) => {
  const body = await c.req.json();
  console.log("body?", body);
  const newAuction = await prisma.auction.create({
    data: {
      ...body,
      id: parseInt(body.id),
      starting_amount: new Decimal(body.starting_amount),
      start_time: new Date(body.start_time),
      end_time: new Date(body.end_time),
    },
  });
  if (!newAuction) {
    return c.json({ message: "Could not create auction" });
  }
  return c.json(
    {
      data: { auctions: [newAuction] },
    },
    200,
  );
});

const updateAuctionRoute = createRoute({
  method: "put",
  path: "/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: AuctionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(AuctionSchema) }),
        },
      },
      description: "Update an auction with a matching Id",
    },
  },
});

router.openapi(updateAuctionRoute, async (c) => {
  const { id } = c.req.valid("param");

  const body = await c.req.json();
  const updatedAuction = await prisma.auction.update({
    where: {
      id: parseInt(body.id),
    },
    data: {
      ...body,
      start_time: new Date(body.start_time),
      end_time: new Date(body.end_time),
      starting_amount: new Decimal(body.starting_amount),
    },
  });
  if (!updatedAuction) {
    return c.json({ message: "Could not update auction" });
  }
  return c.json(
    {
      data: { auctions: [updatedAuction] },
    },
    200,
  );
});

const flagAuctionRoute = createRoute({
  method: "put",
  path: "/{id}/flag",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: AuctionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ data: z.array(AuctionSchema) }),
        },
      },
      description: "flag an auction for inappropriate content",
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
      starting_amount: new Decimal(body.starting_amount),
      start_time: new Date(body.start_time),
      end_time: new Date(body.end_time),
    },
  });
  if (!updatedAuction) {
    return c.json({ message: "Could not update auction" });
  }
  return c.json(
    {
      data: { auctions: [updatedAuction] },
    },
    200,
  );
});
export { router as auctionsRouter };
