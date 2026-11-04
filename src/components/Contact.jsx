import { useEffect, useRef, useState } from 'react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data.js';

// Set VITE_WEB3FORMS_KEY in .env (local) or as a GitHub secret (deploy).
// Without it the form falls back to opening the visitor's email app.
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const LIMITS = { name: 80, email: 120, msg: 2000 };
const COOLDOWN_MS = 30_000;
const TIMEOUT_MS = 10_000;
const oneLine = (s) => s.replace(/[\r\n]+/g, ' ');

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', msg: '' });
  const [trap, setTrap] = useState(false); // honeypot: real people never tick it
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const lastSent = useRef(0);

  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setSent(false), 6000);
    return () => clearTimeout(t);
  }, [sent]);

  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    const name = oneLine(f.name.trim());
    const email = oneLine(f.email.trim());
    const msg = f.msg.trim();
    if (!name || !email || !msg) return;

    if (trap) { setSent(true); return; } // bot: pretend it worked, send nothing
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setErr('Please wait a few seconds before sending another message.');
      return;
    }

    setErr(''); setSent(false);

    if (!FORM_KEY) {
      const body = `${msg}\n\nFrom: ${name} (${email})`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry from ' + name)}&body=${encodeURIComponent(body)}`;
      lastSent.current = Date.now();
      setSent(true);
      return;
    }

    setBusy(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: FORM_KEY, subject: 'Project inquiry from ' + name, name, email, message: msg }),
        signal: ctrl.signal,
        referrerPolicy: 'no-referrer',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        lastSent.current = Date.now();
        setSent(true);
        setF({ name: '', email: '', msg: '' });
      } else {
        setErr('Something went wrong — try again or use the email link instead.');
      }
    } catch {
      setErr('Something went wrong — try again or use the email link instead.');
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  };

  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div>
          <span className="avail"><i></i>Available for freelance projects</span>
          <h2>Have a project in mind?</h2>
          <p className="sub">Tell me what you need built or automated. I reply to every message.</p>
          <a className="mail" href={'mailto:' + EMAIL}>Email me directly</a>
          <div className="reach">
            <p className="reach-h">Other ways to reach me</p>
            <span className="reach-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-5.3-7-11a7 7 0 1 1 14 0c0 5.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
              Bulacan, Philippines
            </span>
            <div className="socials">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={submit}>
          <label>Your name
            <input required name="name" value={f.name} onChange={on('name')} maxLength={LIMITS.name} autoComplete="name" placeholder="Juan Dela Cruz" />
          </label>
          <label>Your email
            <input required type="email" name="email" value={f.email} onChange={on('email')} maxLength={LIMITS.email} autoComplete="email" placeholder="you@email.com" />
          </label>
          <label>What do you need?
            <textarea required name="message" value={f.msg} onChange={on('msg')} maxLength={LIMITS.msg} placeholder="Tell me about your project or what you’d like automated…" />
          </label>
          {/* Honeypot: hidden from people, bots tend to fill it in */}
          <input type="checkbox" className="hp" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" checked={trap} onChange={(e) => setTrap(e.target.checked)} />
          <button className="btn" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
          {sent && <p className="note ok" role="status">Thanks! Your message is on its way — I’ll get back to you soon.</p>}
          {err && <p className="note err" role="alert">{err}</p>}
        </form>
      </div>
    </section>
  );
}
