import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

// Wait for both builds to finish before running this
const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render, getRoutes } = await import(new URL('./dist/server/entry-server.js', import.meta.url))

const routesToPrerender = getRoutes()

console.log(`Starting prerender for ${routesToPrerender.length} routes...`)

for (const url of routesToPrerender) {
  const { html } = render(url)

  const finalHtml = template.replace(`<!--app-html-->`, html)

  let filePath;
  if (url === '/') {
    filePath = 'dist/index.html'; // Overwrite the main index.html
  } else {
    filePath = `dist${url}/index.html`;
  }
  
  const absoluteFilePath = toAbsolute(filePath);
  const dirPath = path.dirname(absoluteFilePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(absoluteFilePath, finalHtml)
  console.log('Pre-rendered:', filePath)
}

// Remove dist/server because we don't need it on Github Pages
fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
console.log('✅ Pre-rendering complete!')
