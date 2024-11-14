import * as z from "zod";
import {
  type CompleteUser,
  type CompleteAuction,
  RelatedUserModel,
  RelatedAuctionModel,
} from "./index";

export const WatchListModel = z
  .object({
    id: z.number().int(),
    userId: z.number().int(),
    auctionId: z.number().int(),
    priceLimit: z.number().nullish(),
  })
  .openapi("Watchlist");

export interface CompleteWatchList extends z.infer<typeof WatchListModel> {
  user: CompleteUser;
  auction: CompleteAuction;
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
    }),
);
