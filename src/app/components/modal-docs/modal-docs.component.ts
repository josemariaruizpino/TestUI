import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-docs',
  templateUrl: './modal-docs.component.html',
  styleUrls: ['./modal-docs.component.scss']
})
export class ModalDocsComponent {
  public copyFeedback = 'Copiar';

  public get snippet(): string {
    return [
      `<button class="e-btn--primary" commandfor="dialog-1" command="show-modal">`,
      `  Prueba de Modal`,
      `</button>`,
      ``,
      `<dialog id="dialog-1" class="c-modal" closedby="any">`,
      `  <button class="exit" commandfor="dialog-1" command="close">`,
      `    <img class="exit-icon" src="img/icon-system-cancel.svg" alt="Cerrar">`,
      `  </button>`,
      ``,
      `  <div class="c-modal__content">`,
      `    <div class="c-modal__headcontainer">`,
      `      <p class="c-modal__title">Soy el título.</p>`,
      `      <p class="c-modal__subtitle">`,
      `        Soy un subtítulo de prueba con un texto largo.`,
      `      </p>`,
      `    </div>`,
      ``,
      `    <div class="c-modal__maincontent">`,
      `      <p class="u-m-0">`,
      `        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio esse`,
      `        laudantium recusandae at quisquam. Labore nulla minus amet cupiditate id`,
      `        fuga delectus sunt, fugiat, soluta necessitatibus consectetur tempora?`,
      `      </p>`,
      `    </div>`,
      `  </div>`,
      `</dialog>`
    ].join('\n');
  }

  public async copySnippet(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.snippet);
      this.copyFeedback = 'Copiado';
    } catch {
      this.copyFeedback = 'No disponible';
    }
  }
}
