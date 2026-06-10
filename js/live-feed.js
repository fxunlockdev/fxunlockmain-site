/* ============================================================
   FX UNLOCKED  ·  Live hero chip prices
   Two upstream feeds, each cached in localStorage for 30 min so a
   single visitor uses ~1 request per session per feed:

     • freecurrencyapi.com   →  EUR/USD, GBP/USD
       Free tier: 1000 / month, 10 / minute. Fiat only.

     • gold.g.apised.com     →  XAU/USD (troy ounce)
       Auth: x-api-key header. Returns metal prices for several
       currencies; we pick the USD value.

   Both fetches run in parallel on page load (and every 15 min after,
   though the cache shortcut means most ticks are zero-network).

   After upstream values land we update each chip's data-base + the
   visible vc-val text, then dispatch fxu:liveBase so the random-walk
   simulation in hero-dark.js re-seeds its baseline.

   SECURITY NOTE — both API keys are embedded client-side because this
   is a static site. Move the fetches behind a Railway endpoint that
   holds the keys server-side when production-grade quota protection
   matters. Tracked in task #41 (Railway deploy).
   ============================================================ */
(function () {
  // ---------- config ----------
  const FCA_KEY = "fca_live_JS14jrg4QKAU4I0RwIzFS0h3fNjz01HE3lPvxkrJ";
  const APISED_KEY = "sk_c2CfFf70b2Be811B898eeBDc40eC6599a215ED29b75aE55B";

  const FCA_CACHE = "fxu_live_rates_v1";
  const GOLD_CACHE = "fxu_gold_v2"; // v2 — invalidate any stale v1 cache
  const FCA_TTL  = 30 * 60 * 1000;  // 30 min for fiat (low volatility)
  const GOLD_TTL = 5 * 60 * 1000;   // 5 min for gold (much higher volatility)

  // Chip pair -> fiat ISO code understood by freecurrencyapi.
  // (base is USD; we invert below where the chip quote is /USD.)
  const FIAT_PAIRS = {
    "EUR/USD": "EUR",
    "GBP/USD": "GBP",
  };

  // ---------- cache helpers ----------
  function readCache(key, ttl) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || Date.now() - obj.t > ttl) return null;
      return obj.data;
    } catch (_) { return null; }
  }
  function writeCache(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
    } catch (_) {}
  }

  // ---------- freecurrencyapi (fiat) ----------
  // Returns { EUR: 0.867, GBP: 0.749 } - units of code per 1 USD
  async function fetchFiat(codes) {
    const url = "https://api.freecurrencyapi.com/v1/latest" +
                "?base_currency=USD&currencies=" + codes.join(",");
    const res = await fetch(url, { headers: { apikey: FCA_KEY } });
    if (!res.ok) throw new Error("freecurrencyapi " + res.status);
    const j = await res.json();
    return j.data;
  }

  // For EUR/USD or GBP/USD the chip quote is USD, so the displayed price
  // is the inverse of the fiat rate (1 EUR = 1/0.867 = 1.152 USD).
  function fiatToChipPrice(pair, rate) {
    if (!rate || !isFinite(rate) || rate <= 0) return null;
    if (pair.endsWith("/USD")) return 1 / rate;
    if (pair.startsWith("USD/")) return rate;
    return rate;
  }

  // ---------- apised (gold, troy ounce) ----------
  // Returns { price, changePct } for XAU/USD, or null if unparsable.
  // Schema confirmed live: data.metal_prices.XAU.{price, change_percentage}.
  // weight_unit must be one of: toz, gram, kg, mt — "toz" = troy ounce.
  async function fetchGold() {
    const url = "https://gold.g.apised.com/v1/latest" +
                "?metals=XAU&base_currency=USD&currencies=USD" +
                "&weight_unit=toz";
    const res = await fetch(url, { headers: { "x-api-key": APISED_KEY } });
    if (!res.ok) throw new Error("apised " + res.status);
    const j = await res.json();
    return extractXauUsd(j);
  }

  function extractXauUsd(j) {
    const xau = j?.data?.metal_prices?.XAU;
    if (!xau || typeof xau.price !== "number" || !isFinite(xau.price) || xau.price <= 0) {
      return null;
    }
    return {
      price: xau.price,
      changePct: typeof xau.change_percentage === "number" ? xau.change_percentage : null,
    };
  }

  // ---------- chip update ----------
  function decimalsFor(pair) {
    if (pair.startsWith("XAU")) return 2; // gold: 2705.43
    return 5;                              // EUR/GBP: 1.08944
  }

  function setChipPrice(pair, price, changePct) {
    if (price == null) return;
    const el = document.querySelector(
      '.hero [data-ticker][data-pair="' + pair + '"]'
    );
    if (!el) return;
    const dec = decimalsFor(pair);
    el.dataset.base = price.toFixed(dec);
    const valEl = el.querySelector("[data-tk-val]");
    if (valEl) valEl.textContent = price.toFixed(dec);
    // Update the 24h % delta badge when the upstream feed gives us one.
    // Swap the .pos / .neg modifier and re-sign the text so the colour
    // matches the actual direction.
    if (typeof changePct === "number" && isFinite(changePct)) {
      const dEl = el.querySelector("[data-tk-d]");
      if (dEl) {
        const positive = changePct >= 0;
        dEl.classList.toggle("pos", positive);
        dEl.classList.toggle("neg", !positive);
        const sign = positive ? "+" : "−"; // U+2212 minus to match existing markup
        dEl.textContent = sign + Math.abs(changePct).toFixed(2) + "%";
        el.dataset.trend = positive ? "up" : "down";
      }
    }
    el.dispatchEvent(new CustomEvent("fxu:liveBase", { detail: { price, changePct } }));
  }

  // ---------- refresh ----------
  async function refreshFiat() {
    let rates = readCache(FCA_CACHE, FCA_TTL);
    if (!rates) {
      try {
        rates = await fetchFiat([...new Set(Object.values(FIAT_PAIRS))]);
        writeCache(FCA_CACHE, rates);
      } catch (e) {
        console.warn("[live-feed] fiat fallback:", e.message);
        return;
      }
    }
    Object.entries(FIAT_PAIRS).forEach(([pair, code]) => {
      setChipPrice(pair, fiatToChipPrice(pair, rates[code]));
    });
  }

  async function refreshGold() {
    let gold = readCache(GOLD_CACHE, GOLD_TTL);
    if (!gold) {
      try {
        gold = await fetchGold();
        if (gold != null) {
          writeCache(GOLD_CACHE, gold);
          console.log("[live-feed] XAU/USD live:", gold.price, gold.changePct + "%");
        }
      } catch (e) {
        console.warn("[live-feed] gold fallback:", e.message);
        return;
      }
    }
    if (!gold) return;
    setChipPrice("XAU/USD", gold.price, gold.changePct);
  }

  function refresh() {
    refreshFiat();
    refreshGold();
  }

  // Mount on home only (the hero with chips lives there)
  if (document.body && document.body.dataset.page === "home") {
    refresh();
    // The cache itself blocks most network hits; this just keeps long
    // sessions current.
    setInterval(refresh, 15 * 60 * 1000);
  }
})();
