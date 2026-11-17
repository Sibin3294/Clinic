import {
  afterNextRender,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { createLoopCarousel } from '../../core/loop-carousel';
import { MediaUrlPipe } from '../../core/media-url.pipe';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, MediaUrlPipe],
  templateUrl: './doctors.html',
  styleUrl: './doctors.scss',
})
export class Doctors {
  private readonly destroyRef = inject(DestroyRef);
  private readonly content = inject(ContentService);
  private readonly doctorCarousel: ReturnType<typeof createLoopCarousel>;

  readonly specialty = signal('All');
  readonly doctors = this.content.doctors;
  readonly filters = computed(() => ['All', ...new Set(this.doctors().map((doctor) => doctor.specialty))]);
  readonly visible = computed(() => {
    const selected = this.specialty();
    const list = this.doctors();
    return selected === 'All' ? list : list.filter((doctor) => doctor.specialty === selected);
  });

  readonly doctorsPerView = signal(3);
  readonly doctorIndex = signal(0);
  readonly doctorMaxIndex = computed(() => Math.max(0, this.visible().length - this.doctorsPerView()));
  readonly doctorDots = computed(() =>
    Array.from({ length: this.doctorMaxIndex() + 1 }, (_, index) => index),
  );
  readonly doctorTrackTransform = computed(
    () => `translate3d(calc(-${this.doctorIndex()} * (100% + var(--gap)) / var(--per)), 0, 0)`,
  );

  constructor() {
    this.doctorCarousel = createLoopCarousel({
      index: this.doctorIndex,
      maxIndex: () => this.doctorMaxIndex(),
      destroyRef: this.destroyRef,
      intervalMs: 4500,
    });

    effect(() => {
      const max = this.doctorMaxIndex();
      if (this.doctorIndex() > max) {
        this.doctorIndex.set(max);
      }
    });

    afterNextRender(() => {
      this.updateDoctorsPerView();
      this.doctorCarousel.start();
      const onResize = () => this.updateDoctorsPerView();
      window.addEventListener('resize', onResize, { passive: true });
      this.destroyRef.onDestroy(() => {
        this.doctorCarousel.stop();
        window.removeEventListener('resize', onResize);
      });
    });
  }

  select(specialty: string): void {
    this.specialty.set(specialty);
    this.doctorIndex.set(0);
    this.doctorCarousel.bump();
  }

  prevDoctor(): void {
    this.doctorCarousel.prev();
    this.doctorCarousel.bump();
  }

  nextDoctor(): void {
    this.doctorCarousel.next();
    this.doctorCarousel.bump();
  }

  goDoctor(index: number): void {
    this.doctorCarousel.go(index);
    this.doctorCarousel.bump();
  }

  onDoctorPointerDown(event: PointerEvent): void {
    this.doctorCarousel.onPointerDown(event);
  }

  onDoctorPointerUp(event: PointerEvent): void {
    this.doctorCarousel.onPointerUp(event);
  }

  onDoctorPointerCancel(): void {
    this.doctorCarousel.onPointerCancel();
  }

  private updateDoctorsPerView(): void {
    const width = window.innerWidth;
    this.doctorsPerView.set(width < 700 ? 1 : width < 1100 ? 2 : 3);
  }
}
