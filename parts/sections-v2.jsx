/* Homepage content sections aligned to the June 2026 brief */

function SectionIcon({ type }) {
  if (type === "creator") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="6" y="7" width="20" height="18" rx="6" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 21c1.8-2.4 3.8-3.6 5-3.6S19.2 18.6 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === "ib") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 23h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 20V12M16 20V9M22 20v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="2" fill="currentColor"/>
        <circle cx="16" cy="7" r="2" fill="currentColor"/>
        <circle cx="22" cy="13" r="2" fill="currentColor"/>
      </svg>
    );
  }
  if (type === "platform") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="6" y="8" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 24h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M14 20v4M18 20v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === "deal") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 18l5-5 4 4 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "manager") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 24c1.8-3 4.2-4.5 7-4.5s5.2 1.5 7 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 10h3M25.5 8.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === "education") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 10.5L16 6l9 4.5-9 4.5-9-4.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M10 13v6c1.8 1.4 3.8 2.1 6 2.1s4.2-.7 6-2.1v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "products") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="6" y="7" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="18" y="7" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="6" y="17" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="18" y="17" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M16 7l8 4.5v9L16 25l-8-4.5v-9L16 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M16 7v18M8 11.5l8 4.5 8-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function StoryMetric({ label, value }) {
  return (
    <div className="story-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AboutV2() {
  const audiences = [
    {
      icon: "creator",
      eyebrow: "Creator-led growth",
      title: "FX Educators & Content Creators",
      text: "You’ve built an audience around trading content. We’ll connect you to the right broker partners, secure a deal that reflects the quality of your traffic, and support your growth with marketing help that actually moves the needle.",
      cta: "Apply as an Affiliate",
    },
    {
      icon: "ib",
      eyebrow: "Volume-based rebates",
      title: "Introducing Brokers (IBs)",
      text: "You have an established client base of active traders. We’ll place you on the best rebate structure in the market for your volume and give you the tools to scale your book further.",
      cta: "Apply as an IB",
    },
    {
      icon: "platform",
      eyebrow: "Broker acquisition",
      title: "Trading Platforms & Brokers",
      text: "You need quality client acquisition from vetted, high-performing affiliates and IBs in specific markets. We’ll match you with the right partners and manage the relationship end to end.",
      cta: "Partner with us",
    },
  ];

  return (
    <section className="section section-gradient">
      <div className="container">
        <div className="section-head compact">
          <div>
            <p className="num">01 · Who we work with</p>
            <h2>Built for the partners actually driving <em>FX growth.</em></h2>
          </div>
          <p className="lede">Three distinct partner types, one shared promise: better economics, better support, and a smarter growth engine than going it alone.</p>
        </div>
        <div className="audience-grid">
          {audiences.map((item, i) => (
            <div key={i} className="audience-card">
              <div className="audience-card-top">
                <div className="section-icon"><SectionIcon type={item.icon}/></div>
                <span className="audience-eyebrow">{item.eyebrow}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href="contact-us.html" className="feature-link">{item.cta} <span className="arrow">→</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaximizeRevenueV2() {
  return (
    <section className="section">
      <div className="container story-shell">
        <div className="story-copy">
          <span className="section-eyebrow">About FX Unlocked</span>
          <h2>Built by people who know the <span className="accent">FX industry.</span></h2>
          <p className="lede">
            FX Unlocked was built by people who&apos;ve spent their careers inside the foreign exchange industry. We&apos;ve seen talented educators undersell their audiences, IBs stuck on poor deals, and brokers struggle to find quality affiliate partners in the markets they want to reach.
          </p>
          <p className="lede">
            So we built the solution. We sit in the middle, connecting educators and IBs to regulated trading platforms on off-market terms, with the marketing support and educational tools to help our partners grow their businesses alongside their broker relationships.
          </p>
          <a href="about-us.html" className="btn-outline-dark">Our full story</a>
        </div>
        <div className="story-visual">
          <div className="story-panel main">
            <div className="story-orb"></div>
            <div className="story-panel-head">FX ecosystem snapshot</div>
            <div className="timeline-stack">
              <div className="timeline-item"><span className="timeline-dot"></span><strong>Educators</strong><p>Undervalued audiences become premium traffic partnerships.</p></div>
              <div className="timeline-item"><span className="timeline-dot"></span><strong>IBs</strong><p>Client books move onto stronger structures with real growth support.</p></div>
              <div className="timeline-item"><span className="timeline-dot"></span><strong>Brokers</strong><p>Vetted, geography-matched acquisition without random affiliate noise.</p></div>
            </div>
          </div>
          <div className="story-metrics">
            <StoryMetric label="Headquartered" value="Dubai Marina"/>
            <StoryMetric label="Experience" value="10+ years"/>
            <StoryMetric label="Operating" value="Globally"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function TradeWithConfidenceV2() {
  return (
    <section className="section dark section-rich-dark">
      <div className="container">
        <div className="section-head compact">
          <div>
            <p className="num">03 · How it works</p>
            <h2>A simple path from first call to <em>stronger revenue.</em></h2>
          </div>
          <p className="lede">Structured onboarding, negotiated terms, and continuous growth support rather than a one-off intro and silence.</p>
        </div>
        <div className="process-lane">
          <div className="process-card">
            <div className="step-num">1</div>
            <div className="section-icon small"><SectionIcon type="manager"/></div>
            <h3>Apply &amp; Speak to Us</h3>
            <p>Fill in our short form. We’ll arrange a call with your regional country manager within 24 hours to understand your audience, volume, and current deal.</p>
          </div>
          <div className="process-card">
            <div className="step-num">2</div>
            <div className="section-icon small"><SectionIcon type="platform"/></div>
            <h3>Get Matched &amp; Onboarded</h3>
            <p>We match you with the right broker partner for your geography and traffic type, negotiate your deal, and handle onboarding from start to finish.</p>
          </div>
          <div className="process-card">
            <div className="step-num">3</div>
            <div className="section-icon small"><SectionIcon type="deal"/></div>
            <h3>Start Earning. Keep Growing.</h3>
            <p>Go live on your best-ever CPA or rebate structure. We stay with you through regular reviews, marketing support, and access to our full product suite.</p>
          </div>
        </div>
        <div className="cta-row" style={{ marginTop: 32 }}>
          <a href="contact-us.html" className="btn-grad">Get started <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

function PartnerBenefits() {
  const benefits = [
    ["deal", "Off-Market Broker Deals", "We guarantee to beat your current CPA or rebate arrangement. Our network volume and broker relationships give us leverage you can’t access alone."],
    ["manager", "Free Dedicated Marketing Manager", "Every active partner gets an in-house marketing manager at no cost. Social strategy, content planning, brand building, and campaign support are included."],
    ["education", "Free Educational Content", "Give your community access to professional trading courses free of charge to you. Use them as a lead magnet, member benefit, or premium upsell."],
    ["products", "Full FX Product Portfolio", "Beyond broker referrals, you’ll have access to AI algorithmic trading tools, webinar series, and structured education ready to offer your audience."],
    ["platform", "Bi-Monthly Reviews & Growth Audits", "A fortnightly check-in call and a full half-yearly business audit covering your content, traffic, conversions, and revenue."],
  ];

  return (
    <section className="section section-gradient-soft">
      <div className="container">
        <div className="section-head compact">
          <div>
            <p className="num">04 · What partners get</p>
            <h2>Everything you need to <em>grow.</em></h2>
          </div>
          <p className="lede">Not just a deal upgrade. A full stack of support, assets, and growth infrastructure designed to compound your audience into revenue.</p>
        </div>
        <div className="benefits-showcase">
          {benefits.map(([icon, title, text], i) => (
            <div key={i} className="benefit-tile">
              <div className="section-icon"><SectionIcon type={icon}/></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.AboutV2 = AboutV2;
window.MaximizeRevenueV2 = MaximizeRevenueV2;
window.TradeWithConfidenceV2 = TradeWithConfidenceV2;
window.PartnerBenefits = PartnerBenefits;
