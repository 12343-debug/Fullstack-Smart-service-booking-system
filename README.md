# Smart Service Booking System

A full-stack service marketplace application for booking home services such as cleaning, electrical repair, plumbing, and other doorstep support tasks.

## What This Project Demonstrates

- React frontend with route-based navigation and responsive UI
- Node.js and Express backend with MongoDB persistence
- JWT-based authentication and role-based authorization
- User booking flows: create, edit, reschedule, cancel, and track status
- Admin flows: manage services and review platform-wide bookings
- Deployment-ready frontend/backend configuration

## Tech Stack

- Frontend: React, Vite, Material UI, Framer Motion, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Deployment: Vercel for frontend, Render for backend

## Core Features

- User registration and login
- Separate admin login and admin registration flow
- Protected routes for users and admins
- Service catalog with pricing and duration
- Booking creation with date, slot, address, and map coordinates
- Booking dashboard with status progress, filtering, editing, cancellation, and rescheduling
- Admin dashboard for platform bookings
- Admin service management

## Project Structure

```text
Fullstack-Smart-service-booking-system/
├── Backend/
│   ├── index.js
│   ├── models/
│   ├── middler/
│   └── seedAdmin.js
├── Frontend/
│   └── smart-service-booking/
│       ├── src/
│       └── package.json
├── DEPLOYMENT.md
└── README.md
```

## Local Setup

### 1. Backend

From `Backend/`:

```bash
npm install
npm start
```

Required environment variables in `Backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SETUP_KEY=your_admin_setup_key
CLIENT_URLS=http://localhost:5173
```

### 2. Frontend

From `Frontend/smart-service-booking/`:

```bash
npm install
npm run dev
```

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Admin Access

- Admin login page: `/admin/login`
- Admin registration page: `/admin/register`
- Admin registration requires the same `ADMIN_SETUP_KEY` configured in the backend

You can also create or update an admin account from the backend directory:

```bash
npm run seed:admin -- "Admin Name" admin@example.com Admin@123
```

## Demo And Screenshots

- Live frontend: add your Vercel URL here
- Live backend: add your Render URL here
- Demo video: add your Loom or YouTube link here
- Screenshots to include:
  - Home page
  - Services booking flow
  - Bookings dashboard
  - Admin dashboard
  - Admin add-service screen

## API Highlights

- `POST /register`
- `POST /login`
- `GET /services`
- `POST /add-service` (admin only)
- `POST /book`
- `GET /bookings`
- `PUT /bookings/:id`
- `PUT /bookings/:id/reschedule`
- `PUT /bookings/:id/cancel`
- `GET /admin/bookings` (admin only)

## Current Improvement Areas

- Improve bundle splitting for the frontend build
- Move from demo-grade admin registration to a stricter provisioning flow
- Add real hosted demo links and screenshots for recruiter-facing presentation

## Why This Is A Good Portfolio Project

This project shows end-to-end product thinking: authentication, authorization, CRUD operations, protected admin functionality, deployment, and UI polish in a single working application. That makes it a strong project for internship applications when paired with a clear resume and a short demo.

## Resume Bullet Ideas

- Built a full-stack service booking platform using React, Express, and MongoDB with JWT-based authentication and role-based access for users and admins.
- Implemented booking lifecycle features including scheduling, status tracking, editing, cancellation, and rescheduling with slot-availability validation.
- Developed admin workflows for service management and platform-wide booking oversight, with protected routes and backend authorization checks.
- Designed and deployed a responsive frontend with Material UI and a Node.js backend configured for Vercel and Render environments.
- Wrote automated backend validation tests for auth-role handling and booking input normalization to improve reliability of critical service flows.
