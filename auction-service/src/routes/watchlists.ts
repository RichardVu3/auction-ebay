import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import {
  WatchListModel,
  WatchListModelInput,
  WatchListModelWithAuctionAndCategory,
  AuctionsOnWatchListsModel,
} from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

/*
Routes:

Get watchlist for the current user
GET auctions?userWatchlist={userId}


POST auctions?addToUserWatchlist={userId}&auctionId={auctionId}
*/

const getUserWatchListsRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Watchlist"],
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
            watchlists: z.array(WatchListModelWithAuctionAndCategory),
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

router.openapi(getUserWatchListsRoute, async (c) => {
  const { userId } = c.req.query();
  const watchlists = await prisma.watchList.findMany({
    where: {
      userId: parseInt(userId),
    },
    include: {
      categories: { include: { category: true } },
      auctions: { include: { auction: true } },
    },
  });
  if (!watchlists.length) {
    return c.json({ message: "No WatchLists Found" }, 404);
  }
  return c.json({ watchlists }, 200);
});

const updateUserWatchListsRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["Watchlist"],
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
          schema: z.object({
            watchlists: z.array(WatchListModel),
          }),
        },
      },
      description: "Update a watchlist that matches the unqiue watchlistId",
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

router.openapi(updateUserWatchListsRoute, async (c) => {
  const { id } = c.req.query();
  const body = await c.req.json();
  const updatedWatchlist = await prisma.watchList.update({
    where: { id: parseInt(id) },
    data: {
      ...body,
    },
  });
  return c.json({ watchlists: [updatedWatchlist] }, 200);
});

//add auction to watchlist

const addAuctionToWatchlistRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Watchlist"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuctionsOnWatchListsModel,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            watchlists: z.array(WatchListModelWithAuctionAndCategory),
          }),
        },
      },
      description: "Add an auction to a user's watchlist",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Not found",
    },
  },
});

router.openapi(addAuctionToWatchlistRoute, async (c) => {
  const body = await c.req.json();
  const addedAuction = await prisma.auctionsOnWatchLists.create({
    data: {
      auctionId: parseInt(body.auctionId),
      watchlistId: parseInt(body.watchlistId),
    },
  });
  if (!addedAuction) {
    return c.json({ message: "Failed to add auction to watchlist" }, 500);
  }

  const updatedWatchlist = await prisma.watchList.findFirst({
    where: { id: parseInt(body.watchlistId) },
    include: {
      categories: { include: { category: true } },
      auctions: { include: { auction: true } },
    },
  });

  return c.json(
    {
      watchlists: [updatedWatchlist],
    },
    200,
  );
});

//TODO: Delete auction from watchlist

export { router as watchlistRouter };
