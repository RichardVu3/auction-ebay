from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import ASCENDING
from mongodb import get_db


from routes import auction, bid, category, user, admin

db = get_db()

# Create collections
auctions = db["auctions"]
bids = db["bids"]
categories = db["categories"]
notifications = db["notifications"]
carts = db["carts"]
user = db["users"]


auctions.create_index([("category", ASCENDING)])
auctions.create_index([("endTime", ASCENDING)])
auctions.create_index([("user_id", ASCENDING)])

bids.create_index([("auction_id", ASCENDING)])
bids.create_index([("user_id", ASCENDING)])

notifications.create_index([("user_id", ASCENDING)])

carts.create_index([("user_id", ASCENDING)])


app = FastAPI()


# register this as a global error handler that runs for each request
# @app.middleware("http")
# async def error_handler(request: Request, call_next):
#     try:
#         response = await call_next(request)
#         if response.status_code >= 400:
#             return JSONResponse(
#                 status_code=response.status_code,
#                 content={
#                     "error": "An error occurred",
#                     "status_code": response.status_code,
#                     "detail": (
#                         response.body.decode()
#                         if response.body
#                         else "No additional detail"
#                     ),
#                 },
#             )
#         return response
#     except Exception as exception:
#         # Catch all other unhandled exceptions
#         traceback.print_exc()  # Optionally log the traceback to the console or a log file
#         return JSONResponse(
#             status_code=500,
#             content={
#                 "error": "An internal server error occurred",
#                 "detail": str(exception),
#             },
#         )


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


@app.get("/checkhealth")
async def handle_checkhealth():
    return "API is up!"


def main():
    print("Hello from auction-service!")


if __name__ == "__main__":
    main()
