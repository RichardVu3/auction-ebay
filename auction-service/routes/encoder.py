import json
from bson import ObjectId  # bson = binary JSON, the data format used by MongoDB


class MyJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)  # this will return the ID as a string
        return json.JSONEncoder.default(self, o)
