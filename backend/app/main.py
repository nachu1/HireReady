from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.database import (
    users_collection,
    resumes_collection,
    versions_collection
)
from typing import Optional
from bson import ObjectId
from fastapi.responses import FileResponse
from fastapi import HTTPException
from app.pdf_generator import (
    generate_resume_pdf,
    generate_ai_resume_pdf
)
from app.auth import (
    hash_password,
    verify_password
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.ai_service import (
    test_gemini,
    analyze_resume,
    generate_interview_questions,
    improve_resume,
    generate_ai_resume,
    generate_cover_letter,
    career_chat,
    evaluate_interview_answer,
    generate_job_description
)

from app.pdf_parser import extract_text_from_pdf




@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer Backend Running"
    }


@app.get("/test-ai")
def test_ai():
    return {
        "response": test_gemini()
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file)

    return {
        "filename": file.filename,
        "resume_text": text[:1000]
    }

@app.post("/register")
async def register_user(

    name: str = Form(...),

    email: str = Form(...),

    password: str = Form(...)

):

    existing_user = users_collection.find_one({

        "email": email

    })

    if existing_user:

        return {

            "error":
            "Email already registered"

        }

    hashed_password = hash_password(
        password
    )

    user_id = users_collection.insert_one({

        "name": name,

        "email": email,

        "password": hashed_password

    }).inserted_id

    return {

        "message":
        "Registration successful",

        "user_id":
        str(user_id)

    }
@app.post("/login")
async def login_user(

    email: str = Form(...),

    password: str = Form(...)

):

    user = users_collection.find_one({

        "email": email

    })

    if not user:

        return {

            "error":
            "Invalid email or password"

        }

    if not verify_password(

        password,

        user["password"]

    ):

        return {

            "error":
            "Invalid email or password"

        }

    latest_resume = resumes_collection.find_one(

        {
            "user_id": str(user["_id"])
        },

        sort=[
            ("_id", -1)
        ]

    )

    response = {

        "message": "Login successful",

        "user_id": str(user["_id"]),

        "name": user["name"]

    }

    if latest_resume:

        response["resume_id"] = str(
            latest_resume["_id"]
        )

        response["resume_name"] = latest_resume[
            "filename"
        ]

    return response


import os

@app.post("/analyze-resume")
async def analyze_resume_endpoint(
    user_id: str = Form(...),
    job_description: str = Form(...),
    file: Optional[UploadFile] = File(None)
):

    print("ANALYZE ENDPOINT STARTED")

    if file:

        os.makedirs(
            "uploads",
            exist_ok=True
        )

        file_content = await file.read()

        file_path = f"uploads/{file.filename}"

        with open(
            file_path,
            "wb"
        ) as buffer:

            buffer.write(
                file_content
            )

        from io import BytesIO

        pdf_file = UploadFile(
            filename=file.filename,
            file=BytesIO(file_content)
        )

        resume_text = extract_text_from_pdf(
            pdf_file
        )

        name = resume_text.split(
            "\n"
        )[0].strip()
        print("Extracted name:", name)

        resume_id = resumes_collection.insert_one({

            "user_id": user_id,

            "filename": file.filename,
            "name": name,

            "file_path": file_path,

            "resume_text": resume_text,

            "job_description": job_description

        }).inserted_id

    else:

        resume = resumes_collection.find_one(

            {
                "user_id": user_id
            },

            sort=[
                (
                    "_id",
                    -1
                )
            ]

        )

        if not resume:

            return {
                "error": "Resume not found"
            }

        resume_id = resume["_id"]
        print("MongoDB name:", resume.get("name"))
        print("MongoDB filename:", resume.get("filename"))

        resume_text = resume["resume_text"]

        name = resume.get(
           "name",
           resume["filename"]
        )

    try:
        if len(job_description.split()) <= 5:

         job_description = generate_job_description(
           job_description
        )


        result = analyze_resume(
            resume_text,
            job_description
        )
        if "error" in result:

            return result

    except Exception as e:

        print(
            "ANALYZE ERROR:",
            e
        )

        return {
            "error": str(e)
        }

    return {

        "resume_id": str(
            resume_id
        ),

        "name": name,

        "analysis": result

    }

@app.post("/generate-interview-questions")
async def interview_questions_endpoint(
    resume_id: str = Form(...)
):

    resume = resumes_collection.find_one({
        "_id": ObjectId(resume_id)
    })

    if not resume:

        return {
            "error": "Resume not found"
        }

    resume_text = resume["resume_text"]

    job_description = resume.get(
        "job_description",
        ""
    )

    questions = generate_interview_questions(
        resume_text,
        job_description
    )

    return questions




@app.post("/improve-resume")
async def improve_resume_endpoint(
    resume_id: str = Form(...)
):

    resume = resumes_collection.find_one({
        "_id": ObjectId(resume_id)
    })

    if not resume:

        return {
            "error": "Resume not found"
        }

    resume_text = resume["resume_text"]

    job_description = resume.get(
        "job_description",
        ""
    )

    result = improve_resume(
        resume_text,
        job_description
    )
    print("NEW RESULT:")
    print(result)
    version_count = versions_collection.count_documents({

        "resume_id": resume_id

    })

    versions_collection.insert_one({

        "resume_id": resume_id,

        "version": version_count + 1,

        "improved_resume": result

    })
    print("SAVED VERSION:", version_count + 1)

    return result
