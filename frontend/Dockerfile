# Usa una imagen de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación
RUN npm run build

# Sirve la aplicación estática con un servidor (como Nginx) o similar
# Por ejemplo:
EXPOSE 80

# Usa serve para servir la app (opcional, podrías usar nginx o otro)
CMD ["npx", "serve", "-s", "build"]
