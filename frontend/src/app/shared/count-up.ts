import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-count-up',
  template: `{{ display() }}{{ suffix() }}`,
  styles: `
    :host {
      display: inline;
      font: inherit;
      letter-spacing: inherit;
      color: inherit;
    }
  `,
  host: {
    '[attr.aria-label]': 'label()',
  },
})
export class CountUp {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** Final number to reach. */
  readonly end = input.required<number>();
  /** Optional text after the number, e.g. "–9" or ":30". */
  readonly suffix = input('');
  /** Animation duration in ms. */
  readonly duration = input(1200);
  /** Starting value. */
  readonly start = input(0);

  readonly display = signal('0');
  readonly label = computed(() => `${this.end()}${this.suffix()}`);
  private started = false;
  private done = false;
  private raf = 0;
  private observer?: IntersectionObserver;

  constructor() {
    effect(() => {
      const end = this.end();
      // If CMS data arrives after the count finished, snap to the real total.
      if (this.done) {
        this.display.set(String(end));
      }
    });

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.display.set(String(this.end()));
        this.started = true;
        this.done = true;
        return;
      }

      this.display.set(String(this.start()));
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animate();
              this.observer?.disconnect();
            }
          }
        },
        { threshold: 0.35, rootMargin: '0px 0px -6% 0px' },
      );
      this.observer.observe(this.host.nativeElement);
    });

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
      cancelAnimationFrame(this.raf);
    });
  }

  private animate(): void {
    if (this.started) {
      return;
    }
    this.started = true;

    const from = this.start();
    const to = this.end();
    const duration = Math.max(400, this.duration());
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);
      this.display.set(String(value));
      if (t < 1) {
        this.raf = requestAnimationFrame(tick);
      } else {
        this.display.set(String(this.end()));
        this.done = true;
      }
    };

    this.raf = requestAnimationFrame(tick);
  }
}
