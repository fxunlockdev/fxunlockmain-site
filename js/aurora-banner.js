/* ============================================================
   FX UNLOCKED — Aurora banner ribbons
   Reusable, page-agnostic version of the homepage hero's flowing
   ribbons (hero-dark.js is gated to data-page="home" and also
   carries chips/tickers/parallax we don't want on interior pages).

   Mounts on any page that contains a .ph-flow SVG with path ids
   ab1 / ab2 / ab3. Pure visual — no text, no currency data.
   Honors prefers-reduced-motion by drawing a single static frame.
   ============================================================ */
(function () {
  const svg = document.querySelector(".ph-flow");
  if (!svg) return;

  // viewBox is 1480x560 (full-bleed banner, slice-cropped by CSS).
  const W = 1520, X0 = -40, STEP = 18;

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

  // Same wave math as the homepage ribbons; baseY/wlen retuned for the
  // wider, shorter banner viewBox so the lines sweep behind the copy.
  const ribbons = [
    { el: document.getElementById("ab1"), baseY: 330, amp: 64, wlen: 230, speed: 0.50, k2: 0.42, k3: 1.9 },
    { el: document.getElementById("ab2"), baseY: 396, amp: 84, wlen: 280, speed: 0.38, k2: 0.37, k3: 2.3 },
    { el: document.getElementById("ab3"), baseY: 268, amp: 50, wlen: 190, speed: 0.62, k2: 0.50, k3: 1.6 },
  ].filter((r) => r.el);
  if (!ribbons.length) return;

  ribbons.forEach((r) => { r.phase = Math.random() * Math.PI * 2; });

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

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { ribbons.forEach((r) => build(r, 0)); return; }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(64, now - last); last = now;
    ribbons.forEach((r) => { r.phase += r.speed * dt * 0.001; build(r, now); });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
