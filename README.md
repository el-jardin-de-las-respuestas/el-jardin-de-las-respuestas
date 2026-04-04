# 🌸 El Jardín de las Respuestas

**El Jardín de las Respuestas** es una plataforma educativa y comunitaria digital que promueve la **Educación Sexual Integral (ESI)** y el **acompañamiento ginecológico gratuito**, en un entorno seguro, accesible e inclusivo.

---

## 💡 Descripción General

El proyecto busca democratizar el acceso a información confiable sobre salud sexual y reproductiva, conectando a usuarias con profesionales voluntarias y creando una comunidad basada en el respeto y la empatía.

---

## 🧩 Objetivos

- Brindar acceso gratuito a contenido educativo validado por profesionales.  
- Facilitar consultas anónimas con ginecólogas voluntarias.  
- Ofrecer un foro seguro para compartir experiencias.  
- Promover la inclusión, la salud y la educación digital.

---

## 🌐 Funcionalidades Principales

- **Biblioteca ESI:** Artículos, videos e infografías sobre cuerpo, género, relaciones, derechos y salud.  
- **Foro Comunitario:** Espacio de diálogo moderado, sin juicios.  
- **Consultorio Virtual:** Chat seguro entre usuarias y profesionales.  
- **Chatbot de IA:** Asistente para consultas frecuentes.  
- **Roles:** Administradora, Profesional y Usuaria (gestionados mediante Prisma).

---

## ⚙️ Tecnologías Utilizadas

| Capa | Tecnología |
|------|-------------|
| **Backend** | NestJS |
| **ORM** | Prisma |
| **Base de datos** | PostgreSQL |
| **Frontend** | React |
| **Autenticación** | JWT |
| **Contenedores** | Docker |

---

## 🗂️ Estructura de la Base de Datos (Prisma)

El modelo incluye las entidades principales:

- `User`, `Role`, `Professional`  
- `Forum`, `Post`, `Comment`  
- `Consultation`, `Message`, `Chat`  
- `Library`  

Las relaciones están diseñadas para garantizar integridad, privacidad y escalabilidad.

---

## 🚀 Guía de Inicio Rápido (Local)

Sigue estos pasos para levantar el proyecto en tu entorno local usando **pnpm**.

### 📋 Requisitos Previos

- **Node.js** (v18 o superior)
- **pnpm** (`npm install -g pnpm`)
- **PostgreSQL**

---

### 🔧 1. Configuración del Backend

1. Entra a la carpeta del backend e instala las dependencias:
   ```bash
   cd backend
   pnpm install
   ```
2. Configura las variables de entorno en un archivo `.env` dentro de `backend/`:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/jardindb"
   DIRECT_URL="postgresql://usuario:password@localhost:5432/jardindb"
   JWT_SECRET="tu_secreto_para_jwt"
   ADMIN_PASSWORD="password_para_el_admin_inicial"
   PORT=4000
   ```
3. Prepara la base de datos con Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed  # Esto carga la Biblioteca ESI, Roles y Foros
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   pnpm start:dev
   ```

---

### 🎨 2. Configuración del Frontend

1. Entra a la carpeta del frontend e instala las dependencias:
   ```bash
   cd frontend
   pnpm install
   ```
2. Configura la URL de la API en un archivo `.env` dentro de `frontend/`:
   ```env
   VITE_API_URL="http://localhost:4000"
   ```
3. Inicia el sitio en modo desarrollo:
   ```bash
   pnpm dev
   ```

---

## 🛠️ Comandos Útiles

- **Explorar Base de Datos:** `npx prisma studio` (desde `/backend`)
- **Actualizar Biblioteca:** Si modificas el seed, ejecuta `npx prisma db seed` para impactar los cambios.
- **Producción:** Para el build de frontend usa `pnpm build`.
