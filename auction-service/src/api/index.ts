import auctionsRouter from "./auctions.js";
import watchlistRouter from "./watchlists.js";
import categoriesRouter from "./categories.js";

async function apiRouter(fastify, options) {
  fastify.register(auctionsRouter, { prefix: "/auctions" });
  fastify.register(categoriesRouter, { prefix: "/categories" });
  fastify.register(watchlistRouter, { prefix: "/watchlist" });
}

//ESM
export default apiRouter;
