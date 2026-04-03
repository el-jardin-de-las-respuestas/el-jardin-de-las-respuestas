# ----------------------------------------------------
# Etapa 1: Builder (Usa pnpm para instalar y compilar)
# ----------------------------------------------------
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN npx prisma generate
RUN pnpm run build
# ----------------------------------------------------
# Etapa 2: Runner (Entorno de Ejecución)
# ----------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 4000
CMD ["node", "dist/main.js"]
