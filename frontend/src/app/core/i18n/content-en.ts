import { Banner, ClinicProfile, ClinicService, Doctor } from '../clinic.models';

/** English overlays for public CMS content (keyed by slug / stable fields). */
export const CLINIC_EN: Partial<ClinicProfile> = {
  name: 'Mitra Clinic',
  city: 'Koothali, Perambra',
  tagline: 'A trusted friend for your health!',
  lede:
    'In Koothali, near Perambra, Mitra Clinic & Diagnostic Centre brings quality treatment and experienced doctors under one roof — from general medicine and specialty care to laboratory and pharmacy services.',
  announcement: 'Sadaram · Free general doctor consultation 1–3 pm (except Sunday)',
  addressLines: [
    'Mitra Clinic & Diagnostic Centre',
    'Koothali Grama Panchayat, Perambra',
    'Kozhikode District, Kerala',
  ],
  hours: [
    { days: 'Laboratory', time: 'From 6:30 am' },
    { days: 'Doctor consultations', time: '8:00 am – 9:00 pm' },
    { days: 'Specialists', time: 'By scheduled days & times' },
  ],
  notes: [
    'Wide parking available',
    'Home care services available',
    'Sadaram: free general consultation 1–3 pm except Sunday',
  ],
  departments: [
    'General medicine',
    'Speciality consultation',
    'Laboratory',
    'Pharmacy',
    'ECG',
    'Procedure room',
    'Observation',
    'Home care',
  ],
};

export const BANNER_EN: Record<string, Partial<Banner>> = {
  'banners/clinic-exterior.jpg': {
    alt: 'Entrance of Mitra Clinic',
    label: 'Exterior',
  },
  'banners/clinic-reception.jpg': {
    alt: 'Reception at Mitra Clinic',
    label: 'Reception',
  },
  'banners/clinic-consulting.jpg': {
    alt: 'Consulting room at Mitra Clinic',
    label: 'Consulting room',
  },
};

export const DOCTOR_EN: Record<string, Partial<Doctor>> = {
  'dr-anil-kumar': {
    name: 'Dr. Anil Kumar',
    specialty: 'General medicine',
    bio: 'Consultation for fever, cold, cough, digestive issues, and lifestyle diseases.',
    days: 'Monday – Saturday',
    hours: '8:00 am – 1:00 pm',
    focus: ['Fever & infections', 'Lifestyle diseases', 'General check-ups'],
  },
  'dr-priya-nair': {
    name: 'Dr. Priya Nair',
    specialty: 'Paediatrics',
    bio: 'Child fever, growth monitoring, vaccination, and nutrition guidance.',
    days: 'Monday, Wednesday, Friday',
    hours: '4:00 pm – 7:00 pm',
    focus: ['Childhood fever', 'Vaccination', 'Growth monitoring'],
  },
  'dr-ramesh-menon': {
    name: 'Dr. Ramesh Menon',
    specialty: 'Orthopaedics',
    bio: 'Bone, joint, and back-pain assessment with treatment guidance for sports injuries.',
    days: 'Tuesday, Thursday, Saturday',
    hours: '10:00 am – 1:00 pm',
    focus: ['Joint pain', 'Back pain', 'Sports injury'],
  },
  'dr-sneha-thomas': {
    name: 'Dr. Sneha Thomas',
    specialty: 'Gynaecology',
    bio: 'Antenatal care, women’s health concerns, and menstrual health consultations.',
    days: 'Monday – Friday',
    hours: '5:00 pm – 8:00 pm',
    focus: ['Antenatal care', 'Women’s health', 'Follow-up care'],
  },
  'dr-fazil-rahman': {
    name: 'Dr. Fazil Rahman',
    specialty: 'ENT',
    bio: 'Ear, nose, and throat concerns including sinus and hearing issues.',
    days: 'Tuesday, Friday, Saturday',
    hours: '9:00 am – 12:00 pm',
    focus: ['Sinus', 'Throat pain', 'Hearing review'],
  },
  'dr-lakshmi-devi': {
    name: 'Dr. Lakshmi Devi',
    specialty: 'Dermatology',
    bio: 'Skin allergy, acne, hair fall, and common skin infections.',
    days: 'Wednesday, Saturday',
    hours: '3:30 pm – 6:30 pm',
    focus: ['Skin allergy', 'Acne', 'Hair care'],
  },
  'dr-vijay-krishnan': {
    name: 'Dr. Vijay Krishnan',
    specialty: 'Cardiology',
    bio: 'Heart-related concerns, blood pressure review, ECG interpretation, and heart-health advice.',
    days: 'Monday, Thursday',
    hours: '10:00 am – 1:00 pm',
    focus: ['Blood pressure', 'ECG', 'Heart health'],
  },
};

