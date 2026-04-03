# ----------------------------------------------------
# Etapa 1: Builder (Usa pnpm para instalar y compilar)
# ----------------------------------------------------
# Usamos Node 20, la versión LTS actual y compatible con NestJS 11
FROM node:20-alpine AS builder

# Instala pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copia los archivos de manifiesto y bloqueo (CRUCIAL para pnpm)
COPY package.json pnpm-lock.yaml ./

# Instala todas las dependencias
RUN pnpm install

# Copia el resto del código y genera los archivos de Prisma
COPY . .
RUN npx prisma generate
RUN pnpm run build

# ----------------------------------------------------
# Etapa 2: Runner (Entorno de Ejecución)
# ----------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Instala librerías necesarias para Prisma + Postgres SSL
RUN apk add --no-cache openssl libc6-compat

# Copia los archivos necesarios del stage anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4000

# Comando de inicio
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
