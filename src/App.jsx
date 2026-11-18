import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Stack from './components/Stack.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

// Day/night by the visitor's local time (theme-init.js sets it before paint).
function initialTheme() {
  if (typeof document === 'undefined') return 'light';
  const set = document.documentElement.getAttribute('data-theme');
  if (set) return set;
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? 'light' : 'dark';
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fade + rise each .reveal element into view once, as it scrolls in.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero theme={theme} />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <footer>
        <div className="wrap reveal">© 2026 Karlo Joseph C. Martinez. Bulacan, Philippines.</div>
      </footer>
    </>
  );
}
