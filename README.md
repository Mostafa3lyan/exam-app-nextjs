# Exam App

A responsive Next.js exam platform built with the App Router. This project includes diploma browsing, exam flows, user authentication, account settings, and a responsive navigation experience tailored for desktop and mobile.

## Features

- Diploma listing and exam navigation
- User authentication: login, register, forgot password, reset password
- Account settings with profile and change password screens
- Responsive desktop sidebar and mobile drawer navigation
- Touch-friendly mobile layout for auth and account pages
- Shared UI components with Tailwind CSS and Radix primitives

## Tech Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- NextAuth for authentication
- TanStack React Query for data fetching
- Radix UI components
- lucide-react icons

## Project Structure

- `src/app/` - application routes and layout structures
  - `/(main)` - main authenticated pages and dashboard
  - `/(auth)` - authentication pages and auth layout
  - `/(main)/account` - account management pages and sidebar
- `src/components/layout/` - layout-level header/sidebar/auth components
- `src/components/ui/` - shared UI building blocks and sidebar provider
- `src/hooks/` - reusable hooks like mobile breakpoint detection
- `src/services/` - API and data fetching services

## Routes Overview

- `/` - diplomas listing page
- `/[id]` - diploma details and exams list
- `/exams/[id]` - exam session / exam details
- `/account` - user profile page
- `/account/change-password` - change password page
- `/login` - login page
- `/register` - registration page
- `/forgot-password` - password recovery page
- `/reset-password` - reset password page

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build and Production

Build the app for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Linting

Run the linter:

```bash
npm run lint
```
