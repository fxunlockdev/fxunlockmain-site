/* Numbers, Testimonials, CTA, Footer */

function Globe() {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="98" stroke="rgba(0,229,255,0.4)" strokeWidth="0.5"/>
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map(y => (
        <ellipse key={y} cx="100" cy="100" rx="98" ry={Math.abs(98 * Math.sin((y/200)*Math.PI))} stroke="rgba(0,229,255,0.18)" strokeWidth="0.5" fill="none"/>
      ))}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map(deg => (
        <ellipse key={deg} cx="100" cy="100" rx="98" ry="98" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" fill="none" transform={`rotate(${deg} 100 100) scale(${Math.abs(Math.cos((deg*Math.PI)/180))} 1)`} style={{transformOrigin:'100px 100px'}}/>
      ))}
      {/* meridians */}
      {[-60, -30, 0, 30, 60].map(d => (
        <ellipse key={`m${d}`} cx="100" cy="100" rx={98 * Math.abs(Math.cos((d * Math.PI)/180))} ry="98" stroke="rgba(0,229,255,0.2)" strokeWidth="0.5" fill="none"/>
      ))}
      {/* dot points */}
      {[[60,80],[140,90],[100,40],[80,140],[150,150],[40,110],[120,170],[170,70]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2" fill="var(--cyan)"/>
      ))}
    </svg>
  );
}

