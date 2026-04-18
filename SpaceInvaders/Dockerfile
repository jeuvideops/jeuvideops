# Stage 1: Build
# Parcel 1 pulls legacy native deps (e.g. deasync); Debian-based Node LTS is more reliable here.
FROM node:24-bookworm-slim AS builder
RUN apt-get update && apt-get install -y python3 make g++
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
