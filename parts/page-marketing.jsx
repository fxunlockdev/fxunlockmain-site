/* Marketing page */

function MktHero() {
  return (
    <section className="page-hero">
      <div className="hero-fx" aria-hidden="true">
        <div className="mesh mesh-a"></div>
        <div className="mesh mesh-b"></div>
        <div className="mesh mesh-c"></div>
      </div>
      <div className="container">
        <div className="two-col" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow"><span className="dot"></span>Marketing</span>
            <h1>Grow Faster with <span className="accent">World-Class</span> Marketing Support.</h1>
            <p className="lead">
              At FX Unlocked, our first objective is to get our IBs and Affiliates the best possible deal with one of our partner trading platforms. Then? We partner with them to help them scale. Our in-house marketing team is built like a performance agency, dedicated to one mission: fueling your growth.
            </p>
            <div className="cta-row">
              <a href="contact-us.html" className="btn-grad">Get my free deal <span className="arrow">→</span></a>
            </div>
          </div>
          <div>
            <MarketingForm/>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketingForm() {
  return (
    <div className="form-card">
      <div className="form-card-bar"></div>
      <div className="form-card-hd">
        <span className="form-badge">✦ Free · No commitment</span>
        <h3>Get a free marketing plan</h3>
        <p className="sub">Share your details — our team will reach out with a tailored proposal.</p>
      </div>
      <form>
        <div className="field">
          <label>Full name</label>
          <input type="text" placeholder="Jane Doe" autoComplete="name"/>
        </div>
        <div className="field">
          <label>Email address</label>
          <input type="email" placeholder="you@email.com" autoComplete="email"/>
        </div>
        <div className="field">
          <label>Country</label>
          <select defaultValue="">
            <option value="" hidden>Select your country</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>United Arab Emirates</option>
            <option>India</option>
            <option>Singapore</option>
            <option>Other</option>
          </select>
        </div>
        <button type="button" className="submit-btn">
          Get my free deal
          <svg className="submit-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="form-note">We respond within 24 hours · Your data is safe</p>
      </form>
    </div>
  );
}

function MktFeatures() {
  return (
    <section className="section">
      <div className="container">
        <span className="section-eyebrow">— What we deliver</span>
        <h2>Done-for-You Marketing That <span className="accent">Drives Results.</span></h2>
        <p className="lede">
          Forget struggling to create content or figure out what converts. Our team provides:
        </p>
        <div className="feature-grid" style={{ marginTop: 32 }}>
          <div className="feature-card">
            <div className="feature-num">— 01</div>
            <h3>Custom branded video scripts &amp; creatives</h3>
            <p>
              We'll script, style, and produce video creatives that sound like you, not a broker. Whether you need ads, reels, or full-length explainers, our content team will create high-converting video assets based on proven formulas — adapted to your personality and audience. The result? More views, more clicks, and higher trust with your followers. We also have an AI Script generator launching soon.
            </p>
            <a href="#" className="feature-link">Learn More <span className="arrow">→</span></a>
          </div>
          <div className="feature-card">
            <div className="feature-num">— 02</div>
            <h3>High-converting funnels and landing pages</h3>
            <p>
              We don't use generic, one-size-fits-all pages. Our team designs fully customized funnels based on your audience — whether they're beginner traders in Southeast Asia, seasoned investors in Europe, or social-first communities. From opt-in pages to sales funnels, we build every touchpoint with one goal: maximum conversion. Localized messaging, region-specific compliance, and mobile-optimized design all come as standard.
            </p>
            <a href="#" className="feature-link">Learn More <span className="arrow">→</span></a>
          </div>
          <div className="feature-card">
            <div className="feature-num">— 03</div>
            <h3>Engaging social media campaigns</h3>
            <p>
              We create high-performing Meta (Facebook &amp; Instagram) ad campaigns that are tailored to your audience and your brand. From scroll-stopping headlines to persuasive ad copy and creatives, every campaign is designed to turn cold traffic into qualified leads. Your dedicated marketing manager handles everything — from audience targeting and ad setup to continuous A/B testing and optimization.
            </p>
            <a href="#" className="feature-link">Learn More <span className="arrow">→</span></a>
          </div>
          <div className="feature-card">
            <div className="feature-num">— 04</div>
            <h3>Exclusive lead magnets &amp; free training assets</h3>
            <p>
              We give you high-value, ready-made resources to use as lead magnets — think free mini-courses, eBooks, trading checklists, and more — all branded for your business. These assets help you capture more leads, increase engagement, and create an ongoing flow of prospects who are primed for conversion.
            </p>
            <a href="#" className="feature-link">Learn More <span className="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MktFocus() {
  return (
    <section className="section dark">
      <div className="container">
        <div className="two-col">
          <div>
            <span className="pill">Strategy</span>
            <h2>You Focus on Promoting — <span className="accent">We Handle the Strategy.</span></h2>
          </div>
          <div>
            <p className="lede">
              We act as your personal marketing team. Whether you're an influencer, educator, or trading coach, we'll help you:
            </p>
            <ul className="bullet-list">
              <li><span><strong>Define</strong> your audience and message</span></li>
              <li><span><strong>Position</strong> your brand for credibility and trust</span></li>
              <li><span><strong>Maximize</strong> your CPA by increasing conversion at every step</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MktManager() {
  return (
    <section className="section">
      <div className="container">
        <div className="two-col">
          <div>
            <span className="pill">Dedicated Manager</span>
            <h2>Your Own Personal Marketing Manager for <span className="accent">Social Ads.</span></h2>
            <p className="lede">
              When you partner with FX Unlocked, you're assigned your own dedicated marketing manager who specializes in Social Media Advertising. Their mission: to make your campaigns profitable and effortless.
            </p>
          </div>
          <div>
            <ul className="bullet-list">
              <li>They set up, optimize, and manage your paid social media campaigns across platforms like Facebook, Instagram, YouTube, and TikTok</li>
              <li>They constantly test, analyze, and refine your ads to improve conversion rates and bring your Cost Per Lead (CPL) right down</li>
              <li>They handle audience targeting, retargeting strategies, and A/B testing, ensuring you get the highest ROI on your ad spend</li>
            </ul>
            <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-mute)' }}>
              This isn't just support — it's a proactive marketing engine working for you, so you can focus on growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MktLongTerm() {
  return (
    <section className="section dark">
      <div className="container">
        <span className="section-eyebrow">— Built for the long game</span>
        <h2>Designed for Long-Term <span className="accent">Affiliate Success.</span></h2>
        <p className="lede">
          Most brokers offer cookie-cutter banners and generic creatives. We don't. FX Unlocked gives you the same level of creative strategy and support top marketing agencies charge thousands for — and we do it because your success is ours.
        </p>
        <p className="lede">
          Many of our top-performing affiliates went from side-hustle to full-time in under 6 months. Why? Because we don't leave growth to chance — we build it with you.
        </p>
        <div className="cta-row" style={{ marginTop: 8 }}>
          <a href="contact-us.html" className="btn-grad">Talk to our team <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

function MktNumbers() {
  return (
    <section className="section">
      <div className="container">
        <span className="section-eyebrow">— Track record</span>
        <h2>FX Unlocked <span className="accent">by Numbers.</span></h2>
        <div className="stats-strip" style={{ marginTop: 32 }}>
          <div className="stat-item">
            <div className="stat-value">200+</div>
            <div className="stat-label">Affiliates / IBs</div>
            <p className="stat-desc">Hundreds of educators and IBs around the world.</p>
          </div>
          <div className="stat-item">
            <div className="stat-value">12</div>
            <div className="stat-label">Trading Platforms</div>
            <p className="stat-desc">Top-tier partner platforms in our network.</p>
          </div>
          <div className="stat-item">
            <div className="stat-value">5</div>
            <div className="stat-label">Countries</div>
            <p className="stat-desc">Global team and global reach.</p>
          </div>
          <div className="stat-item">
            <div className="stat-value">10+</div>
            <div className="stat-label">Years of Expertise</div>
            <p className="stat-desc">Industry experience you can trust.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

window.MktHero = MktHero;
window.MktFeatures = MktFeatures;
window.MktFocus = MktFocus;
window.MktManager = MktManager;
window.MktLongTerm = MktLongTerm;
window.MktNumbers = MktNumbers;
