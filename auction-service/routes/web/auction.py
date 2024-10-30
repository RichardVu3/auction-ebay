from fastapi import APIRouter

router = APIRouter(
    prefix="/auction",
    tags=["auction"],
    responses={404: {"description": "Not found"}},
)


# get all auction
@router.get("/", tags=["auction"])
async def get_auction():
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
