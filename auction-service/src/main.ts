import Fastify from "fastify";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";

import apiRouter from "./api/index.js";

const colors = {
  red: "\x1b[31m ",
  blue: "\x1b[34m ",
  green: "\x1b[32m ",
  yellow: "\x1b[33m ",
  magenta: "\x1b[35m ",
  cyan: "\x1b[36m ",
  white: "\x1b[37m ",
  reset: " \x1b[0m",
};

const startServer = () => {
  const PORT = process.env.PORT || 3000;
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(cors);
  fastify.register(fastifyHelmet, {
    global: true,
    contentSecurityPolicy: false,
  });

  fastify.register(apiRouter, { prefix: "/api" });

  // Declare a route
  fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });

  // Centralized error handler
  fastify.setErrorHandler((error, request, reply) => {
    // Customize response based on error type or statusCode
    const statusCode = error.statusCode || 500;
    const message = error.message || "An unexpected error occurred";

    // Log error (optional)
    fastify.log.error(error);

    // Send a unified error response
    reply.status(statusCode).send({
      statusCode,
      error: error.name || "InternalServerError",
      message,
    });
  });

  // Run the server!
  fastify.listen({ port: PORT as number }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(
      colors.yellow + `Server is now listening on ${address}` + colors.reset,
    );
  });
};

startServer();
