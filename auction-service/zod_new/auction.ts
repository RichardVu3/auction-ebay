import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteBid,
  RelatedBidModel,
  CompleteCategory,
  RelatedCategoryModel,
  CompleteWatchList,
  RelatedWatchListModel,
  CompleteAuctionsOnWatchLists,
  RelatedAuctionsOnWatchListsModel,
} from "./index";

export const AuctionModel = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  startPrice: z.number(),
  shippingPrice: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  quantity: z.number().int(),
  sellerId: z.number().int(),
  buyerId: z.number().int().nullish(),
  isActive: z.boolean(),
  buyItNowEnabled: z.boolean(),
  deleted: z.boolean(),
  closedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteAuction extends z.infer<typeof AuctionModel> {
  seller: CompleteUser;
  buyer?: CompleteUser | null;
  bids: CompleteBid[];
  categories: CompleteCategory[];
  watchlist: CompleteWatchList[];
  AuctionsOnWatchLists: CompleteAuctionsOnWatchLists[];
}

/**
 * RelatedAuctionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuctionModel: z.ZodSchema<CompleteAuction> = z.lazy(() =>
  AuctionModel.extend({
    seller: RelatedUserModel,
    buyer: RelatedUserModel.nullish(),
    bids: RelatedBidModel.array(),
    categories: RelatedCategoryModel.array(),
    watchlist: RelatedWatchListModel.array(),
    AuctionsOnWatchLists: RelatedAuctionsOnWatchListsModel.array(),
  }),
);
