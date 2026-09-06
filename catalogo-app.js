/**
 * catalogo-app.js
 * Arma el catálogo a partir de catalogo-data.js, y maneja los filtros
 * de categoría (Mujer / Hombre / Unisex) y de marca.
 *
 * Depende de que ya estén cargados en el documento:
 *   - catalogo-data.js         -> femenino, masculino, unisex
 *   - catalogo-placeholders.js -> placeholderBottles
 */

// ---- Config de las 3 secciones de categoría ----
const CATEGORY_SECTIONS = [
  { key: 'mujer',   data: femenino,   listId: 'fem-list',  sectionId: 'section-fem'  },
  { key: 'hombre',  data: masculino,  listId: 'masc-list', sectionId: 'section-masc' },
  { key: 'unisex',  data: unisex,     listId: 'uni-list',  sectionId: 'section-uni'  }
];

// Estado activo de los filtros
const state = {
  category: 'todas',
  brand: 'todas',
  search: ''
};

// Sin tildes ni mayúsculas: así "Aneane" encuentra "AneAne" y "cacharel"
// encuentra "Cacharel" sin que la persona tenga que escribir el acento
// exacto de "Bergamota" o similar.
function normalizeSearch(str) {
  return (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function itemMatchesSearch(itemEl, term) {
  if (!term) return true;
  return normalizeSearch(itemEl.dataset.itemName).includes(term)
    || normalizeSearch(itemEl.dataset.itemBrand).includes(term)
    || normalizeSearch(itemEl.dataset.itemInspired).includes(term);
}

let placeholderCounter = 0;

function nextPlaceholderImage() {
  const src = placeholderBottles[placeholderCounter % placeholderBottles.length];
  placeholderCounter++;
  return src;
}

// Los data-item-* quedan en el propio .item para que catalogo-cart.js
// y catalogo-preview.js puedan leerlos por delegación de eventos, sin
// acoplarse a estos datos ni a las estructuras de femenino/masculino/
// unisex. El .item es clickeable (abre la previsualización) y también
// navegable por teclado; el botón "+" de adentro sigue siendo su propio
// control independiente (catalogo-preview.js ignora los clicks que le
// lleguen desde ahí).
function renderItem(name, inspired, image, brand) {
  const isPlaceholder = !image;
  const src = image || nextPlaceholderImage();
  const imgClass = isPlaceholder ? 'is-placeholder' : '';
  const itemId = `${brand}::${name}`;
  return `
    <div class="item" data-item-id="${itemId}" data-item-name="${name}" data-item-brand="${brand}" data-item-inspired="${inspired}" role="button" tabindex="0" aria-haspopup="dialog">
      <div class="thumb-wrap"><img class="${imgClass}" src="${src}" alt="${inspired}" width="58" height="72" loading="lazy" decoding="async"></div>
      <div class="text">
        <div class="name">${name}</div>
        <div class="inspired">Inspirado en <span class="brand-name">${inspired}</span></div>
      </div>
      <button type="button" class="cart-add-btn" aria-label="Agregar ${name} al carrito">
        <span class="cart-add-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </span>
        <span class="cart-add-qty" aria-hidden="true"></span>
      </button>
    </div>
  `;
}

function renderBrandGroup(group) {
  const items = group.items
    .map(([name, inspired, image]) => renderItem(name, inspired, image, group.brand))
    .join('');
  return `
    <div class="brand-group reveal" data-brand="${group.brand}">
      <div class="brand-label">${group.brand}</div>
      ${items}
    </div>
  `;
}

function renderSection({ data, listId }) {
  const el = document.getElementById(listId);
  el.innerHTML = data.map(renderBrandGroup).join('');
}

// Pinta las 3 listas completas (se llama una sola vez al cargar)
function renderAllSections() {
  placeholderCounter = 0;
  CATEGORY_SECTIONS.forEach(renderSection);
}

// ---- Filtros ----

function collectAllBrands() {
  const brands = new Set();
  CATEGORY_SECTIONS.forEach(section => {
    section.data.forEach(group => brands.add(group.brand));
  });
  return Array.from(brands).sort((a, b) => a.localeCompare(b, 'es'));
}

function populateBrandSelect() {
  const select = document.getElementById('brand-filter');
  const brands = collectAllBrands();
  const options = ['<option value="todas">Todas las marcas</option>']
    .concat(brands.map(b => `<option value="${b}">${b}</option>`));
  select.innerHTML = options.join('');
}

// Aplica el filtro actual mostrando/ocultando secciones, grupos e items.
// Categoría y marca ocultan el grupo entero; la búsqueda por texto va un
// nivel más profundo, ocultando fragancias individuales dentro de un
// grupo que sigue visible (así "Cacharel" con la búsqueda "aneane" sigue
// mostrando el rótulo de la marca, solo con esa fragancia adentro).
function applyFilters() {
  const term = normalizeSearch(state.search);
  let visibleGroupsTotal = 0;

  CATEGORY_SECTIONS.forEach(({ key, sectionId, listId }) => {
    const sectionEl = document.getElementById(sectionId);
    const categoryMatches = state.category === 'todas' || state.category === key;

    if (!categoryMatches) {
      sectionEl.classList.add('is-hidden');
      return;
    }
    sectionEl.classList.remove('is-hidden');

    const listEl = document.getElementById(listId);
    const groups = listEl.querySelectorAll('.brand-group');
    let visibleInSection = 0;

    groups.forEach(groupEl => {
      const brandMatches = state.brand === 'todas' || groupEl.dataset.brand === state.brand;

      let visibleItemsInGroup = 0;
      groupEl.querySelectorAll('.item').forEach(itemEl => {
        const searchMatches = itemMatchesSearch(itemEl, term);
        itemEl.classList.toggle('is-hidden', !searchMatches);
        if (searchMatches) visibleItemsInGroup++;
      });

      const groupVisible = brandMatches && visibleItemsInGroup > 0;
      groupEl.classList.toggle('is-hidden', !groupVisible);
      if (groupVisible) visibleInSection++;
    });

    // Si ninguna marca coincide dentro de esta sección, ocultamos la sección entera
    sectionEl.classList.toggle('is-hidden', visibleInSection === 0);
    visibleGroupsTotal += visibleInSection;
  });

  const note = document.getElementById('results-note');
  if (visibleGroupsTotal === 0 && (state.brand !== 'todas' || term)) {
    note.textContent = term
      ? `No encontramos fragancias para "${state.search.trim()}".`
      : `No hay fragancias de "${state.brand}" en esta categoría.`;
    note.style.display = 'block';
  } else {
    note.style.display = 'none';
  }
}

function setActiveCategoryButton(category) {
  document.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

function initFilters() {
  populateBrandSelect();

  document.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      setActiveCategoryButton(state.category);
      applyFilters();
    });
  });

  document.getElementById('brand-filter').addEventListener('change', (e) => {
    state.brand = e.target.value;
    applyFilters();
  });

  document.getElementById('search-filter').addEventListener('input', (e) => {
    state.search = e.target.value;
    applyFilters();
  });

  initSearchToggle();
}

