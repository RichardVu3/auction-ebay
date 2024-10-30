from fastapi import APIRouter

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


# update an category
@router.put("/", tags=["category"])
async def update_category():
    return {"status": 200}


# update an category
@router.put("/{category_id}", tags=["auction"])
async def delete_category(auction_id: int):
    return {"status": 200}
