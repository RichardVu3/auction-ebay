import * as z from "zod";
import { type CompleteAuction, RelatedAuctionModel } from "./index";

export const CategoryModel = z.object({
  id: z.number().int(),
  name: z.string(),
});

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  auctions: CompleteAuction[];
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() =>
  CategoryModel.extend({
    auctions: RelatedAuctionModel.array(),
  }),
);
