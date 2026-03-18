# DevNest

A React micro-projects workspace. DevNest is a single React application that contains multiple mini-projects, demonstrating scalable folder structure, component composition, and React Router navigation.

## Features

- Multiple mini-projects in one workspace
- Client-side routing with React Router
- Tailwind CSS for styling
- Vite for fast development
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 16+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```text
src/
|- pages/      # Main pages
|- projects/   # Mini-project components
`- data/       # Project metadata and static JSON
```

## Mini-Projects

- **Prayer Time Finder** - Find prayer times based on location
- **Daily Hadith** - Daily Islamic teachings with date mapping and calendar selection

## GitHub Push Setup

```bash
git init -b main
git remote add origin https://github.com/dev-rehman220/DevNest.git
git add .
git commit -m "Initial DevNest setup"
git push -u origin main
```

If `origin` already exists, run:

```bash
git remote set-url origin https://github.com/dev-rehman220/DevNest.git
```

## Vercel Deployment

This project is ready for Vercel deployment and includes `vercel.json` with a rewrite to `index.html` so React Router routes like `/projects` and `/projects/:id` work correctly.

### Deploy with Vercel Dashboard

1. Push this project to GitHub.
2. Go to Vercel and import `dev-rehman220/DevNest`.
3. Keep defaults:
4. Framework Preset: `Vite`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click Deploy.

### Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```
