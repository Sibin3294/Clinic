import { Component, inject, signal } from '@angular/core';
import { Enquiry } from '../../../core/clinic.models';
import { confirmDelete } from '../../../core/confirm-dialog';
import { ContentService } from '../../../core/content.service';

@Component({
  selector: 'app-enquiries-admin',
  templateUrl: './enquiries-admin.html',
  styleUrl: '../admin.scss',
})
export class EnquiriesAdmin {
  private readonly content = inject(ContentService);

  readonly items = signal<Enquiry[]>([]);
  readonly message = signal('');
  readonly error = signal('');

  constructor() {
    this.reload();
  }

  reload(): void {
    this.content.listEnquiries().subscribe({
      next: (items) => this.items.set(items),
      error: () => this.error.set('Could not load enquiries'),
    });
  }

  setStatus(item: Enquiry, status: NonNullable<Enquiry['status']>): void {
    if (!item.id) return;
    this.content.updateEnquiryStatus(item.id, status).subscribe({
      next: () => {
        this.message.set(`Marked ${item.reference} as ${status}`);
        this.reload();
      },
      error: () => this.error.set('Update failed'),
    });
  }

  async remove(item: Enquiry): Promise<void> {
    if (!item.id) return;
    const ok = await confirmDelete(`Delete enquiry ${item.reference}?`, 'Delete enquiry?');
    if (!ok) return;
    this.content.deleteEnquiry(item.id).subscribe({
      next: () => {
        this.message.set('Enquiry deleted');
        this.reload();
      },
      error: () => this.error.set('Delete failed'),
    });
  }
}
