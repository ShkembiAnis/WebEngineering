import { initSearch } from './search.js';
import { initCommentsToggle } from './commentsToggle.js';
import { initCommentForm } from './commentForm.js';
import { initBears } from './bears.js';

console.log('Initializing modules...');

try {
  initSearch();
  initCommentsToggle();
  initCommentForm();
  initBears();
  console.log('Module initialization complete');
} catch (error) {
  console.error('Error initializing modules:', error);
  alert('Some features may not work properly. Please refresh the page.');
}
