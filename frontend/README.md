# Wildlife Website - Angular Frontend

Angular 17 application for the Wildlife Website.

## Technology Stack

- **Angular 17** (Standalone Components)
- **TypeScript**
- **RxJS** for reactive programming
- **HttpClient** for API communication
- **Angular CLI** for development and build

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Main application component
│   │   ├── app.config.ts          # Application configuration & providers
│   │   ├── bears/                 # Bears component (Wikipedia API)
│   │   ├── comment-form/          # Comment form component
│   │   ├── comments-toggle/       # Comments toggle component
│   │   └── search/                # Search functionality component
│   ├── assets/                    # Static assets (images, audio)
│   ├── index.html                 # Main HTML file
│   ├── main.ts                    # Application bootstrap
│   └── styles.css                 # Global styles
├── angular.json                   # Angular workspace configuration
├── package.json                   # Node dependencies
├── tsconfig.json                  # TypeScript configuration
└── tsconfig.app.json              # App-specific TypeScript config
```

## Prerequisites

- Node.js 18+ and npm
- Angular CLI (optional, included as dev dependency)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm start
# or
npm run dev
```

Navigate to: http://localhost:4200/

The application will automatically reload when you change source files.

### 3. Build for Production

```bash
npm run build:prod
```

Build artifacts will be stored in the `dist/` directory.

## Available Scripts

- `npm start` - Start development server
- `npm run dev` - Alias for start
- `npm run build` - Build the project
- `npm run build:prod` - Production build with optimizations
- `npm run watch` - Build in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Type check without emitting files
- `npm run clean` - Remove dist folder

## Application Features

### Components

**Bears Component**
- Fetches bear data from Wikipedia API using Angular HttpClient
- Displays bear images, names, and information
- Handles image loading errors with placeholders

**Search Component**
- Real-time search functionality
- Highlights matching text in the article
- Uses native DOM manipulation for highlighting

**Comment Form Component**
- Form validation
- Two-way data binding with `[(ngModel)]`
- Component-scoped styles with Shadow DOM-like encapsulation

**Comments Toggle Component**
- Show/hide comments section
- Uses Angular template bindings
- Proper ARIA attributes for accessibility

### Configuration

**Providers (app.config.ts)**
- `provideZoneChangeDetection` - Optimized change detection
- `provideHttpClient` - HTTP client with fetch API

**Styles**
- Global styles in `src/styles.css`
- Component-scoped styles in component files
- Uses CSS custom properties (variables)

## Development

### Code Scaffolding

Generate a new component:
```bash
ng generate component component-name
```

### Hot Reload

Angular CLI's dev server supports hot module replacement. Changes to TypeScript, HTML, or CSS files will trigger automatic reloads.

### Linting and Formatting

The project uses ESLint and Prettier:

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Auto-fix linting errors
npm run format      # Format all files
```

### Type Checking

```bash
npm run type-check
```

## Connecting to Backend

The application is configured to connect to a Spring Boot backend:

**Backend URL:** `http://localhost:8080/api`

To connect components to the backend API:

1. Inject `HttpClient` in your component/service
2. Make HTTP requests to backend endpoints
3. Handle responses with RxJS observables

Example:
```typescript
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class MyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  getData() {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }
}
```

## Build Output

Production build creates optimized bundles:

- `main.js` - Application code
- `vendor.js` - Third-party libraries
- `polyfills.js` - Browser compatibility
- `runtime.js` - Webpack runtime
- `styles.css` - Compiled styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Further Help

- Angular Documentation: https://angular.io/docs
- Angular CLI: https://angular.io/cli
- RxJS: https://rxjs.dev/

## Migration Information

For details about the migration from Vite to Angular, see [MIGRATION-SUMMARY.md](../MIGRATION-SUMMARY.md) in the project root.

