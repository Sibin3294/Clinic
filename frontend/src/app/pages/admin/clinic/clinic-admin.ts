import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_BASE } from '../../../core/api.config';
import { ClinicProfile } from '../../../core/clinic.models';
import { notifyError, notifySuccess } from '../../../core/confirm-dialog';
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

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    tagline: ['', Validators.required],
    lede: ['', Validators.required],
    announcement: ['', Validators.required],
    phoneDisplay: ['', Validators.required],
    phoneHref: ['', Validators.required],
    whatsappDisplay: [''],
    whatsappHref: [''],
    email: ['', [Validators.required, Validators.email]],
    mapUrl: [''],
    facebookUrl: [''],
    instagramUrl: [''],
    addressLines: [''],
    hours: [''],
    notes: [''],
    departments: [''],
  });

  constructor() {
    this.http.get<ClinicProfile>(`${API_BASE}/clinic`).subscribe({
      next: (clinic) => this.patch(clinic),
      error: () => notifyError('Could not load clinic profile'),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      notifyError('Please fill in the required fields');
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
      whatsappDisplay: raw.whatsappDisplay.trim(),
      whatsappHref: raw.whatsappHref.trim(),
      email: raw.email,
      mapUrl: raw.mapUrl.trim(),
      facebookUrl: raw.facebookUrl.trim(),
      instagramUrl: raw.instagramUrl.trim(),
      addressLines: splitLines(raw.addressLines),
      notes: splitLines(raw.notes),
      departments: splitLines(raw.departments),
      hours: splitLines(raw.hours).map((line) => {
        const [days, ...rest] = line.split('|');
        return { days: days.trim(), time: rest.join('|').trim() || '' };
      }),
    };

    this.content.updateClinic(body).subscribe({
      next: () => notifySuccess('Clinic profile saved'),
      error: (err) => notifyError(err?.error?.message || 'Save failed'),
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
      whatsappDisplay: clinic.whatsappDisplay || '',
      whatsappHref: clinic.whatsappHref || '',
      email: clinic.email,
      mapUrl: clinic.mapUrl || '',
      facebookUrl: clinic.facebookUrl || '',
      instagramUrl: clinic.instagramUrl || '',
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