function NumbersSection() {
  const stats = [
    { big: "200", plus: "+", label: "Affiliates / IBs", desc: "Collaborating with a thriving network of professionals dedicated to success." },
    { big: "12", plus: "", label: "Trading platforms", desc: "Providing diverse options to meet the needs of affiliates and traders worldwide." },
    { big: "5", plus: "", label: "Countries staffed", desc: "A truly global team driving innovation and growth across borders." },
    { big: "10", plus: "+", label: "Years of expertise", desc: "Building trust, delivering value, and unlocking growth since day one." },
  ];
  return (
    <section className="numbers-section" id="UnlockedByNumbers">
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-head" style={{ marginBottom: 16, alignItems: 'center' }}>
          <div>
            <p className="num">— 04 / By the numbers</p>
            <h2>FX Unlocked, <em>by the numbers.</em></h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Our vision is bold: to connect and empower educators, partners and traders on every continent
              and grow our network to <strong style={{ color:'var(--cyan)', fontWeight: 600 }}>1,000+ partners by mid-2026</strong>.
            </p>
          </div>
          <div className="orb-wrap"><div className="orb"><Globe/></div></div>
        </div>
        <div className="numbers-grid">
          {stats.map((s, i) => (
            <div key={i} className="num-stat">
              <p className="big">{s.big}<span className="plus">{s.plus}</span></p>
              <p className="label">{s.label}</p>
              <p className="desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, short, full, color = 'cy', initials }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="t-card">
      <div className="quote-mark">"</div>
      <p>{expanded ? full : short}</p>
      {full && full !== short && (
        <a className="read-more" onClick={()=>setExpanded(e=>!e)}>
          {expanded ? 'Read less' : 'Read more'} →
        </a>
      )}
      <div className="person">
        <div className={`t-avatar${color === 'cy' ? ' cy' : ''}`}>{initials}</div>
        <div>
          <div className="name">{name}</div>
          <div className="role">{role}</div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Amber M", role: "Affiliate", initials: "AM", color: "cy",
      short: "Being slightly new to the Affiliate Marketing Model, the team at FX Unlocked have guided and supported me, helping me scale my business quickly.",
      full: "Being slightly new to the Affiliate Marketing Model, the team at FX Unlocked have guided and supported me, helping me scale my business quickly. Since working with them, I've seen growth every single month. They are always helpful and respond very quickly. I'm excited to see where my business will be in a few months with their continued support."
    },
    {
      name: "James M", role: "FX Educator", initials: "JM", color: "v",
      short: "As a content creator in the Foreign Exchange space with a global audience, I've never been able to grow and simultaneously monetize my U.S. traffic.",
      full: "As a content creator in the Foreign Exchange space with a global audience, I've never been able to grow and simultaneously monetize my U.S. traffic / viewers. FX Unlocked, through their network, were able to secure me a partnership with a very reputable U.S. firm."
    },
    {
      name: "Jack L", role: "FX Educator", initials: "JL", color: "cy",
      short: "Joining FX Unlocked has been a game-changer for my business growth. I had a growing audience but struggled to monetize my traffic.",
      full: "Joining FX Unlocked has been a game-changer for my business growth. I had a growing audience but struggled to find effective ways to monetize my traffic. The partnerships I've formed through FX Unlocked have increased my revenue as well as enhancing the quality of my content."
    },
    {
      name: "Jasmine M", role: "FX Educator", initials: "JM", color: "v",
      short: "FX Unlocked have been amazing to work with. As soon as I started working with them they helped me set up a whole strategy and game plan.",
      full: "FX Unlocked have been amazing to work with. I have been in the trading industry for just over two years myself and have struggled with being able to market myself well to generate more traffic to create more leads. As soon as I started working with FX Unlocked they helped me set up a whole strategy and game plan to help me create my own professional looking brand. They have literally held my hand through the process. They've helped me create a professional looking website, brand name, logo, and are still helping me everyday with new strategies on how to grow my social media accounts and reach new target audiences. I'm very happy and I have already recommended them to other people!"
    },
  ];
  return (
    <section className="testimonials-section" id="Testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="num">— 05 / Testimonials</p>
            <h2>What our partners <em>are saying.</em></h2>
          </div>
          <p className="lede">Real words from FX educators, affiliates and IBs growing inside our network.</p>
        </div>
      </div>
      <div className="container">
        <div className="t-row">
          {items.map((t, i) => <TestimonialCard key={i} {...t}/>)}
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  return (
    <section className="cta-section" id="GetStarted">
      <p className="num" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 24px' }}>✦ &nbsp;06 / Ready to grow</p>
      <h2>Ready to <em>unlock growth?</em></h2>
      <p>
        We're not just growing; we're revolutionizing the affiliate / IB experience in
        the FX world. Join us as we continue to unlock possibilities and break boundaries.
      </p>
      <div className="cta-btn-group">
        <a href="contact-us.html" className="cta-bigbtn">
          Talk to our team
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="affiliates-ibs.html" className="cta-ghostbtn">Explore partnerships →</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <h4>Unlocking growth across the FX world.</h4>
            <p>Floor 38, Media One Tower, Dubai Marina, UAE. Connecting creators, affiliates and brokers since 2014.</p>
          </div>
          <div className="foot-col">
            <h5>// Pages</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#aboutUs">About us</a></li>
              <li><a href="#">Affiliates / IBs</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Education</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>// Contact</h5>
            <ul>
              <li><a href="tel:+971585784483">+971 58 578 4483</a></li>
              <li><a href="mailto:hello@fx-unlocked.com">hello@fx-unlocked.com</a></li>
              <li><a href="https://wa.me/971585784483">WhatsApp</a></li>
              <li><a href="#">Dubai Marina, UAE</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>// Traders</h5>
            <ul>
              <li><a href="#">FX courses</a></li>
              <li><a href="#">Live mentorship</a></li>
              <li><a href="#">Strategy library</a></li>
              <li><a href="#">Risk calculator</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 FX Unlocked · All rights reserved</div>
          <div className="foot-socials">
            <a href="#" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="#" aria-label="TikTok"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingSide() {
  const items = [
    { label: "WhatsApp", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg> },
    { label: "Instagram", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/></svg> },
    { label: "LinkedIn", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg> },
    { label: "Mail", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  ];
  return (
    <div className="floating-side">
      {items.map((it, i) => <a key={i} href="#" aria-label={it.label}>{it.svg}</a>)}
    </div>
  );
}

window.NumbersSection = NumbersSection;
window.Testimonials = Testimonials;
window.GetStarted = GetStarted;
window.Footer = Footer;
window.FloatingSide = FloatingSide;
