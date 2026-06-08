/* ============================================================
   FX UNLOCKED  ·  Live currency feed (freecurrencyapi.com)
   Updates the hero chip BASE prices from real FX data, then the
   existing random-walk simulation in hero-dark.js continues to
   produce the live-feel tick animation.

   Quota strategy (free tier: 1000 / month, 10 / minute):
     • localStorage cache for 30 min so a single visitor uses ~1
       API call per session (most sessions are shorter than that)
     • Updates only the chips that have a SUPPORTED pair attribute
       (currently EUR/USD and GBP/USD — fiat only); XAU/USD stays
       on its random walk since freecurrencyapi has no gold feed

   NOTE: The API key is embedded for now because this is a static
   site. For production-grade quota protection move the fetch
   behind a thin Cloudflare Worker / Railway endpoint that holds
   the key server-side.
   ============================================================ */
(function () {
  const KEY = "fca_live_JS14jrg4QKAU4I0RwIzFS0h3fNjz01HE3lPvxkrJ";
  const CACHE_KEY = "fxu_live_rates_v1";
  const CACHE_TTL = 30 * 60 * 1000;     // 30 minutes
  // Map every chip pair -> currency code freecurrencyapi understands
  // (base is implicitly USD; we invert the rate where needed below).
  const PAIRS = {
    "EUR/USD": "EUR",
    "GBP/USD": "GBP",
    "USD/JPY": "JPY",       // freecurrencyapi returns JPY-per-USD,
                             // which is exactly the USD/JPY price.
  };

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || Date.now() - obj.t > CACHE_TTL) return null;
      return obj;
    } catch (_) { return null; }
  }
  function writeCache(rates) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), rates }));
    } catch (_) {}
  }

  // Returns { EUR: 0.867, GBP: 0.749 } - rate of N units per 1 USD
  async function fetchRates(codes) {
    const url = `https://api.freecurrencyapi.com/v1/latest` +
                `?base_currency=USD&currencies=${codes.join(",")}`;
    const res = await fetch(url, { headers: { apikey: KEY } });
    if (!res.ok) throw new Error("freecurrencyapi " + res.status);
    const j = await res.json();
    return j.data;
  }

  // Convert the API rate (1 USD = N CODE) to a chip price.
  // For EUR/USD or GBP/USD (quote = USD), the chip price is the
  // inverse: 1 EUR = 1/0.867 = 1.152 USD.
  function chipPriceFromRate(pair, rate) {
    if (!rate || !isFinite(rate) || rate <= 0) return null;
    if (pair.endsWith("/USD")) return 1 / rate;
    if (pair.startsWith("USD/")) return rate;
    return rate;
  }

  function applyRatesToChips(rates) {
    document.querySelectorAll(".hero [data-ticker][data-pair]").forEach((el) => {
      const pair = el.dataset.pair;
      const code = PAIRS[pair];
      if (!code) return;
      const price = chipPriceFromRate(pair, rates[code]);
      if (price == null) return;
      // JPY pairs land around 150ish so 2 decimals; EUR/GBP around 1.x so 5.
      const dec = pair.includes("JPY") ? 2 : 5;
      el.dataset.base = price.toFixed(dec);
      const valEl = el.querySelector("[data-tk-val]");
      if (valEl) valEl.textContent = price.toFixed(dec);
      el.dispatchEvent(new CustomEvent("fxu:liveBase", { detail: { price } }));
    });
  }

  async function refresh() {
    const cached = readCache();
    if (cached) { applyRatesToChips(cached.rates); return; }
    const codes = [...new Set(Object.values(PAIRS))];
    try {
      const rates = await fetchRates(codes);
      writeCache(rates);
      applyRatesToChips(rates);
    } catch (e) {
      // Fail silent — the existing simulated baselines stay in place,
      // so the chips never look broken even if quota is exhausted or
      // the user is offline.
      console.warn("[live-feed] using fallback bases:", e.message);
    }
  }

  // Mount on home only (the hero with chips lives there)
  if (document.body && document.body.dataset.page === "home") {
    refresh();
    // Re-check every 15 min — the cache itself blocks unnecessary
    // network hits so this just keeps long sessions current.
    setInterval(refresh, 15 * 60 * 1000);
  }
})();
