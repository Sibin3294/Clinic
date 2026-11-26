import { Injectable, signal } from '@angular/core';

export type Lang = 'ml' | 'en';

const STORAGE_KEY = 'mitra-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(this.readInitial());

  constructor() {
    this.applyDocumentLang(this.lang());
  }

  toggle(): void {
    this.set(this.lang() === 'ml' ? 'en' : 'ml');
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    this.applyDocumentLang(lang);
  }

  private applyDocumentLang(lang: Lang): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  private readInitial(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ml') {
        return saved;
      }
    } catch {
      /* ignore */
    }
    return 'ml';
  }
}
