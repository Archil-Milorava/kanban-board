# Technical Decisions - smti Kanban Assessment

### 1. State Management: Zustand
I chose Zustand over Redux or React Context because of its minimal boilerplate and excellent performance. While I often use Jotai for atomic UI state in smaller side projects, Zustand's centralized approach is superior for a Kanban board where multiple columns need to stay in sync with a single data source. It is lightweight, scales well, and avoids the "Prop Drilling" issues common in standard React state.

### 2. Drag and Drop: @dnd-kit
I implemented **@dnd-kit** after researching several libraries. I chose it because it is modular, accessible, and provides excellent support for Sensors. This allowed me to implement a distance-based activation constraint, which ensures that user clicks (for opening the modal) are not "swallowed" by the drag-and-drop listeners.

### 3. URL-Driven Filtering
To ensure the application state is shareable and persists through refreshes, I synchronized the filters (Search, Min Value) with **URL Search Parameters**. This provides a better UX where users can bookmark a specific filtered view.

### 4. Resilience & Optimistic UI
- The UI reflects the move immediately for zero-latency.
- A background `PATCH` request is triggered.
- If the request fails, the store performs a **rollback** to the previous state and triggers a global error notification.
