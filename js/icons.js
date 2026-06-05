/* ============================================================
   FX UNLOCKED — Monoline Icon Set
   24x24 grid · 1.6 stroke · round caps/joins · currentColor
   Use: icon('name')  →  returns <svg> string
   ============================================================ */
(function () {
  const S = (inner, vb) =>
    `<svg viewBox="0 0 ${vb || 24} ${vb || 24}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const I = {
    /* ---- audiences ---- */
    creator: S(`<rect x="3.5" y="5" width="17" height="11" rx="2.2"/><path d="M9.5 9.2v3.6l3.2-1.8z" fill="currentColor" stroke="none"/><path d="M8 20h8M12 16v4"/>`),
    ib: S(`<path d="M12 3.5 4 7v4c0 4.4 3.2 7.6 8 9.5 4.8-1.9 8-5.1 8-9.5V7z"/><path d="M9.2 11.8 11.3 14l3.8-4"/>`),
    platform: S(`<rect x="3.5" y="4.5" width="17" height="12" rx="2"/><path d="M3.5 13.5h17M8 20h8M12 16.5V20"/><path d="M7 10.5l2.2-2.3 2 2 3.3-3.4"/>`),

    /* ---- benefits ---- */
    deal: S(`<path d="M12 3v18M8 6.5h6.2a2.8 2.8 0 0 1 0 5.6H8m0 0h6.8a2.8 2.8 0 0 1 0 5.6H8"/><path d="M8 9.3h8M8 14.7h8" opacity=".4"/>`),
    megaphone: S(`<path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H7l9 4.5V4L7 8.5H5.5A1.5 1.5 0 0 0 4 10z"/><path d="M16 8.5a4 4 0 0 1 0 7"/><path d="M7 15.5V20"/>`),
    education: S(`<path d="M12 4 2.5 8.5 12 13l9.5-4.5z"/><path d="M6.5 10.8v4.4c0 .8 2.5 2.3 5.5 2.3s5.5-1.5 5.5-2.3v-4.4"/><path d="M21.5 8.5v5"/>`),
    suite: S(`<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>`),
    review: S(`<path d="M5 4.5h11l3 3V19a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V6a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M8 11l2.2 2.2L16 7.8"/><path d="M8 16.5h6" opacity=".5"/>`),
    manager: S(`<circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6"/>`),

    /* ---- values ---- */
    handshake: S(`<path d="M3 8.5 7 6l4 2.2 4-2.2 4 2.5"/><path d="M11 8.2 8.3 11a1.5 1.5 0 0 0 2.1 2.1l1-1 .9.9a1.5 1.5 0 0 0 2.1-2.1"/><path d="M3 8.5v6l3 2M21 8.5v6l-3 2"/>`),
    growth: S(`<path d="M4 19h16"/><path d="M4 16l5-5 3.5 3.5L20 7"/><path d="M15.5 7H20v4.5"/>`),
    shield: S(`<path d="M12 3.5 4.5 6.5v5c0 4.2 3 7.4 7.5 9 4.5-1.6 7.5-4.8 7.5-9v-5z"/><circle cx="12" cy="10.5" r="2"/><path d="M8.5 16.2a3.8 3.8 0 0 1 7 0"/>`),
    globe: S(`<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"/><path d="M5.2 7.2c4 1.8 9.6 1.8 13.6 0M5.2 16.8c4-1.8 9.6-1.8 13.6 0" opacity=".5"/>`),
    eye: S(`<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>`),
    compass: S(`<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z" /><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>`),

    /* ---- tools ---- */
    journal: S(`<path d="M6 3.5h11A1.5 1.5 0 0 1 18.5 5v15L17 18.8 15.5 20 14 18.8 12.5 20 11 18.8 9.5 20 8 18.8 6.5 20H6A1.5 1.5 0 0 1 4.5 18.5V5A1.5 1.5 0 0 1 6 3.5z" transform="translate(1 0)"/><path d="M8.5 8h6M8.5 11.5h6M8.5 15h3.5"/>`),
    ai: S(`<rect x="5" y="7" width="14" height="11" rx="2.4"/><path d="M12 3.5V7M8.5 4.5 12 7l3.5-2.5"/><circle cx="9.3" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.7" cy="12" r="1.1" fill="currentColor" stroke="none"/><path d="M3 11v3M21 11v3M9.5 15.2h5"/>`),
    calculator: S(`<rect x="5" y="3.5" width="14" height="17" rx="2"/><rect x="8" y="6.5" width="8" height="3" rx="0.8"/><path d="M8.5 13h0M12 13h0M15.5 13h0M8.5 16.5h0M12 16.5h0M15.5 16.5h0" stroke-width="2.2"/>`),
    crm: S(`<circle cx="8" cy="8" r="2.6"/><path d="M3.5 18c0-2.7 2-4.2 4.5-4.2s4.5 1.5 4.5 4.2"/><circle cx="17" cy="7" r="2.2" opacity=".75"/><path d="M14.5 13.4c.8-.4 1.7-.6 2.5-.6 2.2 0 4 1.3 4 3.7" opacity=".75"/>`),
    chart: S(`<path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="M8 15l3.2-3.6 2.6 2.2L19 8"/><circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="8" r="1" fill="currentColor" stroke="none"/>`),
    gauge: S(`<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-4"/><circle cx="12" cy="16" r="1.4" fill="currentColor" stroke="none"/><path d="M4 16h1.5M18.5 16H20M12 8.5V7"/>`),

    /* ---- process / generic ---- */
    apply: S(`<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10A1.5 1.5 0 0 0 18.5 19V8z"/><path d="M14 3.5V8h4.5"/><path d="M8.5 12.5h7M8.5 15.5h5"/>`),
    match: S(`<circle cx="7.5" cy="12" r="3.5"/><circle cx="16.5" cy="12" r="3.5"/><path d="M11 12h2"/>`),
    rocket: S(`<path d="M12 3c3 1.5 5 4.5 5 8.5 0 2-1 4-2.5 5.5h-5C8 15.5 7 13.5 7 11.5 7 7.5 9 4.5 12 3z"/><circle cx="12" cy="10" r="1.8"/><path d="M9.5 17c-1.5.5-2.5 2-2.5 3.5 1.5 0 3-1 3.5-2.5M14.5 17c1.5.5 2.5 2 2.5 3.5-1.5 0-3-1-3.5-2.5"/>`),
    clock: S(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`),
    check: S(`<circle cx="12" cy="12" r="8.5" opacity=".35"/><path d="M8.2 12.2 11 15l5-6"/>`),
    spark: S(`<path d="M12 3v6M12 15v6M3 12h6M15 12h6" opacity=".4"/><path d="M12 8.5 13 11l2.5 1-2.5 1-1 2.5-1-2.5L8.5 12 11 11z" fill="currentColor" stroke="none"/>`),

    /* ---- arrows ---- */
    arrow: S(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
    arrowUpRight: S(`<path d="M7 17 17 7M9 7h8v8"/>`),
    plus: S(`<path d="M12 5v14M5 12h14"/>`),
    chevron: S(`<path d="M9 6l6 6-6 6"/>`),

    /* ---- contact / social ---- */
    pin: S(`<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>`),
    phone: S(`<path d="M5 4.5h3l1.5 4-2 1.3a11 11 0 0 0 4.7 4.7l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C9.6 19.6 4.4 14.4 3.5 6.1A1.5 1.5 0 0 1 5 4.5z"/>`),
    mail: S(`<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>`),
    whatsapp: S(`<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.7 0 1-.3 1.2-.8.2-.5-.8-1-1.3-1.2-.4-.2-.7 0-1 .3-.2.2-.4.2-.7 0a4.5 4.5 0 0 1-1.8-1.8c-.2-.3-.2-.5 0-.7.3-.3.5-.6.3-1-.2-.5-.7-1.5-1.2-1.3-.5.2-.8.5-.8 1.2z" fill="currentColor" stroke="none"/>`),
    instagram: S(`<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none"/>`),
    tiktok: S(`<path d="M14 4c.4 2.4 2 4 4.5 4.3v3c-1.7 0-3.2-.5-4.5-1.4v6.1A5.5 5.5 0 1 1 8.5 10.5v3a2.5 2.5 0 1 0 2.5 2.5V4z"/>`),
    linkedin: S(`<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V17M8 7.5v0" stroke-width="2.2"/><path d="M11.8 17v-3.6a2.1 2.1 0 0 1 4.2 0V17M11.8 10.5V17"/>`),

    /* ---- misc ---- */
    quote: S(`<path d="M9.5 6C6.5 7 5 9.5 5 13v5h5v-5H7.5c0-2 1-3.2 3-3.7zM19 6c-3 1-4.5 3.5-4.5 7v5h5v-5H17c0-2 1-3.2 3-3.7z" fill="currentColor" stroke="none"/>`),
    star: S(`<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.9l-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z"/>`),
    target: S(`<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8" opacity=".6"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>`),
    layers: S(`<path d="m12 3.5 8.5 4.5L12 12.5 3.5 8z"/><path d="m3.5 12 8.5 4.5L20.5 12M3.5 16l8.5 4.5L20.5 16" opacity=".55"/>`),
    network: S(`<circle cx="12" cy="5" r="2.3"/><circle cx="5" cy="18" r="2.3"/><circle cx="19" cy="18" r="2.3"/><path d="M10.4 6.7 6.6 16M13.6 6.7 17.4 16M7.3 18h9.4"/>`),

    /* ---- arrows & controls (from Content Library handoff) ---- */
    arrowLeft: S(`<path d="M19 12H5M11 6l-6 6 6 6"/>`),
    arrowUpRight: S(`<path d="M7 17 17 7M9 7h8v8"/>`),
    close: S(`<path d="M6 6l12 12M18 6 6 18"/>`),
    minus: S(`<path d="M5 12h14"/>`),
    external: S(`<path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M19 13v5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 18V6a1.5 1.5 0 0 1 1.5-1.5H11"/>`),

    /* ---- actions ---- */
    download: S(`<path d="M12 3v13M7 11l5 5 5-5"/><path d="M4.5 20.5h15"/>`),
    play: S(`<path d="M7 5v14l12-7z" fill="currentColor" stroke="none"/>`),
  };

  window.ICONS = I;
  window.icon = function (name, cls) {
    const svg = I[name] || I.spark;
    return cls ? svg.replace("<svg ", `<svg class="${cls}" `) : svg;
  };
})();
