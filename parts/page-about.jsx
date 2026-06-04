/* About Us page */

function AboutPageIcon({ type }) {
  if (type === "deal") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 19l5-5 4 4 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 8h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === "partnership") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M11 18l3 3 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9h14v14H9z" stroke="currentColor" strokeWidth="1.8" rx="4"/>
      </svg>
    );
  }
  if (type === "transparency") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 7l8 4v6c0 4-2.5 7.4-8 8-5.5-.6-8-4-8-8v-6l8-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M16 12v6M16 22h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="11" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="21" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M6 23c1.8-3 3.8-4.5 5-4.5M26 23c-1.8-3-3.8-4.5-5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M13.5 20.5c.9-1.7 1.8-2.5 2.5-2.5.7 0 1.6.8 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function AboutHero() {
  return (
    <section className="page-hero about-hero-premium">
      <div className="hero-fx" aria-hidden="true">
        <div className="mesh mesh-a"></div>
        <div className="mesh mesh-b"></div>
        <div className="mesh mesh-c"></div>
      </div>
      <div className="container about-hero-grid">
        <div>
          <span className="eyebrow"><span className="dot"></span>About FX Unlocked</span>
          <h1>Built inside the industry. Designed to create <span className="accent">better outcomes.</span></h1>
          <p className="lead">
            A decade of FX expertise. A global network. One mission: better deals, better growth, for everyone in the FX ecosystem.
          </p>
        </div>
        <div className="about-hero-visual">
          <div className="about-visual-card tall">
            <div className="about-visual-kicker">Operating model</div>
            <h3>We sit at the centre of the FX ecosystem.</h3>
            <p>Affiliates, IBs, and brokers connected through stronger commercial terms, smarter matching, and long-term growth support.</p>
            <div className="about-node-row">
              <span>Educators</span>
              <span>IBs</span>
              <span>Brokers</span>
            </div>
          </div>
          <div className="about-visual-stack">
            <div className="about-visual-card mini"><strong>10+</strong><span>Years in FX</span></div>
            <div className="about-visual-card mini"><strong>5</strong><span>Countries staffed</span></div>
            <div className="about-visual-card mini"><strong>Dubai</strong><span>HQ base</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutMission() {
  return (
    <section className="section section-gradient-soft">
      <div className="container story-shell">
        <div className="story-copy">
          <span className="section-eyebrow">Our Story</span>
          <h2>Built to fix the biggest gaps in the <span className="accent">market.</span></h2>
          <p className="lede">
            FX Unlocked was founded by professionals who spent years working inside the foreign exchange industry with brokers, affiliate networks, and trading platforms across multiple continents. We saw the same problems everywhere we looked.
          </p>
          <p className="lede">
            FX educators with large, engaged audiences were being offered mediocre CPA rates because they lacked the network leverage to negotiate better. Experienced IBs with strong client books were locked into rebate structures well below what the market would bear. And brokers looking to expand into new regions couldn&apos;t reliably source quality, compliant affiliate partners.
          </p>
          <p className="lede" style={{ marginBottom: 0 }}>
            FX Unlocked exists to fix all three of those problems at once. We connect the right affiliates and IBs to the right broker partners on terms that reflect the true value of the traffic and client relationships being brought to the table.
          </p>
        </div>
        <div className="story-visual">
          <div className="story-panel main">
            <div className="story-panel-head">Where the value gets unlocked</div>
            <div className="timeline-stack">
              <div className="timeline-item"><span className="timeline-dot"></span><strong>Network leverage</strong><p>Commercial terms improve when broker negotiations happen at network scale instead of one partner at a time.</p></div>
              <div className="timeline-item"><span className="timeline-dot"></span><strong>Regional matching</strong><p>Country-aware partner placement improves traffic quality, conversion fit, and retention.</p></div>
              <div className="timeline-item"><span className="timeline-dot"></span><strong>Growth support</strong><p>Marketing, education, and tools make the broker relationship perform after onboarding.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutMaximize() {
  const values = [
    {
      icon: "deal",
      title: "Better Deals, Always",
      text: "We guarantee to beat your current CPA or rebate deal. If we can’t, we’ll tell you why. Our model is built on delivering demonstrably better terms for every partner we work with.",
    },
    {
      icon: "partnership",
      title: "Long-Term Partnership",
      text: "We don’t place you with a broker and disappear. We stay involved, reviewing performance, supporting growth, and making sure the match keeps working for both sides.",
    },
    {
      icon: "transparency",
      title: "Transparency",
      text: "You’ll always know what deal you’re on, why we recommended a broker, and exactly what our role in the relationship is. No hidden arrangements, no vague promises.",
    },
    {
      icon: "reach",
      title: "Global Reach, Local Knowledge",
      text: "FX is a local business. Regulations, audiences, and expectations differ. That’s why we have country managers on the ground, not a centralised support desk.",
    },
  ];

  return (
    <section className="section dark section-rich-dark">
      <div className="container">
        <div className="section-head compact">
          <div>
            <p className="num">Mission &amp; values</p>
            <h2>What we <em>stand for.</em></h2>
          </div>
          <p className="lede">Not generic brand values pasted on a wall. These are the operating principles behind how we negotiate, place, and grow partner relationships.</p>
        </div>
        <div className="audience-grid values-grid">
          {values.map((value, i) => (
            <div key={i} className="audience-card dark-card">
              <div className="audience-card-top">
                <div className="section-icon"><AboutPageIcon type={value.icon}/></div>
                <span className="audience-eyebrow">0{i + 1}</span>
              </div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTrade() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head compact">
          <div>
            <p className="num">The team</p>
            <h2>Meet the <em>team.</em></h2>
          </div>
          <p className="lede">A strong placeholder is better than a dead empty block, so this area is now framed to accept real headshots, names, roles, and short bios once supplied.</p>
        </div>
        <div className="team-placeholder-shell">
          <div className="team-placeholder-main">
            <div className="section-icon"><AboutPageIcon type="partnership"/></div>
            <h3>Team profiles to be added</h3>
            <p>Add real photos, names, roles, and short bios once confirmed. Suggested format: headshot, name, title, and a concise two-sentence bio for each team member.</p>
          </div>
          <div className="team-placeholder-list">
            <div className="team-skeleton-card"></div>
            <div className="team-skeleton-card"></div>
            <div className="team-skeleton-card"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutNumbers() {
  return (
    <section className="section dark">
      <div className="container">
        <span className="section-eyebrow">Stats</span>
        <div className="wide-stat-callout premium">
          <span><strong>200+</strong> partners</span>
          <span><strong>12</strong> trading platforms</span>
          <span><strong>5</strong> countries with staff</span>
          <span><strong>10+</strong> years of industry experience</span>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="section tight">
      <div className="container">
        <div className="wide-cta">
          <h2>Want to <span style={{ fontStyle: "italic" }}>Work With Us?</span></h2>
          <p>
            Whether you&apos;re an educator, an IB, or a trading platform looking for quality partners, get in touch and we&apos;ll tell you what we can do.
          </p>
          <div className="cta-row">
            <a href="contact-us.html" className="btn-grad">Contact us <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.AboutHero = AboutHero;
window.AboutMission = AboutMission;
window.AboutMaximize = AboutMaximize;
window.AboutTrade = AboutTrade;
window.AboutNumbers = AboutNumbers;
window.AboutCTA = AboutCTA;
