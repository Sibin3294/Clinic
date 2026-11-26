export interface ClinicHour {
  days: string;
  time: string;
}

export interface ClinicProfile {
  id?: string;
  name: string;
  city: string;
  tagline: string;
  lede: string;
  announcement: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappHref: string;
  email: string;
  mapUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  addressLines: string[];
  hours: ClinicHour[];
  notes: string[];
  departments?: string[];
}

export interface Banner {
  id: string;
  src: string;
  alt: string;
  label: string;
  order?: number;
  active?: boolean;
}

export interface Doctor {
  id: string;
  _id?: string;
  slug?: string;
  name: string;
  specialty: string;
  credentials: string;
  years: number;
  bio: string;
  days: string;
  hours?: string;
  appointmentPhone?: string;
  appointmentPhoneHref?: string;
  focus: string[];
  initials: string;
  tone: 'pine' | 'copper' | 'gold' | 'clay' | 'ink' | 'sage';
  photo?: string;
  active?: boolean;
  order?: number;
}

export interface ClinicService {
  id: string;
  _id?: string;
  slug?: string;
  name: string;
  department: string;
  summary: string;
  includes: string[];
  suitedFor: string;
  duration: string;
  active?: boolean;
  order?: number;
}

export interface EnquiryDraft {
  name: string;
  phone: string;
  email: string;
  department: string;
  doctor: string;
  preferredDate: string;
  message: string;
}

export interface Enquiry extends EnquiryDraft {
  id?: string;
  reference: string;
  submittedAt: string;
  status?: 'new' | 'contacted' | 'closed';
}
