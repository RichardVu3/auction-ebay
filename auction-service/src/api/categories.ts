async function categoriesRouter(fastify, options) {
  fastify.get("/api/auctions", async (request, reply) => {
    return { route: "auctions" };
  });
}

//ESM
export default categoriesRouter;
