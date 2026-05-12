import { Component } from '@angular/core';

type InputVariant = 'Basic' | 'Magic' | 'SelectMagic' | 'Radio' | 'Checkbox';

@Component({
    selector: 'app-inputs-docs',
    templateUrl: './inputs-docs.component.html',
    styleUrls: ['./inputs-docs.component.scss'],
    standalone: false
})
export class InputsDocsComponent {
  public selectedVariant: InputVariant = 'Basic';
  public isErrorVariant = false;
  public copyFeedback = 'Copiar';

  public onVariantChange(value: string): void {
    if (value === 'Basic' || value === 'Magic' || value === 'SelectMagic' || value === 'Radio' || value === 'Checkbox') {
      this.selectedVariant = value;
      this.copyFeedback = 'Copiar';
    }
  }

  public onErrorVariantChange(checked: boolean): void {
    this.isErrorVariant = checked;
    this.copyFeedback = 'Copiar';
  }

  public get supportsError(): boolean {
    return this.selectedVariant !== 'Radio';
  }

  public get selectedSnippet(): string {
    const errorClass = this.isErrorVariant && this.supportsError ? ' error' : '';

    switch (this.selectedVariant) {
      case 'Basic':
        return [
          `<div class="e-input${errorClass}">`,
          `  <div class="e-input__wrapper">`,
          `    <input type="text" class="e-input__field" placeholder="DNI o NIE" required />`,
          `  </div>`,
          `  <span class="e-input__text">Mensaje de ayuda o error</span>`,
          `</div>`
        ].join('\n');

      case 'Magic':
        return [
          `<div class="e-input${errorClass}">`,
          `  <div class="e-input__wrapper e-input__wrapper--magic">`,
          `    <input type="text" class="e-input__field" placeholder=" " required />`,
          `    <label class="e-input__label">Nombre</label>`,
          `  </div>`,
          `  <span class="e-input__text">Mensaje de ayuda o error</span>`,
          `</div>`
        ].join('\n');

      case 'SelectMagic':
        return [
          `<div class="e-select${errorClass}">`,
          `  <div class="e-select__wrapper e-select__wrapper--magic">`,
          `    <select class="e-select__field">`,
          `      <option value="" selected>Mes</option>`,
          `      <option value="enero">Enero</option>`,
          `      <option value="febrero">Febrero</option>`,
          `    </select>`,
          `    <label class="e-select__label">Mes</label>`,
          `  </div>`,
          `  <span class="e-select__text">Mensaje de ayuda o error</span>`,
          `</div>`
        ].join('\n');

      case 'Radio':
      default:
        return [
          `<div class="e-radio">`,
          `  <label class="e-radio__wrapper">`,
          `    <input type="radio" name="covertype" class="e-radio__input" value="luz" checked />`,
          `    <span class="e-radio__label">Luz</span>`,
          `  </label>`,
          `  <label class="e-radio__wrapper">`,
          `    <input type="radio" name="covertype" class="e-radio__input" value="gas" />`,
          `    <span class="e-radio__label">Gas</span>`,
          `  </label>`,
          `  <label class="e-radio__wrapper">`,
          `    <input type="radio" name="covertype" class="e-radio__input" value="luz-gas" />`,
          `    <span class="e-radio__label">Luz y gas</span>`,
          `  </label>`,
          `</div>`
        ].join('\n');

      case 'Checkbox':
        return [
          `<div class="e-checkbox u-width-100${errorClass}">`,
          `  <label class="e-checkbox__label">`,
          `    <input type="checkbox" name="checkmark">`,
          `    <div class="e-checkbox__checkmark-container">`,
          `      <span class="e-checkbox__checkmark"></span>`,
          `      <span class="e-checkbox__text">He leído y acepto el`,
          `        <a href="https://www.rastreator.com/aviso-legal.aspx" target="blank" class="e-checkbox__legal">Aviso`,
          `          legal</a> y la <a href="https://www.rastreator.com/politica-de-privacidad.aspx" target="blank"`,
          `          class="e-checkbox__legal">Política de`,
          `          privacidad</a></span>`,
          `    </div>`,
          `  </label>`,
          `  <p class="e-checkbox__error">Para continuar, acepta el Aviso`,
          `    legal y la Política de privacidad</p>`,
          `</div>`
        ].join('\n');
    }
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
