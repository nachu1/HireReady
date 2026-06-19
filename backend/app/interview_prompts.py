def get_interview_questions_prompt(
    resume_text,
    job_description
):
    return f"""
You are a technical interviewer.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY valid JSON.

Format:

{{
  "common_fresher_questions": [],
  "resume_based_questions": [],
  "advanced_questions": []
}}

Rules:
Generate:
1 common fresher question
1 resume based question
- Keep questions concise
- Return JSON only
- Do not return markdown
- Do not return explanations outside JSON
"""