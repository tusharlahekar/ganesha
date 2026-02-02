# ganesha

## Step-by-step build plan

### 1) Database schema

The SQLite schema lives in `db/schema.sql` with tables for categories, products, orders, and order items.
Seed data is in `db/seed.sql`.

### 2) Backend APIs

The Node/Express server in `server.js` boots the database and exposes APIs:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/orders`
- Admin: `GET /api/admin/orders`, `GET/POST/PATCH/DELETE /api/admin/products`

### 3) Frontend pages

Static assets are in `public/`:

- `public/index.html` renders the storefront.
- `public/app.js` fetches products and submits orders.

### 4) Admin dashboard

- `public/admin.html` contains the admin dashboard UI.
- `public/admin.js` manages products and shows orders.

### 5) Deployment

See `docs/deployment.md` for local and Docker deployment steps.

## Local development

```bash
npm install
npm start
```

Visit:
- Storefront: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin.html
