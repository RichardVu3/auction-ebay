import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import { WatchListModel, WatchListModelInput } from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

const getWatchListsRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            auctions: z.array(WatchListModel),
          }),
        },
      },
      description: "Retrieve all WatchLists",
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

router.openapi(getWatchListsRoute, async (c) => {
  const auctions = await prisma.auction.findMany();
  if (!auctions.length) {
    return c.json({ message: "No WatchLists Found" }, 404);
  }
  return c.json({ auctions: auctions }, 200);
});

const getWatchListByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(WatchListModel) }),
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

router.openapi(getWatchListByIdRoute, async (c) => {
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

const createWatchListRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: WatchListModelInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(WatchListModel) }),
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

router.openapi(createWatchListRoute, async (c) => {
  const body = await c.req.json();
  const newWatchList = await prisma.auction.create({
    data: {
      ...body,
    },
  });
  if (!newWatchList) {
    return c.json({ message: "Could not create auction" }, 422);
  }

  return c.json({ auctions: [newWatchList] }, 200);
});

const updateWatchListRoute = createRoute({
  method: "put",
  path: "/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: WatchListModelInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(WatchListModel) }),
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

router.openapi(updateWatchListRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = await c.req.json();

  const updatedWatchList = await prisma.auction.update({
    where: {
      id: id,
    },
    data: body,
  });
  if (!updatedWatchList) {
    return c.json({ message: "Could not update auction" }, 422);
  }

  const responseData = [
    {
      ...updatedWatchList,
      createdAt: updatedWatchList.createdAt.toDateString(),
      updatedAt: updatedWatchList.updatedAt.toDateString(),
      startTime: updatedWatchList.startTime.toDateString(),
      endTime: updatedWatchList.endTime.toDateString(),
    },
  ];
  return c.json({ auctions: responseData }, 200);
});

const flagWatchListRoute = createRoute({
  method: "put",
  path: "/{id}/flag",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: WatchListModelInput,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ auctions: z.array(WatchListModel) }),
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

router.openapi(flagWatchListRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = await c.req.json();
  const updatedWatchList = await prisma.auction.update({
    where: {
      id: id,
    },
    data: {
      ...body,
    },
  });
  if (!updatedWatchList) {
    return c.json({ message: "Could not update auction" }, 422);
  }
  const responseData = [
    {
      ...updatedWatchList,
      createdAt: updatedWatchList.createdAt.toDateString(),
      updatedAt: updatedWatchList.updatedAt.toDateString(),
      startTime: updatedWatchList.startTime.toDateString(),
      endTime: updatedWatchList.endTime.toDateString(),
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
