from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, Path, Query
from typing import List, Annotated
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


# get all auctions
@router.get("/", tags=["auction"])
async def get_auction(db: Collection = Depends(get_db)):
    auctions_collection = db["auctions"]
    auctions = auctions_collection.find({})

    return [auction_helper(doc) for doc in auctions.to_list()]


# create a new auction
@router.post("/", tags=["auction"])
async def create_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    auctions_collection = db["auctions"]
    auction_dict = dict(auction)
    print("auction_dict", auction_dict)

    new_auction = auctions_collection.insert_one(auction_dict)
    created_auction = auctions_collection.find_one({"_id": new_auction.inserted_id})

    return [auction_helper(created_auction)]


# delete an auction
@router.delete("/{auction_id}", tags=["auction"])
async def delete_auction(
    auction_id: Annotated[str, Path(title="The ID of the auction to delete")],
    db: Collection = Depends(get_db),
):
    auctions_collection = db["auctions"]

    deleted_auction = auctions_collection.delete_one({"_id": ObjectId(auction_id)})
    return deleted_auction.acknowledged


@router.put("/", tags=["auction"])
async def update_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    return {"status": 200}


@router.put("/{auction_id}/flag", tags=["auction"])
async def flag_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    return {"status": 200}


@router.put("/{auction_id}/end", tags=["auction"])
async def end_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    return {"status": 200}
