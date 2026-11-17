import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class ScrollReveal implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Delay in ms before the reveal animation starts once visible. */
  readonly revealDelay = input(0, { alias: 'appRevealDelay' });

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${this.revealDelay()}ms`);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-in');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-in');
              this.observer?.unobserve(el);
            }
          }
        },
        { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
