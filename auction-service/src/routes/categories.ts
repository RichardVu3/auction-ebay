import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const router = new OpenAPIHono();
const Schema = z
  .object({
    id: z
      .number()
      .openapi({
        example: 1,
      })
      .optional(),
    title: z.string().openapi({
      example: "My cool auction",
    }),
    starting_price: z.number().openapi({
      example: 0.99,
    }),
  })
  .openapi("Auction");

const ParamsSchema = z.object({
  id: z.number().openapi({
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
            data: z.array(AuctionSchema),
          }),
        },
      },
      description: "Retrieve all Auctions",
    },
  },
});

router.openapi(getAuctionsRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
    },
    200,
  );
});

const getAuctionByIdRoute = createRoute({
  method: "get",
  path: "/{auctionId}",
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

router.openapi(getAuctionByIdRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
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
          schema: z.object({ data: z.array(AuctionSchema) }),
        },
      },
      description: "Retrieve an auction by Id",
    },
  },
});

router.openapi(createAuctionRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
    },
    200,
  );
});

const updateAuctionRoute = createRoute({
  method: "put",
  path: "/{auctionId}",
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
      description: "Update an auction with a matching Id",
    },
  },
});

router.openapi(updateAuctionRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
    },
    200,
  );
});

const flagAuctionRoute = createRoute({
  method: "put",
  path: "/{auctionId}",
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

router.openapi(flagAuctionRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
    },
    200,
  );
});
export { router as categoriesRouter };
