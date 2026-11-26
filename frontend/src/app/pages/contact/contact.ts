import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContentService } from '../../core/content.service';
import { EnquiryService } from '../../core/enquiry.service';
import { TPipe } from '../../core/t.pipe';
import { ContactIcon } from '../../shared/contact-icon';

type Field = 'name' | 'phone' | 'email' | 'department' | 'preferredDate' | 'message' | 'consent';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, TPipe, ContactIcon],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly formBuilder = inject(FormBuilder);
  private readonly enquiries = inject(EnquiryService);
  private readonly content = inject(ContentService);

  readonly clinic = this.content.clinic;
  readonly doctors = this.content.doctors;
  readonly departments = computed(() => this.clinic().departments ?? []);
  readonly today = new Date().toISOString().slice(0, 10);
  readonly attempted = signal(false);
  readonly receipt = this.enquiries.latestEnquiry;

  /** Bound from the `doctor` query parameter. */
  readonly doctor = input<string>();
  /** Bound from the `department` query parameter. */
  readonly department = input<string>();

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    doctor: [''],
    preferredDate: ['', [Validators.required, Contact.visitDay]],
    message: ['', [Validators.required, Validators.minLength(12)]],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    effect(() => {
      this.applyPrefill();
    });
  }

  invalid(name: Field): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.attempted());
  }

  dateError(): string {
    const control = this.form.controls.preferredDate;
    if (!this.invalid('preferredDate')) {
      return '';
    }
    if (control.hasError('closedDay')) {
      return 'The clinic is closed on Sundays. Choose another day.';
    }
    if (control.hasError('pastDate')) {
      return 'Choose today or a future clinic day.';
    }
    return 'Choose a preferred day.';
  }

  doctorName(id: string): string {
    if (!id) {
      return 'No consultant preference';
    }
    return this.doctors().find((item) => item.id === id)?.name ?? 'No consultant preference';
  }

  formatDate(isoDate: string): string {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  submit(): void {
    this.attempted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { consent: _consent, ...draft } = this.form.getRawValue();
    this.enquiries.submit(draft);
  }

  reset(): void {
    this.enquiries.clear();
    this.attempted.set(false);
    this.form.reset({
      name: '',
      phone: '',
      email: '',
      department: '',
      doctor: '',
      preferredDate: '',
      message: '',
      consent: false,
    });
    this.applyPrefill();
  }

  private applyPrefill(): void {
    const match = this.doctors().find((item) => item.id === this.doctor());
    if (match) {
      this.form.patchValue({ doctor: match.id, department: match.specialty });
      return;
    }

    const departmentName = this.department();
    if (departmentName && this.departments().includes(departmentName)) {
      this.form.patchValue({ department: departmentName });
    }
  }

  private static visitDay(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) {
      return null;
    }

    const selected = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      return { pastDate: true };
    }
    if (selected.getDay() === 0) {
      return { closedDay: true };
    }
    return null;
  }
}
