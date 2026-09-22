import { Component, OnInit } from '@angular/core';

export type Locale = 'es' | 'en' | 'it';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public mobile: boolean | undefined;

  public ngOnInit(): void {
    this.mobile = window.screen.width <= 992;
  }

  public setLocale(locale: Locale): void {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(es|en|it)(\/|$)/, '/');
    window.location.href = `/${locale}${pathWithoutLocale}`;
  }

  get currentLocale(): Locale {
    const match = window.location.pathname.match(/^\/(es|en|it)(\/|$)/);
    return (match?.[1] as Locale) ?? 'es';
  }
}
