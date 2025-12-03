import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BearsComponent } from './bears/bears.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CommentsToggleComponent } from './comments-toggle/comments-toggle.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BearsComponent,
    CommentFormComponent,
    CommentsToggleComponent,
    SearchComponent,
  ],
  template: `
    <header class="header">
      <h1>Welcome to our wildlife website</h1>

      <nav class="nav" aria-label="Primary">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Our team</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Blog</a></li>
        </ul>

        <app-search></app-search>
      </nav>
    </header>

    <main>
      <article>
        <header>
          <h2>The trouble with Bears</h2>
          <p>By Evan Wild</p>
        </header>

        <p>
          Tall, lumbering, angry, dangerous. The real live bears of this world
          are proud, independent creatures, self-serving and always on the hunt
          for food.
        </p>

        <h3>Types of bear</h3>
        <p id="bear-table-summary">
          Comparison of wild and urban bears across coat, size, habitat,
          lifespan, and diet.
        </p>
        <table aria-describedby="bear-table-summary">
          <caption>
            Bear types at a glance
          </caption>
          <thead>
            <tr>
              <th scope="col">Bear Type</th>
              <th scope="col">Coat</th>
              <th scope="col">Adult size</th>
              <th scope="col">Habitat</th>
              <th scope="col">Lifespan</th>
              <th scope="col">Diet</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Wild</th>
              <td>Brown or black</td>
              <td>1.4 to 2.8 meters</td>
              <td>Woods and forests</td>
              <td>25 to 28 years</td>
              <td>Fish, meat, plants</td>
            </tr>
            <tr>
              <th scope="row">Urban</th>
              <td>North Face</td>
              <td>18 to 22</td>
              <td>Condos and coffee shops</td>
              <td>20 to 32 years</td>
              <td>Starbucks, sushi</td>
            </tr>
          </tbody>
        </table>

        <h3>Habitats and Eating habits</h3>
        <p>
          Wild bears eat a variety of meat, fish, fruit, nuts, and other
          natually growing ingredients...
        </p>
        <img src="assets/wild-bear.jpg" alt="Wild bear in forest" />
        <p>
          Urban (gentrified) bears on the other hand have largely abandoned the
          old ways...
        </p>
        <img src="assets/urban-bear.jpg" alt="Urban bear near buildings" />

        <h3>Mating rituals</h3>
        <p>Bears are romantic creatures by nature...</p>
        <figure class="media-block">
          <audio controls aria-describedby="bear-audio-transcript">
            <source src="assets/bear.mp3" type="audio/mp3" />
            <source src="assets/bear.ogg" type="audio/ogg" />
            <p>
              It looks like your browser doesn't support HTML5 audio players.
            </p>
          </audio>
          <figcaption id="bear-audio-transcript">
            <strong>Transcript:</strong>
            <p>
              This isn't really an audio fact file about bears, but it is an
              audio file you can transcribe.
            </p>
          </figcaption>
        </figure>

        <aside>
          <h3>About the author</h3>
          Evan Wild is an unemployed plumber from Doncaster...
        </aside>

        <app-comments-toggle></app-comments-toggle>

        <app-bears></app-bears>
      </article>

      <aside class="secondary" aria-label="Related links">
        <h2>Related</h2>
        <ul>
          <li><a href="#">The trouble with Bees</a></li>
          <li><a href="#">The trouble with Otters</a></li>
          <li><a href="#">The trouble with Penguins</a></li>
          <li><a href="#">The trouble with Octopi</a></li>
          <li><a href="#">The trouble with Lemurs</a></li>
        </ul>
      </aside>
    </main>

    <footer>
      <p>©Copyright 2050 by nobody. All rights reversed.</p>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'wildlife-angular';
}
