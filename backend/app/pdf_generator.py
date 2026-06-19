from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    KeepTogether,
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER


def get_section(text, start, end=None):

    if start not in text:
        return ""

    section = text.split(start, 1)[1]

    if end and end in section:

        section = section.split(end, 1)[0]

    return section.strip()


def add_section_heading(content, styles, title):

    content.append(HRFlowable(width="100%"))

    content.append(Spacer(1, 4))

    content.append(Paragraph(title, styles["Heading2"]))

    content.append(Spacer(1, 3))


def generate_resume_pdf(original_resume, improved_resume, output_path):

    doc = SimpleDocTemplate(
        output_path, leftMargin=30, rightMargin=30, topMargin=20, bottomMargin=20
    )

    styles = getSampleStyleSheet()

    styles["Title"].fontSize = 18
    styles["Title"].leading = 20

    styles["Heading2"].fontSize = 12
    styles["Heading2"].leading = 14

    styles["BodyText"].fontSize = 9
    styles["BodyText"].leading = 11

    content = []

    lines = original_resume.split("\n")

    name = lines[0] if len(lines) > 0 else ""

    contact1 = lines[1] if len(lines) > 1 else ""
    contact2 = lines[2] if len(lines) > 2 else ""
    contact3 = lines[3] if len(lines) > 3 else ""

    experience = get_section(original_resume, "PROFESSIONAL EXPERIENCE", "PROJECTS")

    education = get_section(original_resume, "EDUCATION", "SKILLS")

    skills = get_section(original_resume, "SKILLS", "CERTIFICATIONS & ACHIEVEMENTS")

    certifications = get_section(original_resume, "CERTIFICATIONS & ACHIEVEMENTS")

    # HEADER

    content.append(Paragraph(f"<b>{name}</b>", styles["Title"]))

    content.append(Spacer(1, 4))

    email = ""
    phone = ""

    if "%" in contact1:

        parts = contact1.split("%")

        email = parts[0].replace("u", "").strip()

        phone = parts[1].strip()

    location = contact2.strip()

    linkedin_github = contact3.replace("in ", "LinkedIn: ")

    linkedin_github = linkedin_github.replace(" I ", " | GitHub: ")

    contact_line = (
        f"Email: {email} | "
        f"Phone: {phone} | "
        f"Location: {location} | "
        f"{linkedin_github}"
    )

    content.append(Paragraph(contact_line, styles["BodyText"]))

    content.append(Spacer(1, 10))

    # SUMMARY

    add_section_heading(content, styles, "PROFESSIONAL SUMMARY")

    content.append(
        Paragraph(improved_resume.get("improved_summary", ""), styles["BodyText"])
    )

    content.append(Spacer(1, 6))

    # EXPERIENCE

    add_section_heading(content, styles, "PROFESSIONAL EXPERIENCE")

    for line in experience.split("\n"):

        if line.strip():

            content.append(Paragraph(line, styles["BodyText"]))

    content.append(Spacer(1, 6))

    # PROJECTS

    add_section_heading(content, styles, "PROJECTS")

    projects = improved_resume.get("improved_projects", [])

    for project in projects:

        content.append(
            Paragraph(f"<b>{project['project_name']}</b>", styles["BodyText"])
        )

        descriptions = project.get("improved_description", [])

        if isinstance(descriptions, str):
            descriptions = [descriptions]

        for point in descriptions:

            content.append(Paragraph(f"• {point}", styles["BodyText"]))

        content.append(Spacer(1, 4))

    # EDUCATION

    add_section_heading(content, styles, "EDUCATION")

    for line in education.split("\n"):

        if line.strip():

            content.append(Paragraph(line, styles["BodyText"]))

    content.append(Spacer(1, 6))

    # SKILLS

    add_section_heading(content, styles, "SKILLS")

    for line in skills.split("\n"):

        if line.strip():

            content.append(Paragraph(line, styles["BodyText"]))

    content.append(Spacer(1, 6))

    # CERTIFICATIONS

    add_section_heading(content, styles, "CERTIFICATIONS & ACHIEVEMENTS")

    for line in certifications.split("\n"):

        if line.strip():

            content.append(Paragraph(line, styles["BodyText"]))

    doc.build(content)


