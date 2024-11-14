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

export const AuctionModelInput = z
  .object({
    title: z.string().openapi({ example: "Cool Auction Title" }),
    description: z.string().openapi({ example: "Cool description" }),
    startPrice: z.number().openapi({ example: 0.99 }), // Accepts number from client
    startTime: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
    endTime: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
    isActive: z.boolean(),
    sellerId: z.number().int(),
    quantity: z.number().int().openapi({ example: 10 }),
    buyItNowEnabled: z.boolean().openapi({ example: false }),
    createdAt: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
    updatedAt: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
  })
  .openapi("AuctionInput");

// Input schema for client input (expects `startPrice` as `number`)
export const AuctionModel = z
  .object({
    id: z.number().int().optional().openapi({ example: 1 }),
    title: z.string().openapi({ example: "Cool Auction Title" }),
    description: z.string().openapi({ example: "Cool description" }),
    startPrice: z.number().openapi({ example: 0.99 }), // Accepts number from client
    startTime: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
    endTime: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
    isActive: z.boolean(),
    sellerId: z.number().int(),
    createdAt: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
    updatedAt: z.coerce
      .date()
      .openapi({ example: new Date(Date.now()).toISOString() }),
  })
  .openapi("Auction");

// CompleteAuction interface with explicit types
export interface CompleteAuction {
  id?: number;
  title: string;
  description: string;
  startPrice: number;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  sellerId: number;
  createdAt: Date;
  updatedAt: Date;
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
