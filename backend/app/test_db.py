from database import resumes_collection

result = resumes_collection.insert_one({
    "name": "Naser",
    "skill": "React"
})

print(result.inserted_id)