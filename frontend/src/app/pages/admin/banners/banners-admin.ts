import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Banner } from '../../../core/clinic.models';
import { confirmDelete } from '../../../core/confirm-dialog';
import { ContentService } from '../../../core/content.service';
import { MediaUrlPipe } from '../../../core/media-url.pipe';

@Component({
  selector: 'app-banners-admin',
  imports: [ReactiveFormsModule, MediaUrlPipe],
  templateUrl: './banners-admin.html',
  styleUrl: '../admin.scss',
})
export class BannersAdmin {
  private readonly content = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  readonly items = signal<Banner[]>([]);
  readonly formOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly message = signal('');
  readonly error = signal('');
  readonly formError = signal('');
  readonly uploading = signal(false);

  readonly form = this.fb.nonNullable.group({
    src: ['', Validators.required],
    alt: ['', Validators.required],
    label: ['', Validators.required],
    order: [0],
    active: [true],
  });

  constructor() {
    this.reload();
  }

  reload(): void {
    this.content.listBannersAdmin().subscribe({
      next: (items) => this.items.set(items),
      error: () => this.error.set('Could not load banners'),
    });
  }

  startCreate(): void {
    this.editingId.set(null);
    this.formError.set('');
    this.form.reset({ src: '', alt: '', label: '', order: this.items().length, active: true });
    this.formOpen.set(true);
  }

  startEdit(item: Banner): void {
    this.editingId.set(item.id);
    this.formError.set('');
    this.form.reset({
      src: item.src,
      alt: item.alt,
      label: item.label,
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.uploading.set(true);
    this.formError.set('');
    this.content.uploadImage(file).subscribe({
      next: (res) => {
        this.form.patchValue({ src: res.url });
        this.uploading.set(false);
        input.value = '';
      },
      error: (err) => {
        this.uploading.set(false);
        this.formError.set(err?.error?.message || 'Upload failed');
        input.value = '';
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const body = this.form.getRawValue();
    const id = this.editingId();
    const req = id ? this.content.updateBanner(id, body) : this.content.createBanner(body);
    req.subscribe({
      next: () => {
        this.message.set(id ? 'Banner updated' : 'Banner created');
        this.error.set('');
        this.closeForm();
        this.reload();
      },
      error: (err) => this.formError.set(err?.error?.message || 'Save failed'),
    });
  }

  async remove(item: Banner): Promise<void> {
    const ok = await confirmDelete(`Delete banner “${item.label}”?`, 'Delete banner?');
    if (!ok) return;
    this.content.deleteBanner(item.id).subscribe({
      next: () => {
        this.message.set('Banner deleted');
        this.reload();
      },
      error: () => this.error.set('Delete failed'),
    });
  }
}
