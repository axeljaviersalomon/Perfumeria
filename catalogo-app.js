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
  brand: 'todas'
};

let placeholderCounter = 0;

function nextPlaceholderImage() {
  const src = placeholderBottles[placeholderCounter % placeholderBottles.length];
  placeholderCounter++;
  return src;
}

// Los data-item-* quedan en el propio .item para que catalogo-cart.js
// pueda leerlos por delegación de eventos, sin acoplarse a estos datos
// ni a las estructuras de femenino/masculino/unisex.
function renderItem(name, inspired, image, brand) {
  const isPlaceholder = !image;
  const src = image || nextPlaceholderImage();
  const imgClass = isPlaceholder ? 'is-placeholder' : '';
  const itemId = `${brand}::${name}`;
  return `
    <div class="item" data-item-id="${itemId}" data-item-name="${name}" data-item-brand="${brand}" data-item-inspired="${inspired}">
      <div class="thumb-wrap"><img class="${imgClass}" src="${src}" alt="${inspired}"></div>
      <div class="text">
        <div class="name">${name}</div>
        <div class="inspired">Inspirado en <span class="brand-name">${inspired}</span></div>
      </div>
      <button type="button" class="cart-add-btn" aria-label="Agregar ${name} al carrito">
        <span class="cart-add-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.6H8.4a2 2 0 0 1-2-1.7L4 3H1.5"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
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

// Aplica el filtro actual mostrando/ocultando secciones, grupos e items
function applyFilters() {
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
      groupEl.classList.toggle('is-hidden', !brandMatches);
      if (brandMatches) visibleInSection++;
    });

    // Si ninguna marca coincide dentro de esta sección, ocultamos la sección entera
    sectionEl.classList.toggle('is-hidden', visibleInSection === 0);
    visibleGroupsTotal += visibleInSection;
  });

  const note = document.getElementById('results-note');
  if (state.brand !== 'todas' && visibleGroupsTotal === 0) {
    note.textContent = `No hay fragancias de "${state.brand}" en esta categoría.`;
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
