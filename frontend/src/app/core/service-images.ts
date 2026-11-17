/** Local service imagery keyed by service slug. */
const SERVICE_IMAGES: Record<string, string> = {
  'internal-medicine': 'services/internal-medicine.svg',
  cardiology: 'services/cardiology.svg',
  paediatrics: 'services/paediatrics.svg',
  orthopaedics: 'services/orthopaedics.svg',
  dermatology: 'services/dermatology.svg',
  'womens-health': 'services/womens-health.svg',
  'preventive-health': 'services/preventive-health.svg',
  diagnostics: 'services/diagnostics.svg',
};

const FALLBACK = 'banners/clinic-consulting.jpg';

export function serviceImage(slugOrId: string | undefined | null): string {
  if (!slugOrId) {
    return FALLBACK;
  }
  return SERVICE_IMAGES[slugOrId] || FALLBACK;
}
