# Usa l'immagine base di Node.js
FROM node:18

# Imposta la directory di lavoro all'interno del container
WORKDIR /opt/my-app

# Copia i file di configurazione e le dipendenze
COPY package.json package-lock.json ./

# Installa le dipendenze
RUN npm install
RUN npm install -g @expo/ngrok

# Copia il resto del codice sorgente
COPY . .

# Esponi la porta 19000 (porta predefinita per Expo)
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Comando per avviare l'applicazione
CMD ["npm", "start", "--tunnel"]
