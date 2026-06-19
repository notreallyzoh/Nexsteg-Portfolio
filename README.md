# NEXSTEG — Kuwait's Relentless Fitness Movement

An award-grade, single-page brand experience for NEXSTEG gym (Mahboula, Kuwait).
Built as a web-animation showcase: **React + Vite + GSAP + Lenis smooth scroll**,
choreographed page-load, custom cursor, magnetic buttons, scroll-velocity marquee,
animated counters, and full `prefers-reduced-motion` support.

> Crafted & developed by [Lagger Technologies](https://lagger.in/).

---

## Tech

| | |
|---|---|
| Framework | React 18 + Vite 5 |
| Animation | GSAP 3 + ScrollTrigger, `@gsap/react` |
| Smooth scroll | Lenis |
| Type | Anton (display) · Space Grotesk (UI/body) |
| Images | WebP, optimized with `sharp` |

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs static site to /dist
npm run preview    # preview the production build
```

## Re-optimize images

Source photos live in `_source/` (the original repo). To regenerate the
web-ready WebP set in `public/img/`:

```bash
npm run images
```

## Edit content

**All copy, prices, trainers, testimonials and contact details live in one file:**
[`src/data/site.js`](src/data/site.js). Change it there and it updates everywhere.

---

## ✅ Confirm before you go fully live

These came straight from the original repo and should be verified:

1. **WhatsApp number** — `WHATSAPP` in `src/data/site.js` is set to `919656778508`
   (the number your old contact form used). Replace with the gym's real Kuwait
   WhatsApp (digits only, country code first, no `+`) and update `whatsappDisplay`.
2. **Social links** — Instagram & Facebook are `#` placeholders in `site.socials`. Add real URLs.
3. **Coach #3** — the photo `trainer3.png` is a man but is labelled "Sarah Mutairi".
   Either swap in Sarah's real photo or correct the name/role.
4. **Transformation** — the "Rana Al-Sabah" feature photo (`transformation.png`) is
   also male in the source. Replace with the real member photo, or adjust the name.
5. (Optional) Swap any coach/member photos for higher-res versions, then run `npm run images`.

---

## Deploy (go live today)

The site is a static build (`/dist`). Recommended host: **Netlify** (free, auto-HTTPS,
easy custom domain). `netlify.toml` is already configured.

### Fastest — live in ~2 minutes
1. Run `npm run build`.
2. Go to **https://app.netlify.com/drop** and drag the **`dist`** folder in.
3. You get an instant live URL like `nexsteg-xyz.netlify.app`. Done for testing.

### Recommended — Git-connected auto-deploy
1. Push this repo to GitHub (see below).
2. Netlify → **Add new site → Import from Git** → pick the repo.
3. Build command `npm run build`, publish directory `dist` (auto-detected from `netlify.toml`).
4. Deploy.

### Point nexsteg.com (GoDaddy DNS)
**Keep your GoDaddy nameservers** (so your email keeps working) and just add records.
In Netlify: *Site → Domain management → Add a domain → `nexsteg.com`*, then in
**GoDaddy → Domain → DNS** add exactly what Netlify shows you (typically):

| Type | Name | Value |
|------|------|-------|
| A | `@` | `75.2.60.5` |
| CNAME | `www` | `your-site.netlify.app` |

- Delete GoDaddy's default parked `A @` record and turn **off** any Domain Forwarding.
- Netlify auto-issues a free SSL certificate once DNS resolves (minutes–1 hour).

> Vercel alternative: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`.
> Always use the exact values your host's dashboard displays.

## Push to GitHub

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
