// Process the brand logos into web assets via precise alpha/colour bbox cropping.
// "Logo White" = full NEXSTEG wordmark (WHITE) + violet X + orange FIT HUB → for dark UI.
// "Logo Black" = same wordmark in black → for light backgrounds.
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(root, 'public', 'img')
const white = path.join(root, 'Logo White Nexsteg.png')
const black = path.join(root, 'Logo Black Nexsteg.png')

async function load(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  const at = (x, y) => {
    const i = (y * W + x) * C
    return [data[i], data[i + 1], data[i + 2], data[i + 3]]
  }
  const opaque = (x, y) => at(x, y)[3] > 128 // any visible pixel
  const violet = (x, y) => {
    const [r, g, b, a] = at(x, y)
    return a > 128 && b > g + 20 // purple/magenta only (excludes white + orange)
  }
  return { W, H, opaque, violet }
}

function bbox({ W, H }, test) {
  let minX = W,
    minY = H,
    maxX = 0,
    maxY = 0,
    found = 0
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (test(x, y)) {
        found++
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1, found }
}

function rowBands({ W, H, opaque }, thr = 2) {
  const rows = []
  for (let y = 0; y < H; y++) {
    let c = 0
    for (let x = 0; x < W; x++) if (opaque(x, y)) c++
    rows.push(c)
  }
  const bands = []
  let start = -1
  for (let y = 0; y < H; y++) {
    if (rows[y] > thr && start === -1) start = y
    else if (rows[y] <= thr && start !== -1) (bands.push([start, y - 1]), (start = -1))
  }
  if (start !== -1) bands.push([start, H - 1])
  return bands
}

const pad = (b, p, W, H) => ({
  left: Math.max(0, b.left - p),
  top: Math.max(0, b.top - p),
  width: Math.min(W - Math.max(0, b.left - p), b.width + p * 2),
  height: Math.min(H - Math.max(0, b.top - p), b.height + p * 2),
})

async function run() {
  const img = await load(white)
  const bands = rowBands(img)
  const wordBand = bands[0] // white NEXSTEG + violet X
  console.log('white bands:', bands, '| violet bbox:', bbox(img, img.violet))

  // Full lockup: everything (wordmark + FIT HUB)
  const full = bbox(img, img.opaque)
  await sharp(white)
    .extract(pad(full, 3, img.W, img.H))
    .resize({ height: 240, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(OUT, 'logo-lockup.webp'))

  // Wordmark only (NEXSTEG with X) — for the nav, crisp & horizontal
  const wordH = wordBand[1] - wordBand[0] + 1
  const wordCols = bbox({ W: img.W, H: wordH }, (x, y) => img.opaque(x, y + wordBand[0]))
  const wordBox = pad(
    { left: wordCols.left, top: wordBand[0], width: wordCols.width, height: wordH },
    3,
    img.W,
    img.H
  )
  await sharp(white)
    .extract(wordBox)
    .resize({ height: 120, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(OUT, 'logo-wordmark.webp'))

  // X mark only (by colour) — for favicon / small badge
  const xbox = pad(bbox(img, img.violet), 2, img.W, img.H)
  await sharp(white).extract(xbox).resize({ height: 140, withoutEnlargement: true }).webp({ quality: 92 }).toFile(path.join(OUT, 'mark.webp'))
  await sharp(white)
    .extract(xbox)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'favicon.png'))

  // Black wordmark (light-bg use)
  const bimg = await load(black)
  const bfull = bbox(bimg, bimg.opaque)
  await sharp(black)
    .extract(pad(bfull, 3, bimg.W, bimg.H))
    .resize({ height: 240, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(OUT, 'logo-word-dark.webp'))

  console.log('Wrote logo-lockup, logo-wordmark, mark, favicon, logo-word-dark')
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
