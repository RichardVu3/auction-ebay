from fastapi import APIRouter, Depends, HTTPException
from pymongo import DESCENDING
from pymongo.collection import Collection
from db import get_db, client
from models.bid import BidRequest, bid_helper
from datetime import datetime

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
    with client.start_session() as session:
        with session.start_transaction():
            bids_collection = db["bids"]
            highest_bid = bids_collection.find_one(
                {"auction_id": bid.auction_id},
                sort=[("amount", DESCENDING)],
                session=session,
            )
            if highest_bid is None or bid.amount > highest_bid["amount"]:
                new_bid = {
                    "auction_id": bid.auction_id,
                    "user_id": bid.user_id,
                    "amount": bid.amount,
                    "timestamp": datetime.now(),
                }
                created_bid = bids_collection.insert_one(new_bid, session=session)
                return created_bid.acknowledged
            else:
                raise HTTPException(
                    status_code=409,
                    detail=f"Could not create bid because it is lower than the current highest bid. The current high bid is {highest_bid.amount}.",
                )
