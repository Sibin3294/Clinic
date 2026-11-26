import { Banner, ClinicProfile, ClinicService, Doctor } from '../clinic.models';
import { Lang } from '../language.service';
import { BANNER_EN, CLINIC_EN, DOCTOR_EN, SERVICE_EN } from './content-en';

export function localizeClinic(clinic: ClinicProfile, lang: Lang): ClinicProfile {
  if (lang !== 'en') {
    return clinic;
  }
  return {
    ...clinic,
    ...CLINIC_EN,
    phoneDisplay: clinic.phoneDisplay,
    phoneHref: clinic.phoneHref,
    whatsappDisplay: clinic.whatsappDisplay,
    whatsappHref: clinic.whatsappHref,
    email: clinic.email,
    mapUrl: clinic.mapUrl,
    facebookUrl: clinic.facebookUrl,
    instagramUrl: clinic.instagramUrl,
  };
}

export function localizeBanners(banners: Banner[], lang: Lang): Banner[] {
  if (lang !== 'en') {
    return banners;
  }
  return banners.map((banner) => {
    const overlay = BANNER_EN[banner.src] || {};
    return { ...banner, ...overlay };
  });
}

export function localizeDoctors(doctors: Doctor[], lang: Lang): Doctor[] {
  if (lang !== 'en') {
    return doctors;
  }
  return doctors.map((doctor) => {
    const key = doctor.slug || doctor.id;
    const overlay = DOCTOR_EN[key] || {};
    return {
      ...doctor,
      ...overlay,
      appointmentPhone: doctor.appointmentPhone,
      appointmentPhoneHref: doctor.appointmentPhoneHref,
      photo: doctor.photo,
      years: doctor.years,
    };
  });
}

export function localizeServices(services: ClinicService[], lang: Lang): ClinicService[] {
  if (lang !== 'en') {
    return services;
  }
  return services.map((service) => {
    const key = service.slug || service.id;
    const overlay = SERVICE_EN[key] || {};
    return { ...service, ...overlay };
  });
}
