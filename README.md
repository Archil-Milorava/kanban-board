# smti Inquiry Kanban Board

A modern, responsive Kanban interface for managing B2B hotel inquiries, built with Next.js 14 and Zustand.

1. **Install and run the app:**

Run `npm install --legacy-peer-deps && npm run dev` to install dependencies.

Or simply `npm run app` and wait untill everything is installed and app opens in browser


# Tech Stack
Next.js 14 (App Router)

State Management: Zustand (with Optimistic Updates)

Drag & Drop: @dnd-kit

Styling: Tailwind CSS v4

Icons: Lucide React

Date Handling: date-fns

## Key Features
Smooth Kanban Interaction: Drag and drop inquiries between 4 phases.

Horizontal Scrolling: Professional board layout that persists columns on smaller screens.

Filtering System: Debounced client search and potential value slider synced with URL parameters.

Detail View: Centered modal for deep-diving into inquiry notes and associated hotels.

Optimistic UI: Instant feedback on phase changes with background API synchronization and error rollback.
