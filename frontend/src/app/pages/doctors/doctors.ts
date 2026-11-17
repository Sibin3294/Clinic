import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { MediaUrlPipe } from '../../core/media-url.pipe';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, MediaUrlPipe],
  templateUrl: './doctors.html',
})
export class Doctors {
  private readonly content = inject(ContentService);

  readonly specialty = signal('All');
  readonly doctors = this.content.doctors;
  readonly filters = computed(() => ['All', ...new Set(this.doctors().map((doctor) => doctor.specialty))]);
  readonly visible = computed(() => {
    const selected = this.specialty();
    const list = this.doctors();
    return selected === 'All' ? list : list.filter((doctor) => doctor.specialty === selected);
  });

  select(specialty: string): void {
    this.specialty.set(specialty);
  }
}
