const clinicProfile = {
  key: 'default',
  name: 'Mitra Clinic',
  city: 'Koothali, Perambra',
  tagline: 'A trusted friend for your health.',
  lede:
    'Mitra Clinic & Diagnostic Centre in Koothali, near Perambra, brings quality treatment and experienced doctors under one roof — from general medicine and specialty care to laboratory and pharmacy services.',
  announcement: 'Sadaram · Free general doctor consultation for eligible patients, 1–3 pm (except Sunday)',
  phoneDisplay: '+91 00000 00000',
  phoneHref: 'tel:+910000000000',
  email: 'mitraclinic@gmail.com',
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
    'Wide parking available on site',
    'Home care for patients who cannot visit the clinic',
    'Sadaram free general consultation 1–3 pm, except Sunday',
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

const banners = [
  {
    src: 'banners/clinic-exterior.jpg',
    alt: 'Entrance of Mitra Clinic & Diagnostic Centre.',
    label: 'Exterior',
    order: 0,
    active: true,
  },
  {
    src: 'banners/clinic-reception.jpg',
    alt: 'Reception desk at Mitra Clinic.',
    label: 'Reception',
    order: 1,
    active: true,
  },
  {
    src: 'banners/clinic-consulting.jpg',
    alt: 'Consulting room at Mitra Clinic.',
    label: 'Consulting room',
    order: 2,
    active: true,
  },
];

/** Placeholder consultants until the client provides the real roster. */
const doctors = [
  {
    slug: 'general-medicine-rmo',
    name: 'General Doctor (RMO)',
    specialty: 'General medicine',
    credentials: 'MBBS',
    years: 0,
    bio: 'Full-time general doctors are available from 8 am to 9 pm for fever, cold, cough, body pain, digestive issues, and lifestyle diseases.',
    days: 'Daily · 8 am – 9 pm',
    focus: ['Fever & infections', 'Lifestyle diseases', 'General check-ups'],
    initials: 'GD',
    tone: 'pine',
    order: 0,
  },
  {
    slug: 'speciality-consultation',
    name: 'Specialty Consultants',
    specialty: 'Speciality consultation',
    credentials: 'As per specialty',
    years: 0,
    bio: 'Experienced specialists consult on fixed days and times. Each patient receives care matched to their condition after a detailed review.',
    days: 'By schedule',
    focus: ['Specialty review', 'Follow-up care', 'Treatment plans'],
    initials: 'SC',
    tone: 'copper',
    order: 1,
  },
];

const services = [
  {
    slug: 'general-doctors',
    name: 'General doctors (RMOs)',
    department: 'General medicine',
    summary:
      'General doctor consultations every day from 8 am to 9 pm for common illnesses and ongoing health concerns.',
    includes: [
      'Fever, cold, cough, and body pain',
      'Digestive complaints',
      'Lifestyle disease follow-up',
    ],
    suitedFor: 'Everyday illnesses and first-line medical advice for the whole family.',
    duration: 'As needed · 8 am – 9 pm',
    order: 0,
  },
  {
    slug: 'speciality-consultation',
    name: 'Speciality consultation',
    department: 'Speciality consultation',
    summary:
      'Specialist doctors across key departments, available on scheduled days and times for expert consultation.',
    includes: ['Specialty assessment', 'Investigations as needed', 'Follow-up advice'],
    suitedFor: 'Patients who need focused specialty care beyond general medicine.',
    duration: 'By appointment schedule',
    order: 1,
  },
  {
    slug: 'laboratory',
    name: 'Laboratory',
    department: 'Laboratory',
    summary:
      'Laboratory services from 6:30 am for diagnosis, health checks, and monitoring treatment progress.',
    includes: ['Morning sample collection', 'Diagnostic tests', 'Report support for your doctor'],
    suitedFor: 'Tests requested by your doctor, or routine health screening.',
    duration: 'From 6:30 am',
    order: 2,
  },
  {
    slug: 'pharmacy',
    name: 'Pharmacy',
    department: 'Pharmacy',
    summary: 'On-site pharmacy so prescribed medicines are available without leaving the clinic.',
    includes: ['Prescription dispensing', 'Medicine guidance'],
    suitedFor: 'Patients collecting medicines after consultation.',
    duration: 'During clinic hours',
    order: 3,
  },
  {
    slug: 'ecg',
    name: 'ECG',
    department: 'ECG',
    summary: 'ECG testing to assess the heart’s electrical activity, done when advised by a doctor.',
    includes: ['ECG recording', 'Report for doctor review'],
    suitedFor: 'Chest discomfort, heart reviews, and doctor-requested cardiac checks.',
    duration: '10–20 min',
    order: 4,
  },
  {
    slug: 'procedure-room',
    name: 'Procedure room',
    department: 'Procedure room',
    summary: 'A dedicated room for minor treatments and basic medical procedures.',
    includes: ['Minor procedures', 'Dressings and basic interventions'],
    suitedFor: 'Patients needing small procedures after clinical assessment.',
    duration: 'As advised',
    order: 5,
  },
  {
    slug: 'observation',
    name: 'Observation',
    department: 'Observation',
    summary:
      'Observation facility for patients who need short monitoring after assessment, as advised by the doctor.',
    includes: ['Clinical observation', 'Follow-up steps as needed'],
    suitedFor: 'Patients who need brief monitoring before going home or for further care.',
    duration: 'As advised',
    order: 6,
  },
  {
    slug: 'home-care',
    name: 'Home care',
    department: 'Home care',
    summary:
      'Doctor, nursing, and lab sample collection at home for bedridden patients or those unable to visit the clinic.',
    includes: ['Doctor visits', 'Nursing support', 'Home blood sample collection'],
    suitedFor: 'Patients who cannot travel to the clinic for care or tests.',
    duration: 'By arrangement',
    order: 7,
  },
];

module.exports = { clinicProfile, banners, doctors, services };
