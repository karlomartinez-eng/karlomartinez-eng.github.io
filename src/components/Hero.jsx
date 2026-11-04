import dayPhoto from '../assets/photo-day.jpg';
import nightPhoto from '../assets/photo-night.jpg';

export default function Hero({ theme }) {
  const night = theme === 'dark';
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <h1>I’m Karlo Joseph Martinez</h1>
          <p className="role">Software Developer &amp; AI Automation Specialist</p>
          <p className="lead">
            Senior full stack developer with 10+ years building desktop, mobile, and backend systems for retail and
            logistics. Now adding AI automation with n8n, Make, and GoHighLevel.
          </p>
          <div className="cta">
            <a className="btn" href="#projects">See my work</a>
            <a className="btn ghost" href="#contact">Hire me</a>
          </div>
        </div>
        <div className="photo">
          {night ? (
            <img className="night" src={nightPhoto} alt="Karlo Martinez standing outdoors at night" width="682" height="1024" />
          ) : (
            <img src={dayPhoto} alt="Karlo Martinez standing by a lake in a white shirt" width="640" height="800" />
          )}
        </div>
      </div>
    </section>
  );
}
