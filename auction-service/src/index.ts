import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiRouter } from "./routes/index";

const app = new OpenAPIHono();

function startServer() {
  const PORT = process.env.PORT || 3000;
  app.use(logger());
  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  app.route("/api", apiRouter);

  // The OpenAPI documentation will be available at /doc
  app.get(
    "/ui",
    swaggerUI({
      url: "/doc",
    }),
  );

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  });

  console.log(`Server is running on http://localhost:${PORT}`);

  serve({
    fetch: app.fetch,
    port: PORT as number,
  });
}

startServer();
