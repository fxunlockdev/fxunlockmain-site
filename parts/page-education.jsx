/* Education page — single course landing */

function EduHero() {
  return (
    <section className="page-hero">
      <div className="hero-fx" aria-hidden="true">
        <div className="mesh mesh-a"></div>
        <div className="mesh mesh-b"></div>
        <div className="mesh mesh-c"></div>
      </div>
      <div className="container">
        <span className="eyebrow"><span className="dot"></span>Course · Trading Course</span>
        <h1>Course: <span className="accent">Introduction to Financial Markets.</span></h1>
        <p className="lead">
          The perfect introduction to the financial markets — designed to equip you with the knowledge to begin your trading journey.
        </p>
      </div>
    </section>
  );
}

function EduCourse() {
  return (
    <section className="section">
      <div className="container">
        <div className="course-shell">
          <div className="course-content">
            <div className="course-section">
              <span className="section-eyebrow">— Last update: 24 April, 2025</span>
              <h3>Introduction to the Financial Markets</h3>
              <p>
                Our FX trading course for beginners is meticulously crafted to equip you with the knowledge to begin your trading journey. The course will give you the perfect introduction to the financial markets, while also teaching you the basics of trading from using charting software, setting your trades, trading styles and risk management. The course includes 8 educational modules, 10 videos each teaching a vital trading skill, and a 1 hour bonus webinar on Trading Psychology.
              </p>
              <ul className="bullet-list" style={{ marginTop: 18 }}>
                <li>May Launch Price - £300 <span style={{ textDecoration:'line-through', color:'var(--ink-dim)' }}>£500</span></li>
                <li>8 Text-based Educational Modules</li>
                <li>10 Videos — from charting to price patterns</li>
                <li>1 Hour Trading Psychology Webinar</li>
                <li>Study at your own pace, 24/7</li>
                <li>Access to one of our Trading Mentors</li>
              </ul>
            </div>

            <div className="course-section">
              <h3>Course content</h3>
              <div className="course-modules">
                <div className="course-module">
                  <h4>Getting Started</h4>
                  <ul>
                    <li>Introduction to the Financial Markets</li>
                    <li>What are shares?</li>
                    <li>What is forex?</li>
                    <li>What are Indices?</li>
                    <li>What are commodities?</li>
                    <li>Interest Rates</li>
                    <li>Trading Government bonds</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Tools and Software</h4>
                  <ul>
                    <li>Charting software (video — How To Use Trading View)</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Spread betting and CFD trading</h4>
                  <ul>
                    <li>What is spread betting?</li>
                    <li>What are contract for difference (CFDs)?</li>
                    <li>How CFDs differ from spread betting</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Executing an order and leverage</h4>
                  <ul>
                    <li>What is an order? (videos — How To Work Out Your Risk, How To Place A Trade On MT5)</li>
                    <li>Long/Short Positions (video — How To Enter A Long Or Short Position)</li>
                    <li>Using stop losses</li>
                    <li>How orders are executed</li>
                    <li>What is leverage?</li>
                    <li>Margin calls</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Fundamental Analysis</h4>
                  <ul>
                    <li>What is fundamental analysis?</li>
                    <li>Why is it used?</li>
                    <li>Fundamentals</li>
                    <li>Trade examples</li>
                    <li>Implementing strategies on the news (advanced)</li>
                    <li>Why are newsfeeds and twitter important? (video — How To Check News)</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Technical Analysis</h4>
                  <ul>
                    <li>What is technical analysis?</li>
                    <li>Candle sticks</li>
                    <li>Support and resistance (video — How To Identify An Uptrend Or Downtrend)</li>
                    <li>Breakouts</li>
                    <li>How to trade support and resistance (video — How To Identify Support And Resistance)</li>
                    <li>Trend and Channels</li>
                    <li>Ascending and Descending wedges</li>
                    <li>Head and shoulders breakout strategy (advanced) (videos — How To Draw Trend Lines, Breakouts)</li>
                    <li>Fibonacci Retracement</li>
                    <li>Harmonic Price Patterns (video — Imbalances)</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Planning and money management</h4>
                  <ul>
                    <li>What is a trading plan?</li>
                    <li>How to make a trading plan?</li>
                    <li>What is risk management?</li>
                    <li>Ways to manage risk</li>
                  </ul>
                </div>
                <div className="course-module">
                  <h4>Trading psychology</h4>
                  <ul>
                    <li>Controlling emotions that hold you back</li>
                    <li>Controlling emotions that entice you to trade</li>
                    <li>Controlling emotions that cloud your judgement</li>
                    <li>Common trading mistakes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="course-section">
              <h3>Trend and Channels</h3>
              <p>
                As you'll notice when you look at a chart, market prices do not generally rise or fall in straight lines over a period of time, but rather in a series of zigzags. The price will rise to a peak or a high, then drop to a trough or low. Despite this, the market will usually move in one overall direction or trend, and it's the relative positioning of the peaks and troughs that define this trend.
              </p>
              <h4 style={{ fontFamily:'var(--display)', fontWeight:500, fontSize:18, margin:'18px 0 10px', color:'var(--ink)' }}>There are three types of market trend:</h4>
              <ul className="bullet-list">
                <li><strong>Uptrend</strong> — For a market to be in an uptrend, each successive peak must be higher than the last, and each trough must also be higher than the preceding one.</li>
                <li><strong>Downtrend</strong> — For a market to be in a downtrend, there must be a series of successively lower peaks and lower troughs.</li>
                <li><strong>Sideways Trend</strong> — In a sideways trend there's no clear pattern to the peaks and troughs, with the price generally oscillating in a fairly narrow range between support and resistance levels.</li>
              </ul>
              <p style={{ marginTop: 16 }}>
                Trends are fairly easy to plot on a chart - all you need to do is connect two major peaks or two major troughs with a line. If you've drawn them correctly, trend lines will often act similarly to support and resistance levels. However, you should note that:
              </p>
              <ul className="bullet-list">
                <li>It only takes two peaks or troughs to draw a trend line, but it takes three to confirm the trend.</li>
                <li>Just like support and resistance levels, the more times the trend line is tested, the stronger it is said to be.</li>
                <li>Steeper trend lines tend to be unreliable and break easily.</li>
              </ul>
              <p style={{ marginTop: 16 }}>
                For the full trading course, including all educational content, and the 10 educational videos, please enroll here.
              </p>
              <div className="cta-row" style={{ marginTop: 18 }}>
                <a href="#" className="btn-grad">Enroll to the Course <span className="arrow">→</span></a>
              </div>
            </div>
          </div>

          <aside>
            <div className="course-info-card">
              <h3>Course Includes:</h3>
              <div className="price-row">
                <span className="price-old">£500</span>
                <span className="price-new">£300.00</span>
              </div>
              <ul className="course-meta">
                <li><span>Modules</span><strong>8</strong></li>
                <li><span>Video Lessons</span><strong>10</strong></li>
                <li><span>Language</span><strong>English</strong></li>
                <li><span>Certifications</span><strong>No</strong></li>
              </ul>
              <a href="#" className="btn-enroll">Enroll to the Course</a>
              <div style={{ marginTop: 18, fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink-dim)' }}>
                Share On
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

window.EduHero = EduHero;
window.EduCourse = EduCourse;
