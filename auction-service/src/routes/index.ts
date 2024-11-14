import { OpenAPIHono } from "@hono/zod-openapi";
import { auctionsRouter } from "./auctions";
import { userRouter } from "./users";
const apiRouter = new OpenAPIHono();

apiRouter.route("/auctions", auctionsRouter);
apiRouter.route("/users", userRouter);
export { apiRouter };
