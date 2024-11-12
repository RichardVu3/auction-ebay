import express, { NextFunction, Request, Response } from "express";
import prisma from "./db.js";
import type { Error } from "./error.js";
import { router as apiRouter } from "./api/index.js";

const red = "\x1b[31m ";
const blue = "\x1b[34m ";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const white = "\x1b[37m";
const reset = " \x1b[0m";

const startServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use("/api", apiRouter);
  app.get("/", (req, res, next) => {
    res.send("hello world");
  });

  // error handling endware. Just propogate errors until they hit here
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
  if (!prisma) {
    console.error("Could not initialize prisma client");
  }

  console.log(green + `Server started on port:${PORT}` + reset);

  app.listen(3000);
};

startServer();
