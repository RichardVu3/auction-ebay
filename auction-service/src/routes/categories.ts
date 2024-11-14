import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import prisma from "../db";
import { z } from "zod";
import { CategoryModel } from "../../prisma/zod";
import { ParamsSchema } from "./schemas";
const router = new OpenAPIHono();

const getCategorysRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(CategoryModel),
          }),
        },
      },
      description: "Retrieve all Categorys",
    },
  },
});

router.openapi(getCategorysRoute, async (c) => {
  const category = await prisma.category.findMany();
  return c.json(
    {
      data: category,
    },
    200,
  );
});

const getCategoryByIdRoute = createRoute({
  method: "get",
  path: "/{auctionId}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ data: z.array(CategoryModel) }),
        },
      },
      description: "Retrieve an auction by Id",
    },
  },
});

router.openapi(getCategoryByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const category = await prisma.category.findFirst({
    where: {
      id: id,
    },
  });

  return c.json(
    {
      data: [category],
    },
    200,
  );
});

const createCategoryRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CategoryModel,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ data: z.array(CategoryModel) }),
        },
      },
      description: "Retrieve an auction by Id",
    },
  },
});

router.openapi(createCategoryRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
    },
    200,
  );
});

const updateCategoryRoute = createRoute({
  method: "put",
  path: "/{auctionId}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: CategoryModel,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ data: z.array(CategoryModel) }),
        },
      },
      description: "Update an auction with a matching Id",
    },
  },
});

router.openapi(updateCategoryRoute, (c) => {
  return c.json(
    {
      data: [{ id: 1, title: "123", starting_price: 0.99 }],
    },
    200,
  );
});

export { router as categoriesRouter };
