import { STACK, logo } from '../data.js';

export default function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="head">
          <div>
            <h2>Tech stack</h2>
            <p className="sub">What I build with every day, plus what I’m learning now.</p>
          </div>
        </div>
        <div className="stack-grid">
          {STACK.map((g) => (
            <div className="group" style={{ '--gc': g.c }} key={g.t}>
              <h3>{g.t}</h3>
              <p>{g.d}</p>
              <div className="chips">
                {g.items.map(([name, key, learning]) => (
                  <span className="chip" key={name}>
                    <span className="logo"><img src={logo(key)} alt="" loading="lazy" decoding="async" /></span>
                    {name}
                    {learning ? <span className="learn">Learning</span> : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
