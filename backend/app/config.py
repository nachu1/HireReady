import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

print("Gemini Key:", GEMINI_API_KEY[:10] if GEMINI_API_KEY else "NOT FOUND")