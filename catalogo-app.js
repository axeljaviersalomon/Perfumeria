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

function renderItem(name, inspired, image) {
  const isPlaceholder = !image;
  const src = image || nextPlaceholderImage();
  const imgClass = isPlaceholder ? 'is-placeholder' : '';
  return `
    <div class="item">
      <div class="thumb-wrap"><img class="${imgClass}" src="${src}" alt="${inspired}"></div>
      <div class="text">
        <div class="name">${name}</div>
        <div class="inspired">Inspirado en <span class="brand-name">${inspired}</span></div>
      </div>
    </div>
  `;
}

function renderBrandGroup(group) {
  const items = group.items.map(([name, inspired, image]) => renderItem(name, inspired, image)).join('');
  return `
    <div class="brand-group" data-brand="${group.brand}">
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
