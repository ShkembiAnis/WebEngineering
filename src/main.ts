import { initSearch } from './search.ts';
import { initCommentsToggle } from './commentsToggle.ts';
import { registerCommentFormComponent } from './commentForm.ts';
import { initBears } from './bears.ts';

console.log('Initializing modules...');

try {
  initSearch();
  initCommentsToggle();
  registerCommentFormComponent();
  initBears();
  console.log('Module initialization complete');
} catch (error) {
  console.error('Error initializing modules:', error);
  alert('Some features may not work properly. Please refresh the page.');
}

// testing pre commit hooks
