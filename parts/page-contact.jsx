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
                title="FX Unlocked — Media One Tower, Dubai Marina"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.484!2d55.137459!3d25.080126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5a23c48b3b%3A0x6f0b08b88d25fb8a!2sMedia%20One%20Tower%2C%20Dubai%20Marina!5e0!3m2!1sen!2sae!4v1683000000000!5m2!1sen!2sae"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, colorScheme: 'normal' }}
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
              <button type="button" className="btn-submit">
                Send my message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 10 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p style={{ textAlign:'center', fontSize:12, color:'rgba(255,255,255,0.45)', margin:'14px 0 0', fontFamily:'var(--mono)', letterSpacing:'0.06em' }}>We respond within 24 h · Your data stays private</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ContactHero = ContactHero;
window.ContactBlock = ContactBlock;
