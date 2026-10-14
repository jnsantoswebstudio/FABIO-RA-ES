# Fábio Rações Itaipuaçu — Site comercial

Protótipo funcional de vitrine, catálogo e lista de consulta via WhatsApp.

## Rodar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos otimizados serão criados em `dist/`.

## O que já funciona

- Home responsiva com áreas Pet & Horse
- Catálogo com busca, filtros por animal e tipo
- Página individual de produto
- Lista persistente com quantidade e remoção
- Mensagem organizada para consulta no WhatsApp
- Consulta de entrega por bairro ou CEP
- Formulário de contato direcionado ao WhatsApp
- Rotas de Entrega, Sobre e Contato
- SEO básico, dados estruturados, robots e sitemap inicial
- Imagens WebP otimizadas e carregamento tardio fora do hero

## Informações que precisam ser confirmadas

- Endereço completo e localização exata no mapa
- Horário de atendimento
- Marcas, produtos, pesos, descrições e fotos reais
- Preços e política de exibição de preço
- Estoque e disponibilidade
- Áreas, prazos e condições de entrega
- Formas de pagamento
- História e texto institucional da empresa
- Continuidade da categoria Piscina
- Domínio final para completar URLs canônicas e sitemap

## Onde editar

- Produtos e categorias demonstrativos: `src/data.js`
- WhatsApp, Instagram e conteúdo das páginas: `src/App.jsx`
- Identidade visual e responsividade: `src/styles.css`
- SEO e dados estruturados: `index.html`

As imagens atuais são ilustrativas e devem ser substituídas pelas fotografias oficiais da loja e dos produtos antes da publicação.
