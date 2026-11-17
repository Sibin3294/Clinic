import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_BASE } from '../../../core/api.config';
import { ClinicProfile } from '../../../core/clinic.models';
import { ContentService } from '../../../core/content.service';

@Component({
  selector: 'app-clinic-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './clinic-admin.html',
  styleUrl: '../admin.scss',
})
export class ClinicAdmin {
  private readonly content = inject(ContentService);
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  readonly message = signal('');
  readonly error = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    tagline: ['', Validators.required],
    lede: ['', Validators.required],
    announcement: ['', Validators.required],
    phoneDisplay: ['', Validators.required],
    phoneHref: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    addressLines: [''],
    hours: [''],
    notes: [''],
    departments: [''],
  });

  constructor() {
    this.http.get<ClinicProfile>(`${API_BASE}/clinic`).subscribe({
      next: (clinic) => this.patch(clinic),
      error: () => this.error.set('Could not load clinic profile'),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const body = {
      name: raw.name,
      city: raw.city,
      tagline: raw.tagline,
      lede: raw.lede,
      announcement: raw.announcement,
      phoneDisplay: raw.phoneDisplay,
      phoneHref: raw.phoneHref,
      email: raw.email,
      addressLines: splitLines(raw.addressLines),
      notes: splitLines(raw.notes),
      departments: splitLines(raw.departments),
      hours: splitLines(raw.hours).map((line) => {
        const [days, ...rest] = line.split('|');
        return { days: days.trim(), time: rest.join('|').trim() || '' };
      }),
    };

    this.content.updateClinic(body).subscribe({
      next: () => {
        this.message.set('Clinic profile saved');
        this.error.set('');
      },
      error: (err) => this.error.set(err?.error?.message || 'Save failed'),
    });
  }

  private patch(clinic: ClinicProfile): void {
    this.form.patchValue({
      name: clinic.name,
      city: clinic.city,
      tagline: clinic.tagline,
      lede: clinic.lede,
      announcement: clinic.announcement,
      phoneDisplay: clinic.phoneDisplay,
      phoneHref: clinic.phoneHref,
      email: clinic.email,
      addressLines: (clinic.addressLines || []).join('\n'),
      notes: (clinic.notes || []).join('\n'),
      departments: (clinic.departments || []).join('\n'),
      hours: (clinic.hours || []).map((h) => `${h.days}|${h.time}`).join('\n'),
    });
  }
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
