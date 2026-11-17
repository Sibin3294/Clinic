/** Local service imagery keyed by service slug / loose name. */
const SERVICE_IMAGES: Record<string, string> = {
  'internal-medicine': '/media/m1.svg',
  cardiology: '/media/m2.svg',
  paediatrics: '/media/m3.svg',
  pediatrics: '/media/m3.svg',
  orthopaedics: '/media/m4.svg',
  orthopedics: '/media/m4.svg',
  dermatology: '/media/m5.svg',
  'womens-health': '/media/m6.svg',
  'preventive-health': '/media/m7.svg',
  diagnostics: '/media/m8.svg',
};

const FALLBACK = '/banners/clinic-consulting.jpg';

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function serviceImage(slugOrId: string | undefined | null): string {
  if (!slugOrId) {
    return FALLBACK;
  }
  const key = normalizeKey(slugOrId);
  return SERVICE_IMAGES[key] || FALLBACK;
}
