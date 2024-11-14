import { OpenAPIHono } from "@hono/zod-openapi";
import { auctionsRouter } from "./auctions";
import { categoriesRouter } from "./categories";
import { watchlistRouter } from "./watchlists";
const apiRouter = new OpenAPIHono();

apiRouter.route("/auctions", auctionsRouter);
apiRouter.route("/watchlist", watchlistRouter);
apiRouter.route("/categories", categoriesRouter);
export { apiRouter };
