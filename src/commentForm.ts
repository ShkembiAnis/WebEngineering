export const initCommentForm = (): void => {
  const MAX_NAME_LENGTH: number = 100; // Fix magic number
  const MAX_COMMENT_LENGTH: number = 1000; // Fix magic number

  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  if (
    form === null ||
    nameField === null ||
    commentField === null ||
    list === null
  ) {
    console.error('Comment form elements not found!');
    return;
  }

  const formElement = form as HTMLFormElement;
  const nameInput = nameField as HTMLInputElement;
  const commentInput = commentField as HTMLInputElement;
  const listElement = list as HTMLUListElement;

  console.log('Comment form found, adding event listener');

  // Fix: Use addEventListener instead of onsubmit for consistency
  formElement.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    try {
      const nameValue = nameInput.value.trim();
      const commentValue = commentInput.value.trim();

      if (nameValue === '') {
        alert('Please enter your name');
        nameInput.focus();
        return;
      }

      if (commentValue === '') {
        alert('Please enter a comment');
        commentInput.focus();
        return;
      }

      if (nameValue.length > MAX_NAME_LENGTH) {
        alert(
          `Name is too long. Please keep it under ${MAX_NAME_LENGTH} characters.`
        );
        return;
      }

      if (commentValue.length > MAX_COMMENT_LENGTH) {
        alert(
          `Comment is too long. Please keep it under ${MAX_COMMENT_LENGTH} characters.`
        );
        return;
      }

      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      listElement.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameInput.value = '';
      commentInput.value = '';
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  });
};
