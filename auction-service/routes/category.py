from fastapi import APIRouter, Depends, HTTPException
from pymongo.collection import Collection
from typing import List
from mongodb import get_db
from models.category import CategoryModel, CategoryRequest, category_helper

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
    categories = category_collection.find({})

    return [category_helper(doc) for doc in categories]


# create a new category
# TODO: should probably take a list as input
@router.post("/", tags=["category"])
async def create_category(
    category_list: List[CategoryRequest], db: Collection = Depends(get_db)
):
    category_collection = db["categories"]
    maybe_new_categories = category_collection.insert_many(
        [category for category in category_list]
    )
    if maybe_new_categories.acknowledged:
        return maybe_new_categories.inserted_ids

    raise HTTPException(status_code=409, detail=f"Could not create categories")


# update a category
@router.put("/{category_id}", tags=["category"])
async def update_category(category_id: str, category, db: Collection = Depends(get_db)):

    category_collection = db["categories"]
    category_collection.update_one({"_id": category_id}, dict(category))
    return {"status": 200}


# delete a category
@router.delete("/{category_id}", tags=["category"])
async def delete_category(category_id: str, db: Collection = Depends(get_db)):

    category_collection = db["categories"]
    maybe_deleted_category = category_collection.delete_one({"_id": category_id})
    return maybe_deleted_category.acknowledged
