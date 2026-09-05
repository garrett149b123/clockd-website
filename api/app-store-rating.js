export default async function handler(_req, res) {
  try {
    const upstream = await fetch('https://itunes.apple.com/lookup?id=6772232502', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'upstream_failed' }));
      return;
    }

    const json = await upstream.json();
    const row = json?.results?.[0] ?? {};
    const rating = Number(row.averageUserRating);
    const count = Number(row.userRatingCount);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.end(
      JSON.stringify({
        rating: Number.isFinite(rating) ? Math.round(rating * 10) / 10 : null,
        count: Number.isFinite(count) ? Math.round(count) : null,
      }),
    );
  } catch {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'lookup_failed' }));
  }
}
