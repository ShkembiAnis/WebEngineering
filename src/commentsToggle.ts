export const initCommentsToggle = (): void => {
  const showHideBtn = document.querySelector('.show-hide')!;
  const commentWrapper = document.querySelector('.comment-wrapper')!;

  if (!showHideBtn || !commentWrapper) {
    console.error('Comments toggle elements not found!');
    return;
  }

  commentWrapper.style.display = 'none';

  showHideBtn.addEventListener('click', () => {
    try {
      const showHideText = showHideBtn.textContent || '';
      if (showHideText === 'Show comment' || showHideText === 'Show comments') {
        showHideBtn.textContent = 'Hide comments';
        commentWrapper.style.display = 'block';
      } else {
        showHideBtn.textContent = 'Show comments';
        commentWrapper.style.display = 'none';
      }
    } catch (error) {
      console.error('Error toggling comments:', error);
      alert('Comment toggle failed. Please refresh the page.');
    }
  });
};
