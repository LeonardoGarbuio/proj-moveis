export const site = {
  name: "Proj’Móveis Design",
  demonstration: true,
  whatsapp: "5554991412455",
  phoneLabel: "(54) 99141-2455",
  instagram: "https://www.instagram.com/proj.moveis.design/",
  address: "Rua Via Veneto, s/n · Bairro dos Pinheiros",
  city: "Flores da Cunha · RS",
  // Informações transcritas do material institucional enviado pelo usuário.
  experience: "25+",
  projectsCount: "6 mil+",
};
export type CompanyPhoto = {
  src: string;
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  alt: string;
};
// A interface recorta as capturas sem alterar os arquivos originais.
const grid = (
  x: number,
  y: number,
  width: number,
  height: number,
  alt: string,
): CompanyPhoto => ({
  src: "/company/projects.png",
  sourceWidth: 1677,
  sourceHeight: 961,
  x,
  y,
  width,
  height,
  alt,
});
export const photos = {
  hero: grid(
    1038,
    13,
    238,
    297,
    "Cozinha com armários escuros, madeira e bancada em península, publicada no perfil da Proj’Móveis",
  ),
  kitchen: grid(
    68,
    13,
    237,
    296,
    "Cozinha do perfil da Proj’Móveis com armários amadeirados, torre de eletrodomésticos e bancada",
  ),
  bedroom: grid(
    1280,
    640,
    239,
    313,
    "Quarto do perfil da Proj’Móveis com armários ao redor da cama e iluminação na cabeceira",
  ),
  living: grid(
    554,
    639,
    238,
    313,
    "Painel de televisão com nichos, gavetas e iluminação, publicado no perfil da Proj’Móveis",
  ),
  office: grid(
    68,
    316,
    237,
    316,
    "Escritório do perfil da Proj’Móveis com bancada, gaveteiro e prateleiras",
  ),
  warmKitchen: grid(
    310,
    317,
    238,
    315,
    "Cozinha do perfil da Proj’Móveis com armários escuros, madeira e iluminação de bancada",
  ),
  factory: {
    src: "/company/location.png",
    sourceWidth: 903,
    sourceHeight: 877,
    x: 0,
    y: 25,
    width: 475,
    height: 680,
    alt: "Fachada da Proj’Móveis Design na imagem institucional fornecida",
  } as CompanyPhoto,
  logo: {
    src: "/company/profile.png",
    sourceWidth: 1823,
    sourceHeight: 952,
    x: 534,
    y: 68,
    width: 151,
    height: 151,
    alt: "Símbolo da Proj’Móveis Design",
  } as CompanyPhoto,
};
export const details = [
  {
    id: "projeto",
    name: "Projeto",
    label: "Espaço que funciona",
    x: 52,
    y: 59,
    title: "Bonito é caber na sua rotina.",
    visible: "Uma bancada em península aproxima preparo e convivência.",
    invisible:
      "A foto não diz se a circulação, as alturas e o espaço para guardar funcionam para você.",
    question:
      "Como a distribuição será adaptada às minhas medidas e à minha rotina?",
    benefit: "Aproveitar o ambiente sem improvisar depois.",
    priority: "Aproveitar melhor o espaço",
  },
  {
    id: "material",
    name: "Material",
    label: "Escolhas por dentro",
    x: 24,
    y: 29,
    title: "A cor aparece. A especificação, nem sempre.",
    visible:
      "O contraste entre frentes escuras e superfícies amadeiradas define o visual.",
    invisible:
      "Tipo de painel, espessuras, estrutura e indicação de uso não podem ser confirmados só pela imagem.",
    question:
      "Quais materiais e espessuras estão previstos em cada parte do móvel?",
    benefit: "Entender o que está sendo comprado, peça por peça.",
    priority: "Conhecer os materiais e a estrutura",
  },
  {
    id: "acabamento",
    name: "Acabamento",
    label: "Encontros e bordas",
    x: 75,
    y: 62,
    title: "O cuidado mora onde uma peça encontra a outra.",
    visible: "Frentes, bancada e laterais formam as linhas do ambiente.",
    invisible:
      "Bordas, emendas e encontros precisam de fotos próximas ou de uma amostra para serem avaliados.",
    question: "Posso ver de perto como ficam as bordas, emendas e encontros?",
    benefit: "Escolher sabendo quais detalhes vão ficar à vista todos os dias.",
    priority: "Cuidar do acabamento e dos detalhes",
  },
  {
    id: "ferragens",
    name: "Ferragens",
    label: "Abrir. Fechar. Repetir.",
    x: 27,
    y: 68,
    title: "Você vai usar muito mais do que fotografar.",
    visible: "Portas e gavetas organizam a parte inferior do ambiente.",
    invisible:
      "A imagem não revela o mecanismo, o amortecimento, a capacidade de carga ou os ajustes.",
    question: "Quais ferragens estão incluídas e como funcionam no uso diário?",
    benefit: "Avaliar o movimento e a praticidade, além da aparência.",
    priority: "Ter praticidade ao abrir portas e gavetas",
  },
  {
    id: "montagem",
    name: "Montagem",
    label: "Até o último ajuste",
    x: 61,
    y: 83,
    title: "A entrega não termina no desenho.",
    visible: "O conjunto depende do encontro entre móveis, paredes e piso.",
    invisible:
      "Instalação, regulagens, prazos e suporte precisam estar descritos na proposta.",
    question:
      "A proposta inclui instalação, ajustes e quais condições de pós-venda?",
    benefit: "Saber quem cuida de cada etapa e o que está incluído.",
    priority: "Ter clareza sobre instalação e pós-venda",
  },
] as const;
export type DetailId = (typeof details)[number]["id"];
export type CheckState = "clear" | "confirm";
export type QuoteChecks = Partial<Record<DetailId, CheckState>>;
export const quoteItems: {
  id: DetailId;
  title: string;
  description: string;
}[] = [
  {
    id: "material",
    title: "Materiais e espessuras",
    description:
      "O que será usado nas frentes, na estrutura e nas partes internas?",
  },
  {
    id: "ferragens",
    title: "Ferragens e mecanismos",
    description: "Quais modelos, funções e capacidades estão incluídos?",
  },
  {
    id: "projeto",
    title: "Medidas e distribuição",
    description:
      "As propostas consideram o mesmo ambiente e a mesma configuração?",
  },
  {
    id: "acabamento",
    title: "Acabamentos e detalhes",
    description: "Bordas, emendas e finalizações estão especificadas?",
  },
  {
    id: "montagem",
    title: "Instalação e pós-venda",
    description: "Serviços incluídos, ajustes e condições estão claros?",
  },
];
export const projects = [
  {
    id: "cozinha",
    category: "COZINHA",
    title: "Cada coisa no seu lugar. Você no centro.",
    photo: photos.kitchen,
    observation:
      "A torre reúne os eletrodomésticos, enquanto a bancada cria um ponto de apoio e convivência.",
    question:
      "Onde você prepara, guarda e recebe hoje? Essa resposta muda a distribuição.",
    priority: "Organização e circulação na cozinha",
  },
  {
    id: "quarto",
    category: "QUARTO",
    title: "Armazenamento que faz parte do ambiente.",
    photo: photos.bedroom,
    observation:
      "Os armários ocupam a área ao redor da cama e a iluminação destaca a cabeceira.",
    question: "O que precisa ficar à mão e o que pode ser guardado mais alto?",
    priority: "Armazenamento bem distribuído no quarto",
  },
  {
    id: "sala",
    category: "SALA",
    title: "O painel também pode resolver a rotina.",
    photo: photos.living,
    observation:
      "Nichos, gavetas e painel dividem o mesmo conjunto, com áreas abertas e fechadas.",
    question:
      "Além da TV, o que você precisa acomodar, esconder ou deixar à vista?",
    priority: "Integração e organização na sala",
  },
];
export const faqs = [
  [
    "Já tenho outros orçamentos. Posso conversar mesmo assim?",
    "Sim. Use o roteiro acima para conferir se as propostas descrevem a mesma entrega. Na conversa, explique o que está claro e o que você ainda precisa entender. O objetivo é comparar especificações e serviços junto com o preço.",
  ],
  [
    "Quer dizer que o mais caro é sempre melhor?",
    "Não. Preço alto, sozinho, não comprova qualidade. O que permite uma comparação justa é saber quais materiais, ferragens, soluções e serviços estão incluídos — e se fazem sentido para você.",
  ],
  [
    "Posso enviar uma imagem de IA ou uma referência?",
    "Sim. Ela ajuda a mostrar o que você imagina. Medidas, materiais, estrutura e viabilidade ainda precisam de avaliação técnica. Uma imagem bonita não substitui um projeto executável.",
  ],
  [
    "Preciso ter todas as medidas e um projeto pronto?",
    "Não precisa ter tudo decidido para iniciar a conversa. Diga o que já tem: medidas, planta, fotos ou apenas uma ideia. As próximas etapas e eventuais custos de projeto serão esclarecidos no atendimento.",
  ],
  [
    "Quais ambientes e cidades vocês atendem?",
    "A Proj’Móveis apresenta móveis sob medida para ambientes residenciais, comerciais e corporativos. A empresa fica em Flores da Cunha, RS. Informe sua cidade para confirmar a disponibilidade de atendimento no seu endereço.",
  ],
];
