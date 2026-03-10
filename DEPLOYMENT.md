# Deployment

## Frontend: Vercel

- Root directory: `Frontend/smart-service-booking`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://YOUR-BACKEND-URL.onrender.com`

## Backend: Render

- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGO_URI=...`
  - `JWT_SECRET=...`
  - `CLIENT_URLS=https://YOUR-FRONTEND-URL.vercel.app`

## Notes

- Update `CLIENT_URLS` after your Vercel URL is created.
- If you use a custom domain, add that domain to `CLIENT_URLS` too.
- Existing local development still works because the frontend falls back to `http://localhost:5000`.
