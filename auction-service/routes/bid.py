from fastapi import APIRouter, Depends, HTTPException
from pymongo import DESCENDING
from pymongo.collection import Collection
from mongodb import get_db
from models.bid import BidRequest, bid_helper

router = APIRouter(
    prefix="/bid",
    tags=["bid"],
    responses={404: {"description": "Not found"}},
)


# get all bid
@router.get("/", tags=["bid"])
async def get_bids(db: Collection = Depends(get_db)):
    bid_collection = db["bids"]
    bids = bid_collection.find({})

    return [bid_helper(doc) for doc in bids]


@router.post("/", tags=["bid"])
async def create_bid(bid: BidRequest, db: Collection = Depends(get_db)):
    bid_collection = db["bids"]
    last_bid = bid_collection.find_one(
        {"auction_id": bid.auction_id}, sort=[("timestamp", DESCENDING)]
    )

    if not last_bid or last_bid.amount < bid.amount:
        new_bid = bid_collection.insert_one(dict(bid))
        maybe_created_bid = bid_collection.find_one({"_id": new_bid.inserted_id})
        return [bid_helper(maybe_created_bid)]

    if last_bid.amount > bid.amount:
        raise HTTPException(
            status_code=409,
            detail=f"Could not create bid because it is lower than the current highest bid. The current high bid is {last_bid.amount}.",
        )
