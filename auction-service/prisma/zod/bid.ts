import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuction,
  RelatedUserModel,
  RelatedAuctionModel,
} from "./index";

export const BidModel = z
  .object({
    id: z.number().int(),
    amount: z.number(),
    placedAt: z.date(),
    userId: z.number().int(),
    auctionId: z.number().int(),
  })
  .openapi("Bid");

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
