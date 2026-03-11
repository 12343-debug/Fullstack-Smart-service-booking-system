# Smart Service Booking Frontend

Frontend client for the Smart Service Booking System built with React, Vite, Material UI, and React Router.

## Features

- Responsive landing page and service discovery flow
- User login and registration
- Admin login and admin registration mode using the same auth screens
- Protected user routes for services and bookings
- Protected admin routes for dashboard and service management
- Booking creation, tracking, editing, rescheduling, and cancellation
- Toast-based status feedback and animated success screens

## Tech Stack

- React 19
- Vite
- Material UI
- React Router
- Axios
- Framer Motion

## Development

From this directory:

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Environment Variable

Optional `.env` value:

```env
VITE_API_BASE_URL=http://localhost:5000
```

If this variable is not set, the frontend falls back to `http://localhost:5000`.

## Important Routes

- `/home`
- `/login`
- `/register`
- `/services`
- `/bookings`
- `/admin/login`
- `/admin/register`
- `/admin`

## Notes

- Admin registration requires the backend `ADMIN_SETUP_KEY` to be configured.
- For full-stack setup and deployment details, see the root [README](../../README.md) and [DEPLOYMENT.md](../../DEPLOYMENT.md).

## Demo Assets To Add

- Frontend live URL
- Short demo video
- Screenshots of home, services, bookings, and admin dashboard
