import { defineConfig } from 'vite'

// GitHub Pages de projetos publica em /nome-do-repositorio/.
// Páginas do tipo usuario.github.io publicam na raiz.
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const pagesBase = isGitHubPages && repository && !repository.toLowerCase().endsWith('.github.io')
  ? `/${repository}/`
  : '/'

export default defineConfig({
  base: pagesBase,
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
