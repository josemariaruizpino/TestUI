import { Component } from '@angular/core';

type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary' | 'Link';

interface BreakpointEntry {
  breakpoint: string;
  width: number | null;
  height: number | null;
  fontSize: number | null;
}

const BUTTON_CLASSES: Record<ButtonVariant, string> = {
  Primary: 'e-btn--primary',
  Secondary: 'e-btn--secondary',
  Tertiary: 'e-btn--terciary',
  Link: 'e-btn--link'
};

@Component({
    selector: 'app-buttons-docs',
    templateUrl: './buttons-docs.component.html',
    styleUrls: ['./buttons-docs.component.scss'],
    standalone: false
})
export class ButtonsDocsComponent {
  public selectedVariant: ButtonVariant = 'Primary';
  public isSquareVariant = false;
  public isDisabledVariant = false;
  public selectedWidth: number | null = null;
  public widthOptions: number[] = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100];
  public selectedHeight: number | null = null;
  public heightOptions: number[] = [32, 40, 48, 50, 60];
  public selectedFontSize: number | null = null;
  public fontSizeOptions: number[] = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28];
  public isResponsiveVariant = false;
  public breakpointOptions: string[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  public breakpointEntries: BreakpointEntry[] = [];
  public copyFeedback = 'Copiar';

  public onVariantChange(value: string): void {
    if (value === 'Primary' || value === 'Secondary' || value === 'Tertiary' || value === 'Link') {
      this.selectedVariant = value;
      this.copyFeedback = 'Copiar';
    }
  }

  public onSquareVariantChange(checked: boolean): void {
    this.isSquareVariant = checked;
    this.copyFeedback = 'Copiar';
  }

  public onDisabledVariantChange(checked: boolean): void {
    this.isDisabledVariant = checked;
    this.copyFeedback = 'Copiar';
  }

  public onWidthChange(value: string): void {
    const parsed = parseInt(value, 10);
    this.selectedWidth = Number.isFinite(parsed) ? parsed : null;
    this.copyFeedback = 'Copiar';
  }

  public onHeightChange(value: string): void {
    const parsed = parseInt(value, 10);
    this.selectedHeight = Number.isFinite(parsed) ? parsed : null;
    this.copyFeedback = 'Copiar';
  }

  public onFontSizeChange(value: string): void {
    const parsed = parseInt(value, 10);
    this.selectedFontSize = Number.isFinite(parsed) ? parsed : null;
    this.copyFeedback = 'Copiar';
  }

  public onResponsiveVariantChange(checked: boolean): void {
    this.isResponsiveVariant = checked;
    this.breakpointEntries = checked
      ? [{ breakpoint: '', width: null, height: null, fontSize: null }]
      : [];
    this.copyFeedback = 'Copiar';
  }

  public addBreakpoint(): void {
    this.breakpointEntries.push({ breakpoint: '', width: null, height: null, fontSize: null });
    this.copyFeedback = 'Copiar';
  }

  public removeBreakpoint(index: number): void {
    this.breakpointEntries.splice(index, 1);
    if (this.breakpointEntries.length === 0) {
      this.isResponsiveVariant = false;
    }
    this.copyFeedback = 'Copiar';
  }

  public onEntryBreakpointChange(index: number, value: string): void {
    this.breakpointEntries[index].breakpoint = value;
    this.copyFeedback = 'Copiar';
  }

  public onEntryWidthChange(index: number, value: string): void {
    const parsed = parseInt(value, 10);
    this.breakpointEntries[index].width = Number.isFinite(parsed) ? parsed : null;
    this.copyFeedback = 'Copiar';
  }

  public onEntryHeightChange(index: number, value: string): void {
    const parsed = parseInt(value, 10);
    this.breakpointEntries[index].height = Number.isFinite(parsed) ? parsed : null;
    this.copyFeedback = 'Copiar';
  }

  public onEntryFontSizeChange(index: number, value: string): void {
    const parsed = parseInt(value, 10);
    this.breakpointEntries[index].fontSize = Number.isFinite(parsed) ? parsed : null;
    this.copyFeedback = 'Copiar';
  }

  public get widthClass(): string | null {
    return this.selectedWidth !== null ? `u-width-${this.selectedWidth}` : null;
  }

  public get heightClass(): string | null {
    return this.selectedHeight !== null ? `u-height-${this.selectedHeight}` : null;
  }

  public get fontSizeClass(): string | null {
    return this.selectedFontSize !== null ? `u-fs-${this.selectedFontSize}` : null;
  }

  public get responsiveClasses(): string[] {
    const classes: string[] = [];
    for (const entry of this.breakpointEntries) {
      if (!entry.breakpoint) continue;
      if (entry.width !== null) classes.push(`u-width-${entry.breakpoint}-${entry.width}`);
      if (entry.height !== null) classes.push(`u-height-${entry.breakpoint}-${entry.height}`);
      if (entry.fontSize !== null) classes.push(`u-fs-${entry.breakpoint}-${entry.fontSize}`);
    }
    return classes;
  }

  public buttonClass(base: string): string {
    const classes: string[] = [base];
    if (this.isSquareVariant) {
      classes.push('square');
    }
    if (this.widthClass) {
      classes.push(this.widthClass);
    }
    if (this.heightClass) {
      classes.push(this.heightClass);
    }
    if (this.fontSizeClass) {
      classes.push(this.fontSizeClass);
    }
    classes.push(...this.responsiveClasses);
    return classes.join(' ');
  }

  public get selectedSnippet(): string {
    const classes: string[] = [BUTTON_CLASSES[this.selectedVariant]];
    if (this.isSquareVariant) {
      classes.push('square');
    }
    if (this.widthClass) {
      classes.push(this.widthClass);
    }
    if (this.heightClass) {
      classes.push(this.heightClass);
    }
    if (this.fontSizeClass) {
      classes.push(this.fontSizeClass);
    }
    classes.push(...this.responsiveClasses);
    const disabledAttribute = this.isDisabledVariant ? ' disabled' : '';

    return `<button type="button" class="${classes.join(' ')}"${disabledAttribute}>${this.selectedVariant}</button>`;
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