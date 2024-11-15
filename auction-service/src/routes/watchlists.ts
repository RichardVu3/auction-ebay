import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import {
  type IWatchListWithAuction,
  WatchListModelWithAuction,
} from "../../prisma/zod";
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
            watchlist: z.array(WatchListModelWithAuction),
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
      auction: true,
      categories: true,
    },
  });
  if (!watchlists.length) {
    return c.json({ message: "No WatchLists Found" }, 404);
  }
  return c.json({ watchlists: watchlists }, 200);
});
export { router as watchlistRouter };
