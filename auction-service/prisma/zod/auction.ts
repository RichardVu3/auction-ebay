import * as z from "zod";
import {
  type CompleteUser,
  type CompleteBid,
  type CompleteCategory,
  type CompleteWatchList,
  RelatedBidModel,
  RelatedUserModel,
  RelatedCategoryModel,
  RelatedWatchListModel,
} from "./index";

// Input schema for client input (expects `startPrice` as `number`)
export const AuctionModel = z
  .object({
    id: z.number().int().optional(),
    title: z.string().openapi({ example: "Cool Auction Title" }),
    description: z.string().openapi({ example: "Cool description" }),
    startPrice: z.number().openapi({ example: 0.99 }), // Accepts number from client
    startTime: z
      .string()
      .date()
      .openapi({ example: new Date(Date.now()).toString() }),
    endTime: z
      .string()
      .date()
      .openapi({ example: new Date(Date.now()).toString() }),
    isActive: z.boolean(),
    sellerId: z.number().int(),
    createdAt: z
      .string()
      .date()
      .openapi({ example: new Date(Date.now()).toString() }),
    updatedAt: z
      .string()
      .date()
      .openapi({ example: new Date(Date.now()).toString() }),
  })
  .openapi("Auction");

// CompleteAuction interface with explicit types
export interface CompleteAuction {
  id?: number;
  title: string;
  description: string;
  startPrice: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
  seller: CompleteUser;
  bids: CompleteBid[];
  categories: CompleteCategory[];
  watchlist: CompleteWatchList[];
}

// Related model with lazy loading and explicit type compatibility
export const RelatedAuctionModel: z.ZodSchema<CompleteAuction> = z.lazy(() =>
  AuctionModel.extend({
    seller: RelatedUserModel,
    bids: RelatedBidModel.array(),
    categories: RelatedCategoryModel.array(),
    watchlist: RelatedWatchListModel.array(),
  }),
);
