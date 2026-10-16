/**
 * PWA: manifest, service worker y banner flotante de instalación (cerrable).
 */
(function () {
  var script = document.currentScript;
  var base = script ? new URL('../', script.src).href : new URL('./', location.href).href;

  // Manifest y theme-color
  if (!document.querySelector('link[rel="manifest"]')) {
    var l = document.createElement('link');
    l.rel = 'manifest';
    l.href = base + 'manifest.webmanifest';
    document.head.appendChild(l);
  }
  if (!document.querySelector('meta[name="theme-color"]')) {
    var m = document.createElement('meta');
    m.name = 'theme-color';
    m.content = '#17394b';
    document.head.appendChild(m);
  }
  var ai = document.createElement('link');
  ai.rel = 'apple-touch-icon';
  ai.href = base + 'images/icon-192.png';
  document.head.appendChild(ai);

  // Service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(base + 'sw.js', { scope: base }).catch(function () {});
    });
  }

  // Banner de instalación
  var KEY = 'pdtf-install-dismissed';
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900);
  var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  var dismissedAt = parseInt(localStorage.getItem(KEY) || '0', 10);
  var recentlyDismissed = Date.now() - dismissedAt < 3 * 24 * 3600 * 1000; // 3 días
  if (isStandalone || !isMobile || recentlyDismissed) return;

  var deferred = null;
  var banner = null;

  var css = document.createElement('style');
  css.textContent =
    '.pdtf-install{position:fixed;left:12px;right:12px;bottom:16px;z-index:9999;max-width:460px;margin:0 auto;' +
    'display:flex;align-items:center;gap:12px;padding:12px 40px 12px 12px;background:#17394b;color:#fff;' +
    'border-radius:16px;box-shadow:0 12px 34px rgba(0,0,0,.35);font-family:inherit;' +
    'transform:translateY(140%);transition:transform .35s cubic-bezier(.4,0,.2,1)}' +
    '.pdtf-install.is-visible{transform:translateY(0)}' +
    '.pdtf-install img{width:44px;height:44px;border-radius:10px;flex:none}' +
    '.pdtf-install__text{flex:1;font-size:.88rem;line-height:1.25}' +
    '.pdtf-install__text strong{display:block;font-size:.95rem}' +
    '.pdtf-install__btn{flex:none;border:0;border-radius:10px;padding:10px 14px;background:#f2c90d;color:#0f2734;' +
    'font-weight:700;font-size:.85rem;cursor:pointer}' +
    '.pdtf-install__close{position:absolute;top:4px;right:6px;width:32px;height:32px;border:0;background:transparent;' +
    'color:#fff;font-size:1.4rem;line-height:1;cursor:pointer;opacity:.8}';
  document.head.appendChild(css);

  function hide(remember) {
    if (remember) localStorage.setItem(KEY, String(Date.now()));
    if (!banner) return;
    banner.classList.remove('is-visible');
    var b = banner;
    banner = null;
    setTimeout(function () { b.remove(); }, 400);
  }

  function show() {
    if (banner || (!deferred && !isIOS)) return;
    banner = document.createElement('div');
    banner.className = 'pdtf-install';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Instalar aplicación');
    banner.innerHTML =
      '<img src="' + base + 'images/icon-192.png" alt="">' +
      '<div class="pdtf-install__text"><strong>Instalá la app</strong>' +
      (isIOS && !deferred
        ? 'Tocá <b>Compartir</b> y luego <b>Agregar a pantalla de inicio</b>.'
        : 'Accedé más rápido a emergencias desde tu móvil.') + '</div>' +
      (deferred ? '<button type="button" class="pdtf-install__btn">Instalar</button>' : '') +
      '<button type="button" class="pdtf-install__close" aria-label="Cerrar">&times;</button>';
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('is-visible'); });

    banner.querySelector('.pdtf-install__close').addEventListener('click', function () { hide(true); });
    var btn = banner.querySelector('.pdtf-install__btn');
    if (btn) {
      btn.addEventListener('click', function () {
        if (!deferred) return;
        deferred.prompt();
        deferred.userChoice.then(function () { deferred = null; hide(false); });
      });
    }
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    show();
  });
  window.addEventListener('appinstalled', function () { hide(false); });

  if (isIOS) {
    window.addEventListener('load', function () { setTimeout(show, 1500); });
  }
})();
