import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClinicService } from '../../../core/clinic.models';
import { confirmDelete, notifyError, notifySuccess } from '../../../core/confirm-dialog';
import { ContentService } from '../../../core/content.service';

@Component({
  selector: 'app-services-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './services-admin.html',
  styleUrl: '../admin.scss',
})
export class ServicesAdmin {
  private readonly content = inject(ContentService);
  private readonly fb = inject(FormBuilder);

  readonly items = signal<ClinicService[]>([]);
  readonly formOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly formError = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    department: ['', Validators.required],
    summary: ['', Validators.required],
    includes: [''],
    suitedFor: ['', Validators.required],
    duration: ['', Validators.required],
    order: [0],
    active: [true],
  });

  constructor() {
    this.reload();
  }

  reload(): void {
    this.content.listServicesAdmin().subscribe({
      next: (items) => this.items.set(items),
      error: () => notifyError('Could not load services'),
    });
  }

  startCreate(): void {
    this.editingId.set(null);
    this.formError.set('');
    this.form.reset({
      name: '',
      department: '',
      summary: '',
      includes: '',
      suitedFor: '',
      duration: '',
      order: this.items().length,
      active: true,
    });
    this.formOpen.set(true);
  }

  startEdit(item: ClinicService): void {
    this.editingId.set(item._id || item.id);
    this.formError.set('');
    this.form.reset({
      name: item.name,
      department: item.department,
      summary: item.summary,
      includes: item.includes.join('\n'),
      suitedFor: item.suitedFor,
      duration: item.duration,
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

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      notifyError('Please fill in the required fields');
      return;
    }
    const raw = this.form.getRawValue();
    const body = {
      ...raw,
      includes: raw.includes
        .split('\n')
        .map((part) => part.trim())
        .filter(Boolean),
    };
    const id = this.editingId();
    const req = id ? this.content.updateService(id, body) : this.content.createService(body);
    req.subscribe({
      next: () => {
        notifySuccess(id ? 'Service updated' : 'Service created');
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

  async remove(item: ClinicService): Promise<void> {
    const ok = await confirmDelete(`Delete ${item.name}?`, 'Delete service?');
    if (!ok) return;
    this.content.deleteService(item._id || item.id).subscribe({
      next: () => {
        notifySuccess('Service deleted');
        this.reload();
      },
      error: () => notifyError('Delete failed'),
    });
  }
}
