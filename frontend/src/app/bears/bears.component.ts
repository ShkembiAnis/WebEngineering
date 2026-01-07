import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

@Component({
  selector: 'app-bears',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="more_bears">
      <h3>More Bears</h3>
      <div *ngIf="loading" class="loading">
        <p>Loading bears...</p>
      </div>
      <div *ngIf="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div *ngFor="let bear of bears" class="bear">
        <img
          [src]="bear.image"
          [alt]="bear.name"
          style="width:200px; height:auto;"
          (error)="onImageError($event)"
        />
        <p>
          <b>{{ bear.name }}</b> ({{ bear.binomial }})
        </p>
        <p>Range: {{ bear.range }}</p>
      </div>
    </section>
  `,
  styles: [],
})
export class BearsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';

  bears: Bear[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    void this.fetchBearData();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400';
  }

  private async fetchBearData(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const data = await firstValueFrom(
        this.http.get<Bear[]>(`${this.apiUrl}/bears`)
      );
      
      this.bears = data;
      console.log(`Loaded ${this.bears.length} bears from backend`);
    } catch (error) {
      console.error('Error fetching bears from backend:', error);
      this.error = 'Failed to load bears. Please make sure the backend is running.';
    } finally {
      this.loading = false;
    }
  }
}
