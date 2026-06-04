/* Shared navigation, homepage hero, and live market strip */
const { useState } = React;

function Logo() {
  return (
    <a href="index.html" className="logo">
      <svg className="logo-mark-img" viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="fxLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#21bbd7"/>
            <stop offset="40%" stopColor="#3b58c8"/>
            <stop offset="70%" stopColor="#8a35c3"/>
            <stop offset="100%" stopColor="#bf1cc1"/>
          </linearGradient>
        </defs>
        <path d="M 125.00 150.62 L 55.00 150.62 L 20.00 90.00 L 55.00 29.38 L 125.00 29.38 L 160.00 90.00 L 138.00 90.00 L 114.00 48.43 L 66.00 48.43 L 42.00 90.00 L 66.00 131.57 L 114.00 131.57 Z" fill="url(#fxLogoGrad)"/>
        <path d="M 115.00 89.38 L 185.00 89.38 L 220.00 150.00 L 185.00 210.62 L 115.00 210.62 L 80.00 150.00 L 102.00 150.00 L 126.00 191.57 L 174.00 191.57 L 198.00 150.00 L 174.00 108.43 L 126.00 108.43 Z" fill="url(#fxLogoGrad)"/>
      </svg>
      <span className="logo-text">
        <span className="lt-fx">FX</span><span className="lt-un">Unlocked</span>
      </span>
    </a>
  );
}

const NAV_PAGES = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "about-us.html", label: "About Us", key: "about" },
  { href: "affiliates-ibs.html", label: "Affiliates / IBs", key: "affiliates" },
  { href: "marketing.html", label: "Marketing Support", key: "marketing" },
  { href: "education.html", label: "Education", key: "education" },
  { href: "tools.html", label: "Tools", key: "tools" },
  { href: "contact-us.html", label: "Contact Us", key: "contact" },
];

function Navbar({ active = "home", solidStart = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const mode = solidStart ? "scrolled" : scrolled ? "scrolled" : "over-hero";

  return (
    <nav className={`nav ${mode} ${open ? "open" : ""}`}>
      <div className="container nav-inner">
        <Logo />
        <div className="nav-links">
          {NAV_PAGES.map((page) => (
            <a
              key={page.key}
              href={page.href}
              className={active === page.key ? "active" : ""}
              onClick={close}
            >
              {page.label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <a href="contact-us.html" className="btn btn-ghost">Talk to us</a>
          <a href="contact-us.html" className="btn btn-primary">Apply now <span className="arrow">→</span></a>
        </div>
        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

function HeroForm() {
  const [role, setRole] = useState("");

  return (
    <div className="form-card">
      <div className="form-card-bar"></div>
      <div className="form-card-hd">
        <span className="form-badge">Partner application</span>
        <h3>Tell us about your business</h3>
        <p className="sub">Your regional country manager will be in touch within 24 hours.</p>
      </div>

      <div className="field">
        <label>Full name</label>
        <input type="text" placeholder="Jane Doe" autoComplete="name"/>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Email address</label>
          <input type="email" placeholder="you@email.com" autoComplete="email"/>
        </div>
        <div className="field">
          <label>Phone number</label>
          <input type="text" placeholder="+971 50 123 4567" autoComplete="tel"/>
          <small>Include country code</small>
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Country</label>
          <select defaultValue="">
            <option value="" hidden>Select your country</option>
            <option>United Arab Emirates</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>India</option>
            <option>Singapore</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>I am a...</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" hidden>Choose one</option>
            <option value="affiliate">Affiliate</option>
            <option value="ib">Introducing Broker (IB)</option>
            <option value="platform">Trading Platform or Broker</option>
          </select>
        </div>
      </div>

      <button type="button" className="submit-btn">
        Send message
        <svg className="submit-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <p className="form-note">No retail trader applications · We respond within 24 hours</p>
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

      <div className="fx-chips">
        <div className="fx-chip c1"><span className="fc-pair">CPA DEALS</span><span className="fc-up">Guaranteed better terms</span></div>
        <div className="fx-chip c2"><span className="fc-pair">IB GROWTH</span><span className="fc-up">Marketing support included</span></div>
        <div className="fx-chip c3"><span className="fc-pair">PLATFORMS</span><span className="fc-dn">Vetted partner matching</span></div>
      </div>
    </div>
  );
}

function TickingPrice({ base, drift = 0.0006 }) {
  const [value, setValue] = React.useState(base);
  const [up, setUp] = React.useState(true);

  React.useEffect(() => {
    let current = base;
    const id = setInterval(() => {
      const delta = (Math.random() - 0.5) * 2 * drift * base;
      current = Math.max(base * 0.98, Math.min(base * 1.02, current + delta));
      setUp(delta >= 0);
      setValue(current);
    }, 1400);
    return () => clearInterval(id);
  }, [base, drift]);

  const decimals = base < 10 ? 5 : 2;
  return (
    <span className={`tk-price ${up ? "up" : "dn"}`}>
      {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

function MarketStrip() {
  const items = [
    { p: "GBP/USD", base: 1.27413, d: "+0.42%", up: true },
    { p: "EUR/USD", base: 1.08530, d: "+0.18%", up: true },
    { p: "XAU/USD", base: 2357.20, d: "+1.07%", up: true },
  ];
  const all = [...items, ...items];

  return (
    <div className="market-strip">
      <div className="ms-track">
        {all.map((it, i) => (
          <div className="ms-item" key={i}>
            <span className="ms-pair">{it.p}</span>
            <span className="ms-price"><TickingPrice base={it.base}/></span>
            <span className={`ms-delta ${it.up ? "up" : "dn"}`}>{it.up ? "▲" : "▼"} {it.d}</span>
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
            <span className="dot"></span> The FX Industry&apos;s Growth Partner
          </span>
          <h1>
            Unlock Better Deals.
            <br/>
            Grow Your <span className="accent">FX Business.</span>
          </h1>
          <p className="hero-sub">
            FX Unlocked connects FX educators, content creators, and introducing brokers with the world&apos;s leading trading platforms on off-market CPA and rebate deals, backed by free marketing support, educational content, and a team with over a decade of FX experience.
          </p>
          <div className="hero-cta-row">
            <a href="contact-us.html" className="btn btn-cyan">Apply as an Affiliate or IB <span className="arrow">→</span></a>
            <a href="contact-us.html" className="btn btn-ghost">Are you a trading platform?</a>
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
