/* Contact Us page */

function ContactHero() {
  return (
    <section className="page-hero" style={{ paddingBottom: 40 }}>
      <div className="hero-fx" aria-hidden="true">
        <div className="mesh mesh-a"></div>
        <div className="mesh mesh-b"></div>
      </div>
      <div className="container">
        <span className="eyebrow"><span className="dot"></span>Contact Us</span>
        <h1>Let's <span className="accent">get in touch.</span></h1>
        <p className="lead">
          We'd love to hear from you. Whether you're an Affiliate, IB or Trading Platform — get in touch and one of our team will respond shortly.
        </p>
      </div>
    </section>
  );
}

function ContactBlock() {
  return (
    <section style={{ background: 'var(--bg-soft)', padding: '0 0 96px' }}>
      <div className="container">
        <div className="contact-shell" style={{ borderRadius: 24, overflow:'hidden', boxShadow:'0 32px 64px -32px rgba(20,30,80,0.25)' }}>
          <div className="contact-info">
            <div className="ci-block">
              <h4>📍 Address</h4>
              <p>Floor 38, Media One Tower, Dubai Marina, UAE</p>
            </div>
            <div className="ci-block">
              <h4>✉️ Email</h4>
              <p>hello@fx-unlocked.com<br/><span style={{opacity:0.75, fontSize:14, fontWeight:400}}>for public inquiries</span></p>
            </div>
            <div className="ci-block">
              <h4>📞 Call</h4>
              <p>+971 58 578 4483<br/><span style={{opacity:0.75, fontSize:14, fontWeight:400}}>Mon – Fri, 9am – 5pm</span></p>
            </div>
            <div className="ci-map">
              <iframe
                title="FX Unlocked office"
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.13%2C25.07%2C55.16%2C25.10&layer=mapnik&marker=25.0801,55.1394"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="contact-form">
            <h2>Contact Us</h2>
            <p className="sub">Tell us a bit about yourself and we'll be in touch.</p>
            <form>
              <div className="row-2">
                <div className="field">
                  <label>First Name</label>
                  <input type="text" placeholder="Your Name"/>
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input type="text" placeholder="Your Name"/>
                </div>
              </div>
              <div className="row-2">
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="Your Email"/>
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+971 50 123 4567"/>
                </div>
              </div>
              <div className="field">
                <label>Category</label>
                <select>
                  <option>Affiliate / IB / Platform</option>
                  <option>Affiliate</option>
                  <option>IB</option>
                  <option>Platform</option>
                </select>
              </div>
              <div className="field">
                <label>Message</label>
                <textarea placeholder="Your Message"></textarea>
              </div>
              <button type="button" className="btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ContactHero = ContactHero;
window.ContactBlock = ContactBlock;
