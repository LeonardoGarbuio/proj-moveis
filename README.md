# Forma — demonstração de móveis planejados

Landing page mobile-first em React, TypeScript e Vite. Comparação educativa, projetos ilustrativos, perguntas frequentes e qualificação em três etapas com prévia e cópia da mensagem.

## Executar

```sh
npm install
npm run dev
```

O terminal informa o endereço local e da rede. Para visualizar em um celular na mesma rede, use o endereço de rede. Build de produção: `npm run build`. Testes de navegador: `npm test` (instale Chromium com `npx playwright install chromium` se necessário).

## Personalizar

`src/config.ts` centraliza marca, paleta, modo de demonstração, WhatsApp, região, imagens, comparações, projetos, FAQ e provas verificadas. Conteúdo estrutural complementar está em `src/main.tsx`; estilos em `src/styles.css`.

Para uso comercial, revise todos os textos e exemplos com a fábrica, substitua as imagens por projetos autorizados, configure o telefone internacional apenas com dígitos (55 + DDD + número), preencha a região e altere `demonstration` para `false`. Provas só aparecem se adicionadas em `verifiedProofs`. Nenhum depoimento, garantia ou prazo comercial foi inventado. Com número válido e modo comercial, a revisão oferece o link do WhatsApp; a pessoa confirma o envio no aplicativo. Sem número válido, continua disponível a cópia da mensagem.

Não há backend, armazenamento persistente, upload, analytics ou envio automático. Fotos e plantas são compartilhadas na conversa. Recarregar a página limpa as respostas. Fontes DM Sans e Manrope são carregadas pelo Google Fonts, com fontes de sistema como alternativa.

## Imagens ilustrativas

Arquivos locais em duas resoluções (640 e 1600 px), obtidos do Unsplash. Não representam trabalhos realizados pela marca provisória.

- Cozinha: identificador CDN `photo-1556912172-45b7abe8b7e1`
- Quarto (`room.jpg`): identificador CDN `photo-1611892440504-42a792e24d32`
- Sala: identificador CDN `photo-1600210492486-724fe5c67fb0`
- Detalhe de gaveta: `public/images/drawer.jpg` e `drawer-small.jpg`, ilustração gerada com a ferramenta integrada de geração de imagens. Prompt completo em `docs/image-prompt.txt`. É uma referência conceitual, não um desenho técnico.

Fonte dos arquivos: `https://images.unsplash.com/{identificador}?auto=format&fit=crop&w={640|1600}&q=80`. Licença: https://unsplash.com/license . Substituir imagens ilustrativas por fotos autorizadas da fábrica antes da publicação comercial.

## Apresentação

1. Mostre como comparar especificações na seção de detalhes.
2. Abra a história de um ambiente.
3. Preencha a qualificação no celular.
4. Mostre a mensagem organizada, pronta para iniciar a conversa.

Esta entrega não publica o site e não promete resultados comerciais.
