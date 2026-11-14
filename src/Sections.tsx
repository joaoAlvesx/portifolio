import { ArrowDown, ArrowRight, Box, Cloud, Code2, Cpu, Heart, Layers, Mail, Network, Server, ShieldCheck } from 'lucide-react';
import { ExternalLink, SectionHeading } from './App';
import { experience, infrastructure, profile, projects, skills } from './data';

export function Hero() {
  return <section id="inicio" className="container hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">João Gonçalves / Campo Grande, MS</p>
      <h1 id="hero-title">Da ideia à <span>infraestrutura.</span></h1>
      <p className="hero-description">{profile.description}</p>
      <div className="actions"><a className="button primary" href="#projetos">Explorar projetos <ArrowDown size={17} aria-hidden="true" /></a><ExternalLink className="button" href={profile.social[0].href}>GitHub</ExternalLink></div>
      <p className="hero-footnote"><span className="small-rule" /> Construir para entender. Evoluir pela prática.</p>
    </div>
    <div className="lab-illustration">
      <div className="illustration-top"><p className="eyebrow">Meu laboratório pessoal</p><Layers size={21} aria-hidden="true" /></div>
      <h2>Construir.<br />Hospedar. Evoluir.</h2>
      <div className="server-stack" aria-label="Camadas conceituais do laboratório">
        {[{ icon: Server, name: 'Debian', role: 'Sistema' }, { icon: Box, name: 'Docker', role: 'Serviços' }, { icon: Cloud, name: 'Cloudflare', role: 'Acesso' }].map((layer, i) =>
          <div className="server-layer" key={layer.name}><span className="layer-number">0{i + 1}</span><layer.icon size={23} aria-hidden="true" /><strong>{layer.name}</strong><span className="layer-role">{layer.role}</span></div>)}
      </div>
      <p>Um espaço para explorar infraestrutura, operar aplicações e transformar estudo em prática.</p>
      <a className="text-link" href="#homelab">Conheça o homelab <ArrowRight size={17} aria-hidden="true" /></a>
    </div>
  </section>;
}

export function About() {
  return <section id="sobre" className="container section" aria-label="Sobre mim">
    <div className="split-layout"><SectionHeading number="01" label="Sobre mim">Entender como funciona.<br /><span>Construir para aprender.</span></SectionHeading>
      <div className="body-copy">{profile.about.map(text => <p key={text}>{text}</p>)}<a className="text-link" href="#trajetoria">Conheça minha trajetória <ArrowRight size={17} aria-hidden="true" /></a></div>
    </div>
    <figure className="work-photo"><img src="/images/laboratorio.webp" width="900" height="700" loading="lazy" alt="João trabalhando com um notebook em uma bancada de eletrônica, cercado por instrumentos e equipamentos." /><figcaption><span className="eyebrow">Aprender fazendo</span><span>Entre o código, a bancada e o mundo real.</span></figcaption></figure>
  </section>;
}

export function Projects() {
  return <section id="projetos" className="container section" aria-label="Projetos selecionados">
    <div className="heading-row"><SectionHeading number="02" label="Projetos selecionados">Ideias colocadas em prática.</SectionHeading><ExternalLink className="text-link" href={profile.repositories}>Todos os repositórios</ExternalLink></div>
    <div className="project-grid">{projects.map((project, i) => <article key={project.name} className="project-card">
      <div className={`project-visual ${project.diagram ? `diagram-${project.diagram}` : ''}`}>
        {project.image ? <img src={project.image.src} alt={project.image.alt} width="1120" height="640" loading="lazy" /> : <div className="project-diagram" aria-label="Ilustração conceitual do projeto">
          <span className="eyebrow">{project.diagram === 'finance' ? 'Organizar. Planejar. Entender.' : 'Guardar. Lembrar. Compartilhar.'}</span>
          {project.diagram === 'finance' ? <><div className="diagram-flow"><span>CSV</span><ArrowRight aria-hidden="true" /><span>API</span><ArrowRight aria-hidden="true" /><span>Planejamento</span></div><div className="diagram-lines" aria-hidden="true"><i /><i /><i /></div></> : <><div className="memories-symbol" aria-hidden="true"><Heart size={38} strokeWidth={1} /></div><div className="memory-labels"><span>Memórias</span><span>Planos</span><span>Experiências</span></div></>}
          <span className="diagram-caption">Representação conceitual</span>
        </div>}
      </div>
      <div className="project-content"><p className="eyebrow project-category"><span>{project.category}</span><span aria-hidden="true">0{i + 1}</span></p><h3>{project.name}</h3><p>{project.description}</p>
        <ul className="tags" aria-label="Tecnologias">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <details><summary>Sobre o projeto</summary><p>{project.details}</p></details>
        <div className="project-links"><ExternalLink href={project.repository}>Repositório</ExternalLink>{project.site && <ExternalLink href={project.site}>Visitar site</ExternalLink>}</div>
      </div>
    </article>)}</div>
  </section>;
}

