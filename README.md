# Proj’Móveis Design — pré-venda com percepção de valor

Experiência para celular em React, TypeScript e Vite. Em vez de apenas apresentar ambientes, ajuda o visitante a entender escolhas, revisar o que está descrito em uma proposta e iniciar uma conversa com prioridades e dúvidas concretas.

## Executar

```sh
npm install
npm run dev
npm run build
npm test
```

O Vite informa os endereços local e de rede. Para abrir no celular, conecte-o à mesma rede e use o endereço de rede exibido. O site não foi publicado.

Os testes usam Playwright/Chromium. Instale o navegador com `npx playwright install chromium` ou defina `TEST_BROWSER_PATH` apontando para um Chromium já instalado. No ambiente desta entrega, a validação usou o Chromium existente. A comparação inclui 360, 390, 430 e 1440 px.

## Percurso comercial

1. **Explorar um ambiente:** cinco pontos interativos distinguem o que a foto mostra do que precisa ser confirmado. Cada detalhe pode virar uma prioridade pessoal.
2. **Comparar a mesma entrega:** roteiro de materiais, ferragens, distribuição, acabamento e instalação. O visitante marca “Está claro” ou “Quero confirmar”. Pode copiar o roteiro sem informar dados.
3. **Trazer referências para a própria rotina:** ambientes do perfil com observações visuais e perguntas, sem histórias de clientes inventadas. Ideias podem ser adicionadas à conversa.
4. **Conversar com contexto:** formulário em três etapas. A mensagem incorpora prioridades, dúvidas e marcações explícitas. Itens não revisados não são apresentados como respostas do visitante.

O roteiro não atribui notas a fornecedores, não certifica qualidade e não afirma que o mais caro é melhor. O site não promete aumento de conversão.

## Conteúdo e configuração

- `src/config.ts`: empresa, contato, modo de demonstração, recortes das imagens, detalhes educativos, perguntas e ambientes.
- `src/ValueExperience.tsx`: explorador e roteiro interativo.
- `src/Qualification.tsx` e `src/contact.ts`: formulário, resumo comercial, cópia e link do WhatsApp.
- `src/ui.tsx`: componentes compartilhados e enquadramento das imagens.
- `src/styles.css`: identidade creme, grafite e vinho, responsividade e movimento reduzido.

`site.demonstration` permanece `true`: o fluxo termina em prévia/cópia, sem abrir um atendimento real. Para uso comercial, revise o conteúdo e altere para `false`. O número `5554991412455` foi transcrito do telefone legível na arte de localização. Com o modo comercial e um número válido, a prévia oferece o botão do WhatsApp; o usuário confirma o envio no aplicativo.

Nenhum backend, armazenamento persistente, upload, analytics ou envio automático foi adicionado. Recarregar a página limpa respostas e seleções. A cópia tem alternativa manual quando a área de transferência está indisponível, inclusive em acesso HTTP pela rede local.

## Material da empresa

### Vistas internas com IA

Ao tocar nos pontos do explorador, uma transição revela uma das cinco vistas internas: organização, estrutura em camadas, acabamento, ferragens ou montagem. É possível alternar as vistas, repetir a abertura e voltar à foto original; Escape também fecha e devolve o foco ao ponto escolhido. O modo de movimento reduzido elimina a animação. Há estado de carregamento e tentativa novamente em caso de falha.

As imagens foram geradas previamente com a ferramenta integrada `image_gen` e exportadas para `public/images/interiors/` (140–195 KB por vista). Não há chamada de IA no navegador nem credenciais expostas. O aviso “Simulação com IA” permanece visível: são conceitos educativos, não documentos técnicos do móvel fotografado. Prompts completos em `docs/interior-prompts.md`. Componentes em `src/InteriorReveal.tsx` e estilos em `src/interior.css`.

As quatro capturas fornecidas foram copiadas, sem alterar os originais, para `public/company/`:

- `profile.png`: perfil, símbolo e identificação da marca.
- `projects.png`: publicações de ambientes.
- `location.png`: fachada, endereço e telefone.
- `about.png`: material institucional que informa mais de 25 anos de experiência e mais de 6 mil projetos. A origem desses números é indicada junto à exibição no site.

Os recortes são feitos por CSS, preservando os pixels e o conteúdo original. As imagens são identificadas como publicações do perfil: não presumimos que cada imagem seja uma fotografia de obra entregue. Não são atribuídos materiais, marcas de ferragens, garantias, depoimentos ou resultados não informados.

As capturas têm miniaturas pequenas. O enquadramento é adequado para a demonstração, mas as fotos originais em resolução maior melhorarão a nitidez antes de uma publicação comercial. O mapa decorativo da arte de localização não é utilizado como mapa real. Os assets de banco de imagens da primeira versão continuam no repositório, mas não são usados nesta interface.

## Roteiro para apresentar à fábrica

Abra no celular e toque em “Ferragens”. Marque que isso importa no projeto. No roteiro, selecione materiais como “Quero confirmar”. Escolha uma ideia de ambiente e avance no formulário. Mostre que a mensagem final pergunta por especificações e já informa o que o cliente valoriza.

Essa demonstração torna concreta a proposta comercial: ajudar o visitante a reconhecer diferenças antes de tratar os orçamentos como equivalentes.
