import json
import google.generativeai as genai

from app.config import GEMINI_API_KEY
from app.prompts import get_resume_analysis_prompt
from app.interview_prompts import get_interview_questions_prompt
from app.resume_improvement_prompts import get_resume_improvement_prompt, get_ai_resume_builder_prompt
from app.cover_letter_prompts import (
    get_cover_letter_prompt
)
from app.chat_prompts import (
    get_chat_prompt
)
from app.interview_evaluator_prompts import (
    get_interview_evaluation_prompt
)

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(
    "gemini-2.5-flash",
    generation_config={
        "temperature": 0
    }
)


def test_gemini():
    return "Gemini connection working"


def generate_job_description(role):

    prompt = f"""
Create a realistic ATS-friendly job description for the role:

{role}

Requirements:

- Write only the job description.
- Include required technical skills.
- Include responsibilities.
- Include qualifications.
- Keep it concise (150-250 words).
- Do not include company name, salary, location, or benefits.
"""

    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.4
        }
    )

    return response.text

def analyze_resume(
    resume_text,
    job_description
):

    prompt = get_resume_analysis_prompt(
        resume_text,
        job_description
    )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0
            }
        )

        text = response.text

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        result = json.loads(
            text
        )

        matching = len(
          result.get("matching_skills", [])
        )

        missing = len(
           result.get("missing_skills", [])
        )

        score = 50

        # Reward matching skills
        score += matching * 3

        # Penalize missing skills
        score -= missing * 2

        # Prevent very high scores unless the resume is exceptionally strong
        if score > 85 and missing > 0:
          score = 85

        # Keep score within range
        score = max(0, min(score, 95))

        result["ats_score"] = score

        

        return result

    except Exception as e:

        print(
            "ATS GEMINI ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "Service Temporarily Unavailable"

            }

        return {

            "error":
            "Service Temporarily Unavailable"

        }

def generate_interview_questions(
    resume_text,
    job_description
):

    prompt = get_interview_questions_prompt(
        resume_text,
        job_description
    )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.8
            }
        )

        text = response.text
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print(
            "INTERVIEW QUESTION ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "AI usage limit exceeded. Please try again later.",

                "common_fresher_questions": [],

                "resume_based_questions": [],

                "advanced_questions": []

            }

        return {

            "error":
            "Unable to generate interview questions. Please try again later.",

            "common_fresher_questions": [],

            "resume_based_questions": [],

            "advanced_questions": []

        }

def improve_resume(
    resume_text,
    job_description
):

    prompt = get_resume_improvement_prompt(
        resume_text,
        job_description
    )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.5
            }
        )

        text = response.text
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        print(text)

        return json.loads(text)

    except Exception as e:

        print(
            "IMPROVEMENT ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

                "improved_summary": "",

                "improved_skills": [],

                "skills_to_add": [],

                "improved_projects": [],

                "resume_tips": []

            }

        return {

            "error":
            "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

            "improved_summary": "",

            "improved_skills": [],

            "skills_to_add": [],

            "improved_projects": [],

            "resume_tips": []

        }
def generate_ai_resume(
    resume_text,
    job_description
):

    prompt = get_ai_resume_builder_prompt(
        resume_text,
        job_description
    )

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        print(text)

        return json.loads(
            text
        )

    except Exception as e:

        print(
            "AI RESUME ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

                "summary": "",

                "skills": {

                    "Programming Languages": "",

                    "Frameworks & Libraries": "",

                    "Databases": "",

                    "AI/ML & CV": "",

                    "Tools": "",

                    "Professional Skills": ""

                },

                "projects": []

            }

        return {

            "error":
            "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

            "summary": "",

            "skills": {

                "Programming Languages": "",

                "Frameworks & Libraries": "",

                "Databases": "",

                "AI/ML & CV": "",

                "Tools": "",

                "Professional Skills": ""

            },

            "projects": []

        }
def generate_cover_letter(
    resume_text,
    job_description
):

    prompt = get_cover_letter_prompt(
        resume_text,
        job_description
    )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7
            }
        )

        text = response.text

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print(
            "COVER LETTER ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

                "cover_letter": ""

            }

        return {

            "error":
            "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

            "cover_letter": ""

        }
def career_chat(
    resume_text,
    user_message,
    chat_history
):

    prompt = get_chat_prompt(
        resume_text,
        user_message,
        chat_history
    )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.7
            }
        )

        return {

            "response":
            response.text

        }

    except Exception as e:

        print(
            "CAREER CHAT ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

                "response": ""

            }

        return {

            "error":
            "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

            "response": ""

        }
def evaluate_interview_answer(
    question,
    answer
):

    prompt = get_interview_evaluation_prompt(
        question,
        answer
    )

    try:

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0
            }
        )

        text = response.text

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        return json.loads(
            text
        )

    except Exception as e:

        print(
            "INTERVIEW EVALUATION ERROR:",
            e
        )

        error_text = str(e)

        if (
            "429" in error_text
            or "quota" in error_text.lower()
            or "resource_exhausted" in error_text.lower()
        ):

            return {

                "error":
                "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

                "score": 0,

                "level": "Unavailable",

                "strengths": [],

                "improvements": [],

                "ideal_answer": "",

                "interviewer_feedback": ""

            }

        return {

            "error":
            "⚠️ Service Temporarily Unavailable\n\nPlease try again later.",

            "score": 0,

            "level": "Unavailable",

            "strengths": [],

            "improvements": [],

            "ideal_answer": "",

            "interviewer_feedback": ""

        }