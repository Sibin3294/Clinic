/** Local service imagery keyed by service slug / loose name. */
const SERVICE_IMAGES: Record<string, string> = {
  'internal-medicine': '/services/svc-internal-medicine.svg',
  cardiology: '/services/svc-cardiology.svg',
  paediatrics: '/services/svc-paediatrics.svg',
  pediatrics: '/services/svc-paediatrics.svg',
  orthopaedics: '/services/svc-orthopaedics.svg',
  orthopedics: '/services/svc-orthopaedics.svg',
  dermatology: '/services/svc-skin-care.svg',
  'womens-health': '/services/svc-womens-health.svg',
  "women's-health": '/services/svc-womens-health.svg',
  'preventive-health': '/services/svc-preventive.svg',
  diagnostics: '/services/svc-lab.svg',
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
