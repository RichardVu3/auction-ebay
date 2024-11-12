import prisma from "@/db/index";
async function auctionsRouter(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { route: "auctions" };
  });
}

//ESM
export default auctionsRouter;
