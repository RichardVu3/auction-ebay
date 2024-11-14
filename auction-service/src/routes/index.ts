import { OpenAPIHono } from "@hono/zod-openapi";
import { auctionsRouter } from "./auctions";
import { userAuctionsRouter } from "./userAuctions";
import { categoriesRouter } from "./categories";
import { watchlistRouter } from "./watchlists";
import { searchRouter } from "./search";
const apiRouter = new OpenAPIHono();

apiRouter.route("/auctions", auctionsRouter);
apiRouter.route("/auctions", userAuctionsRouter);
apiRouter.route("/auctions", searchRouter);
apiRouter.route("/watchlist", watchlistRouter);
export { apiRouter };
