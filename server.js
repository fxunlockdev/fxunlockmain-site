// ============================================================
// FX UNLOCKED — Express server
// Serves the static marketing site + captures contact-form leads
// to Railway Postgres.
//
// Endpoints:
//   GET  /healthz       — liveness probe (returns 200 + db ping)
//   POST /api/leads     — store a lead. Honeypot + per-IP rate limit.
//   *    /              — static files from the project root
//
// Environment:
//   PORT          — Railway injects this; falls back to 3000 locally
//   DATABASE_URL  — Railway Postgres connection string
//   NODE_ENV      — 'production' on Railway, anything else locally
// ============================================================

import express from "express";
import rateLimit from "express-rate-limit";
import pg from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === "production";

// ---------- Postgres ----------
// Use connection pool. Railway internal Postgres uses self-signed certs
// over the private network — disable cert validation when DATABASE_URL
// is set (it always is on Railway). Locally without DATABASE_URL the
// server still boots but /api/leads returns 503.
const pool = process.env.DATABASE_URL
  ? new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: IS_PROD ? { rejectUnauthorized: false } : false,
      max: 5,
    })
  : null;

async function migrate() {
  if (!pool) {
    console.warn("[migrate] DATABASE_URL not set — skipping schema bootstrap");
    return;
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      country TEXT,
      user_type TEXT,
      business_message TEXT,
      heard_from TEXT,
      source_page TEXT,
      ip TEXT,
      user_agent TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
    CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);
  `);
  console.log("[migrate] leads table ready");
}

// ---------- App ----------
const app = express();
app.set("trust proxy", 1); // Railway sits behind a proxy — needed for rate-limit IP
app.use(express.json({ limit: "16kb" }));

// Per-IP rate limit on the lead endpoint only — keep static asset traffic unconstrained.
const leadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions — please wait a moment and try again." },
});

// ---------- Health check ----------
app.get("/healthz", async (req, res) => {
  try {
    if (pool) await pool.query("SELECT 1");
    res.json({ ok: true, db: !!pool });
  } catch (err) {
    res.status(503).json({ ok: false, error: err.message });
  }
});

// ---------- Lead capture ----------
// Validation rules:
//   - name, email, phone required
//   - honeypot field "website" MUST be empty (real users never fill it)
//   - basic email regex
//   - all fields trimmed and capped at 4000 chars
function cleanString(v, max = 4000) {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.length > max ? t.slice(0, max) : t;
}

app.post("/api/leads", leadLimiter, async (req, res) => {
  if (!pool) {
    return res.status(503).json({ ok: false, error: "Database not configured" });
  }

  const b = req.body || {};

  // Honeypot — bots fill hidden fields, real users don't.
  if (b.website && b.website.trim() !== "") {
    // Silently 200 so bots don't learn the trap exists.
    return res.status(200).json({ ok: true });
  }

  const name = cleanString(b.name, 200);
  const email = cleanString(b.email, 200);
  const phone = cleanString(b.phone, 60);
  if (!name || !email || !phone) {
    return res.status(400).json({ ok: false, error: "Name, email and phone are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  const country = cleanString(b.country, 100);
  const userType = cleanString(b.user_type || b.userType, 100);
  const businessMessage = cleanString(b.business_message || b.businessMessage, 2000);
  const heardFrom = cleanString(b.heard_from || b.heardFrom, 100);
  const sourcePage = cleanString(b.source_page || b.sourcePage, 200);
  const ip = req.ip;
  const userAgent = cleanString(req.headers["user-agent"], 500);

  try {
    const { rows } = await pool.query(
      `INSERT INTO leads (name, email, phone, country, user_type,
                          business_message, heard_from, source_page, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, created_at`,
      [name, email, phone, country, userType, businessMessage, heardFrom, sourcePage, ip, userAgent]
    );
    res.status(201).json({ ok: true, id: rows[0].id, created_at: rows[0].created_at });
  } catch (err) {
    console.error("[/api/leads] DB error:", err);
    res.status(500).json({ ok: false, error: "Could not save your message. Please try again." });
  }
});

// ---------- Live price proxy ----------
// Fetches FX (freecurrencyapi) + gold (apised) SERVER-SIDE so the API
// keys never reach the browser AND the whole site shares ONE cached
// result. Previously each visitor called the upstreams directly, which
// burned the free quota and exhausted the gold key (401 "credit limit
// reached"). One server-side call every few minutes now serves everyone.
//
// Keys are read from environment variables only — set FCA_KEY and
// APISED_KEY in the Railway dashboard. If they are missing the endpoint
// degrades gracefully and the hero ticker keeps its static fallback.
const FCA_KEY = process.env.FCA_KEY || "";
const APISED_KEY = process.env.APISED_KEY || "";
const PRICE_TTL = 12 * 60 * 60 * 1000; // 12h → at most ~2 upstream refreshes/day (saves API credits)
let priceCache = { ts: 0, data: null };
let priceRefreshing = null; // shared in-flight refresh so concurrent misses ping upstream only once

if (!FCA_KEY || !APISED_KEY) {
  console.warn(
    "[prices] missing key(s):" +
      (FCA_KEY ? "" : " FCA_KEY") +
      (APISED_KEY ? "" : " APISED_KEY") +
      " — /api/prices will fall back until set in Railway env vars"
  );
}

async function fetchFiatRates() {
  const r = await fetch(
    "https://api.freecurrencyapi.com/v1/latest?base_currency=USD&currencies=EUR,GBP",
    { headers: { apikey: FCA_KEY } }
  );
  if (!r.ok) throw new Error("freecurrencyapi " + r.status);
  const j = await r.json();
  return j.data; // { EUR, GBP } — units per 1 USD
}

async function fetchGold() {
  const r = await fetch(
    "https://gold.g.apised.com/v1/latest?metals=XAU&base_currency=USD&currencies=USD&weight_unit=toz",
    { headers: { "x-api-key": APISED_KEY } }
  );
  if (!r.ok) throw new Error("apised " + r.status);
  const j = await r.json();
  const xau = j?.data?.metal_prices?.XAU;
  if (!xau || typeof xau.price !== "number" || !isFinite(xau.price) || xau.price <= 0) return null;
  return { price: xau.price, changePct: typeof xau.change_percentage === "number" ? xau.change_percentage : null };
}

// Build the chip-ready payload. Each upstream is independent — one
// failing never drops the other (Promise.allSettled).
async function buildPrices() {
  const out = { pairs: {}, ts: Date.now() };
  const [fiat, gold] = await Promise.allSettled([fetchFiatRates(), fetchGold()]);
  if (fiat.status === "fulfilled" && fiat.value) {
    const f = fiat.value;
    if (f.EUR > 0) out.pairs["EUR/USD"] = { price: 1 / f.EUR }; // chip quote is USD → invert
    if (f.GBP > 0) out.pairs["GBP/USD"] = { price: 1 / f.GBP };
  }
  if (gold.status === "fulfilled" && gold.value) {
    out.pairs["XAU/USD"] = { price: gold.value.price, changePct: gold.value.changePct };
  }
  return out;
}

// Refresh upstream at most once per TTL window (~2x/day). Concurrent
// requests share one in-flight fetch so a burst of visitors never
// multiplies the API pings.
function refreshPrices() {
  if (!priceRefreshing) {
    priceRefreshing = buildPrices()
      .then((data) => {
        if (data && Object.keys(data.pairs).length) priceCache = { ts: Date.now(), data };
        return priceCache.data;
      })
      .catch(() => priceCache.data)
      .finally(() => { priceRefreshing = null; });
  }
  return priceRefreshing;
}

app.get("/api/prices", async (req, res) => {
  const fresh = priceCache.data && Date.now() - priceCache.ts <= PRICE_TTL;
  if (fresh) {
    res.set("Cache-Control", "public, max-age=300");
    return res.json(priceCache.data);
  }
  // Stale-but-present: serve immediately, refresh in the background so
  // the visitor never waits and upstream is still pinged only ~2x/day.
  if (priceCache.data) {
    refreshPrices();
    res.set("Cache-Control", "public, max-age=300");
    return res.json(priceCache.data);
  }
  // Cold cache (first hit / after a restart): fetch once and wait.
  try {
    const data = await refreshPrices();
    if (data && Object.keys(data.pairs || {}).length) {
      res.set("Cache-Control", "public, max-age=300");
      return res.json(data);
    }
    return res.status(502).json({ ok: false, error: "no upstream price data" });
  } catch {
    return res.status(502).json({ ok: false, error: "price fetch failed" });
  }
});

// ---------- Clean home URL ----------
// The homepage should read as the bare root "/", not "/index.html".
// Redirect any direct hit on /index.html or /index to / so the URL bar
// never shows "/index". (Nav + logo links already point at "./".)
app.get(["/index.html", "/index"], (req, res) => res.redirect(301, "/"));

// ---------- Static files ----------
// All HTML/CSS/JS/images live at the repo root. Long cache for assets,
// short cache for HTML so deploys feel instant.
app.use(express.static(__dirname, {
  extensions: ["html"],
  setHeaders: (res, filePath) => {
    if (/\.html$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=60");
    } else if (/\.(png|jpe?g|svg|webp|mp4|webm|woff2?|ttf|otf)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
    } else if (/\.(css|js)$/i.test(filePath)) {
      // CSS + JS are cache-busted via ?v= query strings in the HTML.
      // Use must-revalidate (not immutable) so a missed ?v= bump still
      // refreshes within the day — protects against scripts like the
      // gold-price feed shipping a fix that gets stuck behind a 30-day
      // immutable cache for anyone whose browser already pulled the
      // old version.
      res.setHeader("Cache-Control", "public, max-age=86400, must-revalidate");
    }
  },
}));

// ---------- Boot ----------
migrate()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[server] FX Unlocked listening on :${PORT}  (db=${!!pool})`);
    });
  })
  .catch((err) => {
    console.error("[server] failed to migrate, aborting boot:", err);
    process.exit(1);
  });

// Graceful shutdown so Railway deploys don't drop in-flight requests
function shutdown(signal) {
  return () => {
    console.log(`[server] received ${signal}, closing pool`);
    if (pool) pool.end().finally(() => process.exit(0));
    else process.exit(0);
  };
}
process.on("SIGTERM", shutdown("SIGTERM"));
process.on("SIGINT", shutdown("SIGINT"));
