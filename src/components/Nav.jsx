import { useEffect, useState } from 'react';

const ITEMS = [
  ['top', 'Who am I?'],
  ['stack', 'Tech Stack'],
  ['projects', 'Projects'],
  ['contact', 'Let’s work together!'],
];

const Icon = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
);

export default function Nav({ theme, setTheme }) {
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);

  // Highlight the link for the section currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ITEMS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const links = ITEMS.map(([id, label]) => (
    <a
      key={id}
      href={`#${id}`}
      className={active === id ? 'on' : ''}
      aria-current={active === id ? 'true' : undefined}
      onClick={() => { setActive(id); setOpen(false); }}
    >
      {label}
    </a>
  ));

  return (
    <header className="nav">
      <div className="nav-in">
        <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <Icon><path d="M6 6l12 12M18 6L6 18" /></Icon> : <Icon><path d="M4 7h16M4 12h16M4 17h16" /></Icon>}
        </button>
        <nav className="links" aria-label="Sections">{links}</nav>
        <button className="toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Switch between day and night mode">
          {theme === 'dark' ? (
            <Icon>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" />
            </Icon>
          ) : (
            <Icon><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon>
          )}
        </button>
      </div>
      <nav className={'menu' + (open ? ' open' : '')} aria-label="Sections (mobile)">{links}</nav>
    </header>
  );
}
