import express, { Router } from "express";

export const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("hit auctions");
});
