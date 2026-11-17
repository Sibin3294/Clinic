import { Injectable, inject, signal } from '@angular/core';
import { Enquiry, EnquiryDraft } from './clinic.models';
import { ContentService } from './content.service';

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly content = inject(ContentService);
  private readonly latest = signal<Enquiry | null>(null);
  readonly latestEnquiry = this.latest.asReadonly();

  submit(draft: EnquiryDraft): void {
    this.content.submitEnquiry(draft).subscribe({
      next: (enquiry) => this.latest.set(enquiry),
    });
  }

  clear(): void {
    this.latest.set(null);
  }
}
