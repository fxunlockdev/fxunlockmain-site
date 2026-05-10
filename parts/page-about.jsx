/* About Us — single-page layout reusing v4 design tokens */

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
        <h1>About <span className="accent">FX Unlocked.</span></h1>
        <p className="lead">
          Powerful partnerships between FX Educators and Leading FX trading platforms — driving mutual growth and success.
        </p>
        <div className="cta-row">
          <a href="affiliates-ibs.html" className="btn-grad">Learn More <span className="arrow">→</span></a>
          <a href="contact-us.html" className="btn-outline">Talk to us</a>
        </div>
      </div>
    </section>
  );
}

function AboutMission() {
  return (
    <section className="section">
      <div className="container">
        <span className="section-eyebrow">— Our Mission</span>
        <h2>About <span className="accent">FX Unlocked.</span></h2>
        <p className="lede">
          At FX Unlocked, we understand the dynamic world of Foreign Exchange (FX) and the immense potential it holds. Our mission is to create powerful partnerships between FX Educators and Leading FX trading platforms, driving mutual growth and success. Whether you're an existing Affiliate looking for a more attractive deal (CPA/Rebates), or you're an aspiring Trader looking for a comprehensive Trading course, FX Unlocked has you covered.
        </p>
      </div>
    </section>
  );
}

function AboutMaximize() {
  return (
    <section className="section dark">
      <div className="container">
        <div className="two-col">
          <div>
            <span className="pill">For Educators</span>
            <h2>Looking to <span className="accent">maximize</span> your revenue?</h2>
          </div>
          <div>
            <p className="lede">
              Are you an FX educator with a growing audience but struggling to monetize your traffic effectively? FX Unlocked is here to help. We specialize in connecting you with top-tier Foreign Exchange Trading Platforms that are eager to partner/sponsor with influential creators.
            </p>
            <a href="marketing.html" className="btn-grad">Learn More <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTrade() {
  return (
    <section className="section">
      <div className="container">
        <div className="two-col">
          <div>
            <span className="pill">For Traders</span>
            <h2>Trade with <span className="accent">confidence.</span></h2>
          </div>
          <div>
            <p className="lede">
              At FX Unlocked, we empower aspiring traders with the knowledge and tools they need to succeed in the dynamic world of Forex trading. Our comprehensive trading courses are designed for beginners and seasoned traders alike, offering step-by-step guidance, market insights, and proven strategies. Whether you're looking to build a new skill or enhance your trading expertise, FX Unlocked has everything you need to start trading with confidence.
            </p>
            <a href="education.html" className="btn-grad">Explore All Products <span className="arrow">→</span></a>
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
        <span className="section-eyebrow">— By the Numbers</span>
        <h2>FX Unlocked <span className="accent">by Numbers.</span></h2>
        <p className="lede">
          At FX Unlocked, our vision is bold: to connect and empower educators, partners and traders on every continent and grow our network to 1000+ partners by mid-2026. With over a decade of expertise in the Foreign Exchange industry, we are well on our way to achieving this goal.
        </p>
        <div className="stats-strip" style={{ marginTop: 36 }}>
          <div className="stat-item">
            <div className="stat-value">200+</div>
            <div className="stat-label">Affiliates / IBs</div>
            <p className="stat-desc">Collaborating with a thriving network of professionals dedicated to success.</p>
          </div>
          <div className="stat-item">
            <div className="stat-value">12</div>
            <div className="stat-label">Trading Platforms</div>
            <p className="stat-desc">Providing diverse options to meet the needs of affiliates and traders worldwide.</p>
          </div>
          <div className="stat-item">
            <div className="stat-value">5</div>
            <div className="stat-label">Countries</div>
            <p className="stat-desc">A truly global team driving innovation and growth across borders.</p>
          </div>
          <div className="stat-item">
            <div className="stat-value">10+</div>
            <div className="stat-label">Years of Expertise</div>
            <p className="stat-desc">Building trust, delivering value, and unlocking growth since day one.</p>
          </div>
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
          <h2>Ready to <span style={{fontStyle:'italic'}}>get started?</span></h2>
          <p>
            We're not just growing; we're revolutionizing the affiliate/IB experience in the FX World. Join us on this journey as we continue to unlock possibilities and break boundaries.
          </p>
          <div className="cta-row">
            <a href="contact-us.html" className="btn-grad">Talk to our team <span className="arrow">→</span></a>
            <a href="affiliates-ibs.html" className="btn-outline">Become a partner</a>
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
