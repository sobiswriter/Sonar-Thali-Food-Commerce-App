# Sonar Thali Food Commerce App

A premium, royal-themed food commerce web experience built with React + TypeScript.  
The app combines dine-in discovery and delivery ordering flows with immersive UI sections for menu exploration, reservations, services, and customer feedback.

## Highlights

- Multi-section single-page experience (Home, Menu, Gallery, Reservations, Ambience, Delivery, Banquets, Reviews)
- Interactive menu with category filters, dietary filters, search, and item detail modal
- Delivery cart drawer with quantity updates, checkout flow, and live-style order progress tracker
- Reservation workflow with booking confirmation and “My Reservations” management
- Community review wall with ratings, mood tags, and live submissions
- Theme mode toggle and optional ambient audio controls
- Local persistence for reservations and reviews via `localStorage`

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling/UI:** Tailwind CSS, Lucide React icons, Motion
- **Tooling:** TypeScript compiler (`tsc`) for lint/type checks

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development

```bash
npm run dev
```

The app runs on `http://localhost:3000`.

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` — Start Vite dev server on port `3000`
- `npm run build` — Build production assets
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run TypeScript no-emit type checks
- `npm run clean` — Remove generated output (`dist`)

## Environment Variables

Copy `.env.example` to `.env` and configure as needed:

- `GEMINI_API_KEY` — API key placeholder for Gemini integrations
- `APP_URL` — App base URL placeholder for hosted environments

## Project Structure

```text
src/
  components/      # UI sections and interactive feature components
  context/         # Global providers (theme state)
  data/            # Mock dataset for menu, seating, and reviews
  App.tsx          # Main page router/state orchestration
  main.tsx         # Application entry point
  types.ts         # Shared TypeScript domain types
```

## Notes

- This project currently uses mock/local data flows for commerce, reservations, and reviews.
- It is ideal as a portfolio-ready frontend foundation for a real restaurant ordering platform.
