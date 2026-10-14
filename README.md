# Fábio Rações Itaipuaçu — Site pronto para GitHub

Site responsivo em **React + Vite** com vitrine, catálogo demonstrativo e lista de consulta pelo WhatsApp.

## Publicar no GitHub Pages (passo a passo)

1. Crie um **repositório público** no [GitHub](https://github.com/new), preferencialmente com o nome `fabio-racoes-site`. Não marque a opção de criar README ou `.gitignore` — eles já estão neste projeto.
2. Extraia este ZIP. Envie **os arquivos e pastas de dentro do ZIP para a raiz do repositório** (inclusive a pasta oculta `.github`). No GitHub: **Add file → Upload files → Commit changes**. Alternativamente, use Git no terminal (veja abaixo).
3. Vá em **Settings → Pages → Build and deployment** e selecione **Source: GitHub Actions**. O repositório deve permitir GitHub Actions.
4. Abra a aba **Actions**: o fluxo **Publicar site no GitHub Pages** executa a compilação e publica o site a cada alteração na branch `main`.
5. Depois que o fluxo terminar com sucesso, o endereço será `https://SEU_USUARIO.github.io/fabio-racoes-site/` (substitua usuário e repositório pelos nomes reais).

**Importante:** a pasta `.github/workflows/` deve aparecer no repositório. Se o arquivo estiver oculto ao descompactar, habilite a exibição de arquivos ocultos. O site não é publicado apenas ao enviar o ZIP: é necessário **extrair os arquivos** e seguir as etapas.

### Alternativa: publicar com Git pelo terminal

Na pasta extraída:

```bash
git init
git add .
git commit -m "Publicar site Fábio Rações"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/fabio-racoes-site.git
git push -u origin main
```

Substitua `SEU_USUARIO` e `fabio-racoes-site` pelos identificadores do repositório que criou. Se já existir um repositório inicializado, adapte os comandos conforme necessário.

## Rodar no computador

Instale o **Node.js 22** ou versão compatível. Depois, na pasta do projeto:

```bash
npm ci
npm run dev
```

Para gerar a versão de produção padrão:

```bash
npm run build
```

Para reproduzir **o build do GitHub Pages** localmente (Linux/macOS):

```bash
GITHUB_REPOSITORY=SEU_USUARIO/fabio-racoes-site GITHUB_PAGES=true VITE_GITHUB_PAGES=true npm run build:pages
```

O resultado aparece em `dist/`. A pasta `dist/` é gerada automaticamente e **não precisa** ser enviada para o GitHub.

## Ajustes para GitHub Pages

- Publicação automática via `.github/workflows/deploy.yml`.
- Base de assets configurada automaticamente pelo nome do repositório (inclusive se for alterado).
- Links internos usam `#/produtos`, `#/entrega` etc. **no GitHub Pages**, para funcionar mesmo após atualizar uma página diretamente. Na execução normal, as rotas continuam sem `#`.
- Imagens utilizam `import.meta.env.BASE_URL`, funcionando nos dois ambientes.
- `robots.txt` e `sitemap.xml` gerados com URLs absolutas da publicação do GitHub Pages.
- Pastas pesadas/temporárias (`node_modules`, `dist`, logs, histórico `.git` da origem) e a configuração particular de hospedagem anterior foram removidas do pacote de entrega.

## Funcionalidades do site

- Home responsiva com foco em Pet & Horse.
- Catálogo com busca, filtros por animal e tipo e página individual de produto.
- Lista de consulta persistente com quantidade e exclusão.
- Envio de consulta pelo WhatsApp.
- Consulta de entrega por bairro ou CEP e contato pelo WhatsApp.
- Páginas Entrega, Sobre e Contato.
- Otimização básica de imagens WebP e metadados SEO.

## Informações que ainda precisam ser confirmadas com a loja

- Endereço completo, horário de atendimento e localização.
- Marcas, produtos, tamanhos, fotos reais e preços.
- Estoque e disponibilidade, áreas, prazos e condições de entrega.
- Formas de pagamento, história institucional e disponibilidade da linha Piscina.
- Domínio personalizado (se necessário) e informações legais antes do lançamento definitivo.

O catálogo atual tem **itens demonstrativos**, e as imagens são ilustrativas. Não publique informações fictícias como se fossem confirmadas.

## Arquivos para editar

| Necessidade | Arquivo |
|---|---|
| Produtos e categorias | `src/data.js` |
| WhatsApp, Instagram e páginas | `src/App.jsx` |
| Aparência e layout | `src/styles.css` |
| Metadados e dados estruturados | `index.html` |
| Publicação no GitHub | `.github/workflows/deploy.yml` |
| Configuração do Vite | `vite.config.js` |

**Observação sobre domínio próprio:** o build foi preparado para o endereço padrão do GitHub Pages. Se conectar um domínio personalizado, será necessário ajustar a configuração `base`/SEO e roteamento conforme o novo endereço.
