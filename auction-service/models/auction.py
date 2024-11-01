from models.objectid import PyObjectId
from pydantic import BaseModel, Field, StringConstraints
from decimal import Decimal
from typing import List, Optional
from typing_extensions import Annotated
from datetime import datetime
from bson import ObjectId


class AuctionCreate(BaseModel):
    title: str
    description: Optional[str]
    category: str
    starting_price: float
    user_id: str
    start_time: datetime
    end_time: datetime


class AuctionResponse(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    description: Optional[str]
    category: str
    starting_price: float
    user_id: str
    start_time: datetime
    end_time: datetime

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        from_attributes = True  # Use from_attributes instead of orm_mode


# Helper function to convert MongoDB ObjectId to string
def auction_helper(auction) -> dict:
    auction["_id"] = str(auction["_id"])
    return auction


class AuctionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: Annotated[str, StringConstraints(max_length=100)]
    description: Optional[str]
    category: Annotated[str, StringConstraints(max_length=50)]
    starting_price: Annotated[Decimal, Field(gt=0, max_digits=10, decimal_places=2)]
    current_bid: Optional[
        Annotated[Decimal, Field(gt=0, max_digits=10, decimal_places=2)]
    ]
    bids: Optional[List[dict]]  # Could be improved with a Bid reference if needed
    watchlist_criteria: Optional[List[dict]]  # User-specific criteria for notifications
    user_id: PyObjectId
    start_time: datetime
    end_time: datetime
    buy_now_price: Optional[
        Annotated[Decimal, Field(gt=0, max_digits=10, decimal_places=2)]
    ]
    is_flagged: bool = False
    is_removed: bool = False
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        from_attributes = True  # Use from_attributes instead of orm_mode
