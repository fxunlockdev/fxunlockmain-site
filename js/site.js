/* ============================================================
   FX UNLOCKED  -  Shared site behaviour
   Injects nav + footer, scroll-reveal, ticker, mobile menu.
   Each page: <body data-page="home"> … </body>
   ============================================================ */
(function () {
  // Logo: blob URL when bundled standalone, relative path otherwise.
  const LOGO = (window.__resources && window.__resources.logo) || "assets/fx-icon.svg";
  const NAV = [
    { label: "Home", href: "index.html", key: "home" },
    { label: "About Us", href: "about.html", key: "about" },
    { label: "Affiliates / IBs", href: "affiliates-ibs.html", key: "affiliates" },
    { label: "Tools", href: "tools.html", key: "tools" },
    { label: "Marketing", href: "marketing.html", key: "marketing" },
    { label: "Contact", href: "contact.html", key: "contact" },
  ];

  function mountNav() {
    const page = document.body.dataset.page || "";
    const links = NAV.map(
      (n) => `<a href="${n.href}" class="${n.key === page ? "active" : ""}">${n.label}</a>`
    ).join("");
    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.innerHTML = `
      <div class="wrap nav-inner">
        <a href="index.html" class="logo">
          <img src="${LOGO}" alt="FX Unlocked" />
          <span>FX <span class="un">Unlocked</span></span>
        </a>
        <div class="nav-links">${links}</div>
        <div class="nav-cta">
          <a href="contact.html" class="btn btn-ghost hide-mobile">Log in</a>
          <a href="affiliates-ibs.html" class="btn btn-primary">Apply now ${window.icon ? icon("arrow") : "→"}</a>
          <button class="nav-toggle btn btn-ghost" aria-label="Menu">☰</button>
        </div>
      </div>`;
    document.body.prepend(nav);

    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // mobile menu
    const toggle = nav.querySelector(".nav-toggle");
    toggle.style.display = "none";
    const mq = window.matchMedia("(max-width: 1080px)");
    const sync = () => (toggle.style.display = mq.matches ? "inline-flex" : "none");
    sync(); mq.addEventListener("change", sync);
    toggle.addEventListener("click", () => {
      let menu = document.querySelector(".mobile-menu");
      if (menu) { menu.remove(); return; }
      menu = document.createElement("div");
      menu.className = "mobile-menu";
      menu.innerHTML = NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join("");
      document.body.appendChild(menu);
    });
  }

  function mountFooter() {
    const f = document.createElement("footer");
    f.className = "footer";
    f.innerHTML = `
      <div class="wrap">
        <div class="foot-grid">
          <div class="foot-col">
            <a href="index.html" class="logo">
              <img src="${LOGO}" alt="FX Unlocked" />
              <span>FX <span class="un">Unlocked</span></span>
            </a>
            <p class="small" style="color:var(--dark-mute);max-width:34ch;margin:0 0 22px">The FX industry's growth partner. Off-market deals, free marketing support, and tools built for affiliates and IBs.</p>
            <p class="mono" style="font-size:12px;color:var(--dark-dim)">Floor 38, Media One Tower<br/>Dubai Marina, UAE</p>
          </div>
          <div class="foot-col">
            <h5>Company</h5>
            <a href="about.html">About Us</a>
            <a href="affiliates-ibs.html">Affiliates &amp; IBs</a>
            <a href="tools.html">Tools</a>
            <a href="marketing.html">Marketing Support</a>
          </div>
          <div class="foot-col">
            <h5>Connect</h5>
            <a href="contact.html">Contact Us</a>
            <a href="https://wa.me/971585784483">WhatsApp</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
          <div class="foot-col">
            <h5>Get in touch</h5>
            <a href="mailto:hello@fx-unlocked.com">hello@fx-unlocked.com</a>
            <a href="tel:+971585784483">+971 58 578 4483</a>
            <a href="affiliates-ibs.html" class="btn btn-primary" style="margin-top:14px">Apply now ${window.icon ? icon("arrow") : "→"}</a>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© ${new Date().getFullYear()} FX Unlocked. All rights reserved.</span>
          <span class="mono">Dubai · Operating globally · 10+ years</span>
        </div>
      </div>`;
    document.body.appendChild(f);
  }

  function scrollReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    // safety: never leave content hidden (covers no-IO support, capture harnesses, etc.)
    setTimeout(() => els.forEach((e) => e.classList.add("in")), 1600);
  }

  /* ---- Live ticker (hero) ---- */
  function startTicker() {
    document.querySelectorAll("[data-ticker]").forEach((el) => {
      const base = parseFloat(el.dataset.base);
      const dec = base < 10 ? 5 : 2;
      let cur = base;
      const valEl = el.querySelector("[data-tk-val]");
      const dEl = el.querySelector("[data-tk-d]");
      setInterval(() => {
        const d = (Math.random() - 0.48) * 2 * 0.0007 * base;
        cur = Math.max(base * 0.985, Math.min(base * 1.015, cur + d));
        const up = d >= 0;
        if (valEl) valEl.textContent = cur.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (dEl) {
          const pct = ((cur - base) / base) * 100;
          dEl.textContent = (pct >= 0 ? "▲ +" : "▼ ") + pct.toFixed(2) + "%";
          dEl.className = "delta " + (pct >= 0 ? "pos" : "neg");
        }
      }, 1500);
    });
  }

  /* ---- Counter animation ---- */
  function animateCounters() {
    const els = document.querySelectorAll("[data-count]");
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1400; const start = performance.now();
        const isInt = target % 1 === 0;
        function step(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = target * eased;
          el.textContent = (isInt ? Math.round(v) : v.toFixed(1)).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    els.forEach((e) => io.observe(e));
  }

  /* ---- Accordion (FAQ) ---- */
  function initAccordion() {
    document.querySelectorAll("[data-accordion] .acc-item").forEach((item) => {
      const head = item.querySelector(".acc-head");
      head.addEventListener("click", () => {
        const open = item.classList.contains("open");
        item.closest("[data-accordion]").querySelectorAll(".acc-item").forEach((i) => i.classList.remove("open"));
        if (!open) item.classList.add("open");
      });
    });
  }

  /* ---- Tabs ---- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((group) => {
      const btns = group.querySelectorAll("[data-tab]");
      btns.forEach((b) => b.addEventListener("click", () => {
        btns.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        const key = b.dataset.tab;
        group.querySelectorAll("[data-panel]").forEach((p) => p.classList.toggle("active", p.dataset.panel === key));
      }));
    });
  }

  function boot() {
    mountNav();
    mountFooter();
    // inject any icon placeholders: <i data-icon="name"></i>
    document.querySelectorAll("[data-icon]").forEach((el) => {
      el.innerHTML = window.icon ? icon(el.dataset.icon) : "";
    });
    scrollReveal();
    startTicker();
    animateCounters();
    initAccordion();
    initTabs();
  }
  // Run now if DOM is already parsed (e.g. when inlined/bundled), else wait.
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