export function Homelab() {
  return <section id="homelab" className="container section" aria-label="Infraestrutura própria">
    <SectionHeading number="03" label="Infraestrutura própria">Meu homelab.<br /><span>Um projeto em constante evolução.</span></SectionHeading>
    <p className="section-intro">Um servidor Debian para hospedar aplicações pessoais e aprofundar conhecimentos em redes, operação de serviços e administração Linux.</p>
    <div className="homelab-panel"><div className="homelab-copy"><Server size={30} strokeWidth={1.5} aria-hidden="true" /><h3>Preparar o ambiente.<br />Manter os serviços.<br />Cuidar dos dados.</h3><p>Organizo os serviços em containers e conecto publicação, autenticação, monitoramento e backup em uma infraestrutura que posso estudar e evoluir.</p><span className="eyebrow">Infraestrutura como aprendizado</span></div>
      <div className="architecture"><p className="eyebrow">Acesso aos serviços protegidos</p><ol>{[
        { title: 'Cloudflare Tunnel', detail: 'Entrada pública por domínio próprio', icon: Cloud },
        { title: 'Caddy', detail: 'Encaminhamento para os serviços', icon: Network },
        { title: 'Authelia', detail: 'Autenticação nas rotas protegidas', icon: ShieldCheck },
        { title: 'Containers', detail: 'Aplicações organizadas com Docker', icon: Box },
      ].map((layer, i) => <li key={layer.title}><span className="layer-number">0{i + 1}</span><layer.icon size={21} aria-hidden="true" /><div><strong>{layer.title}</strong><span>{layer.detail}</span></div></li>)}</ol><p className="architecture-note">O portfólio é público e não requer autenticação.</p></div>
    </div>
    <div className="infra-groups">{infrastructure.map((group, i) => <div key={group.title}><span className="eyebrow">0{i + 1}</span><h3>{group.title}</h3><p>{group.description}</p></div>)}</div>
    <details className="infra-details"><summary>Mais sobre operação e segurança</summary><p>O proxy Docker permite consultas restritas, com operações de escrita desabilitadas. O Filestash utiliza uma conexão SFTP dedicada. Atualização e restauração têm procedimentos documentados, com atenção à consistência dos dados.</p></details>
  </section>;
}

export function Trajectory() {
  return <section id="trajetoria" className="container section" aria-label="Trajetória">
    <SectionHeading number="04" label="Trajetória">Do laboratório maker à infraestrutura.</SectionHeading><p className="section-intro">Experiências que aproximam projeto, fabricação, programação e operação.</p>
    <div className="actions"><ExternalLink className="text-link" href="/documentos/certificado-redes-cisco.pdf">Certificado Cisco</ExternalLink><ExternalLink className="text-link" href="/documentos/curriculo-joao-goncalves.pdf">Currículo em PDF</ExternalLink></div>
    <div className="trajectory-layout"><ol className="timeline">{experience.map(item => <li key={item.title}><p className="eyebrow">{item.period}</p><span className="institution">{item.institution}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      <figure className="trajectory-photo"><img src="/images/ararabots.webp" width="1200" height="800" loading="lazy" alt="Estruturas mecânicas e placas eletrônicas dos robôs da equipe AraraBots em uma bancada de competição." /><figcaption><span className="eyebrow">AraraBots / UFMS</span><p>Projetos que se constroem em equipe.</p></figcaption></figure>
    </div>
  </section>;
}

export function Skills() {
  const icons = [Network, Code2, Cpu];
  return <section className="container section" id="ferramentas" aria-label="Ferramentas e conhecimentos"><SectionHeading number="05" label="Ferramentas e conhecimentos">Tecnologia com aplicação.</SectionHeading><div className="skill-grid">{skills.map((group, i) => {
    const Icon = icons[i];
    return <div className="skill-group" key={group.title}><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><h3>{group.title}</h3><ul className="tags">{group.items.map(item => <li key={item}>{item}</li>)}</ul><p>Na prática: {group.application}.</p></div>;
  })}</div></section>;
}

export function Contact() {
  return <section id="contato" className="container section contact" aria-label="Contato"><div><SectionHeading number="06" label="Contato">Novos projetos.<br /><span>Novas conexões.</span></SectionHeading><p>Busco oportunidades para desenvolver e aprofundar meus conhecimentos em redes e infraestrutura. Vamos conversar sobre tecnologia, projetos e colaboração?</p><a className="button primary" href={`mailto:${profile.email}`}><Mail size={18} aria-hidden="true" /> Entrar em contato <ArrowRight size={17} aria-hidden="true" /></a></div><div className="contact-aside"><p className="eyebrow">Vamos conversar</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a><div className="contact-social">{profile.social.map(link => <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>)}</div><p>{profile.location}, Brasil</p></div></section>;
}
