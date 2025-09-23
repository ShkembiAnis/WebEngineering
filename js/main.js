import { initSearch } from './search.js';
import { initCommentsToggle } from './commentsToggle.js';
import { initCommentForm } from './commentForm.js';
import { initBears } from './bears.js';
 
  try {
    initSearch();
    initCommentsToggle();
    initCommentForm();
    initBears();
  } catch (error) {
    console.error('Error initializing modules:', error);
    alert('Some features may not work properly. Please refresh the page.');
  }