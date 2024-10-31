from fastapi import APIRouter, Depends, HTTPException
from typing import List
from pymongo.collection import Collection

from models.objectid import PyObjectId
from models.auction import (
    AuctionModel,
    AuctionCreate,
    AuctionResponse,
    auction_helper,
)
from mongodb import get_db


router = APIRouter(
    prefix="/auction",
    tags=["auction"],
    responses={404: {"description": "Not found"}},
)


# get all auction
@router.get("/", tags=["auction"])
async def get_auction(db: Collection = Depends(get_db)):
    auctions_collection = db["auction"]
    auctions = auctions_collection.find({})
    return 1

    # return [auction_helper(doc) for doc in auctions.to_list()]


# create a new auction
@router.post("/", tags=["auction"])
async def create_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    auctions_collection = db["auction"]
    auction_dict = dict(auction)
    new_auction = auctions_collection.insert_one(auction_dict)

    created_auction = auctions_collection.find_one({"_id": new_auction.inserted_id})

    return created_auction


# update an auction
@router.put("/", tags=["auction"])
async def update_auction(auction: AuctionModel, db: Collection = Depends(get_db)):
    auctions_collection = db["auction"]
    # auction_dict = dict(auction)
    # updated_auction = auctions_collection.update_one(auction)

    return {"status": 200}


# update an auction
@router.put("/{auction_id}", tags=["auction"])
async def delete_auction(auction_id: int, db: Collection = Depends(get_db)):
    return {"status": 200}
