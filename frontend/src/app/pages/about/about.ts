import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ABOUT_VALUES_EN, ABOUT_VALUES_ML, ABOUT_WHY_EN, ABOUT_WHY_ML } from '../../core/i18n/content-en';
import { LanguageService } from '../../core/language.service';
import { TPipe } from '../../core/t.pipe';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';
import { WhyIcon } from '../../shared/why-icon';

@Component({
  selector: 'app-about',
  imports: [RouterLink, ScrollReveal, TPipe, WhyIcon],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly language = inject(LanguageService);

  readonly values = computed(() =>
    this.language.lang() === 'en' ? ABOUT_VALUES_EN : ABOUT_VALUES_ML,
  );

  readonly whyMitra = computed(() =>
    this.language.lang() === 'en' ? ABOUT_WHY_EN : ABOUT_WHY_ML,
  );
}
