# main.py
from fastapi import FastAPI
from pydantic import BaseModel, Field
from classifier import classify_text

app = FastAPI(title="Issue Classifier Service")

class Issue(BaseModel):
    title: str = Field(..., min_length=1, description="Título del issue")
    description: str = Field(..., min_length=1, description="Descripción del issue")

@app.post(
    "/classify",
    summary="Clasifica un issue",
    description="Recibe el título y la descripción de un issue y retorna etiquetas automáticas basadas en reglas simples."
)
def classify(issue: Issue):
    text = issue.title + " " + issue.description
    tags = classify_text(text)
    return {"tags": tags}
