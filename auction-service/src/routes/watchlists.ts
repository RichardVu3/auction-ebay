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
            watchlists: z.array(WatchListModel),
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
  const watchlists = await prisma.watchList.findMany();
  if (!watchlists.length) {
    return c.json({ message: "No WatchLists Found" }, 404);
  }
  return c.json({ watchlists: watchlists }, 200);
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
          schema: z.object({ watchlists: z.array(WatchListModel) }),
        },
      },
      description: "Retrieve an watchlist by Id",
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
  const watchlist = await prisma.auction.findFirst({
    where: {
      id: id,
    },
  });
  if (!watchlist) {
    return c.json({ message: "Could not find watchlist" }, 404);
  }
  return c.json(
    {
      watchlists: [watchlist],
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
          schema: z.object({ watchlists: z.array(WatchListModel) }),
        },
      },
      description: "Create an watchlist",
    },
    422: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Could not create watchlist",
    },
  },
});

// router.openapi(createWatchListRoute, async (c) => {
//   const body = await c.req.json();
//   const newWatchList = await prisma.watchlist.create({
//     data: {
//       ...body,
//     },
//   });
//   if (!newWatchList) {
//     return c.json({ message: "Could not create watchlist" }, 422);
//   }
//
//   return c.json({ watchlists: [newWatchList] }, 200);
// });

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
          schema: z.object({ watchlists: z.array(WatchListModel) }),
        },
      },
      description: "Update an watchlist with a matching Id",
    },
    422: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Could not update watchlist",
    },
  },
});

// router.openapi(updateWatchListRoute, async (c) => {
// const { id } = c.req.valid("param");
// const body = await c.req.json();
//
// const updatedWatchList = await prisma.watchList.update({
//   where: {
//     id: id,
//   },
//   data: body,
// });
// if (!updatedWatchList) {
//   return c.json({ message: "Could not update watchlist" }, 422);
// }
//
// const responseData = [
//   {
//     ...updatedWatchList,
//     createdAt: updatedWatchList.createdAt.toDateString(),
//     updatedAt: updatedWatchList.updatedAt.toDateString(),
//     startTime: updatedWatchList.startTime.toDateString(),
//     endTime: updatedWatchList.endTime.toDateString(),
//   },
// ];
// return c.json({ watchlists: responseData }, 200);
// });

export { router as watchlistRouter };
