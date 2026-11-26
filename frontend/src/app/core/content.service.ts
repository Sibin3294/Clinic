import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_BASE } from './api.config';
import { Banner, ClinicProfile, ClinicService, Doctor, Enquiry, EnquiryDraft } from './clinic.models';
import { localizeBanners, localizeClinic, localizeDoctors, localizeServices } from './i18n/localize';
import { LanguageService } from './language.service';

const emptyClinic: ClinicProfile = {
  name: 'മിത്ര ക്ലിനിക്',
  city: '',
  tagline: '',
  lede: '',
  announcement: '',
  phoneDisplay: '',
  phoneHref: '',
  whatsappDisplay: '',
  whatsappHref: '',
  email: '',
  mapUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  addressLines: [],
  hours: [],
  notes: [],
  departments: [],
};

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly language = inject(LanguageService);

  private readonly clinicRaw = signal<ClinicProfile>(emptyClinic);
  private readonly bannersRaw = signal<Banner[]>([]);
  private readonly doctorsRaw = signal<Doctor[]>([]);
  private readonly servicesRaw = signal<ClinicService[]>([]);

  readonly clinic = computed(() => localizeClinic(this.clinicRaw(), this.language.lang()));
  readonly banners = computed(() => localizeBanners(this.bannersRaw(), this.language.lang()));
  readonly doctors = computed(() => localizeDoctors(this.doctorsRaw(), this.language.lang()));
  readonly services = computed(() => localizeServices(this.servicesRaw(), this.language.lang()));
  readonly loaded = signal(false);

  loadPublicContent(): void {
    this.http.get<ClinicProfile>(`${API_BASE}/clinic`).subscribe({
      next: (clinic) => this.clinicRaw.set(clinic),
    });
    this.http.get<Banner[]>(`${API_BASE}/banners`).subscribe({
      next: (banners) => this.bannersRaw.set(banners),
    });
    this.http.get<Doctor[]>(`${API_BASE}/doctors`).subscribe({
      next: (doctors) => this.doctorsRaw.set(doctors),
    });
    this.http.get<ClinicService[]>(`${API_BASE}/services`).subscribe({
      next: (services) => {
        this.servicesRaw.set(services);
        this.loaded.set(true);
      },
    });
  }

  submitEnquiry(draft: EnquiryDraft): Observable<Enquiry> {
    return this.http.post<Enquiry>(`${API_BASE}/enquiries`, draft);
  }

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
      tap((clinic) => this.clinicRaw.set(clinic)),
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
