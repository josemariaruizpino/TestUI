import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-colors-docs',
    templateUrl: './colors-docs.component.html',
    styleUrls: ['./colors-docs.component.scss'],
    standalone: false
})
export class ColorsDocsComponent implements OnInit {

  toastVisible = false;
  private toastTimeout: any;

  constructor() { }

  ngOnInit(): void {
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    this.toastVisible = true;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => this.toastVisible = false, 2000);
  }

}
