import * as z from "zod"
import { CompleteAuction, RelatedAuctionModel, CompleteBid, RelatedBidModel, CompleteWatchList, RelatedWatchListModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  isAdmin: z.boolean(),
  suspended: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  items: CompleteAuction[]
  bids: CompleteBid[]
  watchlist: CompleteWatchList[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  items: RelatedAuctionModel.array(),
  bids: RelatedBidModel.array(),
  watchlist: RelatedWatchListModel.array(),
}))
