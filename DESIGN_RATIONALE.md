# Design Rationale

## Architecture & Technology Decisions

### React Query for State Management
I chose React Query over simpler state management because it provides built-in caching, automatic refetching, and excellent loading/error state handling. This prevents unnecessary API calls when revisiting citations. The trade-off is added complexity, but the developer experience and performance benefits justify it.

### Component Architecture
The application follows a modular structure: **BriefViewer** handles markdown rendering, **DetailPanel** manages citation details, and **VerificationSummary** provides statistics. This separation allows each component to manage its own lifecycle, improving maintainability. Citation selection state lives in App.tsx—simple enough for current scope.

### Markdown Rendering Strategy
I used `react-markdown` with `rehype-raw` to render markdown while embedding citation spans as HTML. The `contentToMarkdownWithCitationSpans` utility converts `[[CITATION:n]]` markers into `<span>` elements with data attributes. This preserves markdown formatting while enabling interactive citations.

## UI/UX Decisions

### Slide-In Detail Panel
Instead of an always-visible sidebar, I implemented a slide-in panel that appears from the right when a citation is clicked. This maximizes screen real estate for brief content—critical for legal documents—while providing detailed information on demand.

### Color-Coded Severity System
Citations are visually distinguished by severity (valid/warning/critical) using semantic colors defined in Tailwind config. This allows lawyers to quickly scan for problematic citations. Colors use HSL variables for easy theme customization, supporting future dark mode.

### Comprehensive State Handling
Every data-fetching component has dedicated loading, error, and empty states. This provides clear feedback during async operations—essential for building trust in a legal tool.

### Typography & Spacing
I used a serif font stack optimized for legal prose readability, with generous spacing and a max-width container to prevent eye strain. The `legal-prose` class ensures proper line height and paragraph spacing for dense legal text.

## Trade-Offs Considered

**Performance vs. Features**: I prioritized core functionality and polish over advanced features like keyboard navigation or citation filtering. React Query's caching helps performance without additional optimization work.

**Simplicity vs. Flexibility**: The current architecture is straightforward but could be more flexible. Citation selection state in App.tsx is sufficient for MVP, avoiding over-engineering.

**Mock API vs. Real Integration**: The mock API service simulates network delays and error cases, allowing testing without backend infrastructure. The service layer is abstracted, making real API integration straightforward.

## What I Would Do With More Time

**Accessibility**: Add full keyboard navigation (arrow keys, Enter, Escape), ARIA labels, and screen reader support.

**Performance**: Implement virtual scrolling for very long briefs, memoization for expensive markdown parsing, and code splitting for faster initial load.

**Enhanced Interactions**: Add citation filtering by severity, search functionality, and a citation list sidebar for quick navigation.

**Testing**: Add unit tests for utility functions, integration tests for component interactions, and visual regression tests.

**Real API Integration**: Replace the mock API with proper error handling, retry logic, and request cancellation.

## Conclusion

The design prioritizes clarity, performance, and user trust—essential for legal professionals working under deadline pressure. The architecture balances simplicity with extensibility, allowing future enhancements without major refactoring.
