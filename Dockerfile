
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

# Mettre à jour les paquets Alpine, dont les correctifs de sécurité
RUN apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
