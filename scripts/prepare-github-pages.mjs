import { writeFile } from 'node:fs/promises'

// URLs absolutas válidas para os arquivos SEO gerados no deploy.
const repository = process.env.GITHUB_REPOSITORY
if (!repository) {
  console.log('Build local: pulando sitemap do GitHub Pages (GITHUB_REPOSITORY indefinido).')
  process.exit(0)
}
const [owner, name] = repository.split('/')
if (!owner || !name) throw new Error('GITHUB_REPOSITORY inválido.')
const base = name.toLowerCase().endsWith('.github.io') ? '/' : `/${name}/`
const origin = `https://${owner}.github.io`
const homepage = new URL(base, origin).href
const sitemap = new URL(`${base}sitemap.xml`, origin).href

// Como páginas internas usam #/..., indexamos somente a página inicial.
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${homepage.replaceAll('&', '&amp;')}</loc></url>
</urlset>
`
await writeFile('dist/sitemap.xml', xml)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`)
console.log(`Arquivos SEO configurados para ${homepage}`)
