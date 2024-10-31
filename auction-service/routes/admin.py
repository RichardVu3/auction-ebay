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
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)


@router.put("/auction/{auction_id}/end", tags=["auction"])
async def end_auction(auction: AuctionCreate, db: Collection = Depends(get_db)):
    return {"status": 200}
