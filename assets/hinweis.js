// Hinweis aus der inShot-Verwaltung (verwaltung.inshot.at/faku) – Daten in /inhalt.json
(function () {
  var bar = document.getElementById('hinweis'); if (!bar || !window.fetch) return;
  fetch('/inhalt.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
    var h = d && d.hinweis; if (!h || !h.text) return;
    var heute = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Vienna' }).format(new Date());
    if (h.bis && h.bis < heute) return;
    document.getElementById('hinweis-text').textContent = h.text;
    bar.hidden = false;
  }).catch(function () {});
})();
