export const initCommentsToggle = (): void => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');

  if (showHideBtn === null || commentWrapper === null) {
    console.error('Comments toggle elements not found!');
    return;
  }

  const buttonElement = showHideBtn as HTMLElement;
  const wrapperElement = commentWrapper as HTMLElement;

  wrapperElement.style.display = 'none';

  buttonElement.addEventListener('click', () => {
    try {
      const showHideText = buttonElement.textContent ?? '';
      if (showHideText === 'Show comment' || showHideText === 'Show comments') {
        buttonElement.textContent = 'Hide comments';
        wrapperElement.style.display = 'block';
      } else {
        buttonElement.textContent = 'Show comments';
        wrapperElement.style.display = 'none';
      }
    } catch (error) {
      console.error('Error toggling comments:', error);
      alert('Comment toggle failed. Please refresh the page.');
    }
  });
};
