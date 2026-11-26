import { Routes } from '@angular/router';
import { adminGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'മിത്ര ക്ലിനിക്',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'ഞങ്ങളെക്കുറിച്ച് · മിത്ര ക്ലിനിക്',
  },
  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors').then((m) => m.Doctors),
    title: 'ഡോക്ടർമാർ · മിത്ര ക്ലിനിക്',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.ServicesPage),
    title: 'സേവനങ്ങൾ · മിത്ര ക്ലിനിക്',
  },
  {
    path: 'laboratory',
    loadComponent: () => import('./pages/laboratory/laboratory').then((m) => m.Laboratory),
    title: 'ലബോറട്ടറി · മിത്ര ക്ലിനിക്',
  },
  {
    path: 'sadaram',
    loadComponent: () => import('./pages/sadaram/sadaram').then((m) => m.Sadaram),
    title: 'സാദരം · മിത്ര ക്ലിനിക്',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
    title: 'ഗാലറി · മിത്ര ക്ലിനിക്',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'ബന്ധപ്പെടുക · മിത്ര ക്ലിനിക്',
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
