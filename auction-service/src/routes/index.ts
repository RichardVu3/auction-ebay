import { OpenAPIHono } from "@hono/zod-openapi";
import { auctionsRouter } from "./auctions";
import { userRouter } from "./users";
import { categoriesRouter } from "./categories";
const apiRouter = new OpenAPIHono();

apiRouter.route("/auctions", auctionsRouter);
apiRouter.route("/users", userRouter);
apiRouter.route("/categories", categoriesRouter);
export { apiRouter };
