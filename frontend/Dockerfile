#
# Frontend multi-stage Dockerfile
#
# Targets:
# - dev   : Angular dev server (hot reload)
# - build : produces production build artifacts in /app/dist
# - nginx : serves build artifacts via Nginx
#

FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .


FROM base AS dev
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200"]


FROM base AS build
RUN npm run build:prod


FROM nginx:1.27-alpine AS nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


