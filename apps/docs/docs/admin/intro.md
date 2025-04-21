# Admin - Backend API

The **Backend** powers the Magnetic platform by handling data storage, authentication, business logic, and integrations.

## Stack

- **Node.js** 18.17.1
- **Prisma ORM**
- **PostgreSQL**
- **REST API**
- **Nx** monorepo tools
- **TypeScript**
- **SWC** (compiler)
- **Vitest** & **Jest** for testing

## Responsibilities

- User and session management via `next-auth`
- Booking creation, updates, and cancellation
- Payment gateway integration (`redsys-api`)
- File uploads with AWS S3 SDK
- Email notifications via `nodemailer`
- Data validation and logging
- Auth-protected routes with `jsonwebtoken`
- Integration with external calendar systems (`ical`)
- Database migrations and seeding using Prisma CLI

## Development

### Scripts

- `dev:app`: Start backend app in dev mode using Nx
- `build`: Build all projects using Nx
- `prisma:migrate`: Run local database migrations
- `prisma:studio`: Open Prisma Studio
- `prisma:seed`: Seed the database using a custom script
- `prisma:format`: Format Prisma schema

### Tooling

- **ESLint** with custom configuration and plugins
- **Prettier** for formatting
- **SWC** for fast TypeScript transpilation
- **Vitest** + **Jest** for flexible testing
- **TSX** for streamlined script execution
- **TailwindCSS** + **DaisyUI** for admin interfaces

## Architecture Notes

- All modules communicate via the central API layer.
- Routes are organized by domain responsibility.
- Prisma is used as the single source of truth for database schema.
- Secured endpoints require JWT-based authentication.
- Nx workspace enables modular project structure and dependency boundaries.
- Multiple apps (`admin`, `client`, `docs`) are orchestrated via Nx.

## Dependencies Highlights

| Feature              | Package                         |
| -------------------- | ------------------------------- |
| File Uploads         | `@aws-sdk/client-s3`            |
| Authentication       | `next-auth`, `jsonwebtoken`     |
| ORM                  | `@prisma/client`, `prisma`      |
| Email                | `nodemailer`                    |
| Payments             | `redsys-api`, `node-redsys-api` |
| Calendar Integration | `ical`                          |
| Utility & Security   | `bcrypt`, `uuid`, `js-cookie`   |

---

> ℹ️ For local development, ensure you have Node `18.17.1` and PostgreSQL running.
