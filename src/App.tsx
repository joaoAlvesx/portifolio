import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from './data';
import { About, Contact, Hero, Homelab, Projects, Skills, Trajectory } from './Sections';

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)');
    function followSystem() {
      try { if (localStorage.getItem('portfolio-theme')) return; } catch { /* Storage may be unavailable. */ }
      const next = query.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    }
    query.addEventListener('change', followSystem);
    return () => query.removeEventListener('change', followSystem);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    }
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [menuOpen]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Keep the theme usable without storage. */ }
  }

  return <header className="site-header" ref={header}>
    <div className="container header-inner">
      <a href="#inicio" className="brand" aria-label="João Gonçalves — início">JG<span>.</span></a>
      <nav id="navigation" aria-label="Navegação principal" className={menuOpen ? 'navigation is-open' : 'navigation'}>
        {['Sobre', 'Projetos', 'Homelab', 'Trajetória', 'Contato'].map((label, i) =>
          <a key={label} href={`#${['sobre', 'projetos', 'homelab', 'trajetoria', 'contato'][i]}`} onClick={() => {
            setMenuOpen(false);
            if (matchMedia('(max-width: 760px)').matches) menuButton.current?.focus();
          }}>{label}</a>)}
      </nav>
      <div className="header-controls">
        <button type="button" className="icon-button" onClick={toggleTheme} aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}>
          {theme === 'dark' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
        </button>
        <button type="button" ref={menuButton} className="icon-button menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </div>
  </header>;
}

export function SectionHeading({ number, label, children }: { number: string; label: string; children: ReactNode }) {
  return <div className="section-heading"><p className="eyebrow"><span>{number}</span> / {label}</p><h2>{children}</h2></div>;
}

export function App() {
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo" tabIndex={-1}>
      <Hero />
      <div className="container discipline-strip"><span>Engenharia de Computação / UFMS</span><span>Redes & infraestrutura</span><span>Software & robótica <ArrowDown size={14} aria-hidden="true" /></span></div>
      <About /><Projects /><Homelab /><Trajectory /><Skills /><Contact />
    </main>
    <footer className="container site-footer">
      <div><p>{profile.fullName}</p><span>{profile.location} · {new Date().getFullYear()}</span></div>
      <p className="footer-disciplines">Linux · Redes · Software · Robótica</p>
      <div className="social-links">{profile.social.map(link => <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>)}</div>
    </footer>
  </>;
}
