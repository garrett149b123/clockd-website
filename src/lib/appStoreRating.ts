import { APP_STORE_ID, APP_STORE_RATING, APP_STORE_RATING_COUNT } from '../data/site';

export type AppStoreRating = {
  rating: number;
  count: number;
};

/** Fallback if Apple’s lookup API is unreachable at build time. */
export const FALLBACK_APP_STORE_RATING: AppStoreRating = {
  rating: APP_STORE_RATING,
  count: APP_STORE_RATING_COUNT,
};

/**
 * Live App Store rating via Apple’s public iTunes Lookup API.
 * No key required. Safe to call at build time or from the browser.
 */
export async function fetchAppStoreRating(
  appId: string = APP_STORE_ID,
): Promise<AppStoreRating> {
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`itunes_lookup_${res.status}`);

  const json = (await res.json()) as {
    results?: Array<{
      averageUserRating?: number;
      userRatingCount?: number;
    }>;
  };
  const row = json.results?.[0];
  const rating = Number(row?.averageUserRating);
  const count = Number(row?.userRatingCount);
  if (!Number.isFinite(rating) || rating <= 0 || !Number.isFinite(count) || count < 0) {
    throw new Error('itunes_lookup_invalid');
  }
  return {
    rating: Math.round(rating * 10) / 10,
    count: Math.round(count),
  };
}

export async function getAppStoreRating(): Promise<AppStoreRating> {
  try {
    return await fetchAppStoreRating();
  } catch {
    return FALLBACK_APP_STORE_RATING;
  }
}

export function formatRatingLabel(rating: number, count: number): string {
  const ratingText = rating.toFixed(1);
  const countText = count === 1 ? '1 rating' : `${count} ratings`;
  return `${ratingText} on the App Store · ${countText}`;
}
