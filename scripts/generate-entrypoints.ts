import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const entrypoint = 'native'
const src = path.resolve('src', entrypoint, 'index.d.ts')
const distDir = path.resolve('dist')
const base = path.join(distDir, entrypoint)

await fs.mkdir(distDir, { recursive: true })

await Promise.all([
  fs.copyFile(src, `${base}.d.ts`),
  fs.writeFile(`${base}.js`, ''),
  fs.writeFile(`${base}.mjs`, ''),
])
