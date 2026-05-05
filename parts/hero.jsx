/* Hero, Tickers, Form */
const { useState, useEffect, useRef } = React;

function Logo() {
  return (
    <a href="#" className="logo">
      <span className="logo-mark">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M5 7V5a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <rect x="3.5" y="7" width="9" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="8" cy="10.2" r="1.1" fill="currentColor"/>
        </svg>
      </span>
      <span>FX <span className="lock">Unlocked</span></span>
    </a>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : 'over-hero'} ${open ? 'open' : ''}`}>
      <div className="container nav-inner">
        <Logo />
        <div className="nav-links">
          <a href="#" className="active" onClick={close}>Home</a>
          <a href="#aboutUs" onClick={close}>About Us</a>
          <a href="#" onClick={close}>Affiliates / IBs</a>
          <a href="#" onClick={close}>Marketing</a>
          <a href="#" onClick={close}>Education</a>
          <a href="#" onClick={close}>Contact Us</a>
        </div>
        <div className="nav-cta">
          <a href="#" className="btn btn-ghost">Log in</a>
          <a href="#" className="btn btn-primary">Sign up <span className="arrow">→</span></a>
        </div>
        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

function Sparkline({ color = "var(--pos)", points }) {
  const w = 160, h = 38;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / range) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  const id = `sg-${Math.random().toString(36).slice(2,7)}`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.4"/>
    </svg>
  );
}

function Ticker({ pair, quote, basePrice, delta, up, flag }) {
  const sparkUp = [3,4,3.6,5,4.5,6,5.8,7,6.5,8,7.5,8.5];
  const sparkDown = [8,7.5,8,7,7.2,6.5,6,5.5,5,4.5,4,3.5];
  return (
    <div className="ticker">
      <div className="row">
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <div className="flag-badge">{flag}</div>
          <div className="pair">{pair}<span className="quote">/{quote}</span></div>
        </div>
        <div className={`delta${up ? '' : ' neg'}`}>
          {up ? '▲' : '▼'} {delta}
        </div>
      </div>
      <div className="price"><TickingPrice base={basePrice}/></div>
      <Sparkline points={up ? sparkUp : sparkDown} color={up ? '#a3ffd6' : '#ffb3cf'}/>
    </div>
  );
}

function HeroForm() {
  const [role, setRole] = useState('');
  return (
    <div className="form-card">
      <h3>Get started today</h3>
      <p className="sub">Tell us a bit about you — we'll match you with the right deal.</p>
      <div className="field">
        <label>Full name</label>
        <input type="text" placeholder="Jane Doe" />
      </div>
      <div className="form-row">
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="you@email.com" />
        </div>
        <div className="field">
          <label>Country</label>
          <select defaultValue="">
            <option value="" hidden>Select</option>
            <option>United Arab Emirates</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Singapore</option>
            <option>Germany</option>
            <option>India</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Category</label>
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="" hidden>Affiliate / IB / Platform</option>
            <option value="affiliate">Affiliate</option>
            <option value="ib">IB</option>
            <option value="trader">Trader</option>
            <option value="platform">Platform</option>
          </select>
        </div>
        <div className="field">
          <label>Phone number</label>
          <input type="text" placeholder="+971 50 123 4567" />
          <small>Include country code, +971 ...</small>
        </div>
      </div>
      <button type="button" className="submit-btn">
        Send Message <span>→</span>
      </button>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div className="hero-fx" aria-hidden="true">
      <div className="mesh mesh-a"></div>
      <div className="mesh mesh-b"></div>
      <div className="mesh mesh-c"></div>

      <svg className="hero-chart" viewBox="0 0 1200 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="hcLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9bf3ff" stopOpacity="0.0"/>
            <stop offset="20%" stopColor="#9bf3ff" stopOpacity="0.9"/>
            <stop offset="60%" stopColor="#ffffff"/>
            <stop offset="100%" stopColor="#ffd1f7"/>
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path className="hc-area" d="M0,380 C140,340 240,360 380,290 C520,220 620,250 760,180 C900,110 1000,140 1140,80 L1200,60 L1200,500 L0,500 Z" fill="url(#hcArea)"/>
        <path className="hc-line" d="M0,380 C140,340 240,360 380,290 C520,220 620,250 760,180 C900,110 1000,140 1140,80 L1200,60" fill="none" stroke="url(#hcLine)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)"/>
        <circle className="hc-pulse" cx="1180" cy="68" r="5" fill="#ffffff" filter="url(#glow)"/>
        <circle className="hc-pulse-ring" cx="1180" cy="68" r="5" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
      </svg>

      {/* floating fx chips */}
      <div className="fx-chips">
        <div className="fx-chip c1"><span className="fc-pair">EUR/USD</span><span className="fc-up">+0.42%</span></div>
        <div className="fx-chip c2"><span className="fc-pair">XAU/USD</span><span className="fc-up">+1.07%</span></div>
        <div className="fx-chip c3"><span className="fc-pair">GBP/JPY</span><span className="fc-dn">−0.18%</span></div>
      </div>
    </div>
  );
}

function TickingPrice({ base, drift = 0.0006 }) {
  const [v, setV] = React.useState(base);
  const [up, setUp] = React.useState(true);
  React.useEffect(() => {
    let cur = base;
    const id = setInterval(() => {
      const d = (Math.random()-0.5) * 2 * drift * base;
      cur = Math.max(base*0.98, Math.min(base*1.02, cur + d));
      setUp(d >= 0);
      setV(cur);
    }, 1400);
    return () => clearInterval(id);
  }, [base, drift]);
  const decimals = base < 10 ? 5 : 2;
  return <span className={`tk-price ${up?'up':'dn'}`}>{v.toLocaleString(undefined,{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}</span>;
}

function MarketStrip() {
  const items = [
    { p: "GBP/USD", base: 0.73903, d: "+0.42%", up: true },
    { p: "EUR/USD", base: 0.85530, d: "+0.18%", up: true },
    { p: "XAU/USD", base: 4557.20, d: "+1.07%", up: true },
    { p: "USD/JPY", base: 154.82, d: "−0.21%", up: false },
    { p: "BTC/USD", base: 96420.00, d: "+2.14%", up: true },
    { p: "USD/CHF", base: 0.88410, d: "−0.06%", up: false },
  ];
  const all = [...items, ...items];
  return (
    <div className="market-strip">
      <div className="ms-track">
        {all.map((it, i) => (
          <div className="ms-item" key={i}>
            <span className="ms-pair">{it.p}</span>
            <span className="ms-price"><TickingPrice base={it.base}/></span>
            <span className={`ms-delta ${it.up?'up':'dn'}`}>{it.up?'▲':'▼'} {it.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <HeroBackdrop/>
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">
            <span className="dot"></span> Live · FX Partnerships
          </span>
          <h1>
            Unlocking <span className="accent">growth</span><br/>
            for FX educators.
          </h1>
          <p className="hero-sub">
            Market-leading CPA deals and 10× growth with world-class marketing
            support — built for creators, IBs and trading platforms.
          </p>
          <div className="hero-cta-row">
            <a href="#" className="btn btn-cyan">Become a partner <span className="arrow">→</span></a>
            <a href="#aboutUs" className="btn btn-ghost">How it works</a>
          </div>
        </div>
        <HeroForm />
      </div>
      <MarketStrip/>
    </section>
  );
}

window.Navbar = Navbar;
window.Hero = Hero;
window.Logo = Logo;