@app.post("/generate-ai-resume")
async def generate_ai_resume_endpoint(
    resume_id: str = Form(...)
):

    resume = resumes_collection.find_one({
        "_id": ObjectId(resume_id)
    })

    if not resume:

        return {
            "error": "Resume not found"
        }

    resume_text = resume["resume_text"]

    job_description = resume.get(
        "job_description",
        ""
    )

    result = generate_ai_resume(
        resume_text,
        job_description
    )

    if "error" in result:

        return {
            "error": result["error"]
        }

    print("AI RESUME RESULT:")
    print(result)

    return result

@app.post("/generate-cover-letter")
async def generate_cover_letter_endpoint(
    resume_id: str = Form(...),
    job_description: str = Form(...)
):

    resume = resumes_collection.find_one({
        "_id": ObjectId(resume_id)
    })

    resume_text = resume["resume_text"]

    result = generate_cover_letter(
        resume_text,
        job_description
    )

    return result
from fastapi import Form
import json
@app.post("/career-chat")
async def career_chat_endpoint(
    resume_id: str = Form(...),
    message: str = Form(...),
    history: str = Form("[]")
):

    resume = resumes_collection.find_one({
        "_id": ObjectId(resume_id)
    })

    if not resume:

        return {
            "error": "Resume not found"
        }

    resume_text = resume["resume_text"]
    chat_history = json.loads(history)
    result = career_chat(
        resume_text,
        message,
        chat_history
    )

    return result
@app.post("/evaluate-answer")
async def evaluate_answer_endpoint(
    question: str = Form(...),
    answer: str = Form(...)
):

    result = evaluate_interview_answer(
        question,
        answer
    )

    return result
@app.get("/resume/{resume_id}")
async def get_resume(
    resume_id: str
):

    resume = resumes_collection.find_one({

        "_id": ObjectId(
            resume_id
        )

    })

    if not resume:

        return {

            "error": "Resume not found"

        }

    return {

        "filename": resume["filename"],

        "resume_text": resume["resume_text"],

        "job_description": resume.get(
            "job_description",
            ""
        )

    }
@app.get("/download-resume/{resume_id}")
async def download_resume(
    resume_id: str
):

    resume = resumes_collection.find_one({

        "_id": ObjectId(
            resume_id
        )

    })

    if not resume:

        return {
            "error": "Resume not found"
        }

    latest_version = versions_collection.find_one(

        {
            "resume_id": resume_id
        },

        sort=[
            (
                "version",
                -1
            )
        ]

    )

    if not latest_version:

        return {
            "error": "No resume version found"
        }
    print(
         "DOWNLOADED VERSION:",
         latest_version["version"]
    )

    print(
        latest_version["improved_resume"]
    )  

    pdf_path = f"uploads/resume_{resume_id}.pdf"

    generate_resume_pdf(

        resume["resume_text"],

        latest_version[
            "improved_resume"
        ],

        pdf_path

    )

    return FileResponse(

        pdf_path,

        media_type="application/pdf",

        filename=f"Resume_V{latest_version['version']}.pdf"

    )

@app.get("/download-ai-resume/{resume_id}")
async def download_ai_resume(
    resume_id: str
):

    resume = resumes_collection.find_one({

        "_id": ObjectId(
            resume_id
        )

    })

    if not resume:

        return {
            "error": "Resume not found"
        }

    resume_text = resume["resume_text"]

    job_description = resume.get(
        "job_description",
        ""
    )

    ai_resume = generate_ai_resume(

        resume_text,

        job_description

    )

    if "error" in ai_resume:

        raise HTTPException(
            status_code=503,
            detail="Service Temporarily Unavailable"
        )

    pdf_path = f"uploads/ai_resume_{resume_id}.pdf"

    generate_ai_resume_pdf(

        ai_resume,

        pdf_path

    )

    return FileResponse(

        pdf_path,

        media_type="application/pdf",

        filename="AI_Resume.pdf"

    )
@app.get("/test-version/{resume_id}")
async def test_version(
    resume_id: str
):

    resume = resumes_collection.find_one({

        "_id": ObjectId(resume_id)

    })

    latest_version = versions_collection.find_one(

        {
            "resume_id": resume_id
        },

        sort=[
            (
                "version",
                -1
            )
        ]

    )

    return {

        "resume_text": resume["resume_text"],

        "improved_resume": latest_version[
            "improved_resume"
        ]

    }
@app.get("/current-resume/{user_id}")
async def current_resume(
    user_id: str
):

    resume = resumes_collection.find_one(

        {
            "user_id": user_id
        },

        sort=[
            ("_id", -1)
        ]

    )

    if not resume:

        return {
            "resume": None
        }

    return {

    "resume_id": str(
        resume["_id"]
    ),

    "filename": resume["filename"],

    "name": resume.get(
        "name",
        resume["filename"]
    )

}