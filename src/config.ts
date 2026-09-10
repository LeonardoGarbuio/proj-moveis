export const site = {
  name: 'forma', subtitle: 'MÓVEIS PLANEJADOS', demonstration: true,
  whatsapp: '', region: '',
  colors: { cream: '#f7f5ee', ink: '#30392e', green: '#46553e', wood: '#af7853' },
  hero: { title: 'Parecem iguais na foto.', emphasis: 'A diferença aparece no dia a dia.', description: 'Entenda o que avaliar no seu móvel planejado antes de comparar orçamentos.' },
  images: { kitchen: '/images/kitchen.jpg', bedroom: '/images/room.jpg', living: '/images/living.jpg', detail: '/images/drawer.jpg' },
  verifiedProofs: [] as { title: string; description: string }[],
};
export const comparisons = [
  { name: 'Ferragens', title: 'A diferença que você sente em cada abertura.', look: 'Observe o movimento das portas e gavetas. Pergunte sobre amortecimento, capacidade de carga e regulagem.', benefit: 'Uma escolha adequada ajuda a tornar o uso mais suave e confortável.', question: 'Quais ferragens estão incluídas na proposta?', image: site.images.detail, icon: 'sliders' },
  { name: 'Material', title: 'A base de um móvel bem pensado.', look: 'Compare o tipo de painel, a espessura e a indicação de uso para cada ambiente. Um nome de material, sozinho, não conta tudo.', benefit: 'Materiais especificados para o uso ajudam na conservação do móvel.', question: 'Qual material foi previsto para cada parte?', image: site.images.kitchen, icon: 'layers' },
  { name: 'Acabamento', title: 'Os pequenos detalhes ficam à vista.', look: 'Observe bordas, emendas e superfícies de perto. Confira também as orientações de limpeza e conservação.', benefit: 'Um acabamento bem executado cuida do visual e facilita o dia a dia.', question: 'Como serão finalizadas as bordas e emendas?', image: site.images.detail, icon: 'sparkles' },
  { name: 'Projeto', title: 'Um espaço que acompanha a sua rotina.', look: 'Pense na circulação, na altura dos armários e no que precisa guardar. O projeto deve partir de como você usa o espaço.', benefit: 'Uma distribuição adequada aproveita o ambiente e deixa tudo mais acessível.', question: 'Como o projeto considera minha rotina?', image: site.images.living, icon: 'ruler' },
  { name: 'Montagem', title: 'O cuidado continua na instalação.', look: 'Confirme quem instala, quais ajustes estão previstos e como funciona o atendimento depois da entrega.', benefit: 'Alinhamento e ajustes adequados fazem parte do resultado final.', question: 'O que está incluído na instalação e no pós-venda?', image: site.images.bedroom, icon: 'tool' },
];
export const projects = [
  { name: 'Espaço para cozinhar. E conviver.', category: 'COZINHA', image: site.images.kitchen, need: 'Integrar a cozinha à convivência sem abrir mão de espaço para guardar.', solution: 'Combinar armários, bancada livre e uma paleta de tons naturais.', result: 'Um ambiente que convida a estar junto, com uma rotina mais organizada.' },
  { name: 'Tudo no lugar. Inclusive a calma.', category: 'QUARTO', image: site.images.bedroom, need: 'Organizar os objetos do dia a dia e preservar uma atmosfera tranquila.', solution: 'Pensar armazenamento e circulação em conjunto, com volumes simples.', result: 'Mais praticidade e um espaço acolhedor para desacelerar.' },
  { name: 'Feita para os seus momentos.', category: 'SALA', image: site.images.living, need: 'Acomodar diferentes momentos de descanso e convivência.', solution: 'Distribuir mobiliário e áreas de apoio respeitando a passagem e a luz.', result: 'Uma sala confortável, com espaço para a vida acontecer.' },
];
export const faqs = [
  ['Por que os orçamentos têm preços tão diferentes?', 'Materiais, ferragens, dimensões, complexidade do projeto, acabamento e instalação podem variar. Peça as especificações e compare o que cada proposta inclui, além do valor final.'],
  ['É só para cozinhas?', 'Cozinhas, quartos e salas são exemplos apresentados aqui. Na conversa, confirme quais ambientes e tipos de móveis a fábrica executa.'],
  ['Preciso ter um projeto pronto?', 'Você pode começar com uma ideia, referências e informações sobre o espaço. A disponibilidade de desenvolvimento de projeto e eventuais custos devem ser confirmados com a fábrica.'],
  ['Vocês atendem minha cidade?', site.region ? `A região informada é ${site.region}. Confirme a disponibilidade para seu endereço no atendimento.` : 'Informe sua cidade no formulário. Como esta é uma demonstração, a região de atendimento ainda será confirmada com a fábrica.'],
  ['Posso enviar uma referência criada por IA?', 'Sim, ela pode ajudar a explicar sua ideia. Medidas, materiais, estrutura e viabilidade precisam de avaliação técnica: uma imagem não substitui um projeto executável.'],
];
