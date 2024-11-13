import express, { Router } from "express";
import prisma from "@/db";
export const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const auctions = await prisma.auction.findMany();
    res.status(200).send(auctions);
  } catch (error) {
    next(error);
  }
});

router.get("/:auctionId", async (req, res, next) => {
  const { auctionId } = req.params;
  try {
    const auctions = await prisma.auction.findFirst({
      where: { id: parseInt(auctionId) },
    });
    res.status(200).send(auctions);
  } catch (error) {
    next(error);
  }
});

router.put("/:auctionId", async (req, res, next) => {
  const { auctionId } = req.params;
  try {
    const auctions = await prisma.auction.update({
      where: {
        id: parseInt(auctionId),
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).send(auctions);
  } catch (error) {
    next(error);
  }
});

router.put("/:auctionId/flag", async (req, res, next) => {
  try {
    const { auctionId } = req.params;
    const auctions = await prisma.auction.update({
      where: {
        id: parseInt(auctionId),
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).send(auctions);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const auctions = await prisma.auction.create({
      ...req.body,
    });
    res.status(200).send(auctions);
  } catch (error) {
    next(error);
  }
});
