from fastapi import APIRouter
from models.objectid import PyObjectId

router = APIRouter(
    prefix="/category",
    tags=["category"],
    responses={404: {"description": "Not found"}},
)


# get all category
@router.get("/", tags=["category"])
async def get_category():
    return {"status": 200}


# create a new category
@router.post("/", tags=["category"])
async def create_category():
    return {"status": 200}


# update a category
@router.put("/", tags=["category"])
async def update_category():
    return {"status": 200}


# delete a category
@router.delete("/{category_id}", tags=["category"])
async def delete_category(auction_id: int):
    return {"status": 200}
