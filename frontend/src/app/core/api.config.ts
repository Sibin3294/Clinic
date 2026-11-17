import { environment } from '../../environments/environment';

/** API origin without trailing slash (empty in local dev). */
export const API_ORIGIN = environment.apiOrigin.replace(/\/$/, '');

/** Base path for JSON API calls. */
export const API_BASE = API_ORIGIN ? `${API_ORIGIN}/api` : '/api';

/** Resolve uploaded or relative media paths for img src. */
export function mediaUrl(path: string | null | undefined): string {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) {
    return path;
  }
  if (path.startsWith('/uploads')) {
    return API_ORIGIN ? `${API_ORIGIN}${path}` : path;
  }
  return path;
}
