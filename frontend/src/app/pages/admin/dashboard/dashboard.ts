import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/auth.service';
import { Banner, ClinicService, Doctor, Enquiry } from '../../../core/clinic.models';
import { ContentService } from '../../../core/content.service';

interface DashboardStats {
  banners: number;
  bannersActive: number;
  doctors: number;
  doctorsActive: number;
  services: number;
  servicesActive: number;
  enquiries: number;
  enquiriesNew: number;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['../admin.scss', './dashboard.scss'],
})
export class AdminDashboard {
  private readonly content = inject(ContentService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly specialtyCanvas = viewChild<ElementRef<HTMLCanvasElement>>('specialtyChart');
  private readonly enquiryCanvas = viewChild<ElementRef<HTMLCanvasElement>>('enquiryChart');

  private specialtyChart?: Chart;
  private enquiryChart?: Chart;
  private chartData: {
    specialtyLabels: string[];
    specialtyValues: number[];
    enquiryLabels: string[];
    enquiryValues: number[];
  } | null = null;

  readonly loading = signal(true);
  readonly admin = this.auth.currentAdmin;
  readonly today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  readonly stats = signal<DashboardStats>({
    banners: 0,
    bannersActive: 0,
    doctors: 0,
    doctorsActive: 0,
    services: 0,
    servicesActive: 0,
    enquiries: 0,
    enquiriesNew: 0,
  });
  readonly recentEnquiries = signal<Enquiry[]>([]);
  readonly hasSpecialtyChart = signal(false);
  readonly hasEnquiryChart = signal(false);

  constructor() {
    forkJoin({
      banners: this.content.listBannersAdmin(),
      doctors: this.content.listDoctorsAdmin(),
      services: this.content.listServicesAdmin(),
      enquiries: this.content.listEnquiries(),
    }).subscribe({
      next: ({ banners, doctors, services, enquiries }) => {
        this.applyData(banners, doctors, services, enquiries);
        this.loading.set(false);
        // Wait for @if chart panels to mount before drawing canvases.
        setTimeout(() => this.renderCharts());
      },
      error: () => this.loading.set(false),
    });

    afterNextRender(() => {
      this.renderCharts();
      this.destroyRef.onDestroy(() => this.destroyCharts());
    });
  }

  private applyData(
    banners: Banner[],
    doctors: Doctor[],
    services: ClinicService[],
    enquiries: Enquiry[],
  ): void {
    const specialtyMap = new Map<string, number>();
    for (const doctor of doctors) {
      specialtyMap.set(doctor.specialty, (specialtyMap.get(doctor.specialty) || 0) + 1);
    }
    const specialties = [...specialtyMap.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const statusOrder = ['new', 'contacted', 'closed'] as const;
    const statusMap = new Map<string, number>(statusOrder.map((key) => [key, 0]));
    for (const enquiry of enquiries) {
      const key = enquiry.status || 'new';
      statusMap.set(key, (statusMap.get(key) || 0) + 1);
    }

    const specialtyValues = specialties.map((item) => item.value);
    const enquiryValues = statusOrder.map((key) => statusMap.get(key) || 0);

    this.stats.set({
      banners: banners.length,
      bannersActive: banners.filter((item) => item.active !== false).length,
      doctors: doctors.length,
      doctorsActive: doctors.filter((item) => item.active !== false).length,
      services: services.length,
      servicesActive: services.filter((item) => item.active !== false).length,
      enquiries: enquiries.length,
      enquiriesNew: statusMap.get('new') || 0,
    });
    this.recentEnquiries.set(enquiries.slice(0, 5));
    this.hasSpecialtyChart.set(specialtyValues.some((value) => value > 0));
    this.hasEnquiryChart.set(enquiryValues.some((value) => value > 0));

    this.chartData = {
      specialtyLabels: specialties.map((item) => item.label),
      specialtyValues,
      enquiryLabels: statusOrder.map((key) => key[0].toUpperCase() + key.slice(1)),
      enquiryValues,
    };
  }

  private renderCharts(): void {
    if (!this.chartData) {
      return;
    }

    this.destroyCharts();

    const palette = ['#12352f', '#a68446', '#8d3328', '#3e544d', '#b56a3c', '#1c5349', '#6b7f74'];
    const specialtyEl = this.specialtyCanvas()?.nativeElement;
    const enquiryEl = this.enquiryCanvas()?.nativeElement;

    if (specialtyEl && this.hasSpecialtyChart()) {
      this.specialtyChart = new Chart(
        specialtyEl,
        this.doughnutConfig(this.chartData.specialtyLabels, this.chartData.specialtyValues, palette),
      );
    }

    if (enquiryEl && this.hasEnquiryChart()) {
      this.enquiryChart = new Chart(
        enquiryEl,
        this.doughnutConfig(
          this.chartData.enquiryLabels,
          this.chartData.enquiryValues,
          ['#a68446', '#1c5349', '#6b7f74'],
        ),
      );
    }
  }

  private doughnutConfig(
    labels: string[],
    values: number[],
    colors: string[],
  ): ChartConfiguration<'doughnut'> {
    return {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors.slice(0, Math.max(labels.length, 1)),
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 14,
              color: '#3e544d',
              font: { family: 'Outfit, sans-serif', size: 12 },
            },
          },
        },
      },
    };
  }

  private destroyCharts(): void {
    this.specialtyChart?.destroy();
    this.enquiryChart?.destroy();
    this.specialtyChart = undefined;
    this.enquiryChart = undefined;
  }
}
