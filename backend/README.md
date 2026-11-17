# Clinic API

Node.js + Express + MongoDB backend for My Clinic.

## Setup

```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```

API: `http://127.0.0.1:4000`

Default admin (from `.env`):

- Email: `myclinic@gmail.com`
- Password: `myclinic@123`

## Endpoints

Public

- `GET /api/health`
- `GET /api/clinic`
- `GET /api/banners`
- `GET /api/doctors`
- `GET /api/services`
- `POST /api/enquiries`
- `POST /api/auth/login`

Admin (Bearer token)

- `GET /api/auth/me`
- CRUD `/api/banners`, `/api/doctors`, `/api/services`
- `PUT /api/clinic`
- `GET|PATCH|DELETE /api/enquiries`
- `POST /api/uploads` (multipart field `image`) → `{ url: "/uploads/..." }`

Uploaded files are served from `/uploads`.
