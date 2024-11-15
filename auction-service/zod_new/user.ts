import * as z from "zod"
import { CompleteBid, RelatedBidModel, CompleteWatchList, RelatedWatchListModel, CompleteAuction, RelatedAuctionModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  isAdmin: z.boolean(),
  suspended: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  bids: CompleteBid[]
  watchlist: CompleteWatchList[]
  items: CompleteAuction[]
  boughtItems: CompleteAuction[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  bids: RelatedBidModel.array(),
  watchlist: RelatedWatchListModel.array(),
  items: RelatedAuctionModel.array(),
  boughtItems: RelatedAuctionModel.array(),
}))
