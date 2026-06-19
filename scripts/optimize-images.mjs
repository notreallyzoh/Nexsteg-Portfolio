// Resize + convert the original repo photos into web-ready WebP.
// Source: ./_source  →  Output: ./public/img
import sharp from 'sharp'
import { mkdir, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, '_source')
const OUT = path.join(root, 'public', 'img')

// [ sourceFile, outName, width, options ]
const jobs = [
  ['bodybuilder.png', 'hero.webp', 1100, { alpha: true }],
  ['gym-bg.jpg', 'gym-bg.webp', 1920, { q: 66 }],
  ['transformation.png', 'transformation.webp', 1200, {}],
  ['trainer1.png', 'coach-sailesh.webp', 900, {}],
  ['trainer2.png', 'coach-naser.webp', 900, {}],
  ['trainer3.png', 'coach-sarah.webp', 900, {}],
  ['derek.jpg', 'member-derek.webp', 800, {}],
  ['anthony.jpg', 'member-anthony.webp', 800, {}],
  ['jhon.jpg', 'member-jhon.webp', 800, {}],
  ['Ezekiel.jpg', 'member-ezekiel.webp', 800, {}],
]

async function run() {
  await mkdir(OUT, { recursive: true })

  for (const [src, out, width, opt] of jobs) {
    const from = path.join(SRC, src)
    if (!existsSync(from)) {
      console.warn(`! skip (missing): ${src}`)
      continue
    }
    await sharp(from)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: opt.q ?? 74, effort: 5, alphaQuality: 90 })
      .toFile(path.join(OUT, out))
    console.log(`✓ ${src} → img/${out}`)
  }

  // Social share image (Open Graph) from the gym background
  const ogSrc = path.join(SRC, 'gym-bg.jpg')
  if (existsSync(ogSrc)) {
    await sharp(ogSrc)
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
      .jpeg({ quality: 80 })
      .toFile(path.join(OUT, 'og.jpg'))
    console.log('✓ gym-bg.jpg → img/og.jpg')
  }

  // Logo: keep a crisp PNG for favicon + a webp for in-page use
  const logoSrc = path.join(SRC, 'logo.png')
  if (existsSync(logoSrc)) {
    await copyFile(logoSrc, path.join(OUT, 'logo.png'))
    await sharp(logoSrc)
      .resize({ width: 240, withoutEnlargement: true })
      .webp({ quality: 92 })
      .toFile(path.join(OUT, 'logo.webp'))
    console.log('✓ logo.png → img/logo.png + img/logo.webp')
  }

  console.log('\nDone. Optimized images written to public/img/')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
