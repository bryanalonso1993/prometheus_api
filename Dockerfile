# VERSION DE NODE
FROM node:16.10.0
# CREAR DIRECTORIO DE LA APLICACION
WORKDIR /usr/src/node
# COPIAR EL PACKAGE JSON
COPY package*.json ./
# INSTALAR YARN
CMD npm install --global yarn
# INSTALAR TYPESCRIPT
CMD npm install -g typescript
# INSTALAR LAS DEPENDENCIAS DEL PROYECTO
CMD yarn
# copiar el proyecto
COPY . .
# exponer el puerto de la aplicacion
EXPOSE 5050
# run application
CMD ["yarn", "start"]
