import * as z from "zod";
import {
  type CompleteUser,
  type CompleteBid,
  type CompleteCategory,
  type CompleteWatchList,
  RelatedBidModel,
  RelatedCategoryModel,
  RelatedWatchListModel,
} from "./index";

export const AuctionModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  startPrice: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  isActive: z.boolean(),
  sellerId: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteAuction extends z.infer<typeof AuctionModel> {
  seller: CompleteUser;
  bids: CompleteBid[];
  categories: CompleteCategory[];
  watchlist: CompleteWatchList[];
}

/**
 * RelatedAuctionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuctionModel: z.ZodSchema<CompleteAuction> = z.lazy(() =>
  AuctionModel.extend({
    seller: RelatedUserModel,
    bids: RelatedBidModel.array(),
    categories: RelatedCategoryModel.array(),
    watchlist: RelatedWatchListModel.array(),
  }),
);
