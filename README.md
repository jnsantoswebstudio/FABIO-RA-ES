# Fábio Rações — publicação corrigida no GitHub Pages

**Endereço exato:** https://jinsantoswebstudio.github.io/FABIO-RA-ES/

## Como atualizar o GitHub

1. Abra o repositório **FABIO-RA-ES** da conta **jinsantoswebstudio**.
2. Extraia o ZIP e envie **o conteúdo da pasta extraída**, não o arquivo ZIP nem a pasta principal. Na raiz do repositório deve aparecer `index.html`, `404.html`, `images/` e `.github/`.
3. Substitua os arquivos antigos. Atenção: se existir `.github/workflows/deploy.yml` antigo, apague-o, pois ele poderá fazer outra publicação concorrente. Deixe somente `.github/workflows/pages.yml`.
4. Clique em **Commit changes**.
5. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**. Na aba **Actions**, acompanhe o workflow **Publicar site Fábio Rações**.
6. Após o deploy concluir, teste em uma janela anônima ou atualize com **Ctrl + Shift + R**.

## O erro corrigido

Na versão anterior, o arquivo JavaScript compilado foi alterado manualmente para usar um roteador hash. A modificação introduziu uma referência inválida a uma função interna (`ue`), o que causava uma falha de inicialização do React. A tela `Carregando o site...` era apenas um fallback do HTML.

Esta versão usa a compilação original sem o roteador corrompido, define o basename **/FABIO-RA-ES** para o navegador, embute CSS e JavaScript diretamente no HTML para que não dependam de caminhos de assets externos e inclui a página real pré-renderizada. `404.html` permite recarregar links internos do catálogo.

## Conferência rápida

- `index.html` e `404.html` devem estar no nível principal, não em `/dist`, nem dentro de outra pasta.
- Abra DevTools > Console: nenhum erro vermelho de React ou módulo deveria aparecer.
- Teste início, produtos, sobre, contato e o botão WhatsApp.
- Produtos com fotos ausentes continuam exibindo seus blocos de catálogo previstos no projeto original, sem inventar fotos ou preços.

**Este pacote é de publicação estática.** Para editar React/Vite, use o ZIP separado de código-fonte.
