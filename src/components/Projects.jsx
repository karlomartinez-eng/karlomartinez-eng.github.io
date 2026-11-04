import { useState } from 'react';
import { PROJECTS } from '../data.js';

export default function Projects() {
  const [open, setOpen] = useState(0);
  return (
    <section id="projects">
      <div className="wrap">
        <div className="head">
          <div>
            <h2>Projects</h2>
            <p className="sub">Production systems used by real businesses across local and international markets.</p>
          </div>
        </div>
        <div className="acc">
          {PROJECTS.map((p, i) => (
            <div className={'item' + (open === i ? ' open' : '')} key={p.t}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{p.t}</span>
                <span className="arrow" aria-hidden="true">›</span>
              </button>
              {open === i && (
                <div className="body">
                  {p.p.map((x) => <p key={x}>{x}</p>)}
                  <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
