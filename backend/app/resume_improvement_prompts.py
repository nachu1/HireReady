def get_resume_improvement_prompt(
    resume_text,
    job_description
):
    return f"""
You are an expert ATS Resume Writer and Technical Recruiter.

Your task is to improve the resume for the target job description while keeping the resume approximately the same length as the original resume.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY valid JSON.

Format:

{{
  "improved_summary":"",

  "improved_skills": {{
    "Programming Languages":"",
    "Frameworks & Libraries":"",
    "Databases":"",
    "AI/ML & CV":"",
    "Tools":"",
    "Professional Skills":""
  }},

  "skills_to_add":[
    "skill1",
    "skill2"
  ],

  

  "improved_projects":[
    {{
      "project_name":"",
      "improved_description":[
        "bullet 1",
        "bullet 2"
      ]
    }}
  ],

  "resume_tips":[
    "tip1",
    "tip2"
  ]
}}

STRICT RULES

SUMMARY

- Keep summary between 2 and 4 lines.
- Do not significantly increase summary length.
- Improve ATS keywords naturally.
- Make it professional and concise.
- Determine the candidate's status from the resume.
- If the resume indicates the candidate has completed graduation, use terms such as "graduate", "B.Tech graduate", or "recent graduate".
- If the resume indicates the candidate is still pursuing a degree, use terms such as "student", "undergraduate", or "B.Tech student".
- Never describe a graduate as a student.
- Use the education dates and resume content to infer the correct status.

SKILLS

- Preserve skill categories.
- Add only genuinely relevant skills from the job description.
- Avoid duplicates.
- Do not create a long skill list.



IMPROVED PROJECTS

- Create an entry for EVERY project found in the resume.
- Never skip a project.
- Return all projects.
- Rewrite each project as ATS-optimized resume content.
- Focus on technologies used.
- Focus on achievements.
- Focus on impact.
- Do NOT give advice.
- Do NOT explain improvements.
- Directly generate the final resume-ready content.
- improved_description must contain EXACTLY 2 concise bullet points.
- Each bullet point must be one sentence.
- Use strong action verbs such as Developed, Built, Implemented, Designed, and Created.
- Avoid repeatedly using the same action verb across projects.
- Keep the language professional and natural for a fresher software developer resume.
- Keep project length similar to the original resume.

RESUME TIPS

- Maximum 3 tips.
- Focus only on content improvements.
- No formatting advice.
- No font advice.
- No color advice.
- No hyperlink advice.
- Do not comment on dates unless there is a clear inconsistency.

ATS OPTIMIZATION

- Include important keywords from the job description where appropriate.
- Improve wording without significantly increasing resume length.
- Keep the final resume suitable for a one-page resume.

OUTPUT

- Return valid JSON only.
- No markdown.
- No explanations.
- No text outside JSON.

The improved resume should feel like a stronger version of the original resume, not a completely rewritten or expanded resume.
"""
def get_ai_resume_builder_prompt(
    resume_text,
    job_description
):
    return f"""
You are an expert ATS Resume Writer and Technical Recruiter.

Your task is to generate a complete ATS-optimized resume based on the original resume and target job description.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY valid JSON.

Format:

{{
  "personal_details": {{
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": ""
  }},

  "summary": "",

  "experience": [
    {{
      "role": "",
      "company": "",
      "duration": "",
      "description": [
        "",
        ""
      ]
    }}
  ],

  "projects": [
    {{
      "project_name": "",
      "description": [
        "",
        ""
      ]
    }}
  ],

  "education": [
    {{
      "degree": "",
      "institution": "",
      "duration": "",
      "cgpa": ""
    }}
  ],

  "skills": {{
    "Programming Languages": "",
    "Web Technologies": "",
    "Frameworks & Libraries": "",
    "Databases": "",
    "Tools & Platforms": "",
    "Core Concepts": "",
    "Professional Skills": ""
}},

  "certifications": [
    {{
      "title": "",
      "date": ""
    }}
  ],

  "additional_sections": [
    {{
      "section_name": "",
      "content": [
        ""
      ]
    }}
  ]
}}

STRICT RULES

PERSONAL DETAILS

- Extract personal details from the resume.
- Do not invent information.
- Leave fields empty if not available.
- Extract contact information exactly as written.
- Do not invent email, phone number, LinkedIn, GitHub, portfolio, or location details.
- Extract personal details exactly as provided.
- Leave fields empty if not available in the resume.
- Do not generate placeholder values such as "LinkedIn Profile", "GitHub Profile", "N/A", "Not Available", or similar text.
- If LinkedIn, GitHub, portfolio, email, phone, or location is missing, return an empty string for that field.
- Extract LinkedIn and GitHub URLs only if an actual URL or username is present.
- Ignore placeholder values such as:
  LinkedIn Profile,
  GitHub Profile,
  Portfolio Link,
  N/A,
  Not Available.
- Return an empty string if only a placeholder is present.

SUMMARY

- Create a professional ATS-optimized summary.
- Keep it concise.
- Keep length similar to the original summary.
- Include relevant keywords from the job description naturally.

EXPERIENCE

- Extract every experience entry found in the resume.
- Preserve company names and durations.
- Improve descriptions for ATS optimization.
- Keep descriptions concise.
- Use strong action verbs.
- Do not create experience entries if none exist in the resume.
- Preserve dates and durations exactly as written.
- Do not invent responsibilities, achievements, or technologies.

PROJECTS

- Return EVERY project found in the resume.
- Never skip projects.
- Rewrite project descriptions professionally.
- Focus on technologies used.
- Focus on achievements and impact.
- Exactly 2 bullet points per project.
- Each bullet point must be one sentence.
- Use strong action verbs such as Developed, Built, Implemented, Designed, Created, Engineered, or Deployed.
- Avoid repeatedly using the same action verb across projects.
- Do not invent technologies that are not present in the resume.
- Improve wording without changing the actual project scope.
- Preserve project names exactly as written unless minor grammar corrections are needed.

EDUCATION

- Extract all education entries.
- Preserve degree, institution, duration, and CGPA if available.
- Do not invent information.
- Additional courses related to education must be included within the Education section.
- Do not create a separate Additional Course section.
- Do not place additional courses in Certifications.
- Do not classify additional courses as certifications unless explicitly stated in the resume.
- Preserve academic scores exactly as written.
- Do not convert CGPA to percentage or percentage to CGPA.
- Preserve dates and durations exactly as written.

SKILLS

- Preserve the original skill categories whenever possible.
- HTML, CSS, and JavaScript must be classified as Web Technologies.
- Only place actual frameworks and libraries (React.js, FastAPI, Django, Bootstrap, Spring Boot, etc.) under Frameworks & Libraries.
- OOP, SDLC, REST APIs, Networking, DBMS, and similar topics should be classified under Core Concepts.
- Tools such as Git, GitHub, GitLab, VS Code, Postman, Docker, and similar should be classified under Tools & Platforms.
- Preserve existing skills from the resume.
- Add relevant ATS keywords only if supported by the resume or job description.
- Avoid duplicate skills.
- Do not invent technical skills.

CERTIFICATIONS

- Extract all certifications, publications, achievements, and similar credentials.
- Preserve dates if available.
- Only include items explicitly identified as certifications, certificates, licenses, or credentials.
- Do not move additional courses or training programs into Certifications.

ADDITIONAL SECTIONS

- Detect any extra sections in the resume.
- Examples:
  Awards,
  Publications,
  Research,
  Volunteering,
  Languages,
  Leadership,
  Interests,
  Training,
  Achievements.
- Place them inside additional_sections.
- Languages should be grouped into a single comma-separated line.
- Example: English, Malayalam, Kannada, Hindi.
- Preserve the original information.
- Do not lose any important information from the resume.
- Do not create an Additional Course section.

ATS OPTIMIZATION

- Improve wording without significantly increasing resume length.
- Keep content realistic.
- Do not invent projects, experience, education, certifications, or skills.
- Keep the resume suitable for a one-page professional resume.
- Add ATS keywords only when relevant to the resume or target job description.
- Do not keyword stuff.
- Keep wording natural and professional.
- Preserve the overall experience level of the candidate.
- Do not make a fresher appear experienced.
- Keep the resume concise and suitable for a one-page resume whenever possible.
- Avoid unnecessary expansion of descriptions.
- Prioritize important information over verbose wording.

DATA INTEGRITY

- If a section is not present in the resume, return an empty value instead of generating content.
- Do not invent projects, experience, certifications, education, skills, dates, scores, achievements, or links.
- Preserve factual information from the original resume.
- Maintain consistency between all resume sections.
- Do not create personal details that are not explicitly present in the resume.
- Do not infer LinkedIn, GitHub, portfolio, or social media profiles.

OUTPUT

- Return valid JSON only.
- No markdown.
- No explanations.
- No text outside JSON.
"""