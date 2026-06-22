// Prefix a public-asset path with Vite's base URL so images resolve whether
// the site is served from the domain root (Netlify / custom domain) or from a
// subpath like GitHub Pages' /<repo>/.
export const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`
