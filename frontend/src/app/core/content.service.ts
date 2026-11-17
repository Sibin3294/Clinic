import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE } from './api.config';
import { Banner, ClinicProfile, ClinicService, Doctor, Enquiry, EnquiryDraft } from './clinic.models';

const emptyClinic: ClinicProfile = {
  name: 'Meridian Clinic',
  city: '',
  tagline: '',
  lede: '',
  announcement: '',
  phoneDisplay: '',
  phoneHref: '',
  email: '',
  addressLines: [],
  hours: [],
  notes: [],
  departments: [],
};

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  readonly clinic = signal<ClinicProfile>(emptyClinic);
  readonly banners = signal<Banner[]>([]);
  readonly doctors = signal<Doctor[]>([]);
  readonly services = signal<ClinicService[]>([]);
  readonly loaded = signal(false);

  loadPublicContent(): void {
    this.http.get<ClinicProfile>(`${API_BASE}/clinic`).subscribe({
      next: (clinic) => this.clinic.set(clinic),
    });
    this.http.get<Banner[]>(`${API_BASE}/banners`).subscribe({
      next: (banners) => this.banners.set(banners),
    });
    this.http.get<Doctor[]>(`${API_BASE}/doctors`).subscribe({
      next: (doctors) => this.doctors.set(doctors),
    });
    this.http.get<ClinicService[]>(`${API_BASE}/services`).subscribe({
      next: (services) => {
        this.services.set(services);
        this.loaded.set(true);
      },
    });
  }

  submitEnquiry(draft: EnquiryDraft): Observable<Enquiry> {
    return this.http.post<Enquiry>(`${API_BASE}/enquiries`, draft);
  }

  // Admin APIs
  listBannersAdmin() {
    return this.http.get<Banner[]>(`${API_BASE}/banners/all`);
  }

  createBanner(body: Partial<Banner>) {
    return this.http.post<Banner>(`${API_BASE}/banners`, body).pipe(tap(() => this.refreshPublic()));
  }

  updateBanner(id: string, body: Partial<Banner>) {
    return this.http.put<Banner>(`${API_BASE}/banners/${id}`, body).pipe(tap(() => this.refreshPublic()));
  }

  deleteBanner(id: string) {
    return this.http.delete(`${API_BASE}/banners/${id}`).pipe(tap(() => this.refreshPublic()));
  }

  uploadImage(file: File) {
    const body = new FormData();
    body.append('image', file);
    return this.http.post<{ url: string; filename: string }>(`${API_BASE}/uploads`, body);
  }

  listDoctorsAdmin() {
    return this.http.get<Doctor[]>(`${API_BASE}/doctors/all`);
  }

  createDoctor(body: Partial<Doctor>) {
    return this.http.post<Doctor>(`${API_BASE}/doctors`, body).pipe(tap(() => this.refreshPublic()));
  }

  updateDoctor(id: string, body: Partial<Doctor>) {
    return this.http.put<Doctor>(`${API_BASE}/doctors/${id}`, body).pipe(tap(() => this.refreshPublic()));
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${API_BASE}/doctors/${id}`).pipe(tap(() => this.refreshPublic()));
  }

  listServicesAdmin() {
    return this.http.get<ClinicService[]>(`${API_BASE}/services/all`);
  }

  createService(body: Partial<ClinicService>) {
    return this.http.post<ClinicService>(`${API_BASE}/services`, body).pipe(tap(() => this.refreshPublic()));
  }

  updateService(id: string, body: Partial<ClinicService>) {
    return this.http.put<ClinicService>(`${API_BASE}/services/${id}`, body).pipe(tap(() => this.refreshPublic()));
  }

  deleteService(id: string) {
    return this.http.delete(`${API_BASE}/services/${id}`).pipe(tap(() => this.refreshPublic()));
  }

  updateClinic(body: Partial<ClinicProfile>) {
    return this.http.put<ClinicProfile>(`${API_BASE}/clinic`, body).pipe(
      tap((clinic) => this.clinic.set(clinic)),
    );
  }

  listEnquiries() {
    return this.http.get<Enquiry[]>(`${API_BASE}/enquiries`);
  }

  updateEnquiryStatus(id: string, status: Enquiry['status']) {
    return this.http.patch<Enquiry>(`${API_BASE}/enquiries/${id}`, { status });
  }

  deleteEnquiry(id: string) {
    return this.http.delete(`${API_BASE}/enquiries/${id}`);
  }

  private refreshPublic(): void {
    this.loadPublicContent();
  }
}
