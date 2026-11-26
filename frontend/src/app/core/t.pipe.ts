import { Pipe, PipeTransform, inject } from '@angular/core';
import { t } from './i18n/ui';
import { LanguageService } from './language.service';

@Pipe({ name: 't', pure: false })
export class TPipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(key: string): string {
    return t(this.language.lang(), key);
  }
}
