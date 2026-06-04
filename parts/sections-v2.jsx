/* Homepage content sections aligned to the June 2026 brief */

function AboutV2() {
  return (
    <section className="section">
      <div className="container">
        <span className="section-eyebrow">Who We Work With</span>
        <h2>Who We <span className="accent">Work With</span></h2>
        <div className="feature-grid" style={{ marginTop: 32 }}>
          <div className="feature-card">
            <div className="feature-num">01</div>
            <h3>FX Educators &amp; Content Creators</h3>
            <p>You&apos;ve built an audience around trading content. We&apos;ll connect you to the right broker partners, secure a deal that reflects the quality of your traffic, and support your growth with marketing help that actually moves the needle.</p>
            <a href="contact-us.html" className="feature-link">Apply as an Affiliate <span className="arrow">→</span></a>
          </div>
          <div className="feature-card">
            <div className="feature-num">02</div>
            <h3>Introducing Brokers (IBs)</h3>
            <p>You have an established client base of active traders. We&apos;ll place you on the best rebate structure in the market for your volume and give you the tools to scale your book further.</p>
            <a href="contact-us.html" className="feature-link">Apply as an IB <span className="arrow">→</span></a>
          </div>
          <div className="feature-card">
            <div className="feature-num">03</div>
            <h3>Trading Platforms &amp; Brokers</h3>
            <p>You need quality client acquisition from vetted, high-performing affiliates and IBs in specific markets. We&apos;ll match you with the right partners and manage the relationship end to end.</p>
            <a href="contact-us.html" className="feature-link">Partner with us <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaximizeRevenueV2() {
  return (
    <section className="section alt">
      <div className="container">
        <div className="two-col" style={{ alignItems: "center" }}>
          <div>
            <span className="section-eyebrow">About FX Unlocked</span>
            <h2>Built by people who know the <span className="accent">FX industry.</span></h2>
          </div>
          <div>
            <p className="lede" style={{ marginBottom: 20 }}>
              FX Unlocked was built by people who&apos;ve spent their careers inside the foreign exchange industry. We&apos;ve seen talented educators undersell their audiences, IBs stuck on poor deals, and brokers struggle to find quality affiliate partners in the markets they want to reach.
            </p>
            <p className="lede" style={{ marginBottom: 28 }}>
              So we built the solution. We sit in the middle, connecting educators and IBs to regulated trading platforms on off-market terms, with the marketing support and educational tools to help our partners grow their businesses alongside their broker relationships. Based in Dubai. Operating globally. Over a decade of FX expertise behind every deal we negotiate.
            </p>
            <a href="about-us.html" className="btn-outline-dark">Our full story</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TradeWithConfidenceV2() {
  return (
    <section className="section dark">
      <div className="container">
        <span className="section-eyebrow">How It Works</span>
        <h2>How It <span className="accent">Works</span></h2>
        <div className="step-list" style={{ marginTop: 32 }}>
          <div className="step">
            <div className="step-num">1</div>
            <div>
              <h3>Apply &amp; Speak to Us</h3>
              <p>Fill in our short form. We&apos;ll arrange a call with your regional country manager within 24 hours to understand your audience, volume, and current deal.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div>
              <h3>Get Matched &amp; Onboarded</h3>
              <p>We match you with the right broker partner for your geography and traffic type, negotiate your deal, and handle onboarding from start to finish.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div>
              <h3>Start Earning. Keep Growing.</h3>
              <p>Go live on your best-ever CPA or rebate structure. We stay with you through regular reviews, marketing support, and access to our full product suite.</p>
            </div>
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
  return (
    <section className="section">
      <div className="container">
        <span className="section-eyebrow">What Partners Get</span>
        <h2>Everything You Need to <span className="accent">Grow</span></h2>
        <div className="feature-grid" style={{ marginTop: 32 }}>
          <div className="feature-card">
            <h3>Off-Market Broker Deals</h3>
            <p>We guarantee to beat your current CPA or rebate arrangement. Our network volume and broker relationships give us leverage you can&apos;t access alone.</p>
          </div>
          <div className="feature-card">
            <h3>Free Dedicated Marketing Manager</h3>
            <p>Every active partner gets an in-house marketing manager at no cost. Social strategy, content planning, brand building, and campaign support are included.</p>
          </div>
          <div className="feature-card">
            <h3>Free Educational Content for Your Audience</h3>
            <p>Give your community access to professional trading courses free of charge to you. Use them as a lead magnet, member benefit, or premium upsell.</p>
          </div>
          <div className="feature-card">
            <h3>Full FX Product Portfolio</h3>
            <p>Beyond broker referrals, you&apos;ll have access to AI algorithmic trading tools, webinar series, and structured education ready to offer your audience.</p>
          </div>
          <div className="feature-card">
            <h3>Bi-Monthly Reviews &amp; Growth Audits</h3>
            <p>A fortnightly check-in call and a full half-yearly business audit covering your content, traffic, conversions, and revenue.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

window.AboutV2 = AboutV2;
window.MaximizeRevenueV2 = MaximizeRevenueV2;
window.TradeWithConfidenceV2 = TradeWithConfidenceV2;
window.PartnerBenefits = PartnerBenefits;
