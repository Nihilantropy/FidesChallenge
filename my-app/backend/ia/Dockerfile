# Usa un'immagine Python come base
FROM python:3.9

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di requirements e installa le dipendenze
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copia il file app.py nell'immagine
COPY app.py .

# Espone la porta 5000 per Flask
EXPOSE 5001

# Comando per avviare l'app
CMD ["python", "app.py"]