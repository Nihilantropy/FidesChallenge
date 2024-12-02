# Usa un'immagine Python come base
FROM python:3.9-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di requirements e installa le dipendenze
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copia il file tts_server.py nell'immagine
COPY tts_server.py .

# Espone la porta 5000 per Flask
EXPOSE 5001

# Comando per avviare l'app
CMD ["python", "tts_server.py"]