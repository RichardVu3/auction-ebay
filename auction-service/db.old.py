# from pymongo.server_api import ServerApi
# from fastapi import Depends
# from motor.motor_asyncio import AsyncIOMotorClient
#
#
# class Database:
#     def init(self):
#         self.uri = "localhost:27017"
#         self.client = AsyncIOMotorClient(self.uri, server_api=ServerApi("1"))
#         self.db = self.client["auction_service"]
#
#     async def ping_db(self):
#         # environ.get("MONGODB_URL") if we were reading it from an env var for production
#
#         # Create a new client and connect to the server
#
#         try:
#             await self.client.admin.command("ping")
#             print("Pinged your deployment. You successfully connected to MongoDB!")
#         except Exception as e:
#             print(e)
