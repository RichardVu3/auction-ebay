from fastapi import APIRouter, Depends, HTTPException
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

    return {"status": 200}


# create a new auction
@router.post("/", tags=["auction"])
async def create_auction(new_auction: AuctionCreate, db: Collection = Depends(get_db)):
    auctions_collection = db["auction"]
    created_auction = auctions_collection.insert_one()
    print(created_auction)

    # response_payload = AuctionResponse(
    #     _id=created_auction._id,
    #     title=created_auction.title,
    #     description=new_auction.description,
    #     category=new_auction.category,
    #     starting_price=new_auction.starting_price,
    #     start_time=new_auction.start_time,
    #     end_time=new_auction.end_time,
    #     seller_id=new_auction.user_id,
    # )

    return created_auction


# update an auction
@router.put("/", tags=["auction"])
async def update_auction():
    return {"status": 200}


# update an auction
@router.put("/{auction_id}", tags=["auction"])
async def delete_auction(auction_id: int):
    return {"status": 200}
