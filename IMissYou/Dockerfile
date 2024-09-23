# Usa l'immagine ufficiale di Node.js 20 come base
FROM node

# Imposta la directory di lavoro dell'applicazione
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json per installare le dipendenze
COPY package*.json ./

RUN npm cache clean --force

# Installa le dipendenze
RUN npm install

# Copia tutti i file del progetto
COPY . .

# Espone la porta 19000 per Expo, 19001 per debugging e 19002 per DevTools
EXPOSE 19000 19001 19002

# Comando di avvio dell'app Expo
CMD ["npm", "start"]

