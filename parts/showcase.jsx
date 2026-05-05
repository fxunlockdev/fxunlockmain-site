/* Iridescent crystal showcase — Web3-style */

function CrystalShowcase() {
  return (
    <section className="showcase">
      <div className="sc-bg">
        <div className="sc-mesh sc-mesh-a"></div>
        <div className="sc-mesh sc-mesh-b"></div>
        <div className="sc-mesh sc-mesh-c"></div>
      </div>

      <div className="container sc-grid">
        <div className="sc-copy">
          <p className="num">— 02 / What we do</p>
          <h2>
            One platform.<br/>
            <em>Four ways</em> to grow.
          </h2>
          <p className="lede">
            Built for FX educators, IBs and trading platforms — every product
            inside FX Unlocked is engineered to compound your audience into
            recurring revenue.
          </p>
          <a href="#" className="btn btn-cyan" style={{ marginTop: 28 }}>
            Explore products <span className="arrow">→</span>
          </a>
        </div>

        <div className="sc-stage">
          <div className="crystal" aria-hidden="true">
            <div className="cr-face cr-front"></div>
            <div className="cr-face cr-back"></div>
            <div className="cr-face cr-right"></div>
            <div className="cr-face cr-left"></div>
            <div className="cr-face cr-top"></div>
            <div className="cr-face cr-bot"></div>
          </div>
          <div className="cr-glow"></div>

          <div className="sc-card sc-card-1">
            <div className="sc-card-title">CPA Deals</div>
            <p>Market-leading CPA & rebate deals negotiated with the world's top brokers — 1.5–3× the rates affiliates source alone.</p>
          </div>
          <div className="sc-card sc-card-2">
            <div className="sc-card-title">Education</div>
            <p>Comprehensive FX courses, live mentorship and verified strategies for traders at every stage of the journey.</p>
          </div>
          <div className="sc-card sc-card-3">
            <div className="sc-card-title">Marketing</div>
            <p>Branding, creative, paid media playbooks and CRO support that turn audiences into qualified, high-LTV traders.</p>
          </div>
          <div className="sc-card sc-card-4">
            <div className="sc-card-title">IB Network</div>
            <p>One dashboard, every broker. Track clicks, conversions and rebates across all your partnerships in real time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

window.CrystalShowcase = CrystalShowcase;
