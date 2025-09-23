export function initCommentForm() {
  var form = document.querySelector('.comment-form');
  var nameField = document.querySelector('#name');
  var commentField = document.querySelector('#comment');
  var list = document.querySelector('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Comment form elements not found!');
    return;
  }
  console.log('Comment form found, adding event listener');

  form.onsubmit = function(e) {
    e.preventDefault();

    try {
      var nameValue = nameField.value.trim();
      var commentValue = commentField.value.trim();

      // Validate that both fields are not empty
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

      // Basic length validation
      if (nameValue.length > 100) {
        alert('Name is too long. Please keep it under 100 characters.');
        return;
      }

      if (commentValue.length > 1000) {
        alert('Comment is too long. Please keep it under 1000 characters.');
        return;
      }

      var listItem = document.createElement('li');
      var namePara = document.createElement('p');
      var commentPara = document.createElement('p');

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
  };
} 