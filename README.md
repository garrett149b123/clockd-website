# WorthIt website

Marketing site for [WorthIt](https://isitworthit.io) (App Store listing: [WorthIt AI Scanner](https://apps.apple.com/us/app/clockd-ai-scanner/id6772232502)).

**Production URL:** https://isitworthit.io

The App Store URL still uses the `clockd-ai-scanner` slug. TikTok stays [@getclockdapp](https://www.tiktok.com/@getclockdapp) until that handle can be renamed. Instagram is [@getworthitapp](https://www.instagram.com/getworthitapp/).

This repo is separate from the mobile app. The GitHub remote for this site is `garrett149b123/clockd-website`.

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/app-ads.txt` | AdMob authorized sellers file |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Deploy on Vercel (free)

1. Push this repo to GitHub (`garrett149b123/clockd-website`).
2. In [Vercel](https://vercel.com/new), import the repo.
3. Framework preset: **Astro** (auto-detected).
4. Deploy — no env vars required for v1.

## Namecheap DNS → Vercel

In Namecheap → Domain List → **isitworthit.io** → **Advanced DNS**:

| Type | Host | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Then in Vercel → Project → Settings → Domains, add:

- `isitworthit.io`
- `www.isitworthit.io` (optional redirect to apex)

DNS can take up to an hour (often minutes). Vercel provisions HTTPS automatically.

## After the site is live

1. Confirm https://isitworthit.io/app-ads.txt returns the AdMob line.
2. Confirm https://isitworthit.io/sitemap-index.xml and https://isitworthit.io/robots.txt.
3. In [Google Search Console](https://search.google.com/search-console), add `isitworthit.io`, verify, and submit `https://isitworthit.io/sitemap-index.xml`.
4. App Store Connect marketing, support, privacy, and terms URLs should point at `https://isitworthit.io`, `/privacy`, and `/terms`.
5. Click **Check for updates** in AdMob after store URLs change.

## Stack

- [Astro](https://astro.build) static site
- Blue mascot and phone captures from the WorthIt app
