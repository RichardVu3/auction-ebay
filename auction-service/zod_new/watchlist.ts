import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteAuction, RelatedAuctionModel, CompleteCategoriesOnWatchLists, RelatedCategoriesOnWatchListsModel, CompleteAuctionsOnWatchLists, RelatedAuctionsOnWatchListsModel } from "./index"

export const WatchListModel = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  auctionId: z.number().int(),
})

export interface CompleteWatchList extends z.infer<typeof WatchListModel> {
  user: CompleteUser
  auction: CompleteAuction
  categories: CompleteCategoriesOnWatchLists[]
  AuctionsOnWatchLists: CompleteAuctionsOnWatchLists[]
}

/**
 * RelatedWatchListModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWatchListModel: z.ZodSchema<CompleteWatchList> = z.lazy(() => WatchListModel.extend({
  user: RelatedUserModel,
  auction: RelatedAuctionModel,
  categories: RelatedCategoriesOnWatchListsModel.array(),
  AuctionsOnWatchLists: RelatedAuctionsOnWatchListsModel.array(),
}))
