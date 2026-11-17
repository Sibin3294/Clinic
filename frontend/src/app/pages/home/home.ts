import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { MediaUrlPipe } from '../../core/media-url.pipe';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ScrollReveal, MediaUrlPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly destroyRef = inject(DestroyRef);
  private readonly content = inject(ContentService);
  private timer: ReturnType<typeof setInterval> | undefined;
  private frame = 0;

  readonly banner = viewChild<ElementRef<HTMLElement>>('banner');
  readonly clinic = this.content.clinic;
  readonly doctors = this.content.doctors;
  readonly services = this.content.services;
  readonly slides = this.content.banners;
  readonly featuredDoctors = computed(() => this.doctors().slice(0, 4));
  readonly active = signal(0);
  readonly parallax = signal(0);
  readonly steps = [
    {
      title: 'Tell us what you need',
      text: 'Send an enquiry with the department, a preferred day, and a short note about the concern.',
    },
    {
      title: 'We confirm by phone',
      text: 'The front desk calls during clinic hours to place you with the right consultant.',
    },
    {
      title: 'See your consultant',
      text: 'Arrive ten minutes early with previous reports. You leave with a plan in writing.',
    },
  ];

  constructor() {
    effect(() => {
      const count = this.slides().length;
      if (count === 0) {
        this.active.set(0);
        return;
      }
      if (this.active() >= count) {
        this.active.set(0);
      }
    });

    afterNextRender(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        this.start();
        this.bindParallax();
      }
      this.destroyRef.onDestroy(() => {
        this.stop();
        cancelAnimationFrame(this.frame);
      });
    });
  }

  show(index: number): void {
    this.active.set(index);
    this.stop();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.start();
    }
  }

  private bindParallax(): void {
    const onScroll = () => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => {
        const node = this.banner()?.nativeElement;
        if (!node) {
          return;
        }
        const rect = node.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        this.parallax.set(progress);
        node.style.setProperty('--parallax', String(progress));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
  }

  private start(): void {
    this.stop();
    this.timer = setInterval(() => {
      const count = this.slides().length;
      if (count === 0) {
        return;
      }
      this.active.update((index: number) => (index + 1) % count);
    }, 7000);
  }

  private stop(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
