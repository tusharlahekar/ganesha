# Deployment Guide

## Backend (AWS ECS / Render)

1. Provision a PostgreSQL database.
2. Set environment variables (see `backend/.env.example`).
3. Build and deploy the backend:

```bash
cd backend
npm install
npm run seed
npm start
```

4. Configure CORS and security groups to allow frontend access.

## Frontend (Vercel)

1. Import the `frontend/` directory into Vercel.
2. Set `NEXT_PUBLIC_API_URL` to your backend URL.
3. Enable Image Optimization for Unsplash.

## CDN & Performance

- Upload murti images to Cloudinary or AWS S3.
- Add a CDN distribution (CloudFront) for assets.
- Ensure lazy loading and compression are enabled.

## Payments (Razorpay)

- Add Razorpay keys to backend environment.
- Use `/api/payments/razorpay-order` as a starter endpoint.

## Database

- Run `backend/db/schema.sql` for schema.
- Run `backend/db/seed.sql` for 1000+ murti records.
