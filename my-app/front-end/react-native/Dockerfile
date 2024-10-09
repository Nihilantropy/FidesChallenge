# Usa un'immagine di Node.js con una versione specifica
FROM node:20.17-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di dipendenza (package.json e package-lock.json) nell'immagine
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia tutto il contenuto del progetto nella directory di lavoro
COPY . .

# Esponi le porte utilizzate da Expo
EXPOSE 19000 19001 19002

# Avvia Expo in modalità non interattiva con --tunnel
CMD ["npx", "expo", "start", "--tunnel"]
