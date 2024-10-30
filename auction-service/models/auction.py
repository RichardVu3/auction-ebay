import decimal
from pydantic import BaseModel, Field, StringConstraints
from decimal import Decimal
from typing import List, Optional
from typing_extensions import Annotated
from datetime import datetime
from bson import ObjectId
from objectid import PyObjectId


# Item Model
class ItemModel(BaseModel):
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
    seller_id: PyObjectId
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
