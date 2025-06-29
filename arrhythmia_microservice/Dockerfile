# Dockerfile per FastAPI + Python 3.12
FROM python:3.12.3-slim

WORKDIR /app

# Dipendenze Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia codice sorgente
COPY . .

#caricamento del file che contiene i paramteri del modello
COPY best_model_with_both_leads.pth /app/best_model_with_both_leads.pth

# Avvia FastAPI con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
