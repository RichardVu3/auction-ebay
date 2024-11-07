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
@router.get("/{user_id}/auctions", tags=["user"])
async def get_user_auctions(
    # TODO: Sync with Daniel and Richard on the data type
    # of user id
    user_id: Annotated[int, Path(title="the user's id.")],
    db: Collection = Depends(get_db),
):
    auctions_collection = db["auctions"]

    user_auctions = auctions_collection.find(
        {
            "user_id": user_id,
        },
    )

    return [auction_helper(doc) for doc in user_auctions.to_list()]
