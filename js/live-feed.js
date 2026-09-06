/* ============================================================
   FX UNLOCKED  ·  Live hero chip prices
   Prices come from our OWN endpoint /api/prices, which fetches FX
   (freecurrencyapi) + gold (apised) SERVER-SIDE and caches them (~2
   upstream refreshes/day). No third-party API keys live in the browser
   and visitors can't burn the upstream quota. See server.js.

   Response shape:
     { pairs: { "EUR/USD": { price },
                "GBP/USD": { price },
                "XAU/USD": { price, changePct } },
       ts }

   After values land we update each chip's data-base + the visible value
   and dispatch fxu:liveBase so the random-walk in hero-dark.js re-seeds
   its baseline. If the endpoint is unavailable (e.g. the static GitHub
   Pages mirror, or the Railway env keys are not set yet) the chips keep
   the static fallback values already in the markup.
   ============================================================ */
(function () {
  const ENDPOINT  = "/api/prices";
  const CACHE_KEY = "fxu_prices_v1";
  const CACHE_TTL = 30 * 60 * 1000; // reuse a result client-side for 30 min

  // ---------- cache helpers ----------
  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const o = JSON.parse(raw);
      if (!o || Date.now() - o.t > CACHE_TTL) return null;
      return o.data;
    } catch (_) { return null; }
  }
  function writeCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data })); } catch (_) {}
  }

  // ---------- chip update ----------
  function decimalsFor(pair) { return pair.startsWith("XAU") ? 2 : 5; }

  function setChipPrice(pair, price, changePct) {
    if (price == null || !isFinite(price) || price <= 0) return;
    const el = document.querySelector('.hero [data-ticker][data-pair="' + pair + '"]');
    if (!el) return;
    const dec = decimalsFor(pair);
    el.dataset.base = price.toFixed(dec);
    const valEl = el.querySelector("[data-tk-val]");
    if (valEl) valEl.textContent = price.toFixed(dec);
    // Update the 24h % badge + trend colour when the feed gives a delta.
    if (typeof changePct === "number" && isFinite(changePct)) {
      const dEl = el.querySelector("[data-tk-d]");
      if (dEl) {
        const positive = changePct >= 0;
        dEl.classList.toggle("pos", positive);
        dEl.classList.toggle("neg", !positive);
        const sign = positive ? "+" : "−"; // U+2212 to match existing markup
        dEl.textContent = sign + Math.abs(changePct).toFixed(2) + "%";
        el.dataset.trend = positive ? "up" : "down";
      }
    }
    // hero-dark.js re-anchors its random walk to this live base.
    el.dispatchEvent(new CustomEvent("fxu:liveBase", { detail: { price, changePct } }));
  }

  function apply(data) {
    if (!data || !data.pairs) return;
    Object.entries(data.pairs).forEach(([pair, v]) => {
      if (v && typeof v.price === "number") setChipPrice(pair, v.price, v.changePct);
    });
  }

  // ---------- refresh ----------
  async function refresh() {
    const cached = readCache();
    if (cached) { apply(cached); return; }
    try {
      const res = await fetch(ENDPOINT, { headers: { accept: "application/json" } });
      if (!res.ok) throw new Error("prices " + res.status);
      const data = await res.json();
      if (data && data.pairs && Object.keys(data.pairs).length) {
        writeCache(data);
        apply(data);
      }
    } catch (e) {
      // Endpoint unavailable — keep the static fallback in the markup.
      console.warn("[live-feed] /api/prices unavailable:", e.message);
    }
  }

  // Mount on home only (the hero with chips lives there).
  if (document.body && document.body.dataset.page === "home") {
    refresh();
    // Long interval — hits the client/server cache, never the upstream.
    setInterval(refresh, 30 * 60 * 1000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") refresh();
    });
  }
})();
