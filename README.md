# API SOLID

API developed following SOLID principles and Clean Architecture.

## 🚀 Technologies

- Node.js 24+
- TypeScript
- PostgreSQL
- Prisma ORM
- Fastify
- Docker
- Zod (data validation)

## 📋 Prerequisites

- Node.js 24 or higher
- Docker and Docker Compose
- pnpm (recommended) or npm/yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository].git
   cd api-solid
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=dev
   PORT=3333
   DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
   ```

4. **Start the database with Docker**
   ```bash
   docker compose up -d
   ```

## 🗄️ Database

### Create a new migration
```bash
npx prisma migrate dev --name migration_name
```

### Apply existing migrations
```bash
npx prisma migrate deploy
```

### Generate Prisma Client
```bash
npx prisma generate
```

## 🚀 Running the Application

### Development Mode
```bash
pnpm dev
# or
npm run dev
```

### Production Mode
1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the server:
   ```bash
   pnpm start
   ```

## 🛑 Stopping the Application

To stop Docker containers:
```bash
docker compose down
```

## 📦 Project Structure

```
api-solid/
├── src/
│   ├── http/          # Routes and controllers
│   ├── modules/       # Application modules
│   ├── shared/        # Shared code
│   └── server.ts      # Server configuration
├── prisma/
│   ├── migrations/    # Database migrations
│   └── schema.prisma  # Prisma schema
├── .env               # Environment variables
└── docker-compose.yml # Docker configuration
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name]