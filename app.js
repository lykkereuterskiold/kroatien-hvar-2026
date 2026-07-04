/* ===========================================================
   Hvar 2026 — delade funktioner för alla sidor
   =========================================================== */

/* ---------- Toppmeny ---------- */
const SIDOR = [
  { fil: "index.html",     namn: "Hem" },
  { fil: "karta.html",     namn: "Karta" },
  { fil: "utflykter.html", namn: "Utflykter" },
  { fil: "uteliv.html",    namn: "Uteliv" },
  { fil: "hyra.html",      namn: "Hyra" },
  { fil: "mat.html",       namn: "Mat & handla" },
  { fil: "packlista.html", namn: "Packlista" },
];

function byggNav() {
  const nav = document.querySelector("nav.topp");
  if (!nav) return;
  const aktiv = nav.getAttribute("data-aktiv") || "";
  let html = '<a class="logo" href="index.html">HVAR 2026</a>';
  html += '<button class="meny-knapp" aria-label="Meny" aria-expanded="false"><span></span><span></span><span></span></button>';
  html += '<div class="lankar">';
  SIDOR.forEach(function (s) {
    html += '<a href="' + s.fil + '"' + (s.fil === aktiv ? ' class="aktiv"' : '') + '>' + s.namn + '</a>';
  });
  html += '</div>';
  nav.innerHTML = html;

  // Hamburgermeny på mobil: knappen fäller ut/ihop länkarna
  const knapp = nav.querySelector(".meny-knapp");
  knapp.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    knapp.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Live-nedräkning (dagar, timmar, minuter, sekunder) ---------- */
function nedrakning() {
  const el = document.getElementById("nedrakning");
  if (!el) return;
  const avresa = new Date("2026-07-21T00:00:00");
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  let timer;
  function tick() {
    let diff = avresa - new Date();
    if (diff <= 0) {
      el.textContent = "Nu är vi på Hvar!";
      if (timer) clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
    const m = Math.floor(diff / 60000);    diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    el.innerHTML =
      '<span class="antal">' + d + '</span> dagar ' +
      '<span class="antal">' + pad(h) + '</span> tim ' +
      '<span class="antal">' + pad(m) + '</span> min ' +
      '<span class="antal">' + pad(s) + '</span> sek';
  }
  tick();
  timer = setInterval(tick, 1000);
}

/* ---------- Rendera kort (klickbara kort länkar till kartan) ---------- */
function renderKort(items, boxSelector) {
  const box = document.querySelector(boxSelector);
  if (!box) return;
  items.forEach(function (p) {
    const klickbar = p.lat != null;
    const el = document.createElement(klickbar ? "a" : "div");
    el.className = "kort" + (klickbar ? "" : " info");
    if (klickbar) el.href = "karta.html#" + p.id;
    el.innerHTML =
      '<div class="inner">' +
      (p.typ ? '<div class="kort-typ">' + p.typ + '</div>' : '') +
      '<h3>' + p.namn + '</h3><p>' + p.text + '</p>' +
      '<div class="kort-lankar">' +
      (klickbar ? '<span class="lank">Visa på kartan</span>' : '') +
      (p.lank ? '<span class="boka" data-url="' + p.lank + '">Till sajten &rarr;</span>' : '') +
      (p.ta ? '<span class="boka" data-url="' + p.ta + '">TripAdvisor &rarr;</span>' : '') +
      '</div></div>';
    el.querySelectorAll(".boka").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        window.open(b.getAttribute("data-url"), "_blank", "noopener");
      });
    });
    box.appendChild(el);
  });
}

/* ---------- Kartsida ---------- */
function prickIkon(farg, storlek) {
  storlek = storlek || 18;
  return L.divIcon({
    className: "prick-ikon",
    html: '<span style="background:' + farg + '"></span>',
    iconSize: [storlek, storlek],
    iconAnchor: [storlek / 2, storlek / 2],
    popupAnchor: [0, -storlek / 2],
  });
}

