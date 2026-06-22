// Tiny dependency-free static server for local subpath testing.
import http from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(process.argv[2] || '_pagestest')
const PORT = process.env.PORT || 5055
const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
}

http
  .createServer(async (req, res) => {
    try {
      const p = decodeURIComponent(req.url.split('?')[0])
      let fp = path.join(ROOT, p)
      if (existsSync(fp) && statSync(fp).isDirectory()) fp = path.join(fp, 'index.html')
      if (!existsSync(fp)) {
        res.statusCode = 404
        res.end('Not found')
        return
      }
      const data = await readFile(fp)
      res.setHeader('Content-Type', TYPES[path.extname(fp)] || 'application/octet-stream')
      res.end(data)
    } catch (e) {
      res.statusCode = 500
      res.end(String(e))
    }
  })
  .listen(PORT, () => console.log('serving', ROOT, 'on', PORT))
