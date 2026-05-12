import { Component, OnInit } from '@angular/core';
import { LangService, Lang } from '../../services/lang.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  public mobile: boolean | undefined;

  constructor(public readonly langService: LangService) {}

  public ngOnInit(): void {
    if (window.screen.width > 992) {
      this.mobile = false;
    } else {
      this.mobile = true;
    }
  }

  public setLang(lang: Lang): void {
    this.langService.setLang(lang);
  }

  get currentLang(): Lang {
    return this.langService.current;
  }
}
