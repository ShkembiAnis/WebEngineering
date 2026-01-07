# Wildlife Website - Angular Project

This project has been migrated from Vite to Angular CLI.

## Project Structure

The application is organized into the following Angular components:

- **BearsComponent** (`src/app/bears/`) - Fetches and displays bear species data from Wikipedia API
- **SearchComponent** (`src/app/search/`) - Provides search functionality with text highlighting
- **CommentFormComponent** (`src/app/comment-form/`) - Allows users to add comments
- **CommentsToggleComponent** (`src/app/comments-toggle/`) - Toggles comment section visibility
- **AppComponent** (`src/app/app.component.ts`) - Main application component that integrates all other components

## Running the Application

### Development Server

Run `npm start` or `npm run dev` to start the development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project for production. The build artifacts will be stored in the `dist/` directory.

Run `npm run build:prod` for a production build with optimizations.

## Features

All original functionality has been preserved:

- **Search**: Search for text within the article with highlighted results
- **Bear Gallery**: Dynamic loading of bear species from Wikipedia
- **Comments**: Add and view comments with form validation
- **Toggle Comments**: Show/hide the comments section
- **Responsive Layout**: All original styles maintained

## Technical Details

- Angular 17 with standalone components
- TypeScript for type safety
- Preserved all original CSS styles
- Media files located in `src/assets/`
- Form validation with Angular Forms module

## Scripts

- `npm start` - Start development server
- `npm run dev` - Alias for start
- `npm run build` - Build for production
- `npm run build:prod` - Build for production with optimizations
- `npm run watch` - Build and watch for changes
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

