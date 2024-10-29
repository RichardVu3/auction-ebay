from typing import Union
from fastapi import FastAPI

from pymongo.mongo_client import MongoClient
from pymongo import ASCENDING, DESCENDING
from os import environ

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
users = db["users"]
items = db["items"]
bids = db["bids"]
categories = db["categories"]
notifications = db["notifications"]
carts = db["carts"]

# Set up indexes for efficient querying
# Users: Unique index on email for quick login lookup
users.create_index([("email", ASCENDING)], unique=True)

# Items: Index on category and endTime to support category search and sorting by auction end time
items.create_index([("category", ASCENDING)])
items.create_index([("endTime", ASCENDING)])

# Bids: Index on itemId for fast retrieval of bids for an item
bids.create_index([("itemId", ASCENDING)])

# Notifications: Index on userId for retrieving notifications by user
notifications.create_index([("userId", ASCENDING)])

# Carts: Index on userId to efficiently manage user-specific carts
carts.create_index([("userId", ASCENDING)])


app = FastAPI()


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