// El buscador arranca como un simple círculo con la lupa (sobrio, sin
// invitar a escribir con un placeholder siempre visible); tocarlo revela
// el campo de texto y esconde el círculo, nunca los dos a la vez.
function initSearchToggle() {
  const wrap = document.getElementById('searchWrap');
  const toggle = document.getElementById('searchToggle');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('search-filter');
  if (!wrap || !toggle || !closeBtn || !input) return;

  const controls = wrap.closest('.filter-controls');

  function openSearch() {
    wrap.classList.add('is-open');
    controls?.classList.add('search-active');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  // Cerrar también limpia lo escrito: si no, reabrir el círculo con una
  // búsqueda vieja todavía activa (pero invisible) dejaría el catálogo
  // filtrado sin ninguna pista visible de por qué.
  function closeSearch() {
    wrap.classList.remove('is-open');
    controls?.classList.remove('search-active');
    toggle.setAttribute('aria-expanded', 'false');
    if (input.value) {
      input.value = '';
      state.search = '';
      applyFilters();
    }
  }

  toggle.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
}

// ---- Arranque ----
renderAllSections();
initFilters();
applyFilters();

// ---- Botón "Ver fragancias" (mobile) ----
// Al tocarlo, hace scroll hasta que la barra de filtros quede pegada
// arriba y, justo debajo, se vea el título de la colección visible
// (según el filtro activo) seguido de las primeras fragancias.
function scrollToFragrances() {
  const sectionIds = ['section-fem', 'section-masc', 'section-uni'];
  let target = null;

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el && !el.classList.contains('is-hidden')) {
      target = el;
      break;
    }
  }
  if (!target) target = document.getElementById('section-fem');
  if (!target) return;

  const head = target.querySelector('.section-head') || target;
  const filterBar = document.querySelector('.filter-bar');
  const filterBarHeight = filterBar ? filterBar.getBoundingClientRect().height : 0;
  const top = head.getBoundingClientRect().top + window.scrollY - filterBarHeight - 14;

  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

document.getElementById('ctaJump')?.addEventListener('click', scrollToFragrances);

// ---- Volver arriba ----
// Aparece recién después de scrollear un poco (si estuviera siempre
// visible arriba de la página no serviría de nada) y desaparece de
// nuevo cerca del comienzo.
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const SHOW_AFTER_PX = 480;
  let ticking = false;

  function update() {
    btn.classList.toggle('is-visible', window.scrollY > SHOW_AFTER_PX);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ---- Altura real de la barra de filtros ----
// En mobile, el círculo del carrito se ubica pegado al borde inferior
// de esta barra (ver ".cart-float" en catalogo-style.css) en vez de
// compartir su fila: alinear "a ojo" con un número fijo se rompe apenas
// el contenido cambia de alto (una marca con nombre largo envolviendo
// el <select>, una fuente que tarda en cargar, cambiar el tamaño de la
// ventana). ResizeObserver mantiene la variable exacta todo el tiempo,
// así que el carrito nunca puede terminar superpuesto a los filtros.
(function syncFilterBarHeight() {
  const bar = document.querySelector('.filter-bar');
  if (!bar || !('ResizeObserver' in window)) return;

  const ro = new ResizeObserver(() => {
    document.documentElement.style.setProperty('--filter-bar-h', `${bar.offsetHeight}px`);
  });
  ro.observe(bar);
})();

// ---- Luz de cursor ----
// Sigue el mouse con un leve retraso (lerp) para un brillo cálido y suave.
// Se desactiva en touch y con prefers-reduced-motion.
(function cursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !fine) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;
  let active = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!active) {
      active = true;
      glow.classList.add('is-active');
    }
  });

  document.addEventListener('mouseleave', () => {
    active = false;
    glow.classList.remove('is-active');
  });

  function tick() {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// ---- Revelado al hacer scroll ----
// Agrega .show a los .reveal (encabezados de sección y grupos de marca)
// cuando entran en viewport, para una entrada progresiva y elegante.
(function revealOnScroll() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('show'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));
})();
