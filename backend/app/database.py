from pymongo import MongoClient

client = MongoClient(
    "mongodb://localhost:27017/"
)

db = client["resume_analyzer"]

users_collection = db["users"]

resumes_collection = db["resumes"]

versions_collection = db["resume_versions"]