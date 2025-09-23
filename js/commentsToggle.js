export function initCommentsToggle() {
  var showHideBtn = document.querySelector('.show-hide');
  var commentWrapper = document.querySelector('.comment-wrapper');

  if (!showHideBtn || !commentWrapper) return;

  commentWrapper.style.display = 'none';

  showHideBtn.onclick = function() {
    var showHideText = showHideBtn.textContent;
    if (showHideText === 'Show comment') {
      showHideBtn.textContent = 'Hide comments';
      commentWrapper.style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      commentWrapper.style.display = 'none';
    }
  };
} 