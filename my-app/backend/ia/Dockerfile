# Usa un'immagine di base con Python
FROM python:3.9-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file Python e il file di requirements nella directory di lavoro
COPY ia.py /app/ia.py

# Installa le librerie necessarie
RUN pip install --no-cache-dir flask flask_cors transformers torch

# Espone la porta 5000 per Flask
EXPOSE 5001

# Avvia l'app Flask
CMD ["python", "ia.py"]