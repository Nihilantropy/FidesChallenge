# Usa un'immagine Python come base
FROM python:3.9-slim

# Imposta la directory di lavoro
WORKDIR /app

# Copia tutti i file
COPY . /app

RUN apt-get update && \
    apt-get install -y cron dos2unix && \
    echo "*/0 0 * * * sh /app/pulizia.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/your-cron-job && \
    echo "" >> /etc/cron.d/your-cron-job && \
    chmod 0644 /etc/cron.d/your-cron-job && \
    service cron start && \
    dos2unix /app/pulizia.sh && chmod +x /app/pulizia.sh && \
    pip install -r requirements.txt

# Espone la porta 5000 per Flask
EXPOSE 5000

# Comando per avviare l'app e il cron job
CMD ["python3", "tts_server.py"]