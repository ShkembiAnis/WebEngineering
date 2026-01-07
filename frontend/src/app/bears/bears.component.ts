import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

interface WikipediaPage {
  imageinfo: Array<{
    url: string;
  }>;
}

interface WikipediaResponse {
  query: {
    pages: Record<string, WikipediaPage>;
  };
}

interface WikipediaParseResponse {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

@Component({
  selector: 'app-bears',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="more_bears">
      <h3>More Bears</h3>
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

  bears: Bear[] = [];
  private readonly baseUrl: string = 'https://en.wikipedia.org/w/api.php';
  private readonly title: string = 'List_of_ursids';
  private readonly IMAGE_TIMEOUT: number = 5000;

  ngOnInit(): void {
    void this.fetchBearData();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400';
  }

  private async checkImageUrl(url: string): Promise<boolean> {
    return await new Promise((resolve) => {
      try {
        const img = new Image();
        img.onload = () => {
          resolve(true);
        };
        img.onerror = () => {
          resolve(false);
        };
        setTimeout(() => {
          resolve(false);
        }, this.IMAGE_TIMEOUT);
        img.src = url;
      } catch (error) {
        resolve(false);
      }
    });
  }

  private async fetchImageUrl(fileName: string): Promise<string> {
    if (fileName === '' || fileName.trim() === '') {
      return 'https://placehold.co/600x400';
    }

    try {
      const params = new HttpParams({
        fromObject: {
          action: 'query',
          titles: 'File:' + fileName,
          prop: 'imageinfo',
          iiprop: 'url',
          format: 'json',
          origin: '*',
        },
      });

      const data = await firstValueFrom(
        this.http.get<WikipediaResponse>(this.baseUrl, { params })
      );

      const pages = data.query.pages;
      const page = Object.values(pages)[0];

      if (
        page?.imageinfo?.[0]?.url !== null &&
        page?.imageinfo?.[0]?.url !== undefined
      ) {
        const imageUrl = page.imageinfo[0].url;
        const isAccessible = await this.checkImageUrl(imageUrl);
        return isAccessible ? imageUrl : 'https://placehold.co/600x400';
      } else {
        return 'https://placehold.co/600x400';
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return 'https://placehold.co/600x400';
    }
  }

  private async processBear(
    nameMatch: RegExpMatchArray,
    binomialMatch: RegExpMatchArray,
    imageMatch: RegExpMatchArray | null,
    rangeMatch: RegExpMatchArray | null
  ): Promise<void> {
    const bearName: string = nameMatch[1];
    const fileName: string =
      imageMatch !== null ? imageMatch[1].trim().replace('File:', '') : '';
    const range: string =
      rangeMatch !== null
        ? rangeMatch[1].trim()
        : 'Range information not available';

    const imageUrl = await this.fetchImageUrl(fileName);
    const bear: Bear = {
      name: bearName,
      binomial: binomialMatch[1],
      image: imageUrl,
      range,
    };
    this.bears.push(bear);
  }

  private extractBears(wikitext: string): void {
    try {
      const speciesTables = wikitext.split('{{Species table/end}}');
      const processedNames = new Set<string>();

      speciesTables.forEach((table) => {
        const rows = table.split('{{Species table/row');
        rows.forEach((row) => {
          const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
          const binomialMatch = row.match(/\|binomial=(.*?)\n/);
          const imageMatch = row.match(/\|image=(.*?)\n/);
          const rangeMatch = row.match(/\|range=(.*?)\n/);

          if (nameMatch !== null && binomialMatch !== null) {
            const bearName = nameMatch[1];

            if (processedNames.has(bearName)) {
              return;
            }
            processedNames.add(bearName);

            void this.processBear(
              nameMatch,
              binomialMatch,
              imageMatch,
              rangeMatch
            );
          }
        });
      });
    } catch (error) {
      console.error('Error extracting bears:', error);
    }
  }

  private async fetchBearData(): Promise<void> {
    try {
      const params = new HttpParams({
        fromObject: {
          action: 'parse',
          page: this.title,
          prop: 'wikitext',
          section: '3',
          format: 'json',
          origin: '*',
        },
      });

      const data = await firstValueFrom(
        this.http.get<WikipediaParseResponse>(this.baseUrl, { params })
      );
      this.extractBears(data.parse.wikitext['*']);
    } catch (error) {
      console.error('Error initializing bear fetch:', error);
    }
  }
}
