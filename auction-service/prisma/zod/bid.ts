import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuction,
  RelatedUserModel,
  RelatedAuctionModel,
  AuctionModel,
  type IncludeAuction,
} from "./index";

export const BidModelInput = z
  .object({
    amount: z.number(),
    placedAt: z.date(),
    userId: z.number().int(),
    auctionId: z.number().int(),
  })
  .openapi("Bid Input");

export const BidModel = z
  .object({
    id: z.number().int(),
    amount: z.number(),
    placedAt: z.date(),
    userId: z.number().int(),
    auctionId: z.number().int(),
  })
  .openapi("Bid");

export const BidModelWithAuction = z.object({
  id: z.number().int(),
  amount: z.number(),
  placedAt: z.date(),
  userId: z.number().int(),
  auctionId: z.number().int(),
  auction: AuctionModel,
});

export interface IBidModelWithAuction
  extends z.infer<typeof BidModelWithAuction> {
  auction: IncludeAuction;
}

export interface CompleteBid extends z.infer<typeof BidModel> {
  bidder: CompleteUser;
  auction: CompleteAuction;
}

/**
 * RelatedBidModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBidModel: z.ZodSchema<CompleteBid> = z.lazy(() =>
  BidModel.extend({
    bidder: RelatedUserModel,
    auction: RelatedAuctionModel,
  }),
);
