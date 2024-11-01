from fastapi import APIRouter, Depends
from pymongo.collection import Collection
from mongodb import get_db

router = APIRouter(
    prefix="/category",
    tags=["category"],
    responses={404: {"description": "Not found"}},
)

# TODO: Embed categories


# get all categories
@router.get("/", tags=["category"])
async def get_category(db: Collection = Depends(get_db)):
    category_collection = db["categories"]
    category_collection.find({})

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
