import { Component, inject, signal } from '@angular/core';
import { Enquiry } from '../../../core/clinic.models';
import { confirmDelete, notifyError, notifySuccess } from '../../../core/confirm-dialog';
import { ContentService } from '../../../core/content.service';

@Component({
  selector: 'app-enquiries-admin',
  templateUrl: './enquiries-admin.html',
  styleUrl: '../admin.scss',
})
export class EnquiriesAdmin {
  private readonly content = inject(ContentService);

  readonly items = signal<Enquiry[]>([]);

  constructor() {
    this.reload();
  }

  reload(): void {
    this.content.listEnquiries().subscribe({
      next: (items) => this.items.set(items),
      error: () => notifyError('Could not load enquiries'),
    });
  }

  setStatus(item: Enquiry, status: NonNullable<Enquiry['status']>): void {
    if (!item.id) return;
    this.content.updateEnquiryStatus(item.id, status).subscribe({
      next: () => {
        notifySuccess(`Marked ${item.reference} as ${status}`);
        this.reload();
      },
      error: () => notifyError('Update failed'),
    });
  }

  async remove(item: Enquiry): Promise<void> {
    if (!item.id) return;
    const ok = await confirmDelete(`Delete enquiry ${item.reference}?`, 'Delete enquiry?');
    if (!ok) return;
    this.content.deleteEnquiry(item.id).subscribe({
      next: () => {
        notifySuccess('Enquiry deleted');
        this.reload();
      },
      error: () => notifyError('Delete failed'),
    });
  }
}
