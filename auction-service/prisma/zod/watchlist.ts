import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuction,
  type CompleteCategoriesOnWatchLists,
  type IncludeAuction,
  RelatedUserModel,
  RelatedAuctionModel,
  RelatedCategoriesOnWatchListsModel,
  AuctionModel,
  CategoriesOnWatchListsModel,
  CategoryModel,
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
    auctionId: z.number().int(),
  })
  .openapi("Watchlist");

export const WatchListModelWithAuction = z
  .object({
    id: z.number().int(),
    name: z.string(),
    userId: z.number().int(),
    auctionId: z.number().int(),
    auction: AuctionModel,
    categories: z.array(CategoryModel),
  })
  .openapi("Watchlist");

export interface IWatchListWithAuction
  extends z.infer<typeof WatchListModelWithAuction> {
  watchlists: IncludeAuction;
}

export interface CompleteWatchList extends z.infer<typeof WatchListModel> {
  user: CompleteUser;
  auction: CompleteAuction;
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
      auction: RelatedAuctionModel,
      categories: RelatedCategoriesOnWatchListsModel.array(),
    }),
);
