from fastapi import APIRouter

from models.objectid import PyObjectId

router = APIRouter(
    prefix="/bid",
    tags=["bid"],
    responses={404: {"description": "Not found"}},
)


# get all bid
@router.get("/", tags=["bid"])
async def get_bid():
    return {"status": 200}


# create a new bid
@router.post("/", tags=["bid"])
async def create_bid():
    return {"status": 200}


# update an bid
@router.put("/", tags=["bid"])
async def update_bid():
    return {"status": 200}


# update an bid
@router.put("/{bid_id}", tags=["auction"])
async def delete_bid(auction_id: int):
    return {"status": 200}
