import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuction,
  type CompleteCategoriesOnWatchLists,
  RelatedUserModel,
  RelatedAuctionModel,
  RelatedCategoriesOnWatchListsModel,
} from "./index";

export const WatchListModelInput = z.object({
  userId: z.number().int(),
  auctionId: z.number().int(),
});
export const WatchListModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  auctionId: z.number().int(),
});

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
