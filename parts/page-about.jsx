/* About Us page */

function AboutHero() {
  return (
    <section className="page-hero">
      <div className="hero-fx" aria-hidden="true">
        <div className="mesh mesh-a"></div>
        <div className="mesh mesh-b"></div>
        <div className="mesh mesh-c"></div>
      </div>
      <div className="container">
        <span className="eyebrow"><span className="dot"></span>About FX Unlocked</span>
        <h1>About <span className="accent">FX Unlocked</span></h1>
        <p className="lead">
          A decade of FX expertise. A global network. One mission: better deals, better growth, for everyone in the FX ecosystem.
        </p>
      </div>
    </section>
  );
}

function AboutMission() {
  return (
    <section className="section">
      <div className="container">
        <span className="section-eyebrow">Our Story</span>
        <h2>Built to fix the biggest gaps in the <span className="accent">market.</span></h2>
        <p className="lede">
          FX Unlocked was founded by professionals who spent years working inside the foreign exchange industry with brokers, affiliate networks, and trading platforms across multiple continents. We saw the same problems everywhere we looked.
        </p>
        <p className="lede">
          FX educators with large, engaged audiences were being offered mediocre CPA rates because they lacked the network leverage to negotiate better. Experienced IBs with strong client books were locked into rebate structures well below what the market would bear. And brokers looking to expand into new regions couldn&apos;t reliably source quality, compliant affiliate partners.
        </p>
        <p className="lede" style={{ marginBottom: 0 }}>
          FX Unlocked exists to fix all three of those problems at once. We sit at the centre of the FX ecosystem, connecting the right affiliates and IBs to the right broker partners on terms that reflect the true value of the traffic and client relationships being brought to the table. We&apos;re headquartered on the 38th floor of Media One Tower in Dubai Marina, with team members across five countries and active broker relationships on every major trading continent.
        </p>
      </div>
    </section>
  );
}

function AboutMaximize() {
  const values = [
    {
      title: "Better Deals, Always",
      text: "We guarantee to beat your current CPA or rebate deal. If we can’t, we’ll tell you why. Our entire model is built on delivering demonstrably better terms for every partner we work with.",
    },
    {
      title: "Long-Term Partnership",
      text: "We don’t place you with a broker and disappear. We stay involved, reviewing your performance, supporting your growth, and making sure the match keeps working for both sides.",
    },
    {
      title: "Transparency",
      text: "You’ll always know what deal you’re on, why we’ve recommended a particular broker, and exactly what our role in the relationship is. No hidden arrangements, no vague promises.",
    },
    {
      title: "Global Reach, Local Knowledge",
      text: "FX is a local business. Regulations differ. Audiences differ. Client expectations differ. That’s why we have country managers on the ground, not a centralised support desk.",
    },
  ];

  return (
    <section className="section dark">
      <div className="container">
        <span className="section-eyebrow">Mission &amp; Values</span>
        <h2>What We <span className="accent">Stand For</span></h2>
        <div className="feature-grid" style={{ marginTop: 32 }}>
          {values.map((value, i) => (
            <div key={i} className="feature-card">
              <div className="feature-num">{String(i + 1).padStart(2, "0")}</div>
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
        <span className="section-eyebrow">The Team</span>
        <h2>Meet the <span className="accent">Team</span></h2>
        <div className="feature-card team-placeholder-card">
          <h3>Team profiles to be added</h3>
          <p>Add real photos, names, roles, and short bios once confirmed. Suggested format: headshot, name, title, and a short two-sentence bio for each team member.</p>
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
        <div className="wide-stat-callout">
          <span>200+ partners</span>
          <span>12 trading platforms</span>
          <span>Staff in 5 countries</span>
          <span>10+ years of industry experience</span>
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
