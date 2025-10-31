# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /index

# Copiar archivos del backend
COPY package*.json ./
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto del backend
EXPOSE 4000

# Comando de inicio
CMD ["npm", "run", "dev"]
