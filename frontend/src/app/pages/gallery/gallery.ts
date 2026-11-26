import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import Swiper from 'swiper';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { GALLERY_IMAGES } from '../../core/gallery-images';
import { TPipe } from '../../core/t.pipe';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-gallery',
  imports: [ScrollReveal, TPipe],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements AfterViewInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  readonly slides = GALLERY_IMAGES;
  /** Use a rich set for the 3D stage; grid still shows every photo. */
  readonly featured = this.slides.slice(0, Math.min(18, this.slides.length));
  readonly Math = Math;
  readonly featuredIndex = signal(0);

  private readonly featuredHost = viewChild<ElementRef<HTMLElement>>('featuredHost');
  private readonly gridHost = viewChild<ElementRef<HTMLElement>>('gridHost');

  private swiper?: Swiper;
  private lightbox?: PhotoSwipeLightbox;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.initSwiper();
      this.initLightbox();
    });

    this.destroyRef.onDestroy(() => this.teardown());
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  openAt(index: number): void {
    if (!this.lightbox || index < 0 || index >= this.slides.length) {
      return;
    }
    this.lightbox.loadAndOpen(index);
  }

  openFeatured(): void {
    this.openAt(this.featuredIndex());
  }

  private initSwiper(): void {
    const el = this.featuredHost()?.nativeElement;
    if (!el || this.featured.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.swiper = new Swiper(el, {
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: this.featured.length > 3,
      speed: reduceMotion ? 0 : 780,
      coverflowEffect: {
        rotate: 36,
        stretch: -28,
        depth: 180,
        modifier: 1.05,
        slideShadows: true,
      },
      autoplay: reduceMotion
        ? false
        : {
            delay: 3800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
      pagination: {
        el: el.querySelector('.swiper-pagination') as HTMLElement,
        clickable: true,
      },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next') as HTMLElement,
        prevEl: el.querySelector('.swiper-button-prev') as HTMLElement,
      },
      breakpoints: {
        0: {
          coverflowEffect: {
            rotate: 18,
            stretch: -12,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          },
        },
        760: {
          coverflowEffect: {
            rotate: 36,
            stretch: -28,
            depth: 180,
            modifier: 1.05,
            slideShadows: true,
          },
        },
      },
      on: {
        slideChange: (swiper) => {
          this.zone.run(() => this.featuredIndex.set(swiper.realIndex));
        },
      },
    });
  }

  private initLightbox(): void {
    const grid = this.gridHost()?.nativeElement;
    if (!grid) {
      return;
    }

    this.lightbox = new PhotoSwipeLightbox({
      gallery: grid,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      showHideAnimationType: 'zoom',
      bgOpacity: 0.92,
      padding: { top: 24, bottom: 24, left: 16, right: 16 },
      wheelToZoom: true,
      imageClickAction: 'zoom',
      tapAction: 'zoom',
      doubleTapAction: 'zoom',
    });

    this.lightbox.init();
  }

  private teardown(): void {
    this.swiper?.destroy(true, true);
    this.swiper = undefined;
    this.lightbox?.destroy();
    this.lightbox = undefined;
  }
}
