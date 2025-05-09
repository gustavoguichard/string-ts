import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const entry = 'native'
const src = path.resolve('src', entry, 'index.d.ts')
const dist = path.resolve('dist', `${entry}.d.ts`)

let code = await fs.readFile(src, 'utf8')
code = code.replace(/(\.\.\/[^'"]+)\.ts/g, '$1') // strip ".ts"

await fs.writeFile(dist, code)
await fs.writeFile(path.resolve('dist', `${entry}.js`), '')
await fs.writeFile(path.resolve('dist', `${entry}.mjs`), '')
