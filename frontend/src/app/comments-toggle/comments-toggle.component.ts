import { Component, type AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comments-toggle',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  template: `
    <section class="comments">
      <button
        type="button"
        class="show-hide"
        [attr.aria-expanded]="isExpanded"
        aria-controls="comments-wrapper"
        (click)="toggleComments()"
      >
        {{ buttonText }}
      </button>

      <div
        class="comment-wrapper"
        id="comments-wrapper"
        [style.display]="isExpanded ? 'block' : 'none'"
      >
        <app-comment-form></app-comment-form>

        <h3>Comments</h3>
        <ul class="comment-container">
          <li>
            <p>Bob Fossil</p>
            <p>
              Oh I am so glad you taught me all about the big brown angry
              guys...
            </p>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: [],
})
export class CommentsToggleComponent implements AfterViewInit {
  isExpanded = false;
  buttonText = 'Show comments';

  ngAfterViewInit(): void {
  }

  toggleComments(): void {
    try {
      this.isExpanded = !this.isExpanded;
      this.buttonText = this.isExpanded ? 'Hide comments' : 'Show comments';
    } catch (error) {
      console.error('Error toggling comments:', error);
      alert('Comment toggle failed. Please refresh the page.');
    }
  }
}
