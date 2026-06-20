from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))

db = client["hire_ready"]

users_collection = db["users"]
resumes_collection = db["resumes"]
versions_collection = db["resume_versions"]