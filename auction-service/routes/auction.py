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
    # auctions_collection = db["auction"]
    return {"status": 200}


# create a new auction
@router.post("/", tags=["auction"])
async def create_auction():
    return {"status": 200}


# update an auction
@router.put("/", tags=["auction"])
async def update_auction():
    return {"status": 200}


# update an auction
@router.put("/{auction_id}", tags=["auction"])
async def delete_auction(auction_id: int):
    return {"status": 200}
