# Clockd website

Marketing site for [Clockd AI Scanner](https://apps.apple.com/us/app/clockd-ai-scanner/id6772232502).

**Production URL:** https://getclockdapp.com

Separate from the mobile app repo (`clockd`) and the legacy legal GitHub Pages repo (`clockd-legal`).

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing page |
| `/privacy` | Privacy policy (ready for App Store migration) |
| `/terms` | Terms of service |
| `/app-ads.txt` | AdMob authorized sellers file |

The iOS app still points at GitHub Pages legal URLs until the next release updates `EXPO_PUBLIC_PRIVACY_POLICY_URL`, `EXPO_PUBLIC_TERMS_OF_SERVICE_URL`, and App Store Connect metadata.

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

In Namecheap → Domain List → **getclockdapp.com** → **Advanced DNS**:

| Type | Host | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Then in Vercel → Project → Settings → Domains, add:

- `getclockdapp.com`
- `www.getclockdapp.com` (optional redirect to apex)

DNS can take up to an hour (often minutes). Vercel provisions HTTPS automatically.

## After the site is live

1. Confirm https://getclockdapp.com/app-ads.txt returns the AdMob line.
2. Confirm https://www.getclockdapp.com/sitemap-index.xml and https://www.getclockdapp.com/robots.txt.
3. In [Google Search Console](https://search.google.com/search-console), add `getclockdapp.com`, verify, and submit `https://www.getclockdapp.com/sitemap-index.xml`.
4. On the next App Store version (when metadata unlocks):
   - **Marketing URL** → `https://getclockdapp.com`
   - **Support URL** → `https://getclockdapp.com`
   - **Privacy Policy URL** → `https://getclockdapp.com/privacy`
   - **Terms** → `https://getclockdapp.com/terms`
3. Update EAS env + `store.config.json` in the app repo, then ship a new build.
4. Click **Check for updates** in AdMob after store URLs change.

## Stack

- [Astro](https://astro.build) static site
- Assets from App Store marketing screenshots in the app repo
