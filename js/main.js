import { initSearch } from './search.js';
import { initCommentsToggle } from './commentsToggle.js';
import { initCommentForm } from './commentForm.js';
import { initBears } from './bears.js';

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing modules...');
  
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
});

