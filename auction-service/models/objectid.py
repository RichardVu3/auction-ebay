from bson import ObjectId


from bson import ObjectId
from pydantic.json import pydantic_encoder


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema, handler):
        schema.update({"type": "string"})
        return schema


# To ensure compatibility in Pydantic v2 for JSON encoding
def custom_pydantic_encoder(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    return pydantic_encoder(obj)
