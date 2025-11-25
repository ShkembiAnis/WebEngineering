export const initCommentsToggle = (): void => {
  const showHideBtn = document.querySelector<HTMLButtonElement>('.show-hide');
  const commentWrapper =
    document.querySelector<HTMLElement>('#comments-wrapper');

  if (showHideBtn === null || commentWrapper === null) {
    console.error('Comments toggle elements not found!');
    return;
  }

  const buttonElement = showHideBtn;
  const wrapperElement = commentWrapper;

  wrapperElement.style.display = 'none';
  buttonElement.setAttribute('aria-expanded', 'false');

  const toggleComments = (): void => {
    try {
      const isHidden = wrapperElement.style.display === 'none';
      buttonElement.textContent = isHidden ? 'Hide comments' : 'Show comments';
      wrapperElement.style.display = isHidden ? 'block' : 'none';
      buttonElement.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    } catch (error) {
      console.error('Error toggling comments:', error);
      alert('Comment toggle failed. Please refresh the page.');
    }
  };

  buttonElement.addEventListener('click', toggleComments);
};
