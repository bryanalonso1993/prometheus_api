# VERSION DE NODE
FROM node:16.10.0
# CREAR DIRECTORIO DE LA APLICACION
WORKDIR /usr/src/node
# COPIAR EL PACKAGE JSON
COPY package*.json ./
# actualizar npm
RUN npm install -g npm@8.19.2
# INSTALAR TYPESCRIPT
RUN npm install -g typescript
# INSTALAR LAS DEPENDENCIAS DEL PROYECTO
RUN yarn
# copiar el proyecto
COPY . .
# exponer el puerto de la aplicacion
EXPOSE 5050
# run application
CMD ["yarn", "start"]
# docker run -d -p5050:5050 --network="red_interna" --name="prometheus_api" api/api_prometheus:latest
# docker build -t api/api_prometheus:latest .