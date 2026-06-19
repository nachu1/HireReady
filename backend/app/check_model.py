import google.generativeai as genai

genai.configure(api_key="AQ.Ab8RN6LT5S1CdiSENEjbGfVF6-nMPGCkB8a1Ei7LZUgHiAzmcQ")

for model in genai.list_models():
    print(model.name)