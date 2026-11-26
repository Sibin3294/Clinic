import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor } from '../../../core/clinic.models';
import { confirmDelete, notifyError, notifySuccess } from '../../../core/confirm-dialog';
import { ContentService } from '../../../core/content.service';
import { DOCTOR_PLACEHOLDER } from '../../../core/doctor-placeholder';
import { MediaUrlPipe } from '../../../core/media-url.pipe';

@Component({
  selector: 'app-doctors-admin',
  imports: [ReactiveFormsModule, MediaUrlPipe],
  templateUrl: './doctors-admin.html',
  styleUrl: '../admin.scss',
})
export class DoctorsAdmin {
  private readonly content = inject(ContentService);
  private readonly fb = inject(FormBuilder);
  readonly doctorPlaceholder = DOCTOR_PLACEHOLDER;

  readonly items = signal<Doctor[]>([]);
  readonly formOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly formError = signal('');
  readonly uploading = signal(false);
  readonly tones = ['pine', 'copper', 'gold', 'clay', 'ink', 'sage'] as const;

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    specialty: ['', Validators.required],
    credentials: ['', Validators.required],
    years: [0, Validators.required],
    bio: ['', Validators.required],
    days: ['', Validators.required],
    hours: [''],
    appointmentPhone: [''],
    appointmentPhoneHref: [''],
    focus: [''],
    initials: ['', Validators.required],
    tone: ['pine' as Doctor['tone'], Validators.required],
    photo: [''],
    order: [0],
    active: [true],
  });

  constructor() {
    this.reload();
  }

  reload(): void {
    this.content.listDoctorsAdmin().subscribe({
      next: (items) => this.items.set(items),
      error: () => notifyError('Could not load doctors'),
    });
  }

  startCreate(): void {
    this.editingId.set(null);
    this.formError.set('');
    this.form.reset({
      name: '',
      specialty: '',
      credentials: '',
      years: 0,
      bio: '',
      days: '',
      hours: '',
      appointmentPhone: '',
      appointmentPhoneHref: '',
      focus: '',
      initials: '',
      tone: 'pine',
      photo: '',
      order: this.items().length,
      active: true,
    });
    this.formOpen.set(true);
  }

  startEdit(item: Doctor): void {
    this.editingId.set(item._id || item.id);
    this.formError.set('');
    this.form.reset({
      name: item.name,
      specialty: item.specialty,
      credentials: item.credentials,
      years: item.years,
      bio: item.bio,
      days: item.days,
      hours: item.hours || '',
      appointmentPhone: item.appointmentPhone || '',
      appointmentPhoneHref: item.appointmentPhoneHref || '',
      focus: item.focus.join(', '),
      initials: item.initials,
      tone: item.tone,
      photo: item.photo || '',
      order: item.order ?? 0,
      active: item.active ?? true,
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.editingId.set(null);
    this.formError.set('');
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.uploading.set(true);
    this.formError.set('');
    this.content.uploadImage(file).subscribe({
      next: (res) => {
        this.form.patchValue({ photo: res.url });
        this.uploading.set(false);
        input.value = '';
        notifySuccess('Photo uploaded');
      },
      error: (err) => {
        this.uploading.set(false);
        const msg = err?.error?.message || 'Upload failed';
        this.formError.set(msg);
        notifyError(msg);
        input.value = '';
      },
    });
  }

  clearPhoto(): void {
    this.form.patchValue({ photo: '' });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      notifyError('Please fill in the required fields');
      return;
    }
    const raw = this.form.getRawValue();
    const phone = raw.appointmentPhone.trim();
    const phoneHref =
      raw.appointmentPhoneHref.trim() ||
      (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '');
    const body = {
      ...raw,
      hours: raw.hours.trim(),
      appointmentPhone: phone,
      appointmentPhoneHref: phoneHref,
      focus: raw.focus
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean),
    };
    const id = this.editingId();
    const req = id ? this.content.updateDoctor(id, body) : this.content.createDoctor(body);
    req.subscribe({
      next: () => {
        notifySuccess(id ? 'Doctor updated' : 'Doctor created');
        this.closeForm();
        this.reload();
      },
      error: (err) => {
        const msg = err?.error?.message || 'Save failed';
        this.formError.set(msg);
        notifyError(msg);
      },
    });
  }

  async remove(item: Doctor): Promise<void> {
    const ok = await confirmDelete(`Delete ${item.name}?`, 'Delete doctor?');
    if (!ok) return;
    this.content.deleteDoctor(item._id || item.id).subscribe({
      next: () => {
        notifySuccess('Doctor deleted');
        this.reload();
      },
      error: () => notifyError('Delete failed'),
    });
  }
}
