from pymongo import MongoClient

# environ.get("MONGODB_URL") if we were reading it from an env var for production

uri = "localhost:27017"

# Create a new client and connect to the server
client = MongoClient(uri)
db = client["auction_service"]

# Send a ping to confirm a successful connection
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


def get_db():
    return db
