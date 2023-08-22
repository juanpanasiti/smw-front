#!/bin/bash

# Hacer git pull
git pull

# Instalar dependencias de Node.js
npm install

# Ejecutar el build (proyecto de React)
npm run build

# Verificar si se creó la carpeta dist para continuar el deploy
if [ -d "dist" ]; then
  # Verificar si hay un proceso ocupando el puerto 5173
  pm2 delete rda-front

  # Eliminar la carpeta "prod" si existe
  if [ -d "prod" ]; then
    rm -r prod
  fi

  # Renombrar la carpeta "build" a "prod"
  mv dist prod

  pm2 serve prod 5173 --name "rda-front" --spa  
fi