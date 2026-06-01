export interface PlayerStats {
  nps: number;
  empatia: number;
  agilidade: number;
  resolucao: number;
}

export interface Player {
  id: number;
  name: string;
  role: string;
  team: string; // "BT Satisfação" or "Jornada do Cliente"
  imageUrl: string;
  skills: PlayerStats;
  description: string;
  position: string; // Tactical Soccer Position
  jerseyNumber: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const BT_PLAYERS: Player[] = [
  {
    id: 1,
    name: "Eric Vinícius",
    role: "Produtor de Satisfação",
    team: "BT Satisfação",
    imageUrl: "/eric.png",
    position: "Meio-Campo Armador",
    jerseyNumber: 10,
    skills: { nps: 100, empatia: 98, agilidade: 95, resolucao: 97 },
    description: "Profissional extremamente comprometido com o sucesso do cliente, transformando feedbacks in melhorias operacionais contínuas."
  },
  {
    id: 2,
    name: "Kathleen Donizeth",
    role: "Garantia de Qualidade",
    team: "BT Satisfação",
    imageUrl: "/kathleen.png",
    position: "Volante de Contenção",
    jerseyNumber: 5,
    skills: { nps: 100, empatia: 99, agilidade: 96, resolucao: 98 },
    description: "Especialista em garantir a qualidade de cada interação, eliminando dores de jornada com análises detalhadas."
  },
  {
    id: 3,
    name: "Marina Maio",
    role: "Artilheira da Jornada",
    team: "BT Satisfação",
    imageUrl: "/marina.png",
    position: "Centroavante de Sucesso",
    jerseyNumber: 9,
    skills: { nps: 100, empatia: 98, agilidade: 98, resolucao: 96 },
    description: "Sempre focada no sucesso dos projetos, impulsionando a satisfação do cliente com soluções de melhoria contínua."
  },
  {
    id: 4,
    name: "Simone Takeda",
    role: "Guardiã da Satisfação",
    team: "BT Satisfação",
    imageUrl: "/simone.png",
    position: "Goleira Intransponível",
    jerseyNumber: 1,
    skills: { nps: 100, empatia: 99, agilidade: 95, resolucao: 97 },
    description: "Atua como guardiã da experiência do cliente, garantindo que suas necessidades sejam ouvidas e plenamente atendidas."
  },
  {
    id: 5,
    name: "Ruth Barbosa",
    role: "Meio-Campo Estratégico",
    team: "BT Satisfação",
    imageUrl: "/ruth.png",
    position: "Pivô do NPS / Meio-Campo",
    jerseyNumber: 8,
    skills: { nps: 100, empatia: 99, agilidade: 97, resolucao: 98 },
    description: "Excelente capacidade de conectar requisitos operacionais complexos a entregas de alto valor prático para o cliente."
  },
  {
    id: 6,
    name: "Paulo dos Santos",
    role: "Maestro do Suporte",
    team: "BT Satisfação",
    imageUrl: "/paulo.png",
    position: "Zagueiro Xerife",
    jerseyNumber: 3,
    skills: { nps: 100, empatia: 97, agilidade: 98, resolucao: 99 },
    description: "Focado em sanar as maiores complexidades do cliente com agilidade, empatia e extrema precisão técnica."
  },
  {
    id: 7,
    name: "Janayna Leme",
    role: "Ponte de Comunicação",
    team: "BT Satisfação",
    imageUrl: "/janayna.png",
    position: "Ponta-Direita Veloz",
    jerseyNumber: 7,
    skills: { nps: 100, empatia: 98, agilidade: 96, resolucao: 97 },
    description: "Domina a comunicação activa para garantir que as expectativas estejam alinhadas entre o time e a jornada real."
  },
  {
    id: 8,
    name: "Thamiris Bastiani",
    role: "Especialista em Sucesso",
    team: "BT Satisfação",
    imageUrl: "/thamiris.png",
    position: "Ponta-Esquerda Habilidosa",
    jerseyNumber: 11,
    skills: { nps: 100, empatia: 97, agilidade: 97, resolucao: 98 },
    description: "Busca sempre os caminhos mais dinâmicos e inovadores para remover impedimentos da experiência diária do usuário."
  },
  {
    id: 9,
    name: "Vinícius Marques",
    role: "Desenvolvedor de Soluções",
    team: "BT Satisfação",
    imageUrl: "/vinicius.png",
    position: "Lateral Ofensivo",
    jerseyNumber: 2,
    skills: { nps: 100, empatia: 96, agilidade: 99, resolucao: 98 },
    description: "Sempre dedicado a desenhar ferramentas robustas de automação que agilizam nossos fluxos de atendimento diário."
  },
  {
    id: 10,
    name: "Laefo Duarte",
    role: "Arquiteto da Experiência",
    team: "BT Satisfação",
    imageUrl: "/laefo.png",
    position: "Lateral de Apoio",
    jerseyNumber: 6,
    skills: { nps: 100, empatia: 98, agilidade: 97, resolucao: 98 },
    description: "Garante cobertura técnica e apoio de alto nível para manter todo o time focado no bem-estar e metas da jornada."
  },
  {
    id: 11,
    name: "Thais Baptista",
    role: "Estrategista de Relacionamento",
    team: "BT Satisfação",
    imageUrl: "/thais.png",
    position: "Meio-Campo Construtivo",
    jerseyNumber: 14,
    skills: { nps: 100, empatia: 99, agilidade: 96, resolucao: 97 },
    description: "Dedicada a estabelecer relacionamentos duradouros com os clientes através de empatia e clareza de comunicação."
  },
  {
    id: 12,
    name: "Gabriel Ferreira",
    role: "Analista de Feedback",
    team: "BT Satisfação",
    imageUrl: "/gabriel.png",
    position: "Zagueiro Técnico",
    jerseyNumber: 4,
    skills: { nps: 100, empatia: 97, agilidade: 98, resolucao: 98 },
    description: "Presta atenção minuciosa aos detalhes para mapear métricas pós-atendimento e otimizar processos de forma sustentável."
  },
  {
    id: 13,
    name: "João Augusto",
    role: "Facilitador de Jornada",
    team: "BT Satisfação",
    imageUrl: "/joao.png",
    position: "Segundo Atacante",
    jerseyNumber: 17,
    skills: { nps: 100, empatia: 98, agilidade: 98, resolucao: 97 },
    description: "Facilita o progresso diário identificando novos pontos de melhoria na interação direta com nossos usuários finais."
  },
  {
    id: 14,
    name: "Danielly Silva",
    role: "Designer de Interações",
    team: "BT Satisfação",
    imageUrl: "/danielly.png",
    position: "Maestrina do Layout",
    jerseyNumber: 22,
    skills: { nps: 100, empatia: 99, agilidade: 97, resolucao: 97 },
    description: "Desenha experiências e fluxos intuitivos de jornada que agregam forte clareza visual e conforto comunicativo."
  },
  {
    id: 15,
    name: "Aline Nascimento",
    role: "Líder de Engajamento",
    team: "BT Satisfação",
    imageUrl: "/aline.png",
    position: "Capitã Geral da Equipe",
    jerseyNumber: 15,
    skills: { nps: 100, empatia: 98, agilidade: 98, resolucao: 99 },
    description: "Líder inspiradora, focada em organizar e motivar a equipe de BT Satisfação a alcançar metas audaciosas de NPS."
  },
  {
    id: 16,
    name: "Isabella Godoy",
    role: "Guardiã da Jornada",
    team: "BT Satisfação",
    imageUrl: "/isabella.png",
    position: "Goleira Auxiliar de Segurança",
    jerseyNumber: 12,
    skills: { nps: 100, empatia: 99, agilidade: 97, resolucao: 98 },
    description: "Sempre atenta aos padrões de excelência para blindar a jornada contra qualquer tipo de instabilidade ou desconforto."
  },
  {
    id: 17,
    name: "Carolina Caruzo",
    role: "Gerente de Felicidade",
    team: "BT Satisfação",
    imageUrl: "/carolina.png",
    position: "Diretora Técnica de Clima",
    jerseyNumber: 99,
    skills: { nps: 100, empatia: 99, agilidade: 97, resolucao: 99 },
    description: "Sempre em busca do engajamento e desenvolvimento de clima agradável que inspira colaboração entre toda a comissão."
  }
];

export const BT_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "O que é o NPS (Net Promoter Score) na jornada de BT?",
    options: [
      "Não Pode Sambar, regra rígida do time",
      "Métrica de ouro que mede o quanto nossos clientes nos recomendam de 0 a 10",
      "Novo Posicionamento de Segundo-atacante",
      "Número de Pacotes Sorteados no álbum"
    ],
    answerIndex: 1,
    explanation: "O NPS é a métrica padrão-ouro de fidelidade e satisfação do cliente, essencial para a nossa jornada de excelência!"
  },
  {
    id: 2,
    question: "Se um cliente dá uma nota 9 ou 10 no NPS de BT, ele é classificado como:",
    options: [
      "Cliente Promotor (ama nossa jornada e nos apoia!)",
      "Cliente Neutro (está quase lá)",
      "Cliente Detrator (precisa de atenção urgente)",
      "Cliente Técnico da Seleção"
    ],
    answerIndex: 0,
    explanation: "Notas 9 e 10 são dadas por clientes Promotores, que amam nossa jornada e impulsionam o sucesso de BT!"
  },
  {
    id: 3,
    question: "Qual é o principal foco do time de BT Satisfação e Jornada do Cliente?",
    options: [
      "Apenas bater o ponto e torcer pelo hexa",
      "Vender chaveiros personalizados do campeonato",
      "Garantir a melhor experiência, resolvendo dores com empatia e agilidade",
      "Mudar as táticas de futebol do álbum toda semana"
    ],
    answerIndex: 2,
    explanation: "Garantir a melhor experiência e resolver dores da jornada dos clientes com cuidado e empatia é o nosso foco diário!"
  },
  {
    id: 4,
    question: "O que faz o time de BT quando recebemos um feedback 'Detrator' (notas de 0 a 6)?",
    options: [
      "Ignora e torce para a nota sumir sozinha",
      "Fazemos contato ágil de fechamento de loop para entender, acolher e resolver o problema",
      "Apaga o e-mail do cliente para não quebrar a média",
      "Manda um pacote de figurinha para compensar"
    ],
    answerIndex: 1,
    explanation: "O tratamento ágil através do fechamento de loop é fundamental para reconquistar a confiança do cliente e melhorar o processo!"
  },
  {
    id: 5,
    question: "Para atingir a nota máxima e encantar o cliente BT, o atendimento deve ser:",
    options: [
      "Frio, demorado e extremamente burocrático",
      "Focado na solução real, empático, ágil e focado na facilidade do cliente",
      "Confuso, sem dar respostas definitivas",
      "Apenas responder com mensagens automáticas sem ler o problema"
    ],
    answerIndex: 1,
    explanation: "Facilitar a vida do cliente de forma ágil, empática e com soluções definitivas é o que consrói um time realmente campeão!"
  }
];
