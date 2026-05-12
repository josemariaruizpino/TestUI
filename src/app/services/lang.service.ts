import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  private langSubject = new BehaviorSubject<Lang>('es');
  lang$ = this.langSubject.asObservable();

  setLang(lang: Lang): void {
    this.langSubject.next(lang);
  }

  get current(): Lang {
    return this.langSubject.value;
  }
}
