import { Routes } from '@angular/router';
import { adminGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Mitra Clinic',
  },
  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors').then((m) => m.Doctors),
    title: 'Doctors · Mitra Clinic',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.ServicesPage),
    title: 'Services · Mitra Clinic',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Enquiry · Mitra Clinic',
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login').then((m) => m.AdminLogin),
    title: 'Admin login · Mitra Clinic',
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin-shell').then((m) => m.AdminShell),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then((m) => m.AdminDashboard),
        title: 'Admin · Mitra Clinic',
      },
      {
        path: 'banners',
        loadComponent: () => import('./pages/admin/banners/banners-admin').then((m) => m.BannersAdmin),
        title: 'Banners · Admin',
      },
      {
        path: 'doctors',
        loadComponent: () => import('./pages/admin/doctors/doctors-admin').then((m) => m.DoctorsAdmin),
        title: 'Doctors · Admin',
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/admin/services/services-admin').then((m) => m.ServicesAdmin),
        title: 'Services · Admin',
      },
      {
        path: 'clinic',
        loadComponent: () => import('./pages/admin/clinic/clinic-admin').then((m) => m.ClinicAdmin),
        title: 'Clinic profile · Admin',
      },
      {
        path: 'enquiries',
        loadComponent: () =>
          import('./pages/admin/enquiries/enquiries-admin').then((m) => m.EnquiriesAdmin),
        title: 'Enquiries · Admin',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
