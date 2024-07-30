# Usa la imagen base de Node.js más reciente
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Copia el archivo .env
COPY .env .env

# Expone el puerto que la aplicación usa
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]