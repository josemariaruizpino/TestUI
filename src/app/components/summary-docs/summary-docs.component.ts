import { Component } from '@angular/core';

type SummaryVariant = 'Default' | 'Secondary';

@Component({
  selector: 'app-summary-docs',
  templateUrl: './summary-docs.component.html',
  styleUrls: ['./summary-docs.component.scss']
})
export class SummaryDocsComponent {
  public selectedVariant: SummaryVariant = 'Default';
  public copyFeedback = 'Copiar';

  public onVariantChange(value: string): void {
    if (value === 'Default' || value === 'Secondary') {
      this.selectedVariant = value;
      this.copyFeedback = 'Copiar';
    }
  }

  public get summaryClass(): string {
    return this.selectedVariant === 'Secondary' ? 'e-summary e-summary--secondary' : 'e-summary';
  }

  public get selectedSnippet(): string {
    return [
      `<details class="${this.summaryClass}">`,
      `  <summary class="e-summary__trigger">`,
      `    <span class="e-summary__icon">&#9662;</span>`,
      `    <p class="e-summary__title">Más información</p>`,
      `  </summary>`,
      `  <div class="e-summary__content">`,
      `    Contenido desplegable con texto descriptivo. Puedes incluir`,
      `    <a href="#" class="e-summary__link">enlaces</a> dentro.`,
      `  </div>`,
      `</details>`
    ].join('\n');
  }

  public async copySnippet(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.selectedSnippet);
      this.copyFeedback = 'Copiado';
    } catch {
      this.copyFeedback = 'No disponible';
    }
  }
}
