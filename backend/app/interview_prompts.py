def get_interview_questions_prompt(
    resume_text,
    job_description
):
    return f"""
You are an experienced technical interviewer.

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

Generate exactly:
- 2 common fresher questions.
- 2 resume-based questions.
- 1 advanced technical question.

Common fresher questions should cover topics such as:
- Self introduction
- Strengths and weaknesses
- Career goals
- Teamwork
- Communication
- Problem solving
- Learning attitude

Resume-based questions:
- If the resume contains multiple projects, generate questions from different projects.
- Do not generate more than one question from the same project unless there is only one project.
- If there are two or more projects, ensure at least two different projects are covered.
- If there are additional resume sections (internships, certifications, achievements, education, technical skills), you may generate questions from those instead of asking another project question.
- Avoid repeatedly focusing on the same project.

Advanced technical question:
- Base it on the candidate's skills and the job description.
- It may cover DSA, OOP, DBMS, OS, Networking, SQL, Java, Python, JavaScript, React, Node.js, REST APIs, Git, AI/ML, or other technologies mentioned in the resume.

Requirements:
- Generate a different set of questions each time.
- Avoid duplicate or very similar questions.
- Keep every question concise (one sentence only).
- Each question should be less than 20 words.
- Questions should sound like a real interviewer.
- Return valid JSON only.
- Do not return Markdown.
- Do not include explanations outside the JSON.
"""