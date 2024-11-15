import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuctionsOnWatchLists,
  type CompleteCategoriesOnWatchLists,
  type IncludeAuction,
  type IncludeCategory,
  RelatedUserModel,
  RelatedCategoriesOnWatchListsModel,
  AuctionModel,
  CategoryModel,
  RelatedAuctionsOnWatchListsModel,
} from "./index";

export const WatchListModelInput = z
  .object({
    userId: z.number().int(),
    auctionId: z.number().int(),
    name: z.string(),
  })
  .openapi("Watchlist Input");

export const WatchListModel = z
  .object({
    id: z.number().int(),
    name: z.string(),
    userId: z.number().int(),
  })
  .openapi("Watchlist");

export const WatchListModelWithAuctionAndCategory = z
  .object({
    id: z.number().int(),
    name: z.string(),
    userId: z.number().int(),
    auctionId: z.number().int(),
    auctions: z.array(AuctionModel),
    categories: z.array(CategoryModel),
  })
  .openapi("Watchlist");

export interface IWatchListIncludeAuctionAndCategory {
  id: number;
  name: string;
  userId: number;
  auctions: IncludeAuction[];
  categories: IncludeCategory[];
}

export interface CompleteWatchList extends z.infer<typeof WatchListModel> {
  user: CompleteUser;
  auctions: CompleteAuctionsOnWatchLists[];
  categories: CompleteCategoriesOnWatchLists[];
}

/**
 * RelatedWatchListModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWatchListModel: z.ZodSchema<CompleteWatchList> = z.lazy(
  () =>
    WatchListModel.extend({
      user: RelatedUserModel,
      auctions: RelatedAuctionsOnWatchListsModel.array(),
      categories: RelatedCategoriesOnWatchListsModel.array(),
    }),
);
