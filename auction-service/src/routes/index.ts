import { OpenAPIHono } from "@hono/zod-openapi";
import { auctionsRouter } from "./auctions";
const apiRouter = new OpenAPIHono();

apiRouter.route("/auctions", auctionsRouter);
export { apiRouter };
