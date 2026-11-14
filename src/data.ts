export const profile = {
  name: 'João Gonçalves',
  fullName: 'João Vitor Alves Gonçalves',
  location: 'Campo Grande, MS',
  email: 'alvesjoaovitor463@gmail.com',
  description: 'Estudante de Engenharia de Computação. Construo projetos com Linux, redes, software e robótica — e aprendo colocando tudo para funcionar.',
  about: [
    'Sou João Vitor Alves Gonçalves, técnico em Informática pelo IFMS e estudante de Engenharia de Computação na UFMS. Meu foco está em redes e infraestrutura Linux, com experiência prática também em desenvolvimento e sistemas embarcados.',
    'No laboratório maker, trabalhei com fabricação e prototipagem. Na AraraBots, atuo em mecânica, hardware e integração. No meu homelab, reúno essa curiosidade em um ambiente que eu mesmo administro.',
  ],
  repositories: 'https://github.com/joaoAlvesx?tab=repositories',
  social: [
    { label: 'GitHub', href: 'https://github.com/joaoAlvesx' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joao-a-gon%C3%A7alves' },
    { label: 'Instagram', href: 'https://www.instagram.com/joao.alves.goncalves/' },
  ],
};

export interface Project {
  name: string; category: string; description: string; details: string;
  technologies: string[]; repository: string; site?: string;
  image?: { src: string; alt: string }; diagram?: 'finance' | 'memories';
}

export const projects: Project[] = [
  {
    name: 'Gosto du Matu', category: 'Web / E-commerce',
    description: 'Uma vitrine para produtores artesanais de Jardim, MS. Catálogo, conta do cliente e uma jornada de compra com frete e pagamento integrados.',
    details: 'Aplicação full stack com autenticação, carrinho e checkout. Integrações com Mercado Pago e Melhor Envio para pagamentos e logística.',
    technologies: ['React', 'TypeScript', 'Supabase'], repository: 'https://github.com/joaoAlvesx/gostodumatu', site: 'https://www.gostodumatu.com.br/',
    image: { src: '/images/gosto-du-matu.webp', alt: 'Página inicial do Gosto du Matu, com apresentação de produtos artesanais do Mato Grosso do Sul.' },
  },
  {
    name: 'Finance System', category: 'Self-hosted / Em desenvolvimento',
    description: 'Finanças pessoais com planejamento, importação de extratos e regras de cálculo no backend. Desenvolvido para execução em infraestrutura própria.',
    details: 'Importação CSV com deduplicação, planejamento financeiro e integrações documentadas com Telegram, Pluggy e assistentes via MCP.',
    technologies: ['FastAPI', 'React', 'PostgreSQL'], repository: 'https://github.com/joaoAlvesx/finance-system', diagram: 'finance',
  },
  {
    name: 'Nós', category: 'Produto pessoal / PWA',
    description: 'Um espaço privado para duas pessoas guardarem memórias e planejarem experiências. Uma aplicação pensada para o uso no celular.',
    details: 'Memórias, calendário, lugares, cartas e cápsulas do tempo, com regras de privacidade e interface instalável como PWA.',
    technologies: ['React', 'FastAPI', 'Docker'], repository: 'https://github.com/joaoAlvesx/nos', diagram: 'memories',
  },
  {
    name: 'Robô de labirinto', category: 'Embarcados / TCC',
    description: 'Dispositivo autônomo para mapear e solucionar labirintos. Um projeto que conecta algoritmos, eletrônica e movimento no mundo físico.',
    details: 'Integração de sensores e atuadores com firmware embarcado e aplicação do algoritmo BFS para cálculo de trajetórias no ambiente mapeado. TCC do Técnico em Informática, concluído em 2023.',
    technologies: ['ESP8266', 'C/C++', 'Busca em largura'], repository: 'https://github.com/joaoAlvesx/TCC_Joao',
    image: { src: '/images/robo-labirinto.webp', alt: 'Robô de labirinto construído com placas eletrônicas, sensores, estrutura em camadas e rodas.' },
  },
];

export const experience = [
  { period: 'Em andamento · curso concluído em novembro de 2026', institution: 'Cisco Networking Academy', title: 'Trilha profissionalizante de técnico de redes', description: 'Conceitos Básicos de Redes concluído em 11 de novembro de 2026.' },
  { period: 'Agosto de 2024 — presente', institution: 'AraraBots · UFMS', title: 'Head de Mecânica e membro de Hardware', description: 'Atuação em equipe no desenvolvimento e fabricação de estruturas com Fusion 360, CNC e impressão 3D. Integração eletrônica e participação no firmware em C/C++ e na comunicação NRF24.' },
  { period: 'Março de 2024 — dezembro de 2028', institution: 'UFMS', title: 'Engenharia de Computação', description: 'Bacharelado em andamento, em Campo Grande/MS. Conclusão prevista para dezembro de 2028.' },
  { period: 'Março de 2022 — dezembro de 2023', institution: 'IFMaker · IFMS Jardim', title: 'Estagiário de laboratório', description: 'Manutenção de equipamentos maker, modelagem e impressão 3D, projetos com Arduino e automação.' },
  { period: 'Março de 2021 — dezembro de 2023', institution: 'IFMS Jardim', title: 'Técnico Integrado em Informática', description: 'Formação concluída, com TCC em robótica autônoma.' },
];

export const skills = [
  { title: 'Redes e infraestrutura', application: 'Homelab', items: ['Linux', 'Debian', 'Docker', 'TCP/IP', 'DNS', 'SSH', 'Cloudflare Tunnel', 'AdGuard', 'Administração de servidores'] },
  { title: 'Desenvolvimento', application: 'Projetos web, acadêmicos e automação', items: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Supabase', 'APIs REST', 'Git', 'Tailwind CSS'] },
  { title: 'Embarcados e robótica', application: 'TCC e AraraBots', items: ['ESP32', 'ESP8266', 'Arduino', 'ESP-IDF', 'ROS 2', 'NRF24', 'KiCad', 'Fusion 360', 'PlatformIO'] },
];

export const infrastructure = [
  { title: 'Rede e acesso', description: 'AdGuard Home para DNS local e filtragem. Tailscale e SSH para acesso remoto.' },
  { title: 'Monitoramento', description: 'Beszel para recursos, Dozzle para logs e Homepage para reunir os serviços.' },
  { title: 'Dados e recuperação', description: 'Filestash com SFTP/OpenSSH. Backups criptografados com Restic, dumps lógicos dos bancos e retenção diária, semanal, mensal e anual.' },
];
