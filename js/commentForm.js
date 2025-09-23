export const initCommentForm = () => {
  const MAX_NAME_LENGTH = 100; // Fix magic number
  const MAX_COMMENT_LENGTH = 1000; // Fix magic number
  
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Comment form elements not found!');
    return;
  }
  console.log('Comment form found, adding event listener');

  // Fix: Use addEventListener instead of onsubmit for consistency
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
      const nameValue = nameField.value.trim();
      const commentValue = commentField.value.trim();

      if (!nameValue) {
        alert('Please enter your name');
        nameField.focus();
        return;
      }

      if (!commentValue) {
        alert('Please enter a comment');
        commentField.focus();
        return;
      }

      if (nameValue.length > MAX_NAME_LENGTH) {
        alert(`Name is too long. Please keep it under ${MAX_NAME_LENGTH} characters.`);
        return;
      }

      if (commentValue.length > MAX_COMMENT_LENGTH) {
        alert(`Comment is too long. Please keep it under ${MAX_COMMENT_LENGTH} characters.`);
        return;
      }

      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');

      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';

    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  });
}; 