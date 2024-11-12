import prisma from "@/db/index";
async function auctionsRouter(fastify, options) {
  fastify.get("/", async (request, reply) => {
    console.log("request", request);
    const auctions = await prisma.auction.findMany();
    console.log("auctions?", auctions);
    reply.code(200).send({ data: auctions });
  });
}

//ESM
export default auctionsRouter;
