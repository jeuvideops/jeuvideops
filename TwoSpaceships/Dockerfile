# ── Stage 1 : Build ────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build --ignore-scripts

# ── Stage 2 : Serve ────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist/min/index.html /usr/share/nginx/html/index.html
EXPOSE 80
