# Shree Ganesh Murti Kala Kendra

Premium fullstack storefront for Ganpati murtis with a luxury Indian theme.

## Folder structure

```
backend/    # Node.js + Express API + PostgreSQL schema
frontend/   # Next.js + Tailwind CSS storefront and admin UI
```

Legacy single-file SQLite/Express assets have been removed in favor of the split backend/frontend architecture.

## Features

- Traditional Indian + modern luxury UI theme (saffron, maroon, gold).
- Home, product listing, product detail, cart, checkout, admin, about, contact pages.
- Lazy loaded product listing with filters and sorting.
- SEO schema markup for product pages.
- Admin tools for bulk CSV upload, inventory, pricing, analytics.

## Backend (Express + PostgreSQL)

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm start
```

Backend runs on `http://localhost:4000`.

## Frontend (Next.js + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Deployment

See `docs/deployment.md` for AWS/Vercel setup, database provisioning, and CDN guidance.
