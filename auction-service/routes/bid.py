from fastapi import APIRouter, Depends, HTTPException
from pymongo.collection import Collection
from mongodb import get_db
from models.bid import BidModel, BidCreate, bid_helper

router = APIRouter(
    prefix="/bid",
    tags=["bid"],
    responses={404: {"description": "Not found"}},
)


# get all bid
@router.get("/", tags=["bid"])
async def get_bid(db: Collection = Depends(get_db)):
    bid_collection = db["bids"]
    bids = bid_collection.find({})

    return [bid_helper(doc) for doc in bids]

    # create a new bid

    # # create a new auction
    # @router.post("/", tags=["auction"])
    # async def create_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    #     auctions_collection = db["auctions"]
    #     auction_dict = dict(auction)
    #     print("auction_dict", auction_dict)
    #
    #     new_auction = auctions_collection.insert_one(auction_dict)
    #     created_auction = auctions_collection.find_one({"_id": new_auction.inserted_id})
    #
    # return [auction_helper(created_auction)]


@router.post("/", tags=["bid"])
async def create_bid(bid: BidCreate, db: Collection = Depends(get_db)):

    bid_collection = db["bids"]
    new_bid = bid_collection.insert_one(dict(bid))
    created_bid = bid_collection.find_one({"_id": new_bid.inserted_id})
    return [bid_helper(created_bid)]


# delete an bid
@router.put("/", tags=["bid"])
async def update_bid():
    return {"status": 200}


# update an bid
@router.delete("/{bid_id}", tags=["bid"])
async def delete_bid(auction_id: int):
    return {"status": 200}
