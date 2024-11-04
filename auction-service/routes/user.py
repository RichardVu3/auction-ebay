from bson.objectid import ObjectId
from fastapi import APIRouter, Depends, Path, Query
from typing import List, Annotated
from pymongo.collection import Collection
from models.objectid import PyObjectId
from models.auction import (
    auction_helper,
)
from db import get_db


router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)


# get all auctions by user_id
@router.get("/{user_Id}/auctions", tags=["auction"])
async def get_user_auctions(
    # TODO: Sync with Daniel and Richard on the data type
    # of user id
    user_id: Annotated[str, Path(title="the user's id.")],
    db: Collection = Depends(get_db),
):
    auctions_collection = db["users"]
    user_auctions = auctions_collection.find(
        {
            "seller_id": ObjectId(user_id),
        },
    )

    return [auction_helper(doc) for doc in user_auctions.to_list()]
