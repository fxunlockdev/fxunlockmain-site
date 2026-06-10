/* ============================================================
   FX UNLOCKED  ·  World map (lifted from Content Library handoff)
   Renders the stippled continent map, ocean stars, animated arcs
   from Dubai HQ to 5 country offices, city markers and labels.
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

  const arcPathsEl = svg.querySelector("#arcPaths");
  const arcsEl     = svg.querySelector("#arcs");
  const travelersEl = svg.querySelector("#travelers");

  const arcDataList = others.map((c, i) => ({
    id: `arcp-${i+1}`,
    cls: `arc a${i+1}`,
    d: arcPath(hq, c),
    dur: 3.4 + (i * 0.3),
    delay: 0.8 + i * 0.45,
  }));

  arcPathsEl.innerHTML = arcDataList.map(a => `<path id="${a.id}" d="${a.d}" fill="none"/>`).join("");
  arcsEl.innerHTML     = arcDataList.map(a => `<path class="${a.cls}" d="${a.d}"/>`).join("");

  travelersEl.innerHTML = arcDataList.map(a => `
    <circle class="traveler" r="7">
      <animateMotion dur="${a.dur}s" begin="${a.delay}s;${a.delay+a.dur+1.5}s" repeatCount="indefinite" rotate="auto">
        <mpath href="#${a.id}"/>
      </animateMotion>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1"
               dur="${a.dur}s" begin="${a.delay}s;${a.delay+a.dur+1.5}s" repeatCount="indefinite"/>
    </circle>
    <circle r="2.2" fill="#fff">
      <animateMotion dur="${a.dur}s" begin="${a.delay}s;${a.delay+a.dur+1.5}s" repeatCount="indefinite" rotate="auto">
        <mpath href="#${a.id}"/>
      </animateMotion>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1"
               dur="${a.dur}s" begin="${a.delay}s;${a.delay+a.dur+1.5}s" repeatCount="indefinite"/>
    </circle>
  `).join("");

  // -- City markers (HQ has chromatic glow + dual pulse + spinning ring) --
  const citiesEl = svg.querySelector("#cities");
  citiesEl.innerHTML = cities.map(c => {
    if (c.hq) {
      return `<g class="city" transform="translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})">
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
      </g>`;
    }
    return `<g class="city" transform="translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})">
      <circle class="city-glow" cx="0" cy="0" r="22"/>
      <circle cx="0" cy="0" r="7.5" fill="none" stroke="rgba(255,255,255,0.20)" stroke-width="1"/>
      <circle class="city-dot" cx="0" cy="0" r="3.6"/>
    </g>`;
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
      <g>
        <line class="label-line" x1="${tickX1.toFixed(1)}" y1="${c.y.toFixed(1)}" x2="${tickX2.toFixed(1)}" y2="${ly.toFixed(1)}"/>
        <rect class="label-bg" x="${bgX.toFixed(1)}" y="${bgY.toFixed(1)}" width="${padW.toFixed(1)}" height="${bgH}" rx="7"/>
        <text class="city-label" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}">${c.name}</text>
        <text class="city-sub"   x="${lx.toFixed(1)}" y="${(ly+14).toFixed(1)}" text-anchor="${anchor}">${c.role}</text>
        ${hqTag}
      </g>`;
  }).join("");
})();
