/**
 * Panel de Seguridad y Emergencias - Policía de Tierra del Fuego
 * JS Interactivo (opcional para tracking de clicks, animaciones o comportamientos)
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Panel de Emergencias Policía TDF cargado correctamente.');

  // Ejemplo: Interceptación o log de eventos para analítica de botones de emergencia si se requiere
  const emergencyLinks = document.querySelectorAll('.pdtf-emergency, .pdtf-911');
  emergencyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetNumber = link.getAttribute('href');
      console.log(`Llamada directa iniciada hacia: ${targetNumber}`);
    });
  });

  // Dark Mode Toggle
  const THEME_KEY = 'pdtf-theme';
  const themeBtn = document.getElementById('pdtf-theme-toggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeBtn) {
      const icon = themeBtn.querySelector('.material-symbols-rounded');
      if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme || 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Cargar versión dinámica desde version.json
  const versionEl = document.getElementById('pdtf-app-version');
  if (versionEl) {
    fetch('version.json', { cache: 'no-cache' })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.version) {
          versionEl.textContent = `v${data.version}`;
        }
      })
      .catch(() => {});
  }
});
