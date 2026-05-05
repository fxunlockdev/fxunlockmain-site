/* Partners marquee, About, Maximize Revenue, Trade With Confidence */

function PartnersMarquee() {
  const partners = [
    { name: "VantageFX", icon: "▲" },
    { name: "ICMarkets", icon: "◆" },
    { name: "Pepperstone", icon: "●" },
    { name: "FxPro", icon: "✦" },
    { name: "Exness", icon: "◈" },
    { name: "ThinkMarkets", icon: "◉" },
    { name: "BlackBull", icon: "■" },
    { name: "FBS", icon: "◇" },
  ];
  const items = [...partners, ...partners];
  return (
    <section className="marquee-section">
      <div className="container">
        <div className="marquee-eyebrow">
          <h4>// Trusted by industry-leading brokers</h4>
          <span className="pill">8 partners · 12 platforms</span>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((p, i) => (
            <div key={i} className="partner">
              <span style={{ color: 'var(--cyan)' }}>{p.icon}</span> {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MosaicVisual({ label, pair, price, delta, up = true, hue = "cyan" }) {
  const sparkUp = [4,5,4.5,6,5.5,7,6.5,8,7.5,9,8.5,10,9.5,11];
  const sparkDown = [10,9.5,9.8,8.5,8.7,7.5,7.8,7,6.5,6,5.5,5,4.5,4];
  const points = up ? sparkUp : sparkDown;
  const w = 240, h = 60;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / range) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <div className="mosaic">
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>
      <div className="frame-overlay">
        <div className="top-stats">
          <span>● Live</span>
          <span>{label}</span>
        </div>
        <div style={{ flex: 1, padding: "20px 24px", display:'flex', flexDirection:'column', justifyContent:'center', gap: 8 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{up ? "Trending up" : "Trending down"}</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {pair}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 32, letterSpacing: '-0.02em', marginTop: 4 }}>{price}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: up ? 'var(--pos)' : 'var(--neg)' }}>{up ? '▲' : '▼'} {delta}</div>
        </div>
        <div className="chart-card">
          <div className="ch-head">
            <span className="ch-pair">{pair} · 1D</span>
            <span className="ch-price" style={{ color: up ? 'var(--pos)' : 'var(--neg)' }}>{up ? '+' : ''}{delta}</span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id={`mg-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={up ? 'var(--pos)' : 'var(--neg)'} stopOpacity="0.4"/>
                <stop offset="100%" stopColor={up ? 'var(--pos)' : 'var(--neg)'} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#mg-${label})`}/>
            <path d={path} fill="none" stroke={up ? 'var(--pos)' : 'var(--neg)'} strokeWidth="1.6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ num, title, lede, body, bullets, mosaicProps, reverse, sectionId, ctaLabel = "Learn more" }) {
  return (
    <section className="section" id={sectionId}>
      <div className="container">
        <div className="section-head">
          <div>
            <p className="num">— {num}</p>
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          <p className="lede">{lede}</p>
        </div>
        <div className={`about-grid${reverse ? ' reverse' : ''}`}>
          <div className="about-copy">
            <p>{body}</p>
            <ul className="about-bullets">
              {bullets.map((b, i) => (
                <li key={i}>
                  <span className="b-num">{String(i+1).padStart(2,'0')}</span>
                  <span className="b-body">
                    <strong>{b.title}</strong>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#" className="btn btn-ghost" style={{ marginTop: 32 }}>
              {ctaLabel} <span className="arrow">→</span>
            </a>
          </div>
          <MosaicVisual {...mosaicProps}/>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <FeatureBlock
      sectionId="aboutUs"
      num="01 / About"
      title='About <em>FX Unlocked</em>'
      lede="We connect FX educators and creators with the world's leading trading platforms — driving mutual growth, every quarter."
      body="At FX Unlocked, we understand the dynamic world of Foreign Exchange (FX) and the immense potential it holds. Our mission is to create powerful partnerships between FX Educators and leading FX trading platforms, driving mutual growth and success. Whether you're an existing affiliate looking for a more attractive deal (CPA / Rebates), or you're an aspiring trader looking for a comprehensive trading course, FX Unlocked has you covered."
      bullets={[
        { title: "For affiliates & IBs", text: "Better CPAs, faster payouts, and dedicated account management with global brokers." },
        { title: "For trading platforms", text: "Access a vetted network of high-performing educators with engaged FX audiences." },
        { title: "For traders", text: "Comprehensive courses and tooling to start trading with discipline and confidence." },
      ]}
      mosaicProps={{ label: "EUR/USD · 1D", pair: "EUR / USD", price: "1.0843", delta: "+0.42%", up: true }}
    />
  );
}

function MaximizeRevenue() {
  return (
    <FeatureBlock
      sectionId="MaximizeRevenue"
      reverse
      num="02 / Affiliates & IBs"
      title='Looking to <em>maximize</em> your revenue?'
      lede="Stop leaving CPA on the table. We negotiate market-leading deals on your behalf and bring the marketing firepower."
      body="Are you an FX educator with a growing audience but struggling to monetize your traffic effectively? FX Unlocked is here to help. We specialize in connecting you with top-tier Foreign Exchange Trading Platforms that are eager to partner and sponsor influential creators."
      bullets={[
        { title: "Market-leading CPA deals", text: "Negotiated rates 1.5–3× higher than what affiliates source independently." },
        { title: "Marketing support", text: "Branding, creative, paid media playbooks and conversion-rate optimisation." },
        { title: "Single dashboard", text: "Track clicks, conversions and rebates across all your broker partnerships in one place." },
      ]}
      mosaicProps={{ label: "REVENUE · MTD", pair: "+312%", price: "$48,210", delta: "+12.4%", up: true }}
    />
  );
}

function TradeWithConfidence() {
  return (
    <FeatureBlock
      sectionId="TradeWithConfidence"
      num="03 / Education"
      title='Trade with <em>confidence</em>.'
      lede="Comprehensive FX courses for every stage — from your first pip to systematic strategy."
      body="At FX Unlocked, we empower aspiring traders with the knowledge and tools they need to succeed in the dynamic world of Forex trading. Our comprehensive trading courses are designed for beginners and seasoned traders alike, offering step-by-step guidance, market insights and proven strategies. Whether you're looking to build a new skill or enhance your trading expertise, FX Unlocked has everything you need."
      bullets={[
        { title: "Foundations", text: "12 modules on price action, risk management and trading psychology." },
        { title: "Live mentorship", text: "Weekly market breakdowns and 1-on-1 sessions with senior traders." },
        { title: "Verified strategies", text: "Backtested setups, journals and accountability cohorts that actually compound." },
      ]}
      mosaicProps={{ label: "XAU/USD · 4H", pair: "XAU / USD", price: "4,557.20", delta: "+1.07%", up: true }}
      ctaLabel="Explore all products"
    />
  );
}

window.PartnersMarquee = PartnersMarquee;
window.About = About;
window.MaximizeRevenue = MaximizeRevenue;
window.TradeWithConfidence = TradeWithConfidence;
