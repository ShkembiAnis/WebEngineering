export function initCommentForm() {
  var form = document.querySelector('.comment-form');
  var nameField = document.querySelector('#name');
  var commentField = document.querySelector('#comment');
  var list = document.querySelector('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Comment form elements not found!', { form, nameField, commentField, list });
    return;
  }
  console.log('Comment form found, adding event listener');

  form.onsubmit = function(e) {
    e.preventDefault();

    var listItem = document.createElement('li');
    var namePara = document.createElement('p');
    var commentPara = document.createElement('p');
    var nameValue = nameField.value;
    var commentValue = commentField.value;

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    console.log(nameValue);

    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    nameField.value = '';
    commentField.value = '';
  };
} 