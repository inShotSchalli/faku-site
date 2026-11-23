/* FakU. Ticketshop-Einbindung (pretix)
   Jeder Shop ist ein <div class="shop-embed" data-event="https://pretix.eu/faku/<event>/" data-live="false">.
   data-live="false"  -> Hinweis "Vorverkauf startet bald"
   data-live="true"   -> Button "Tickets kaufen"; erst nach Klick wird das pretix-Widget geladen
   (so gehen vor dem Klick keine Daten an pretix.eu). */
(function () {
  var loaded = false;
  function loadPretix(eventUrl, done) {
    if (loaded) { if (window.PretixWidget && window.PretixWidget.buildWidgets) window.PretixWidget.buildWidgets(); return; }
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = eventUrl + 'widget/v1.css';
    document.head.appendChild(css);
    var s = document.createElement('script');
    s.src = 'https://pretix.eu/widget/v1.de.js';
    s.async = true;
    s.onload = function () { loaded = true; if (done) done(); };
    document.head.appendChild(s);
  }
  document.querySelectorAll('.shop-embed').forEach(function (box) {
    var url = box.getAttribute('data-event');
    var live = box.getAttribute('data-live') === 'true';
    var soon = box.querySelector('.shop-soon');
    var go = box.querySelector('.shop-go');
    if (!live) { if (soon) soon.hidden = false; return; }
    if (go) {
      go.hidden = false;
      go.querySelector('button').addEventListener('click', function () {
        var w = document.createElement('pretix-widget');
        w.setAttribute('event', url);
        w.setAttribute('disable-vouchers', '');
        go.hidden = true;
        box.appendChild(w);
        loadPretix(url, null);
      });
    }
  });
})();
