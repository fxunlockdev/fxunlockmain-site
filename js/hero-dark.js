/* ============================================================
   FX UNLOCKED — Hero (dark aurora) behavior
   Lifted from FX Hero Dark.html. Pieces:
     1. Mark <html.js> so the data-reveal stagger engages
     2. Mouse-parallax on .plx layers (desktop, pointer:fine only)
     3. Stagger reveal (.is-in) by data-reveal order
     4. Two-arrow icon injection inside buttons (.arr / .arr.up)
     5. Three flowing ribbons morphed every frame via Catmull-Rom
     6. Live tickers (smooth random walk) with sparkline path updates
     7. Drifting particles
   ============================================================ */
(function () {
  // Only mount on the homepage where the new hero markup exists.
  if (document.body.dataset.page !== "home") return;
  if (!document.querySelector(".hero .hero-bg")) return;

  document.documentElement.classList.add("js");

  /* -- mouse parallax -- */
  (function mountParallax() {
    if (!window.matchMedia || !window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const visual = document.querySelector(".hero-visual");
    if (!visual) return;
    const layers = [...document.querySelectorAll(".hero .plx")];
    let raf = null, tx = 0, ty = 0;
    function onMove(e) {
      const r = visual.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      tx = (e.clientX - cx) / r.width;
      ty = (e.clientY - cy) / r.height;
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function apply() {
      raf = null;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth || "12");
        const isSvg = l.namespaceURI && l.namespaceURI.includes("svg");
        const x = (-tx * d).toFixed(1), y = (-ty * d).toFixed(1);
        if (isSvg) l.setAttribute("transform", `translate(${x} ${y})`);
        else l.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
  })();

  /* -- stagger reveal -- */
  function mountReveal() {
    const els = [...document.querySelectorAll(".hero [data-reveal]")]
      .sort((a, b) => (+a.dataset.reveal || 0) - (+b.dataset.reveal || 0));
    els.forEach((el) => {
      const order = +el.dataset.reveal || 0;
      setTimeout(() => el.classList.add("is-in"), 80 + order * 120);
    });
  }
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", mountReveal);
  } else {
    mountReveal();
  }

  /* -- arrow icon injection (idempotent — works alongside site.js) -- */
  (function mountArrows() {
    const A = new Set(["arrow", "arrowUpRight"]);
    document.querySelectorAll(".hero [data-icon]").forEach((el) => {
      // skip if site.js already wrapped it
      if (el.querySelector(".arr-a")) return;
      const n = el.dataset.icon;
      const useDual = el.closest(".btn") && A.has(n) && el.classList.contains("arr");
      const svg = (window.icon && window.icon(n)) || "";
      if (useDual) {
        el.innerHTML = `<span class="arr-a">${svg}</span><span class="arr-b">${svg}</span>`;
      } else {
        el.innerHTML = svg;
      }
    });
  })();

  /* -- flowing ribbons (Catmull-Rom smooth, breathing amplitude) -- */
  (function mountRibbons() {
    const W = 760, X0 = -40, STEP = 14;
    function smooth(pts) {
      if (pts.length < 2) return "";
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1x = p1[0] + (p2[0] - p0[0]) / 6,
              c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6,
              c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      return d;
    }
    const ribbons = [
      { el: document.getElementById("rb1"), baseY: 300, amp: 60, wlen: 150, speed: 0.55, drift: 0.18, k2: 0.42, k3: 1.9 },
      { el: document.getElementById("rb2"), baseY: 352, amp: 80, wlen: 188, speed: 0.40, drift: 0.13, k2: 0.37, k3: 2.3 },
      { el: document.getElementById("rb3"), baseY: 252, amp: 46, wlen: 124, speed: 0.70, drift: 0.24, k2: 0.50, k3: 1.6 },
    ].filter((r) => r.el);
    ribbons.forEach((r) => { r.phase = Math.random() * Math.PI * 2; });
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function build(r, t) {
      const pts = [];
      const breathe = 0.8 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.0005 + r.phase));
      const a = r.amp * breathe;
      for (let x = X0; x <= W; x += STEP) {
        const u = x / r.wlen;
        const y = r.baseY
          + Math.sin(u + r.phase) * a
          + Math.sin(u * r.k2 + r.phase * 1.7) * (a * 0.34)
          + Math.sin(u * r.k3 - r.phase * 0.6) * (a * 0.14)
          + Math.sin(t * 0.0007 + r.phase) * 10;
        pts.push([x, y]);
      }
      r.el.setAttribute("d", smooth(pts));
    }
    if (reduce) { ribbons.forEach((r) => build(r, 0)); return; }
    let last = performance.now();
    function frame(now) {
      const dt = Math.min(64, now - last); last = now;
      ribbons.forEach((r) => { r.phase += r.speed * dt * 0.001; build(r, now); });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* -- live tickers with sparkline -- */
  (function mountTickers() {
    const nodes = [...document.querySelectorAll(".hero [data-ticker]")];
    if (!nodes.length) return;
    const fmt = (v, dec, grp) =>
      grp ? v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec);
    function seedHistory(base, n) {
      const h = [];
      let v = base * (0.992 + Math.random() * 0.004);
      for (let i = 0; i < n; i++) {
        v += (Math.random() - 0.5) * base * 0.004;
        h.push(v);
      }
      return h;
    }
    const SPARK_N = 22, SW = 64, SH = 24;
    function sparkPath(hist) {
      const min = Math.min(...hist), max = Math.max(...hist), rng = (max - min) || 1;
      return hist.map((v, i) => {
        const x = (i / (hist.length - 1)) * SW;
        const y = SH - 2 - ((v - min) / rng) * (SH - 4);
        return (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }).join(" ");
    }
    const state = nodes.map((n) => {
      const base = parseFloat(n.dataset.base);
      const dec = (n.dataset.base.split(".")[1] || "").length;
      const grp = base >= 1000;
      const hist = seedHistory(base, SPARK_N);
      const spark = n.querySelector("[data-spark]");
      if (spark) spark.setAttribute("d", sparkPath(hist));
      return { n, base, v: hist[hist.length - 1], vel: 0, dec, grp, hist, spark };
    });
    function step() {
      state.forEach((s) => {
        s.vel = s.vel * 0.9 + (Math.random() - 0.5) * (s.base * 0.0008);
        s.v = Math.max(s.base * 0.985, Math.min(s.base * 1.02, s.v + s.vel));
        s.hist.push(s.v);
        if (s.hist.length > SPARK_N) s.hist.shift();
        const valEl = s.n.querySelector("[data-tk-val]");
        const dEl = s.n.querySelector("[data-tk-d]");
        if (valEl) valEl.textContent = fmt(s.v, s.dec, s.grp);
        const pct = ((s.v - s.base) / s.base) * 100;
        const up = pct >= 0;
        if (dEl) {
          dEl.textContent = (up ? "+" : "−") + Math.abs(pct).toFixed(2) + "%";
          dEl.classList.toggle("pos", up);
          dEl.classList.toggle("neg", !up);
        }
        if (s.spark) s.spark.setAttribute("d", sparkPath(s.hist));
        s.n.setAttribute("data-trend", up ? "up" : "down");
      });
    }
    setInterval(step, 1500);
  })();

  /* -- particles -- */
  (function mountParticles() {
    const host = document.getElementById("heroParticles");
    if (!host) return;
    const N = 16;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = 1.5 + Math.random() * 2.5;
      p.style.width = p.style.height = size + "px";
      p.style.left = (Math.random() * 100) + "%";
      p.style.top = (40 + Math.random() * 55) + "%";
      p.style.setProperty("--op", (0.25 + Math.random() * 0.5).toFixed(2));
      p.style.animationDuration = (5 + Math.random() * 7) + "s";
      p.style.animationDelay = (-Math.random() * 8) + "s";
      host.appendChild(p);
    }
  })();
})();
