def get_cover_letter_prompt(
    resume_text,
    job_description
):
    return f"""
You are an experienced recruiter and career coach.

Resume:
{resume_text}

Job Description:
{job_description}

Generate a modern, professional cover letter suitable for online job applications.

IMPORTANT:
Accuracy is more important than creativity.

Return ONLY valid JSON.

Format:

{{
    "cover_letter":""
}}

Rules:

- Use ONLY information explicitly present in the resume.
- Never invent skills, technologies, projects, achievements, certifications, internships, publications, awards, or experience.
- Never assume experience with a technology unless it appears in the resume.
- Do not infer skills from the job description.
- If a skill appears in the job description but not in the resume, do not claim the candidate has that skill.
- Before mentioning any skill, project, achievement, publication, award, or technology, verify that it exists in the resume.

Candidate Level:

- Determine the candidate's status from the resume.
- If the candidate is a student, write as a student.
- If the candidate has graduated, write as a recent graduate.
- If the candidate has professional experience, write accordingly.

Content Guidelines:

- Prioritize skills that match the job description.
- Mention 1-2 additional strong skills from the resume when relevant.
- Mention 1-2 relevant projects naturally.
- If the resume contains a research paper, publication, award, or recognition, mention it only if it fits naturally.
- Focus on how the candidate can contribute to the role rather than listing achievements.
- Highlight practical project experience and problem-solving ability when relevant.

Writing Style:

- Write naturally like a real person.
- The cover letter should feel written by a candidate, not generated from a checklist.
- Avoid robotic or promotional language.
- Avoid repeating information.
- Use a professional, confident, and concise tone.
- Prioritize readability and flow.
- Keep the cover letter between 180 and 250 words.

Do NOT use:

- "Dear Hiring Manager"
- "Dear Recruitment Officer"
- "Dear Sir/Madam"
- "I am writing to express my interest"
- "I am writing to express my keen interest"
- "I am excited to apply"

Opening:

- Begin with a natural introduction of the candidate.
- Do not force projects, awards, research papers, or achievements into the first sentence.
- The opening should explain the candidate's background and interest in the role naturally.

Body:

- Introduce relevant skills naturally.
- Introduce projects where they support the application.
- Introduce achievements only when they strengthen the narrative.
- Do not turn the cover letter into a resume summary.

Closing:

- End professionally and confidently.
- Focus on contributing to the team.
- Do not include:
  "Sincerely"
  "Regards"
  "Yours faithfully"
  name signatures

Structure:

1. Natural introduction.
2. Relevant skills and experience.
3. Relevant projects and achievements.
4. Why the candidate fits the role.
5. Professional closing.

Return JSON only.
"""