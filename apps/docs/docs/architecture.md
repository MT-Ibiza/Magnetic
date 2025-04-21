---
id: architecture
title: Architecture & Deployment
sidebar_position: 2
---

# Architecture & Deployment

The **Magnetic Travel Platform** is a modular web application designed to manage travel-related services and bookings. It consists of multiple apps and a centralized API backend.

---

---

## ⚙️ Tech Stack

- **Frontend**:
  - Admin Panel: React + Tailwind (served via NX)
  - Client App: React + Tailwind (served via NX)
- **Backend**:
  - NextJs - Node.js
  - Prisma ORM
  - PostgreSQL database
  - Nodemailer
  - Node-ical
- **Infrastructure**:
  - DigitalOcean App Service
  - Environment variables via `.env`
  - Deployment from Digital Ocean panel

---

## 🔐 Authentication

- Admin and client users are pre-registered by administrators.
- Each user is assigned a role (`admin` or `client`) and accesses the platform accordingly.
- Bookings and service interactions are linked to authenticated sessions.

---

# 📤 Deployment on DigitalOcean App Platform

To deploy the **Magnetic** platform using **DigitalOcean App Platform**, follow these steps:

## 1. Connect Repository

- Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps).
- Click **"Create App"**.
- Select **GitHub** as your source and choose the Magnetic repository.

## 2. Configure Services

The App Platform will auto-detect apps. Manually adjust if needed:

- `apps/admin`, `apps/client`, and `apps/docs`:
  - Set as **Static Sites** (for Vite/Next frontend) or **Web Services**.
- `apps/api`:
  - Set as a **Web Service** with Node.js 18+ runtime.

Make sure to define each app’s **root directory** correctly.

## 3. Add Environment Variables

For each service, add environment variables like:

- `DATABASE_URL`
- `NEXT_PUBLIC_*` values
- Any secret keys used in your `.env` files

You can manage these under **Settings > Environment Variables** per service.

## 4. Configure Build & Run Commands

Set the appropriate commands depending on the app:

### Example

- **Build Command:**

```bash
npx nx build <project-name>
```
