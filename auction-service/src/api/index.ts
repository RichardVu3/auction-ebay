import express from "express";
import type { Error } from "../error.js";
import { router as auctionsRouter } from "./auctions.js";
import { router as categoriesRouter } from "./categories.js";
import { router as watchlistsRouter } from "./watchlists.js";
export const router = express.Router();

router.use("/auctions", auctionsRouter);
router.use("/categories", categoriesRouter);
router.use("/watchlists", watchlistsRouter);

router.use((req, res, next) => {
  const error: Error = new Error("Not Found");
  error.status = 404;
  next(error);
});
