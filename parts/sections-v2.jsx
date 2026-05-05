/* v2 — minimalist data cards instead of mosaics */

function DataCardV2({ pair, price, delta, up = true, range, vol, high }) {
  const sparkUp = [4,5,4.5,6,5.8,7,6.5,8.5,7.5,9.5,8.5,10.5,9.5,11.5,10.5,12.5];
  const sparkDown = [11,10.5,11,9.5,10,8.5,9,7.5,8,7,6.5,6,5.5,5,4.5,4];
  const points = up ? sparkUp : sparkDown;
  const w = 400, h = 120;
  const max = Math.max(...points), min = Math.min(...points);
  const r = max - min || 1;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / r) * (h - 8) - 4;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const id = `dcg-${pair.replace(/[^a-z0-9]/gi,'')}`;
  return (
    <div className="datacard">
      <div className="dc-head">
        <span className="dc-pair">{pair} · 1D</span>
        <span className="dc-live">Live</span>
      </div>
      <div className="dc-body">
        <div className="dc-bigprice">{price}</div>
        <div className="dc-meta">
          <span className={`delta${up ? '' : ' neg'}`}>{up ? '↗' : '↘'} {delta}</span>
          <span>·</span>
          <span>24h</span>
        </div>
        <div className="dc-chart">
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#${id})`}/>
            <path d={path} fill="none" stroke="var(--cyan)" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
      <div className="dc-foot">
        <div>Range<b>{range}</b></div>
        <div>Volume<b>{vol}</b></div>
        <div>High<b>{high}</b></div>
      </div>
    </div>
  );
}

function FeatureBlockV2({ num, title, lede, body, bullets, cardProps, reverse, sectionId, ctaLabel = "Learn more" }) {
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
          {reverse && <DataCardV2 {...cardProps}/>}
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
            <a href="#" className="btn" style={{ marginTop: 32 }}>
              {ctaLabel} <span className="arrow">→</span>
            </a>
          </div>
          {!reverse && <DataCardV2 {...cardProps}/>}
        </div>
      </div>
    </section>
  );
}

function AboutV2() {
  return (
    <FeatureBlockV2
      sectionId="aboutUs"
      num="01 / About"
      title='About <em>FX Unlocked</em>.'
      lede="We connect FX educators and creators with the world's leading trading platforms — driving mutual growth, every quarter."
      body="At FX Unlocked, we understand the dynamic world of Foreign Exchange (FX) and the immense potential it holds. Our mission is to create powerful partnerships between FX Educators and leading FX trading platforms, driving mutual growth and success. Whether you're an existing affiliate looking for a more attractive deal (CPA / Rebates), or you're an aspiring trader looking for a comprehensive trading course, FX Unlocked has you covered."
      bullets={[
        { title: "For affiliates & IBs", text: "Better CPAs, faster payouts, and dedicated account management with global brokers." },
        { title: "For trading platforms", text: "Access a vetted network of high-performing educators with engaged FX audiences." },
        { title: "For traders", text: "Comprehensive courses and tooling to start trading with discipline and confidence." },
      ]}
      cardProps={{ pair: "EUR/USD", price: "1.0843", delta: "+0.42%", up: true, range: "1.078 – 1.087", vol: "$112.4B", high: "1.0871" }}
    />
  );
}

function MaximizeRevenueV2() {
  return (
    <FeatureBlockV2
      sectionId="MaximizeRevenue"
      reverse
      num="02 / Affiliates & IBs"
      title='<em>Maximize</em> your revenue.'
      lede="Stop leaving CPA on the table. We negotiate market-leading deals on your behalf and bring the marketing firepower."
      body="Are you an FX educator with a growing audience but struggling to monetize your traffic effectively? FX Unlocked is here to help. We specialize in connecting you with top-tier Foreign Exchange Trading Platforms that are eager to partner and sponsor influential creators."
      bullets={[
        { title: "Market-leading CPA deals", text: "Negotiated rates 1.5–3× higher than what affiliates source independently." },
        { title: "Marketing support", text: "Branding, creative, paid media playbooks and conversion-rate optimisation." },
        { title: "Single dashboard", text: "Track clicks, conversions and rebates across all your broker partnerships in one place." },
      ]}
      cardProps={{ pair: "REVENUE · MTD", price: "$48,210", delta: "+312%", up: true, range: "$11k – $48k", vol: "1,240 conv.", high: "Top 5%" }}
    />
  );
}

function TradeWithConfidenceV2() {
  return (
    <FeatureBlockV2
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
      cardProps={{ pair: "XAU/USD", price: "4,557.20", delta: "+1.07%", up: true, range: "4,508 – 4,562", vol: "$84.2B", high: "4,562" }}
      ctaLabel="Explore all products"
    />
  );
}

window.AboutV2 = AboutV2;
window.MaximizeRevenueV2 = MaximizeRevenueV2;
window.TradeWithConfidenceV2 = TradeWithConfidenceV2;