export const SERVICE_EN: Record<string, Partial<ClinicService>> = {
  'general-doctors': {
    name: 'General doctors (RMOs)',
    department: 'General medicine',
    summary:
      'General doctor consultations every day from 8 am to 9 pm for common illnesses and ongoing health concerns.',
    includes: ['Fever, cold, cough, and body pain', 'Digestive complaints', 'Lifestyle disease follow-up'],
    suitedFor: 'Everyday illnesses and first-line medical advice for the whole family.',
    duration: '8 AM – 9 PM',
  },
  'speciality-consultation': {
    name: 'Speciality consultation',
    department: 'Speciality consultation',
    summary:
      'Specialist doctors across key departments, available on scheduled days and times for expert consultation.',
    includes: ['Specialty assessment', 'Investigations as needed', 'Follow-up advice'],
    suitedFor: 'Patients who need focused specialty care beyond general medicine.',
    duration: 'By appointment schedule',
  },
  laboratory: {
    name: 'Laboratory',
    department: 'Laboratory',
    summary:
      'Trusted tests for accurate diagnosis. Laboratory services from 6:30 am for identifying concerns, tracking progress, and monitoring treatment.',
    includes: [
      'Testing facility from 6:30 am',
      'Trained laboratory staff',
      'Cleanliness and safety',
      'Focus on reliable test results',
      'Convenient service for patients',
    ],
    suitedFor: 'Tests requested by your doctor, or routine health screening.',
    duration: 'From 6:30 am',
  },
  pharmacy: {
    name: 'Pharmacy',
    department: 'Pharmacy',
    summary: 'On-site pharmacy so prescribed medicines are available without leaving the clinic.',
    includes: ['Prescription dispensing', 'Medicine guidance'],
    suitedFor: 'Patients collecting medicines after consultation.',
    duration: 'During clinic hours',
  },
  ecg: {
    name: 'ECG',
    department: 'ECG',
    summary: 'ECG testing to assess the heart’s electrical activity, done when advised by a doctor.',
    includes: ['ECG recording', 'Report for doctor review'],
    suitedFor: 'Chest discomfort, heart reviews, and doctor-requested cardiac checks.',
    duration: '10–20 min',
  },
  'procedure-room': {
    name: 'Procedure room',
    department: 'Procedure room',
    summary: 'A dedicated room for minor treatments and basic medical procedures.',
    includes: ['Minor procedures', 'Dressings and basic interventions'],
    suitedFor: 'Patients needing small procedures after clinical assessment.',
    duration: 'As advised',
  },
  observation: {
    name: 'Observation',
    department: 'Observation',
    summary:
      'Observation facility for patients who need short monitoring after assessment, as advised by the doctor.',
    includes: ['Clinical observation', 'Follow-up steps as needed'],
    suitedFor: 'Patients who need brief monitoring before going home or for further care.',
    duration: 'As advised',
  },
  'home-care': {
    name: 'Home care',
    department: 'Home care',
    summary:
      'Doctor, nursing, and lab sample collection at home for bedridden patients or those unable to visit the clinic.',
    includes: ['Doctor visits', 'Nursing support', 'Home blood sample collection'],
    suitedFor: 'Patients who cannot travel to the clinic for care or tests.',
    duration: 'By arrangement',
  },
};

export const ABOUT_VALUES_EN = [
  'Patient-centred care',
  'Quality and trust in treatment',
  'Hygiene and safety',
  'Affordable treatment rates for everyone',
  'Mutual respect for doctors and patients',
  'Social commitment and humanity',
];

export const ABOUT_VALUES_ML = [
  'രോഗികേന്ദ്രീകൃത പരിചരണം',
  'ചികിത്സയിൽ ഗുണമേന്മയും വിശ്വാസ്യതയും',
  'ശുചിത്വവും സുരക്ഷിതത്വവും',
  'എല്ലാവർക്കും പ്രാപ്യമായ ചികിത്സാനിരക്കുകൾ',
  'ഡോക്ടർമാരോടും രോഗികളോടും പരസ്പര ബഹുമാനം',
  'സാമൂഹിക പ്രതിബദ്ധതയും മാനവികതയും',
];

export type WhyMitraItem = {
  icon: 'doctors' | 'hours' | 'services' | 'calm' | 'parking' | 'hygiene' | 'rates' | 'sadaram';
  title: string;
  text: string;
};

