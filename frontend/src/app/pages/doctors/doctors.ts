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
    effect(() => {
      const max = this.doctorMaxIndex();
      if (this.doctorIndex() > max) {
        this.doctorIndex.set(max);
      }
    });

    afterNextRender(() => {
      this.updateDoctorsPerView();
      const onResize = () => this.updateDoctorsPerView();
      window.addEventListener('resize', onResize, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('resize', onResize));
    });
  }

  select(specialty: string): void {
    this.specialty.set(specialty);
    this.doctorIndex.set(0);
  }

  prevDoctor(): void {
    this.doctorIndex.update((index) => Math.max(0, index - 1));
  }

  nextDoctor(): void {
    this.doctorIndex.update((index) => Math.min(this.doctorMaxIndex(), index + 1));
  }

  goDoctor(index: number): void {
    this.doctorIndex.set(Math.max(0, Math.min(this.doctorMaxIndex(), index)));
  }

  private updateDoctorsPerView(): void {
    const width = window.innerWidth;
    this.doctorsPerView.set(width < 700 ? 1 : width < 1100 ? 2 : 3);
  }
}
