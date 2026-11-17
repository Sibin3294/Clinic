# My Clinic

Monorepo with a public Angular website and a Node.js + MongoDB admin API.

```
Clinic/
  frontend/   Angular public site + hidden admin UI
  backend/    Express API + MongoDB
  render.yaml Render Blueprint (static site + API)
```

## Prerequisites

- Node.js 22.22.3+ (see `frontend/.nvmrc`)
- MongoDB running locally on `27017` (or MongoDB Atlas)

## Backend

```bash
cd backend
cp .env.example .env   # if needed
npm install
npm run seed
npm run dev
```

API: http://127.0.0.1:4000

Default admin:

- Email: `myclinic@gmail.com`
- Password: `myclinic@123`

## Frontend

```bash
cd frontend
npm install
npm start
```

Site: http://127.0.0.1:4200  
Admin: http://127.0.0.1:4200/admin/login

Dev server proxies `/api` to the backend.

## What admin can manage

- Banners (home slideshow), including image upload
- Doctors
- Services
- Clinic profile (hours, contact, departments)
- Enquiries from the contact form

Uploaded images are stored in `backend/uploads` and served at `/uploads/...`.

Public visitors can browse and submit enquiries without logging in. Admin links are not shown in the public navigation.

## Deploy on Render

Render hosts the **static website** (`clinic-web`) and **API** (`clinic-api`). MongoDB is not provided by Render — use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier is fine).

### 1. Put the project on GitHub

This folder is not a Git repo yet. From the project root:

```bash
git init
git add .
git commit -m "Prepare My Clinic for Render"
# create a GitHub repo, then:
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

### 2. Create MongoDB Atlas

1. Create a free cluster
2. Allow network access from anywhere (`0.0.0.0/0`) for Render
3. Create a database user
4. Copy the connection string (include a database name, e.g. `/clinic`)

### 3. Apply the Blueprint

1. Open: https://dashboard.render.com/blueprint/new?repo=https://github.com/<you>/<repo>
2. Fill secrets when prompted:
   - `MONGODB_URI`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
3. Click **Apply**

### 4. After deploy

- Public site: `https://clinic-web-q002.onrender.com`
- Admin: `https://clinic-web-q002.onrender.com/admin/login`
- API health: `https://clinic-api-26as.onrender.com/api/health`

If Render gives the API a different hostname, update `frontend/src/environments/environment.prod.ts` (`apiOrigin`) and redeploy `clinic-web`.

**Note:** On the free API plan, uploaded images live on an ephemeral disk and can be lost on redeploy. For lasting uploads, upgrade the API service and attach a persistent disk, or move media to object storage later.
