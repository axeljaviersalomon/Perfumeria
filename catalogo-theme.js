/**
 * catalogo-theme.js
 * Interruptor de modo claro/oscuro. El tema en sí (qué valores toma cada
 * variable) vive en catalogo-style.css bajo :root[data-theme="light"];
 * este archivo solo decide CUÁL de los dos está activo y lo persiste.
 *
 * El tema guardado ya se aplica antes de esto, con un <script> inline en
 * el <head> de index.html (evita el parpadeo del oscuro por defecto en
 * cada carga para quien haya elegido claro). Acá solo se sincroniza el
 * botón con ese estado y se atiende el click para alternarlo.
 */

const THEME_STORAGE_KEY = 'perfumeria-theme';
const THEME_COLOR_DARK = '#14110D';
const THEME_COLOR_LIGHT = '#F6F0E3';

function applyTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  }

  // El color de la barra del navegador (Android/iOS) sigue al tema activo.
  const meta = document.getElementById('themeColorMeta');
  if (meta) meta.setAttribute('content', isLight ? THEME_COLOR_LIGHT : THEME_COLOR_DARK);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, isLight ? 'light' : 'dark');
  } catch (err) {
    // Sin persistencia disponible: el tema elegido dura la sesión actual.
  }
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // El <script> inline del <head> ya dejó data-theme="light" puesto si
  // correspondía; acá solo se refleja ese estado en el botón.
  applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });
}

initThemeToggle();
