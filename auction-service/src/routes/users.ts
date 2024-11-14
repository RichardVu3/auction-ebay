import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import { UserModel } from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
import { Decimal } from "@prisma/client/runtime/library";
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
      auctions: [auction],
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
          schema: z.object({ user: z.object({ UserModel }) }),
        },
      },
      description: "Create an auction",
    },
  },
});

router.openapi(createUserRoute, async (c) => {
  const body = await c.req.json();
  const newUser = await prisma.user.create({
    data: {
      ...body,
    },
  });
  if (!newUser) {
    return c.json({ message: "Could not create auction" });
  }

  // Convert data to match the response type

  return c.json(
    {
      data: newUser,
    },
    200,
  );
});

export { router as userRouter };