function byggKartaSida() {
  const karta = L.map("karta").setView([43.17, 16.46], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(karta);

  const markorer = {};
  const alla = []; // { marker, farg, kat, bas } — för att kunna förstora per kategori
  function plotta(items, farg, kat, bas) {
    bas = bas || 18;
    items.forEach(function (p) {
      if (p.lat == null) return;
      const m = L.marker([p.lat, p.lng], { icon: prickIkon(farg, bas) }).addTo(karta);
      m.bindPopup(
        '<div class="popup-text"><b>' + p.namn + '</b><span>' + p.text + '</span>' +
        (p.lank ? '<a class="popup-lank" href="' + p.lank + '" target="_blank" rel="noopener">Till sajten &rarr;</a>' : '') +
        (p.ta ? '<a class="popup-lank" href="' + p.ta + '" target="_blank" rel="noopener">TripAdvisor &rarr;</a>' : '') +
        '</div>'
      );
      markorer[p.id] = m;
      alla.push({ marker: m, farg: farg, kat: kat, bas: bas });
    });
  }
  plotta(platser, "#2b8a8f", "utflykt");
  plotta(guldkorn, "#2b8a8f", "utflykt");
  plotta(hyra, "#2b8a8f", "utflykt");
  plotta(uteliv, "#dd8a5c", "uteliv");
  plotta(restauranger, "#a15c76", "mat");
  plotta(handla, "#7a9e5e", "handla");
  plotta([boende], "#0f4a4f", "boende", 24);

  // Klickbar teckenförklaring: förstora en kategori (klicka igen för att återgå)
  let aktivKat = null;
  function markera(kat) {
    aktivKat = (aktivKat === kat) ? null : kat;
    alla.forEach(function (o) {
      const stor = aktivKat && o.kat === aktivKat;
      o.marker.setIcon(prickIkon(o.farg, stor ? o.bas + 16 : o.bas));
      if (stor && o.marker.setZIndexOffset) o.marker.setZIndexOffset(1000);
      else if (o.marker.setZIndexOffset) o.marker.setZIndexOffset(0);
    });
    document.querySelectorAll(".kart-teckenforklaring span[data-kat]").forEach(function (s) {
      s.classList.toggle("aktiv", s.getAttribute("data-kat") === aktivKat);
    });
  }
  document.querySelectorAll(".kart-teckenforklaring span[data-kat]").forEach(function (s) {
    s.addEventListener("click", function () { markera(s.getAttribute("data-kat")); });
  });

  // Fokusera på en nål om sidan öppnats via t.ex. karta.html#pokonji-dol
  const id = location.hash.replace("#", "");
  if (id && markorer[id]) {
    setTimeout(function () {
      karta.flyTo(markorer[id].getLatLng(), 15, { duration: 1 });
      markorer[id].openPopup();
    }, 350);
  }
}

/* ---------- Matlag-hjul ---------- */
function matlagHjul() {
  const namnEl = document.getElementById("hjul-namn");
  const knapp = document.getElementById("hjul-knapp");
  if (!knapp) return;
  let snurrar = false;
  knapp.addEventListener("click", function () {
    if (snurrar) return;
    snurrar = true;
    knapp.disabled = true;
    let steg = 0;
    const total = 18 + Math.floor(Math.random() * paren.length);
    const timer = setInterval(function () {
      namnEl.textContent = paren[steg % paren.length];
      steg++;
      if (steg > total) {
        clearInterval(timer);
        namnEl.textContent = paren[(steg - 1) % paren.length] + " lagar mat!";
        snurrar = false;
        knapp.disabled = false;
      }
    }, 90);
  });
}

/* ---------- Redigerbar lista (inköpslista + packlista) ----------
   Sparas i webbläsaren. Om inget sparats än visas standardlistan. */
function redigerbarLista(prefix, nyckel, standard) {
  const form = document.getElementById(prefix + "-form");
  const input = document.getElementById(prefix + "-input");
  const lista = document.getElementById(prefix + "-lista");
  if (!form) return;

  function las() {
    const sparat = localStorage.getItem(nyckel);
    if (sparat === null) {
      return (standard || []).map(function (n) { return { namn: n, klar: false }; });
    }
    try { return JSON.parse(sparat) || []; }
    catch (e) { return []; }
  }
  function spara(varor) { localStorage.setItem(nyckel, JSON.stringify(varor)); }

  function rita() {
    const varor = las();
    lista.innerHTML = "";
    varor.forEach(function (v, i) {
      const li = document.createElement("li");

      const kryss = document.createElement("input");
      kryss.type = "checkbox";
      kryss.checked = v.klar;
      kryss.addEventListener("change", function () {
        const nu = las(); nu[i].klar = kryss.checked; spara(nu); rita();
      });

      const text = document.createElement("label");
      text.textContent = v.namn;
      if (v.klar) text.className = "klar";

      const bort = document.createElement("button");
      bort.type = "button";
      bort.className = "bort";
      bort.textContent = "×";
      bort.setAttribute("aria-label", "Ta bort");
      bort.addEventListener("click", function () {
        const nu = las(); nu.splice(i, 1); spara(nu); rita();
      });

      li.appendChild(kryss);
      li.appendChild(text);
      li.appendChild(bort);
      lista.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const namn = input.value.trim();
    if (!namn) return;
    const varor = las();
    varor.push({ namn: namn, klar: false });
    spara(varor);
    input.value = "";
    rita();
  });

  rita();
}

function inkopslista() {
  redigerbarLista("inkop", "hvar-inkopslista", []);
}

function packlista() {
  redigerbarLista("pack", "hvar-packlista", [
    "Pass / ID-kort",
    "Solkräm (hög faktor!)",
    "Baddräkt / badbyxor",
    "Solglasögon & keps",
    "Badskor (klippstränder!)",
    "Laddare & powerbank",
    "Bekväma promenadskor",
    "Snygg outfit för klubben",
    "Lätt jacka för kvällen",
    "Myggmedel",
    "Reseadapter",
    "Vattenflaska",
    "Kontanter (euro)",
  ]);
}

/* ---------- Tillbaka-knapp (på alla undersidor) ---------- */
function byggTillbaka() {
  if (!document.querySelector(".sidhuvud")) return; // inte på startsidan
  const main = document.querySelector("main");
  if (!main) return;
  const knapp = document.createElement("button");
  knapp.className = "tillbaka";
  knapp.type = "button";
  knapp.innerHTML = '<span class="pil"></span> Tillbaka';
  knapp.addEventListener("click", function () {
    if (history.length > 1) history.back();
    else location.href = "index.html";
  });
  main.insertBefore(knapp, main.firstChild);
}

/* ---------- Kör igång det som finns på varje sida ---------- */
document.addEventListener("DOMContentLoaded", function () {
  byggNav();
  byggTillbaka();
  nedrakning();
});