export const ABOUT_WHY_EN: WhyMitraItem[] = [
  {
    icon: 'doctors',
    title: 'Experienced doctors',
    text: 'Doctors with expertise and experience across treatment departments.',
  },
  {
    icon: 'hours',
    title: 'Doctor consultations from 8 am to 9 pm',
    text: 'Convenient timing for people with work and daily responsibilities.',
  },
  {
    icon: 'services',
    title: 'Complete services',
    text: 'Doctor consultation, laboratory, pharmacy, ECG, procedure room, observation, and home care in one place.',
  },
  {
    icon: 'calm',
    title: 'Calm atmosphere',
    text: 'A quiet, clean environment that gives patients mental comfort and ease.',
  },
  {
    icon: 'parking',
    title: 'Wide parking',
    text: 'Ample parking for patients and companions visiting the clinic.',
  },
  {
    icon: 'hygiene',
    title: 'Focus on hygiene',
    text: 'Special attention to cleanliness and hygiene for patient safety and health.',
  },
  {
    icon: 'rates',
    title: 'Affordable treatment rates',
    text: 'A commitment to quality care at rates ordinary people can afford.',
  },
  {
    icon: 'sadaram',
    title: 'Sadaram – social responsibility',
    text: 'A social responsibility programme offering free general doctor consultation for eligible patients in need.',
  },
];

export const ABOUT_WHY_ML: WhyMitraItem[] = [
  {
    icon: 'doctors',
    title: 'പ്രഗത്ഭരായ ഡോക്ടർമാർ',
    text: 'വിവിധ ചികിത്സാ വിഭാഗങ്ങളിൽ പ്രാവീണ്യവും അനുഭവസമ്പത്തുമുള്ള ഡോക്ടർമാരുടെ സേവനം.',
  },
  {
    icon: 'hours',
    title: 'രാവിലെ 8 മുതൽ രാത്രി 9 വരെ പരിശോധന',
    text: 'രാവിലെ 8 മുതൽ രാത്രി 9 വരെ ഡോക്ടർമാരുടെ പരിശോധനാ സൗകര്യം. ജോലി തിരക്കും മറ്റ് ദൈനംദിന ഉത്തരവാദിത്വങ്ങളും ഉള്ളവർക്കും അനുയോജ്യമായ സമയം.',
  },
  {
    icon: 'services',
    title: 'സമഗ്രമായ സേവനങ്ങൾ',
    text: 'ഡോക്ടർ പരിശോധന, ലബോറട്ടറി, ഫാർമസി, ഇ.സി.ജി, പ്രൊസീജ്യർ റൂം, ഒബ്സർവേഷൻ, ഹോം കെയർ എന്നിവ ഒരിടത്ത്.',
  },
  {
    icon: 'calm',
    title: 'ശാന്തമായ അന്തരീക്ഷം',
    text: 'രോഗികൾക്ക് മാനസികമായ ആശ്വാസവും സൗകര്യവും നൽകുന്ന ശാന്തവും വൃത്തിയുള്ളതുമായ അന്തരീക്ഷം.',
  },
  {
    icon: 'parking',
    title: 'വിശാലമായ പാർക്കിംഗ്',
    text: 'ക്ലിനിക്കിലെത്തുന്ന രോഗികൾക്കും കൂട്ടിരിപ്പുകാർക്കും വാഹനങ്ങൾ പാർക്ക് ചെയ്യാനുള്ള വിശാലമായ സൗകര്യം.',
  },
  {
    icon: 'hygiene',
    title: 'ശുചിത്വത്തിന് പ്രാധാന്യം',
    text: 'രോഗികളുടെ സുരക്ഷയും ആരോഗ്യവും മുൻനിർത്തി വൃത്തിയും ശുചിത്വവും ഉറപ്പാക്കുന്നതിൽ പ്രത്യേക ശ്രദ്ധ.',
  },
  {
    icon: 'rates',
    title: 'പ്രാപ്യമായ ചികിത്സാനിരക്കുകൾ',
    text: 'ഗുണമേന്മയുള്ള ചികിത്സ സാധാരണക്കാർക്കും താങ്ങാനാകുന്ന നിരക്കിൽ ലഭ്യമാക്കാനുള്ള പ്രതിബദ്ധത.',
  },
  {
    icon: 'sadaram',
    title: 'സാദരം – സാമൂഹിക ഉത്തരവാദിത്വം',
    text: 'നിർധനരായ രോഗികൾക്ക് സൗജന്യ ജനറൽ ഡോക്ടർ പരിശോധന ലഭ്യമാക്കുന്ന സാമൂഹിക പ്രതിബദ്ധതാ പദ്ധതി.',
  },
];