def generate_ai_resume_pdf(ai_resume, output_path):

    doc = SimpleDocTemplate(
        output_path, leftMargin=30, rightMargin=30, topMargin=20, bottomMargin=20
    )

    styles = getSampleStyleSheet()
    header_style = styles["BodyText"].clone("HeaderStyle")

    header_style.alignment = TA_CENTER

    styles["Title"].fontSize = 18
    styles["Title"].leading = 20

    styles["Heading2"].fontSize = 12
    styles["Heading2"].leading = 14

    styles["BodyText"].fontSize = 9
    styles["BodyText"].leading = 11

    content = []

    personal = ai_resume.get("personal_details", {})

    name = personal.get("name", "")
    content.append(Paragraph(f"<b>{name}</b>", styles["Title"]))

    content.append(Spacer(1, 4))

    contact_parts = []

    if personal.get("email"):
        contact_parts.append(f"Email: {personal['email']}")

    if personal.get("phone"):
        contact_parts.append(f"Phone: {personal['phone']}")

    if personal.get("location"):
        contact_parts.append(f"Location: {personal['location']}")

    if personal.get("linkedin"):
        contact_parts.append(f"LinkedIn: {personal['linkedin']}")

    if personal.get("github"):
        contact_parts.append(f"GitHub: {personal['github']}")

    contact_line = " | ".join(contact_parts)

    content.append(Paragraph(contact_line, header_style))
    content.append(Spacer(1, 10))

    add_section_heading(content, styles, "PROFESSIONAL SUMMARY")

    content.append(Paragraph(ai_resume.get("summary", ""), styles["BodyText"]))

    content.append(Spacer(1, 6))

    experience = ai_resume.get("experience", [])

    if experience:

        add_section_heading(content, styles, "PROFESSIONAL EXPERIENCE")

        for exp in experience:

            table = Table(
                [
                    [
                        Paragraph(f"<b>{exp.get('role','')}</b>", styles["BodyText"]),
                        Paragraph(
                            f"{exp.get('company','')} | {exp.get('duration','')}",
                            styles["BodyText"],
                        ),
                    ]
                ],
                colWidths=[330, 222],
            )
            table.hAlign = "LEFT"

            table.setStyle(
                TableStyle(
                    [
                        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ]
                )
            )

            content.append(table)

            for point in exp.get("description", []):

                content.append(Paragraph(f"• {point}", styles["BodyText"]))

            content.append(Spacer(1, 4))

    projects = ai_resume.get("projects", [])

    if projects:

        add_section_heading(content, styles, "PROJECTS")

        for project in projects:

            content.append(
                Paragraph(
                    f"<b>{project.get('project_name','')}</b>", styles["BodyText"]
                )
            )

            for point in project.get("description", []):

                content.append(Paragraph(f"• {point}", styles["BodyText"]))

            content.append(Spacer(1, 4))

    education = ai_resume.get("education", [])

    if education:

        add_section_heading(content, styles, "EDUCATION")

        for edu in education:

            table = Table(
                [
                    [
                        Paragraph(f"<b>{edu.get('degree','')}</b>", styles["BodyText"]),
                        Paragraph(edu.get("duration", ""), styles["BodyText"]),
                    ]
                ],
                colWidths=[330, 222],
            )
            table.hAlign = "LEFT"

            table.setStyle(
                TableStyle(
                    [
                        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                        ("TOPPADDING", (0, 0), (-1, -1), 0),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                    ]
                )
            )

            content.append(table)

            content.append(Paragraph(edu.get("institution", ""), styles["BodyText"]))

            cgpa = edu.get("cgpa", "")

            if cgpa:

                content.append(Paragraph(f"CGPA: {cgpa}", styles["BodyText"]))

            content.append(Spacer(1, 4))

    add_section_heading(content, styles, "SKILLS")

    skills = ai_resume.get("skills", {})

    for category, value in skills.items():

        if not value:
            continue

        content.append(Paragraph(f"<b>{category}:</b> {value}", styles["BodyText"]))

    certifications = ai_resume.get("certifications", [])

    if certifications:

        add_section_heading(content, styles, "CERTIFICATIONS")

        for cert in certifications:

            table = Table(
                [
                    [
                        Paragraph(cert.get("title", ""), styles["BodyText"]),
                        Paragraph(cert.get("date", ""), styles["BodyText"]),
                    ]
                ],
                colWidths=[440, 112],
            )
            table.hAlign = "LEFT"

            table.setStyle(
                TableStyle(
                    [
                        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                        ("TOPPADDING", (0, 0), (-1, -1), 0),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                    ]
                )
            )

            content.append(table)

    additional_sections = ai_resume.get("additional_sections", [])

    for section in additional_sections:

        section_content = []

        add_section_heading(
            section_content, styles, section.get("section_name", "ADDITIONAL").upper()
        )

        items = section.get("content", [])

        if section.get("section_name", "").lower() == "languages":

          section_content.append(Paragraph(", ".join(items), styles["BodyText"]))

        else:

         for item in items:

            section_content.append(Paragraph(f"• {item}", styles["BodyText"]))

        content.append(KeepTogether(section_content))

    doc.build(content)
