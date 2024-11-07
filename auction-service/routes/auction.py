from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Path
from typing import Annotated
from pymongo.collection import Collection
from models.auction import (
    AuctionModel,
    AuctionCreate,
    AuctionResponse,
    auction_helper,
)
from db import get_db


router = APIRouter(
    prefix="/auction",
    tags=["auction"],
    responses={404: {"description": "Not found"}},
)

# TODO: Embed categories


# get all auctions
@router.get("/", tags=["auction"])
async def get_auction(db: Collection = Depends(get_db)):
    auctions_collection = db["auctions"]
    auctions = auctions_collection.find({})

    return [auction_helper(doc) for doc in auctions.to_list()]


# get all auctions
@router.get("/{auction_id}", tags=["auction"])
async def get_auction_by_id(
    auction_id: Annotated[str, Path(title="The ID of the auction to get")],
    db: Collection = Depends(get_db),
):
    auctions_collection = db["auctions"]
    auction = auctions_collection.find_one({"_id", auction_id})
    if not auction:
        raise HTTPException(status_code=404, detail="Auction not found")

    return [auction_helper(auction)]


# create a new auction
@router.post("/", tags=["auction"])
async def create_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    auctions_collection = db["auctions"]
    auction_dict = dict(auction)

    new_auction = auctions_collection.insert_one(auction_dict)
    created_auction = auctions_collection.find_one({"_id": new_auction.inserted_id})

    return [auction_helper(created_auction)]


# We should soft delete auctions insetead of actually deleting them so that we
# can integrate with metrics more easily
@router.delete("/{auction_id}", tags=["auction"])
async def delete_auction(
    auction_id: Annotated[str, Path(title="The ID of the auction to delete")],
    db: Collection = Depends(get_db),
):
    auctions_collection = db["auctions"]

    deleted_auction = auctions_collection.delete_one({"_id": ObjectId(auction_id)})
    return deleted_auction.acknowledged


## TODO: Routes below are broken due to AuctionModel typing


# @router.put("/{auction_id}", tags=["auction"])
# async def update_auction(
#     auction_id: str,
#     auction: AuctionModel,
#     db: Collection = Depends(get_db),
# ):
#     auction_collection = db["auctions"]
#     maybe_update_auction = auction_collection.update_one(
#         {"_id": auction_id}, dict(auction)
#     )
#     updated_auction = auction_collection.find_one(
#         {"_id": maybe_update_auction.upserted_id}
#     )
#     return updated_auction


# @router.put("/{auction_id}/flag", tags=["auction"])
# async def flag_auction(auction: AuctionModel, db: Collection = Depends(get_db)):
#     return {"status": 200}
#
#
# @router.put("/{auction_id}/end", tags=["auction"])
# async def end_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
#     return {"status": 200}
