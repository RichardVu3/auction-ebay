import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import { UserModel, AuctionModel } from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

const getUsersRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            auctions: z.array(UserModel),
          }),
        },
      },
      description: "Retrieve all Users",
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

router.openapi(getUsersRoute, async (c) => {
  const auctions = await prisma.user.findMany();
  if (!auctions.length) {
    return c.json({ message: "No Users Found" }, 404);
  }
  return c.json({ auctions: auctions }, 200);
});

const getUserByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ data: z.array(UserModel) }),
        },
      },
      description: "Retrieve an auction by Id",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Get an user by Id",
    },
  },
});

router.openapi(getUserByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const auction = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!auction) {
    return c.json({ message: "Could not find auction" }, 400);
  }
  return c.json(
    {
      data: [auction],
    },
    200,
  );
});

const createUserRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserModel,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ user: z.array(UserModel) }),
        },
      },
      description: "Create a new user",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Failed to create a new user",
    },
  },
});

router.openapi(createUserRoute, async (c) => {
  const body = await c.req.json();
  const newUser = await prisma.user.create({
    data: body,
  });
  if (!newUser) {
    return c.json({ message: "Could not create auction" }, 400);
  }

  return c.json(
    {
      user: [newUser],
    },
    200,
  );
});

const getUserAuctions = createRoute({
  method: "get",
  path: "/{id}/auctions",
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
      description: "Get the specified user's auctions",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
      description: "Could not find any auctions for the specified user",
    },
  },
});

router.openapi(getUserAuctions, async (c) => {
  const { id } = c.req.valid("param");
  const userAuctions = await prisma.auction.findMany({
    where: {
      sellerId: id,
    },
  });
  if (!userAuctions) {
    return c.json(
      { message: "Could not find any auctions for the specified user" },
      404,
    );
  }

  return c.json(
    {
      auctions: userAuctions,
    },
    200,
  );
});

export { router as userRouter };
