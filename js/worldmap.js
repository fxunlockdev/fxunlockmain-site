/* ============================================================
   FX UNLOCKED  ·  World map (lifted from Content Library handoff)
   Renders the stippled continent map, ocean stars, arcs from Dubai
   HQ to the country offices, city markers and labels, then runs the
   motion layer (see MOTION below) on top.
   Mounts inside <svg id="worldMap">; idempotent — bails if mounted.
   ============================================================ */
(function () {
  const svg = document.getElementById("worldMap");
  if (!svg || svg.dataset.mounted === "1") return;
  svg.dataset.mounted = "1";

  // Equirectangular projection helpers
  // Canvas 1200×800 (3:2 aspect) — matches .map-inline-stage / .map-stage
  // CSS. The projection below maps a TIGHTER latitude band (+75° to
  // -55°) onto 0..H so populated continents fill the full canvas
  // height. Mapping the full -90..+90 range used to leave the
  // bottom ~28% of the SVG empty (no continents south of Tierra del
  // Fuego / South Africa). Continents now appear ~38% taller than
  // strict equirectangular, which reads as a stylised "global ops"
  // canvas, not a geographic atlas.
  const W = 1200, H = 800;
  const LAT_TOP = 75;
  const LAT_BOT = -55;
  const LAT_RANGE = LAT_TOP - LAT_BOT; // 130°
  const proj = (lon, lat) => [
    (lon + 180) / 360 * W,
    (LAT_TOP - lat) / LAT_RANGE * H
  ];

  // Simplified continent polygons in [lon, lat] vertices.
  // Hand-sketched to be recognisable when stippled, not geo-accurate.
  const continents = [
    // North America
    [[-168,66],[-156,71],[-140,70],[-122,69],[-105,69],[-95,73],[-82,74],[-72,67],[-60,60],[-55,52],[-65,46],[-70,42],[-76,36],[-82,30],[-86,30],[-90,29],[-96,26],[-104,22],[-110,23],[-115,30],[-122,32],[-124,40],[-125,48],[-130,54],[-140,58],[-152,58],[-160,55],[-166,60]],
    // Central America strip
    [[-105,18],[-90,18],[-85,16],[-78,12],[-78,8],[-82,8],[-90,13],[-100,15]],
    // South America
    [[-78,12],[-70,12],[-62,8],[-54,5],[-50,0],[-42,-3],[-36,-8],[-35,-18],[-40,-26],[-50,-30],[-58,-38],[-65,-43],[-70,-51],[-72,-54],[-69,-52],[-66,-43],[-67,-32],[-72,-22],[-76,-14],[-80,-4],[-78,4]],
    // Africa
    [[-17,28],[-10,30],[-2,32],[10,33],[20,32],[30,32],[34,30],[36,18],[40,12],[42,10],[51,11],[51,2],[42,-3],[40,-12],[36,-20],[28,-30],[20,-34],[18,-32],[14,-22],[10,-15],[5,-3],[-2,2],[-7,4],[-12,8],[-16,12],[-16,18],[-15,22]],
    // Europe (combined with western Russia top)
    [[-9,42],[-2,44],[2,50],[5,52],[10,55],[14,58],[20,62],[26,66],[34,68],[42,68],[55,68],[60,66],[58,60],[50,55],[42,52],[34,46],[28,44],[24,40],[20,38],[14,38],[8,40],[-2,38],[-9,38]],
    // Middle East / Arabian
    [[34,30],[40,35],[48,38],[55,36],[58,32],[58,24],[55,18],[50,14],[44,14],[40,18],[36,22],[34,26]],
    // Asia main
    [[55,68],[68,72],[82,75],[100,76],[120,74],[140,72],[155,68],[160,62],[155,55],[145,52],[140,46],[135,40],[140,36],[140,30],[125,22],[118,18],[108,10],[105,4],[110,0],[108,-4],[100,2],[96,8],[94,18],[88,22],[78,20],[74,16],[70,22],[64,24],[58,26],[55,34],[58,42],[62,50],[68,55],[60,60]],
    // SE Asia islands
    [[97,5],[102,4],[110,2],[118,-2],[122,-6],[130,-8],[140,-6],[138,-2],[128,2],[120,6],[112,4],[103,2]],
    // Japan
    [[131,33],[136,35],[140,38],[143,42],[141,44],[136,37],[132,34]],
    // Australia
    [[114,-22],[122,-18],[130,-14],[138,-12],[144,-14],[152,-25],[150,-35],[145,-38],[138,-36],[130,-32],[122,-32],[116,-30],[113,-26]],
    // NZ
    [[167,-37],[172,-36],[174,-41],[170,-46],[166,-46]],
    // UK/Ireland
    [[-10,52],[-6,55],[-3,58],[-1,57],[1,53],[-2,51],[-6,50]],
    // Madagascar
    [[44,-12],[47,-15],[49,-22],[47,-25],[44,-22],[43,-18]],
    // Greenland
    [[-50,82],[-30,82],[-15,78],[-22,68],[-40,60],[-52,66],[-55,75]],
    // Indonesia/Borneo extras
    [[109,1],[118,4],[120,0],[115,-3],[110,-2]],
  ];

  function inPoly(px, py, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      const intersect = ((yi > py) !== (yj > py)) &&
        (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
  const inAnyContinent = (lon, lat) => continents.some(c => inPoly(lon, lat, c));

  // Deterministic-ish PRNG so the layout doesn't shimmer between reloads
  // (would also break the resume cache in CI screenshots).
  let seed = 0x12345;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };

  // -- Continent dot map ---------------------------------------
  const dotmap = svg.querySelector("#dotmap");
  const STEP = 2.2;
  const dotsSvg = [];
  for (let lat = 80; lat >= -55; lat -= STEP) {
    for (let lon = -170; lon <= 178; lon += STEP) {
      if (!inAnyContinent(lon, lat)) continue;
      const [x, y] = proj(lon, lat);
      const r = Math.abs(lat) > 60 ? 0.95 : 1.3;
      const roll = rand();
      let cls = "map-dot";
      if (roll < 0.04) cls = "map-dot bright";
      else if (roll < 0.22) cls = "map-dot hi";
      dotsSvg.push(`<circle class="${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`);
    }
  }
  dotmap.innerHTML = dotsSvg.join("");

  // -- Ocean stars (twinkling dots OUTSIDE continents) ---------
  const starsEl = svg.querySelector("#stars");
  const stars = [];
  let attempts = 0;
  while (stars.length < 70 && attempts < 4000) {
    attempts++;
    const lon = -170 + rand() * 340;
    const lat = -45 + rand() * 110;
    if (inAnyContinent(lon, lat)) continue;
    const [x, y] = proj(lon, lat);
    if (x < 60 || x > W - 60 || y < 60 || y > H - 80) continue;
    const r = rand() < 0.18 ? 1.4 : 0.9;
    const delay = (rand() * 3).toFixed(2);
    const cls = rand() < 0.55 ? "star tw" : "star";
    stars.push(`<circle class="${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" style="animation-delay:${delay}s"/>`);
  }
  starsEl.innerHTML = stars.join("");

  // -- Cities --------------------------------------------------
  // Country offices — Sydney dropped per client direction; added São Paulo
  // and Mexico City to anchor the LATAM corridor that's increasingly the
  // growth region for FX partner programs.
  const cities = [
    { id: "dubai",    name: "Dubai",       role: "Headquarters",  lat: 25.2,  lon: 55.3,  hq: true },
    { id: "london",   name: "London",      role: "EMEA",          lat: 51.5,  lon: -0.1 },
    { id: "limassol", name: "Limassol",    role: "EU",            lat: 34.7,  lon: 33.0 },
    { id: "mexico",   name: "Mexico City", role: "LATAM North",   lat: 19.4,  lon: -99.1 },
    { id: "sao",      name: "São Paulo",   role: "LATAM South",   lat: -23.5, lon: -46.6 },
    { id: "cape",     name: "Cape Town",   role: "Africa",        lat: -33.9, lon: 18.4 },
    { id: "sing",     name: "Singapore",   role: "APAC",          lat: 1.3,   lon: 103.8 },
  ];
  cities.forEach(c => { const [x,y] = proj(c.lon, c.lat); c.x = x; c.y = y; });

  // Curved arcs from Dubai (HQ) to every other city — bow upward
  function arcPath(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const nx = -dy / len;
    const ny = dx / len;
    const k = Math.min(160, len * 0.32);
    const cx = mx + nx * k * (ny > 0 ? -1 : 1);
    const cy = my + ny * k * (ny > 0 ? -1 : 1);
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }

  const hq = cities[0];
  const others = cities.slice(1);

  // Arc paths only — the travelling pulses are drawn by the motion layer
  // below. (SMIL <animateMotion> couldn't ease, pause offscreen, or
  // honour prefers-reduced-motion.)
  const arcsEl = svg.querySelector("#arcs");
  arcsEl.innerHTML = others.map((c, i) => `<path class="arc a${i+1}" d="${arcPath(hq, c)}"/>`).join("");

  // -- City markers (HQ has chromatic glow + dual pulse + spinning ring) --
  // .fx-body wraps each marker so the motion layer can spring it in;
  // .fx-ripple is the ring that expands when an arc or pulse lands.
  const citiesEl = svg.querySelector("#cities");
  citiesEl.innerHTML = cities.map(c => {
    const open = `<g class="city" transform="translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})">
      <circle class="fx-ripple" cx="0" cy="0" r="0" opacity="0"/>
      <g class="fx-body">`;
    if (c.hq) {
      return `${open}
        <circle class="hq-pulse" cx="0" cy="0" r="9" fill="url(#pulseGrad)"/>
        <circle class="hq-pulse delayed" cx="0" cy="0" r="9" fill="url(#pulseGrad)"/>
        <circle class="hq-glow" cx="0" cy="0" r="42"/>
        <g class="hq-ring-spin">
          <circle class="hq-ring" cx="0" cy="0" r="14" stroke-dasharray="3 4"/>
          <circle class="hq-ring" cx="0" cy="0" r="19" stroke-dasharray="1.5 6" opacity="0.55"/>
        </g>
        <circle class="hq-core" cx="0" cy="0" r="7"/>
        <circle cx="0" cy="0" r="7" fill="none" stroke="#fff" stroke-width="1.4" opacity="0.95"/>
        <line x1="-22" y1="0" x2="-16" y2="0" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>
        <line x1="16" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>
        <line x1="0" y1="-22" x2="0" y2="-16" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>
        <line x1="0" y1="16" x2="0" y2="22" stroke="rgba(255,255,255,0.55)" stroke-width="1"/>
      </g></g>`;
    }
    return `${open}
        <circle class="city-glow" cx="0" cy="0" r="22"/>
        <circle cx="0" cy="0" r="7.5" fill="none" stroke="rgba(255,255,255,0.20)" stroke-width="1"/>
        <circle class="city-dot" cx="0" cy="0" r="3.6"/>
      </g></g>`;
  }).join("");

  // -- Labels (rounded-rect background pill for legibility over busy dots) --
  // labelConfig MUST have an entry for every city id, otherwise the
  // .map() at the labels-render call below hits `undefined.side` and
  // throws — silently hiding ALL labels (not just the missing one).
  // Sydney removed; Mexico City + São Paulo added to match cities[].
  const labelConfig = {
    dubai:    { side: "right", dx: 24, dy: -10, tag: true },
    london:   { side: "left",  dx: -24, dy: -10 },
    limassol: { side: "right", dx: 24,  dy: 16 },
    mexico:   { side: "left",  dx: -24, dy: -10 },
    sao:      { side: "left",  dx: -24, dy: 16 },
    cape:     { side: "left",  dx: -24, dy: 16 },
    sing:     { side: "right", dx: 24,  dy: 18 },
  };

  const labelsEl = svg.querySelector("#labels");
  labelsEl.innerHTML = cities.map(c => {
    const cfg = labelConfig[c.id];
    const anchor = cfg.side === "right" ? "start" : "end";
    const lx = c.x + cfg.dx;
    const ly = c.y + cfg.dy;
    const tickX1 = c.x + (cfg.side === "right" ? 8 : -8);
    const tickX2 = lx - (cfg.side === "right" ? 4 : -4);

    const nameW = c.name.length * 7.4 + 16;
    const subW  = c.role.length * 6.4 + 14;
    const padW  = Math.max(nameW, subW);
    const bgX   = cfg.side === "right" ? lx - 8 : lx - padW + 8;
    const bgY   = ly - 14;
    const bgH   = 36;

    let hqTag = "";
    if (cfg.tag) {
      const tagX = lx;
      const tagY = ly + 30;
      hqTag = `
        <g transform="translate(${tagX} ${tagY})">
          <rect class="hq-tag-bg" x="0" y="-9" width="50" height="16" rx="8"/>
          <text class="hq-tag" x="25" y="2" text-anchor="middle">HQ</text>
        </g>`;
    }

    return `
      <g class="fx-label">
        <line class="label-line" x1="${tickX1.toFixed(1)}" y1="${c.y.toFixed(1)}" x2="${tickX2.toFixed(1)}" y2="${ly.toFixed(1)}"/>
        <rect class="label-bg" x="${bgX.toFixed(1)}" y="${bgY.toFixed(1)}" width="${padW.toFixed(1)}" height="${bgH}" rx="7"/>
        <text class="city-label" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}">${c.name}</text>
        <text class="city-sub"   x="${lx.toFixed(1)}" y="${(ly+14).toFixed(1)}" text-anchor="${anchor}">${c.role}</text>
        ${hqTag}
      </g>`;
  }).join("");

  // ============================================================
  //  MOTION
  //  One rAF loop drives every moving part, so the whole map pauses as
  //  a unit (offscreen / hidden tab) and nothing runs at all under
  //  prefers-reduced-motion — the static map above is the final state.
  //   1. Intro, once ~25% of the map is in view: a sonar sweep from
  //      Dubai reveals the continents, HQ ignites, arcs draw out to the
  //      offices nearest-first, and each office springs in with a
  //      ripple the moment its arc lands. The HUD decodes alongside.
  //   2. Ambient: data pulses travel HQ → office on eased timing; the
  //      line brightens in transit and the office ripples on arrival.
  //   3. Depth (fine pointers only): the stage tilts a couple of degrees
  //      and the network layer drifts over the map — transforms only.
  // ============================================================
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const SVG_NS = "http://www.w3.org/2000/svg";
  const stage = svg.parentElement;          // .map-inline-stage
  const shell = stage.parentElement;        // pointer target for depth
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // -- Easing --------------------------------------------------
  const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
  const easeOutCubic = p => 1 - Math.pow(1 - p, 3);
  const easeInOutCubic = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const easeInOutSine = p => -(Math.cos(Math.PI * p) - 1) / 2;
  // Under-damped spring 0 → 1: ~8% overshoot, settles in ~0.6s.
  const spring = t => {
    if (t <= 0) return 0;
    const w = 14, z = 0.62, wd = w * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t));
  };

  // -- Network layer -------------------------------------------
  // Arcs, pulses, markers, labels and HUD move onto their own <svg> over
  // the map. Promoted to a compositor layer (see .fx-map-fg), everything
  // that animates repaints only this light layer — never the ~3,000-dot
  // continent field underneath. Gradients resolve by id document-wide.
  const fg = document.createElementNS(SVG_NS, "svg");
  fg.setAttribute("class", "fx-map-fg");
  fg.setAttribute("viewBox", svg.getAttribute("viewBox"));
  fg.setAttribute("preserveAspectRatio", svg.getAttribute("preserveAspectRatio") || "xMidYMid meet");
  fg.setAttribute("aria-hidden", "true");
  ["#arcs", "#travelers", "#cities", "#labels", ".hud"].forEach(sel => {
    const el = svg.querySelector(sel);
    if (el) fg.appendChild(el);
  });
  stage.appendChild(fg);
  stage.classList.add("fx-live");

  // -- Sonar sweep that reveals the continents -------------------
  // A soft radial mask on the dot-field <svg> grows out from Dubai, with
  // a faint glowing wavefront riding its edge. Masking the HTML element
  // keeps the dots rasterised once; only the gradient mask repaints.
  const WAVE_DUR = 1.8, FEATHER = 130, WAVE_MAX = 1080;   // seconds / SVG units
  svg.querySelector("defs").insertAdjacentHTML("beforeend", `
    <radialGradient id="fxWaveGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#2bc6e0" stop-opacity="0"/>
      <stop offset="84%"  stop-color="#2bc6e0" stop-opacity="0"/>
      <stop offset="95%"  stop-color="#a9b8ff" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="#f08bff" stop-opacity="0"/>
    </radialGradient>`);
  const wave = document.createElementNS(SVG_NS, "circle");
  wave.setAttribute("class", "fx-wave");
  wave.setAttribute("cx", hq.x.toFixed(1));
  wave.setAttribute("cy", hq.y.toFixed(1));
  wave.setAttribute("r", "0");
  wave.setAttribute("opacity", "0");
  fg.insertBefore(wave, fg.firstChild);

  let pxPerUnit = 0;
  function setReveal(ru) {
    if (!pxPerUnit) pxPerUnit = svg.clientWidth / W;
    const outer = ru * pxPerUnit, inner = (ru - FEATHER) * pxPerUnit;
    const m = `radial-gradient(circle at ${(hq.x / W * 100).toFixed(2)}% ${(hq.y / H * 100).toFixed(2)}%, #000 ${inner.toFixed(1)}px, transparent ${outer.toFixed(1)}px)`;
    svg.style.webkitMaskImage = m;
    svg.style.maskImage = m;
    stage.style.setProperty("--fx-reveal", m);   // any stage backing layer sweeps in too
  }
  window.addEventListener("resize", () => { pxPerUnit = 0; }, { passive: true });

  // -- Path samplers -------------------------------------------
  // Each arc is pre-sampled once so pulses read positions from a lookup
  // table — zero geometry queries inside the frame loop.
  function sampler(path, len) {
    const step = 2, n = Math.max(1, Math.ceil(len / step));
    const xs = new Float32Array(n + 1), ys = new Float32Array(n + 1);
    for (let k = 0; k <= n; k++) {
      const p = path.getPointAtLength(Math.min(k * step, len));
      xs[k] = p.x; ys[k] = p.y;
    }
    return (d, out) => {
      const f = (d < 0 ? 0 : d > len ? len : d) / step;
      const k = Math.min(n - 1, f | 0), r = f - k;
      out.x = xs[k] + (xs[k + 1] - xs[k]) * r;
      out.y = ys[k] + (ys[k + 1] - ys[k]) * r;
    };
  }

  // -- Nodes (offices) -------------------------------------------
  const cityEls = fg.querySelectorAll("#cities .city");
  const labelEls = fg.querySelectorAll("#labels .fx-label");
  const nodes = cities.map((c, i) => ({
    body: cityEls[i].querySelector(".fx-body"),
    ripple: cityEls[i].querySelector(".fx-ripple"),
    label: labelEls[i],
    landAt: Infinity,       // intro landing time
    hitAt: -Infinity,       // last ripple trigger
    rippleSize: 34, rippleDur: 1.1,
    flashAt: -Infinity, flashAmp: 0,
    settled: false, rippling: false, flashing: false,
  }));
  const hqNode = nodes[0];
  const sonar = [...hqNode.body.querySelectorAll(".hq-pulse")];
  const hqGlow = hqNode.body.querySelector(".hq-glow");
  // Desync each office's idle glow so the network never breathes in unison.
  fg.querySelectorAll(".city-glow").forEach((el, i) => el.style.setProperty("--d", `${(-i * 1.37).toFixed(2)}s`));

  // -- Routes (arc + its pulse) ----------------------------------
  // Each pulse is a bright head plus a luminous trail: a polyline traced
  // back along the arc, stroked with a gradient whose axis is re-aimed
  // down the trail every frame, so it fades smoothly from the head to
  // nothing (a soft wide pass underneath gives it bloom).
  const TRAIL_LEN = 92, TRAIL_PTS = 14;
  const fgDefs = document.createElementNS(SVG_NS, "defs");
  fg.insertBefore(fgDefs, fg.firstChild);
  const travelersEl = fg.querySelector("#travelers");
  const routes = [...fg.querySelectorAll("#arcs .arc")].map((el, i) => {
    const gid = `fxTrail${i}`;
    fgDefs.insertAdjacentHTML("beforeend", `
      <linearGradient id="${gid}" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stop-color="#2bc6e0" stop-opacity="0"/>
        <stop offset="55%"  stop-color="#9aa8ff" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.95"/>
      </linearGradient>`);
    const comet = document.createElementNS(SVG_NS, "g");
    comet.setAttribute("class", "fx-comet");
    comet.setAttribute("opacity", "0");
    comet.innerHTML = `<polyline class="fx-trail-glow" stroke="url(#${gid})"/>`
      + `<polyline class="fx-trail" stroke="url(#${gid})"/>`
      + `<circle class="fx-comet-glow" r="10"/><circle class="fx-comet-core" r="2.4"/>`;
    travelersEl.appendChild(comet);
    const [trailGlow, trail, glow, core] = comet.children;
    const len = el.getTotalLength();
    return {
      el, len, at: sampler(el, len), node: nodes[i + 1],
      comet, grad: fgDefs.lastElementChild, trailGlow, trail, glow, core,
      drawAt: 0, drawDur: 1, drawn: false,
      nextAt: Infinity, start: 0, dur: 1, active: false, arrived: false, width: "",
    };
  });

  // -- HUD -------------------------------------------------------
  const GLYPHS = "+×·:/<>#=0123456789ABCDEF";
  const hud = [...fg.querySelectorAll(".hud-mono")].map((el, i) => ({
    el, text: el.textContent, at: 0.2 + i * 0.22, done: false, last: "",
  }));
  const liveHud = hud.find(h => /LIVE/.test(h.text));
  if (liveHud && document.fonts) document.fonts.ready.then(() => {
    const t = liveHud.el;
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("class", "fx-live-dot");
    dot.setAttribute("r", "3");
    dot.setAttribute("cx", (Number(t.getAttribute("x")) - t.getComputedTextLength() - 10).toFixed(1));
    dot.setAttribute("cy", (Number(t.getAttribute("y")) - 3.5).toFixed(1));
    t.parentNode.insertBefore(dot, t);
  });

  // -- Pre-intro state (held until the map scrolls into view) ----
  setReveal(0);
  routes.forEach(r => {
    r.el.style.strokeDasharray = r.len.toFixed(1);
    r.el.style.strokeDashoffset = r.len.toFixed(1);
  });
  nodes.forEach(n => {
    n.body.style.opacity = "0";
    n.body.setAttribute("transform", "scale(0)");
    n.label.style.opacity = "0";
    n.label.setAttribute("transform", "translate(0 8)");
  });
  sonar.forEach(s => s.setAttribute("opacity", "0"));
  hud.forEach(h => { h.el.style.opacity = "0"; });

  // Choreography: HQ first, then arcs nearest-first (signal propagates
  // outward), each office landing exactly as its arc completes. The
  // first ambient pulses then cascade out in the same order.
  let introEnd = 0;
  function planIntro() {
    hqNode.landAt = 0.05;
    const order = routes.map((_, i) => i).sort((a, b) => routes[a].len - routes[b].len);
    order.forEach((i, rank) => {
      const r = routes[i];
      r.drawAt = 0.5 + rank * 0.16;
      r.drawDur = Math.min(1.4, Math.max(0.9, 0.8 + r.len / 1000));
      r.node.landAt = r.drawAt + r.drawDur;
    });
    introEnd = Math.max(...nodes.map(n => n.landAt)) + 0.9;
    order.forEach((i, rank) => { routes[i].nextAt = introEnd + 0.2 + rank * 0.45; });
  }

  function ripple(n, t, size, dur) { n.hitAt = t; n.rippleSize = size; n.rippleDur = dur; }
  function flash(n, t, amp) { n.flashAt = t; n.flashAmp = amp; }

  // -- Frame -----------------------------------------------------
  let waveDone = false, hudDone = false;
  const pt = { x: 0, y: 0 };

  function drawWave(t) {
    const p = clamp01(t / WAVE_DUR), ru = easeOutCubic(p) * WAVE_MAX;
    setReveal(ru);
    wave.setAttribute("r", (ru + 8).toFixed(1));
    wave.setAttribute("opacity", (Math.min(1, p / 0.12) * (1 - clamp01((p - 0.6) / 0.4))).toFixed(3));
    if (p < 1) return;
    waveDone = true;
    svg.style.webkitMaskImage = "";
    svg.style.maskImage = "";
    stage.style.removeProperty("--fx-reveal");
    wave.remove();
  }

  // Trace the trail from its tail end up to the head; `collapse` (0 → 1)
  // shrinks it into the head as the pulse is absorbed by the office.
  function placeComet(r, head, collapse) {
    const len = TRAIL_LEN * (1 - collapse);
    let pts = "";
    for (let j = TRAIL_PTS; j >= 0; j--) {
      r.at(head - (j / TRAIL_PTS) * len, pt);
      const x = pt.x.toFixed(1), y = pt.y.toFixed(1);
      pts += `${x},${y} `;
      if (j === TRAIL_PTS) { r.grad.setAttribute("x1", x); r.grad.setAttribute("y1", y); }
      if (j === 0) {
        r.grad.setAttribute("x2", x); r.grad.setAttribute("y2", y);
        r.glow.setAttribute("cx", x); r.glow.setAttribute("cy", y);
        r.core.setAttribute("cx", x); r.core.setAttribute("cy", y);
      }
    }
    r.trail.setAttribute("points", pts);
    r.trailGlow.setAttribute("points", pts);
  }

  function setEnergy(r, e) {
    const w = (1.4 + 0.7 * e).toFixed(2);
    if (w !== r.width) { r.width = w; r.el.style.strokeWidth = w; }
  }

  function drawRoute(r, t) {
    if (!r.drawn) {
      const p = clamp01((t - r.drawAt) / r.drawDur);
      r.el.style.strokeDashoffset = (r.len * (1 - easeInOutCubic(p))).toFixed(1);
      if (p >= 1) {
        r.drawn = true;
        r.el.style.strokeDasharray = "";
        r.el.style.strokeDashoffset = "";
      }
      return;
    }
    if (!r.active) {
      if (t < r.nextAt) return;
      r.active = true; r.arrived = false; r.start = t;
      r.dur = Math.min(2.4, Math.max(1.3, 1 + r.len / 650));
      flash(hqNode, t, 0.1);                       // HQ "emits"
    }
    const p = (t - r.start) / r.dur;
    if (p < 1) {
      placeComet(r, easeInOutSine(p) * r.len, 0);
      setEnergy(r, Math.sin(Math.PI * p));          // line glows while carrying
      r.comet.setAttribute("opacity", clamp01(p / 0.06).toFixed(3));
      return;
    }
    if (!r.arrived) {
      r.arrived = true;
      ripple(r.node, t, 24, 0.9);
      flash(r.node, t, 0.24);
    }
    const q = clamp01((t - r.start - r.dur) / 0.32);   // tail absorbs into the office
    placeComet(r, r.len, q);
    setEnergy(r, 0);
    r.comet.setAttribute("opacity", (1 - q).toFixed(3));
    if (q >= 1) { r.active = false; r.nextAt = t + 3.2 + Math.random() * 3.6; }
  }

  function drawNode(n, t) {
    const since = t - n.landAt;
    if (since < 0) return;
    if (!n.settled) {
      if (n.hitAt < n.landAt) ripple(n, n.landAt, 34, 1.1);
      n.body.setAttribute("transform", `scale(${spring(since).toFixed(3)})`);
      n.body.style.opacity = clamp01(since / 0.16).toFixed(3);
      const le = easeOutCubic(clamp01((since - 0.08) / 0.5));
      n.label.style.opacity = le.toFixed(3);
      n.label.setAttribute("transform", `translate(0 ${(8 * (1 - le)).toFixed(2)})`);
      if (since > 1.1) {
        n.settled = true;
        n.body.removeAttribute("transform");
        n.body.style.opacity = "";
        n.label.style.opacity = "";
        n.label.removeAttribute("transform");
      }
    } else {
      const f = (t - n.flashAt) / 0.38;
      if (f >= 0 && f <= 1) {
        n.flashing = true;
        n.body.setAttribute("transform", `scale(${(1 + n.flashAmp * Math.sin(Math.PI * f)).toFixed(3)})`);
      } else if (n.flashing) {
        n.flashing = false;
        n.body.removeAttribute("transform");
      }
    }
    const rp = (t - n.hitAt) / n.rippleDur;
    if (rp >= 0 && rp <= 1) {
      n.rippling = true;
      n.ripple.setAttribute("r", (5 + n.rippleSize * easeOutCubic(rp)).toFixed(2));
      n.ripple.setAttribute("opacity", (0.6 * Math.pow(1 - rp, 1.4)).toFixed(3));
    } else if (n.rippling) {
      n.rippling = false;
      n.ripple.setAttribute("opacity", "0");
    }
  }

  const SONAR_P = 3.2;
  function drawHQ(t) {
    const live = t - 0.3;
    if (live < 0) return;
    sonar.forEach((ring, i) => {
      const local = live - i * SONAR_P / 2;          // second ring trails by half a period
      if (local < 0) return;
      const p = (local / SONAR_P) % 1;
      ring.setAttribute("r", (9 + 42 * easeOutCubic(p)).toFixed(2));
      ring.setAttribute("opacity", (0.6 * Math.pow(1 - p, 1.5)).toFixed(3));
    });
    const b = Math.sin((t / 4.6) * Math.PI * 2);
    hqGlow.setAttribute("r", (42 * (1 + 0.05 * b)).toFixed(2));
    hqGlow.style.opacity = (0.86 + 0.14 * b).toFixed(3);
  }

  function drawHud(t) {
    let done = true;
    for (const h of hud) {
      if (h.done) continue;
      const p = (t - h.at) / 0.8;
      if (p < 0) { done = false; continue; }
      h.el.style.opacity = "";
      if (p >= 1) { h.el.textContent = h.text; h.done = true; continue; }
      done = false;
      const shown = Math.floor(easeOutCubic(p) * h.text.length);
      const tick = Math.floor(t * 18);                  // glyphs reshuffle ~18×/s
      let s = h.text.slice(0, shown);
      for (let k = shown; k < h.text.length; k++) {
        s += h.text[k] === " " ? " " : GLYPHS[(k * 7 + tick * 13) % GLYPHS.length];
      }
      if (s !== h.last) { h.last = s; h.el.textContent = s; }
    }
    if (done) hudDone = true;
  }

  // -- Depth (pointer parallax) -----------------------------------
  const depth = { tx: 0, ty: 0, x: 0, y: 0, wx: 0, wy: 0 };
  if (finePointer) {
    shell.addEventListener("pointermove", e => {
      const b = shell.getBoundingClientRect();
      depth.tx = Math.max(-1, Math.min(1, ((e.clientX - b.left) / b.width) * 2 - 1));
      depth.ty = Math.max(-1, Math.min(1, ((e.clientY - b.top) / b.height) * 2 - 1));
    }, { passive: true });
    shell.addEventListener("pointerleave", () => { depth.tx = 0; depth.ty = 0; }, { passive: true });
  }
  function drawDepth(dt) {
    const k = 1 - Math.exp(-dt * 6);                    // frame-rate independent follow
    depth.x += (depth.tx - depth.x) * k;
    depth.y += (depth.ty - depth.y) * k;
    if (Math.abs(depth.x - depth.wx) < 0.0008 && Math.abs(depth.y - depth.wy) < 0.0008) return;
    depth.wx = depth.x; depth.wy = depth.y;
    stage.style.transform = `perspective(1400px) rotateX(${(-depth.y * 1.6).toFixed(3)}deg) rotateY(${(depth.x * 2.4).toFixed(3)}deg)`;
    fg.style.transform = `translate3d(${(depth.x * 7).toFixed(2)}px, ${(depth.y * 5).toFixed(2)}px, 0)`;
  }

  function frame(t, dt) {
    if (!waveDone) drawWave(t);
    for (const r of routes) drawRoute(r, t);
    for (const n of nodes) drawNode(n, t);
    drawHQ(t);
    if (!hudDone) drawHud(t);
    if (finePointer) drawDepth(dt);
  }

  // -- Clock / lifecycle -------------------------------------------
  // The clock only advances while running, so pausing (offscreen, hidden
  // tab) freezes the choreography and resuming continues seamlessly.
  let clock = 0, last = 0, rafId = 0, running = false, started = false, inView = false, introT0 = 0;
  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;
    frame(clock - introT0, dt);
    rafId = requestAnimationFrame(loop);
  }
  function play() {
    if (running || !started || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    stage.classList.remove("fx-paused");
    rafId = requestAnimationFrame(loop);
  }
  function pause() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(rafId);
    stage.classList.add("fx-paused");
  }
  function start() {
    if (started) return;
    started = true;
    introT0 = clock;
    planIntro();
    play();
  }

  if ("IntersectionObserver" in window) {
    let fallback = 0;
    new IntersectionObserver(entries => {
      const e = entries[entries.length - 1];
      inView = e.isIntersecting;
      if (inView && !started) {
        if (e.intersectionRatio >= 0.25) start();
        else if (!fallback) fallback = setTimeout(start, 1200);   // partly visible and staying put
      }
      if (inView) play(); else pause();
    }, { threshold: [0, 0.25] }).observe(stage);
  } else {
    inView = true;
    start();
  }
  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : play()));
})();
