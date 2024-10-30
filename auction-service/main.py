from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pymongo.mongo_client import MongoClient
from pymongo import ASCENDING
from routes.web import auction, bid, category

# environ.get("MONGODB_URL") if we were reading it from an env var for production

uri = "localhost:27017"

# Create a new client and connect to the server
client = MongoClient(uri)

# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["auction_service"]
# Create collections
auctions = db["auctions"]
bids = db["bids"]
categories = db["categories"]
notifications = db["notifications"]
carts = db["carts"]


auctions.create_index([("category", ASCENDING)])
auctions.create_index([("endTime", ASCENDING)])
auctions.create_index([("user_id", ASCENDING)])

bids.create_index([("auction_id", ASCENDING)])
bids.create_index([("user_id", ASCENDING)])

notifications.create_index([("user_id", ASCENDING)])

carts.create_index([("user_id", ASCENDING)])


app = FastAPI()
app.include_router(auction.router, prefix="/api")
app.include_router(bid.router, prefix="/api")
app.include_router(category.router, prefix="/api")
# add origins or load them from .env
origins = [""]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/checkhealth")
async def handle_checkhealth():
    return "API is up!"


def main():
    print("Hello from auction-service!")


if __name__ == "__main__":
    main()
