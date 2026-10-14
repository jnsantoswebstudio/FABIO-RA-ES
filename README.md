# Fábio Rações Itaipuaçu — SITE CORRIGIDO PARA GITHUB PAGES

## Corrigido: site branco / tela em branco

Este ZIP contém um site **já compilado**. Não é necessário instalar Node.js, Vite ou npm para publicar.
Os arquivos `index.html`, `assets/` e `images/` **já estão prontos**. Ao abrir a página inicial,
o conteúdo do site será mostrado. Os links internos usam endereços `#/produtos`, `#/entrega`, etc.
para funcionar também quando a página for atualizada.

### Publicar no GitHub (substituir versão anterior)

1. Extraia este ZIP no computador. **Não envie o ZIP fechado**: envie os arquivos de dentro dele.
2. Abra o repositório do seu site no GitHub; remova da raiz os arquivos antigos do site que conflitarem (principalmente `index.html`, `assets/`, `images/` e `.github/workflows/deploy.yml`).
3. Envie os **arquivos e pastas da raiz desta pasta** pelo menu **Add file > Upload files**. Garanta que `index.html` está na raiz e que `assets/` e `images/` aparecem no repositório. Envie também `.github/workflows/deploy.yml` para publicação automática.
4. Em **Settings > Pages**, escolha **GitHub Actions** em *Build and deployment > Source*.
5. Abra **Actions** e confira a conclusão da execução **Publicar site sem compilação**.
6. Acesse a URL indicada em **Settings > Pages**, que costuma ser `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.

#### Alternativa: publicar pela branch (sem Actions)

Em **Settings > Pages**, escolha **Deploy from a branch**, selecione a branch `main` (ou `master`), pasta `/(root)`, e **Save**. Este ZIP já contém o arquivo `index.html` pronto na raiz.

### Não publique o projeto antigo em vez deste

Se enviar o `index.html` da versão React/Vite que contém `src="/src/main.jsx"`, ele **não funciona diretamente** no GitHub Pages e pode produzir tela branca. O arquivo `index.html` neste ZIP carrega o pacote compilado relativo `./assets/` e tem um aviso de contingência caso a página não carregue.

### O que foi corrigido

- HTML usa caminhos relativos, funcionando no endereço de repositório GitHub Pages, mesmo com nome diferente.
- Imagens carregadas em relação ao script, evitando URLs que apontem para a raiz incorreta do domínio.
- Navegação em hash (`#/`) para que menus, produtos e atualização das páginas funcionem em hospedagem estática.
- Publicação automática via GitHub Actions **sem npm nem compilação**.
- Versão pronta para Pages pela branch `main` + pasta `/(root)`.
- Tela inicial de contingência com WhatsApp, mesmo se o JavaScript estiver indisponível.
- Gravação da lista protegida quando o navegador bloqueia armazenamento local, evitando erro que poderia desmontar a página.

### Arquivos

- `index.html`: página inicial.
- `404.html`: fallback de páginas antigas do site.
- `assets/`: JavaScript e CSS compilados.
- `images/`: imagens otimizadas.
- `.github/workflows/deploy.yml`: publicação automática.

**Atenção:** o catálogo mantém as informações ilustrativas e demonstrativas da versão original; fotos, estoque e preços reais não foram verificados. O presente pacote é a **versão para publicação** e não o código React editável.
