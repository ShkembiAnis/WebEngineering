const MAX_NAME_LENGTH = 100;
const MAX_COMMENT_LENGTH = 1000;

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    section {
      margin-bottom: 3rem;
    }

    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-family: 'Sonsie One', cursive;
      color: var(--color-text, #2a2a2a);
      text-align: center;
    }

    form {
      display: block;
    }

    .flex-pair {
      display: flex;
      padding: 0 3rem 1rem;
    }

    .field-label {
      align-self: center;
      flex: 2;
      text-align: right;
      font-family: 'Open Sans Condensed', sans-serif;
      font-size: 1.6rem;
      line-height: 32px;
      color: var(--color-text, #2a2a2a);
    }

    input[type="text"] {
      margin-left: 1rem;
      flex: 6;
      font-family: 'Open Sans Condensed', sans-serif;
      font-size: 1.6rem;
      line-height: 32px;
      padding: 0 0.5rem;
      border: 1px solid #ccc;
      border-radius: 2px;
    }

    .button-row {
      display: flex;
      justify-content: center;
      padding-bottom: 1rem;
    }

    input[type="submit"] {
      width: 30%;
      min-width: 160px;
      background: #333;
      border: 0;
      color: white;
      font-family: 'Open Sans Condensed', sans-serif;
      font-size: 1.6rem;
      line-height: 32px;
      cursor: pointer;
    }

    input[type="submit"]:focus-visible {
      outline: 3px solid white;
      outline-offset: 2px;
    }
  </style>
  <section>
    <h3 id="comment-form-title">Add comment</h3>
    <form aria-labelledby="comment-form-title" novalidate>
      <div class="flex-pair">
        <label class="field-label" for="name">Your name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name">
      </div>
      <div class="flex-pair">
        <label class="field-label" for="comment">Your comment:</label>
        <input type="text" id="comment" name="comment" placeholder="Enter your comment">
      </div>
      <div class="button-row">
        <input type="submit" value="Submit comment">
      </div>
    </form>
  </section>
`;

class CommentFormElement extends HTMLElement {
  private readonly form: HTMLFormElement | null;
  private readonly nameInput: HTMLInputElement | null;
  private readonly commentInput: HTMLInputElement | null;

  constructor() {
    super();
    const shadowRoot = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = shadowRoot.querySelector('form');
    this.nameInput = shadowRoot.querySelector('#name');
    this.commentInput = shadowRoot.querySelector('#comment');
  }

  connectedCallback(): void {
    this.form?.addEventListener('submit', this.handleSubmit);
  }

  disconnectedCallback(): void {
    this.form?.removeEventListener('submit', this.handleSubmit);
  }

  private readonly handleSubmit = (event: Event): void => {
    event.preventDefault();

    try {
      if (this.nameInput === null || this.commentInput === null) {
        alert('Comment form is not ready. Please refresh the page.');
        return;
      }

      const nameValue = this.nameInput.value.trim();
      const commentValue = this.commentInput.value.trim();

      if (nameValue === '') {
        alert('Please enter your name');
        this.nameInput.focus();
        return;
      }

      if (commentValue === '') {
        alert('Please enter a comment');
        this.commentInput.focus();
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

      const listElement = this.getCommentList();

      if (listElement === null) {
        console.error('Comment list not found in the DOM.');
        alert('Comments could not be added. Please refresh the page.');
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

      this.nameInput.value = '';
      this.commentInput.value = '';
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  private getCommentList(): HTMLUListElement | null {
    const commentsSection = this.closest('.comments');
    return commentsSection?.querySelector('.comment-container') ?? null;
  }
}

export const registerCommentFormComponent = (): void => {
  if (customElements.get('comment-form') === undefined) {
    customElements.define('comment-form', CommentFormElement);
  }
};
