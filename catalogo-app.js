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
//
// `animate`: true cuando el cambio lo disparó un chip de categoría o el
// select de marca. En ese caso los encabezados y grupos que quedan a la
// vista vuelven a entrar con una cascada corta (.is-refresh en el CSS),
// para que el cambio de vista se sienta como una respuesta y no como un
// corte de un listado a otro. Al tipear en el buscador no se anima: el
// listado cambia con cada tecla y animarlo cada vez sería un temblor.
function applyFilters(animate) {
  const term = normalizeSearch(state.search);
  // Buscando por nombre/marca: se esconden los títulos grandes de
  // "Femenino/Masculino/Unisex" (ver .hide-section-title en el CSS) y
  // solo quedan las fragancias que matchean, sin la división editorial
  // que solo aporta algo en la vista general o filtrando por categoría.
  const isSearching = term.length > 0;
  let visibleGroupsTotal = 0;

  CATEGORY_SECTIONS.forEach(({ key, sectionId, listId }) => {
    const sectionEl = document.getElementById(sectionId);
    const categoryMatches = state.category === 'todas' || state.category === key;

    if (!categoryMatches) {
      sectionEl.classList.add('is-hidden');
      return;
    }
    sectionEl.classList.remove('is-hidden');
    sectionEl.classList.toggle('hide-section-title', isSearching);

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

  if (animate) refreshVisibleGroups();
}

// Cascada de re-entrada tras un cambio de categoría/marca: solo sobre lo
// que ya estaba revelado (.show) y queda dentro (o apenas debajo) del
// viewport. Lo que está más abajo lo sigue manejando el reveal por
// scroll, y lo que todavía no se reveló nunca no tiene por qué animarse
// dos veces.
function refreshVisibleGroups() {
  const limit = window.innerHeight * 1.3;
  let i = 0;
  document.querySelectorAll('.section-head.reveal.show, .brand-group.reveal.show').forEach((el) => {
    if (el.closest('.is-hidden')) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > limit) return;
    el.classList.remove('is-refresh');
    void el.offsetWidth; // reinicia la animación si todavía estaba corriendo
    el.style.setProperty('--i', String(Math.min(i, 10)));
    el.classList.add('is-refresh');
    el.addEventListener('animationend', () => el.classList.remove('is-refresh'), { once: true });
    i++;
  });
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
      if (state.category === btn.dataset.category) return;
      state.category = btn.dataset.category;
      setActiveCategoryButton(state.category);
      applyFilters(true);
    });
  });

  document.getElementById('brand-filter').addEventListener('change', (e) => {
    state.brand = e.target.value;
    applyFilters(true);
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
    // El campo pasa de visibility:hidden a visible con la clase de
    // arriba; se enfoca al frame siguiente para que el navegador ya lo
    // considere enfocable (y para que el cursor aparezca cuando el
    // círculo ya empezó a ensancharse, no antes).
    requestAnimationFrame(() => input.focus({ preventScroll: true }));
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

// ---- Cortina de apertura ----
// A diferencia de un scroll-jacking tradicional (que intercepta TODO el
// scroll del sitio), esto solo controla el único límite entre la cortina
// y el catálogo: un solo gesto de scroll/swipe hacia abajo con la cortina
// abierta la levanta del todo (transición CSS, no un scroll gradual), y
// un solo gesto hacia arriba estando ya en el tope del catálogo la trae
// de vuelta. En cualquier otro momento (scrolleando DENTRO del catálogo)
// el scroll es 100% nativo, sin interceptar nada.
(function initHeroCurtain() {
  const curtain = document.getElementById('curtainStage');
  if (!curtain) return;

  // Duración real de la transición CSS del plano .curtain-stage (ver
  // catalogo-style.css): se usa para no aceptar un segundo gesto hasta
  // que la animación en curso termine (si no, un scroll/swipe rápido
  // dispara varias veces seguidas y la cortina "tartamudea").
  const TRANSITION_MS = 1000;
  const WHEEL_THRESHOLD = 4;
  const TOUCH_THRESHOLD = 24;

  // Misma curva que la transición del plano en el CSS (--ease-in-out).
  // Se usa para calcular, para cada pieza del catálogo, en qué instante
  // el borde inferior de la cortina pasa por su altura.
  const CURTAIN_EASE = [0.65, 0, 0.2, 1];
  // Cuánto antes de ser destapada empieza a entrar cada pieza: así ya
  // está a mitad de su fundido cuando el borde la descubre, en vez de
  // aparecer en blanco y recién entonces empezar.
  const ARRIVAL_LEAD_S = 0.25;

  const root = document.documentElement;
  const spacer = document.querySelector('.curtain-spacer');
  let curtainOpen = true;
  let locked = false;
  let touchStartY = null;
  let arrivingTimer = null;

  function lock() {
    locked = true;
    window.setTimeout(() => { locked = false; }, TRANSITION_MS + 80);
  }

  // html{scroll-behavior:smooth} convertiría el scrollTo en un scroll
  // animado: el catálogo se deslizaría detrás de la cortina mientras la
  // cortina sube, dos movimientos superpuestos. Acá el salto tiene que
  // ser seco (invisible: el spacer tiene el mismo fondo que la cortina).
  function jumpTo(y) {
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    root.style.scrollBehavior = prev;
  }

  // Tiempo (0..1) en que una curva cubic-bezier alcanza cierto avance
  // (0..1): muestrea la paramétrica y busca el primer punto que llega.
  const easeSamples = (() => {
    const [x1, y1, x2, y2] = CURTAIN_EASE;
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const s = i / 100;
      const a = 3 * (1 - s) * (1 - s) * s;
      const b = 3 * (1 - s) * s * s;
      const c = s * s * s;
      pts.push({ x: a * x1 + b * x2 + c, y: a * y1 + b * y2 + c });
    }
    return pts;
  })();
  function timeForProgress(progress) {
    for (let i = 0; i < easeSamples.length; i++) {
      if (easeSamples[i].y >= progress) return easeSamples[i].x;
    }
    return 1;
  }

  // Da a cada pieza visible del catálogo (barra de filtros, encabezados
  // y grupos con .reveal) su propio --reveal-delay: el instante en que
  // el borde de la cortina —que sube, así que destapa primero lo de
  // abajo— pasa por su altura, menos un pequeño adelanto. Lo que queda
  // fuera del viewport no participa (lo revela el scroll, sin retardo).
  function scheduleArrival() {
    const H = window.innerHeight;
    const secs = TRANSITION_MS / 1000;
    const pieces = [document.querySelector('.filter-bar'), ...document.querySelectorAll('.reveal')];
    pieces.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= H) { el.style.removeProperty('--reveal-delay'); return; }
      const progress = 1 - Math.max(0, rect.top) / H;
      const t = timeForProgress(progress) * secs - ARRIVAL_LEAD_S;
      el.style.setProperty('--reveal-delay', `${Math.max(0, t).toFixed(3)}s`);
    });
  }
  function clearArrival() {
    document.querySelectorAll('.filter-bar, .reveal').forEach((el) => el.style.removeProperty('--reveal-delay'));
  }

  // El salto de scroll (a la altura exacta de un viewport, donde termina
  // .curtain-spacer y arranca la barra de filtros) se hace SIN animación
  // nativa y antes de que la cortina empiece a moverse: como el fondo
  // del spacer es el mismo --bg que el de la cortina, ese salto es
  // invisible, y lo único que el visitante ve moverse es la cortina
  // yéndose/viniendo — una sola animación, no dos superpuestas.
  //
  // La clase curtain-open en <html> coordina lo que hay DEBAJO de la
  // cortina (la barra de filtros espera escondida y vuelve a esconderse
  // cuando la cortina baja); scheduleArrival reparte los retardos para
  // que cada pieza entre justo cuando el borde de la cortina la destapa.
  // El orden importa: primero el salto de scroll (para poder medir
  // dónde queda cada pieza en el viewport), después los retardos, y
  // recién entonces se dispara el movimiento.
  function closeCurtain() {
    if (!curtainOpen || locked) return;
    lock();
    curtainOpen = false;
    curtain.classList.remove('curtain-returning');
    jumpTo(catalogTop());
    scheduleArrival();
    clearTimeout(arrivingTimer);
    arrivingTimer = window.setTimeout(clearArrival, TRANSITION_MS + 1600);
    root.classList.remove('curtain-open');
    curtain.classList.add('curtain-hidden');
  }

  // Al volver, el contenido del hero re-entra escalonado pero recién
  // cuando el plano ya casi se asentó (.curtain-returning retrasa esa
  // entrada; ver CSS). A diferencia del cierre, acá el salto de scroll
  // NO puede ir primero: el catálogo está a la vista, y saltar a 0
  // antes de que la cortina baje lo reemplaza de golpe por el spacer
  // vacío, con la cortina cayendo sobre nada. Así que la cortina baja
  // sobre el catálogo tal cual está y el salto (invisible, ya tapado)
  // se hace al final, junto con el aviso al reveal por scroll para que
  // lo que quedó revelado debajo se vuelva a armar: así la próxima
  // bajada al catálogo también tiene su llegada.
  function openCurtain() {
    if (curtainOpen || locked) return;
    lock();
    curtainOpen = true;
    clearTimeout(arrivingTimer);
    clearArrival();
    curtain.classList.add('curtain-returning');
    curtain.scrollTop = 0;
    root.classList.add('curtain-open');
    curtain.classList.remove('curtain-hidden');
    window.setTimeout(() => {
      if (!curtainOpen) return;
      jumpTo(0);
      document.dispatchEvent(new CustomEvent('curtain:covered'));
    }, TRANSITION_MS);
  }

  // Con la cortina abierta puede haber contenido que no entra en pantallas
  // bajas (ver el bloque `max-height` en el CSS) y que scrollea adentro
  // de la propia cortina (.curtain-stage tiene overflow-y:auto). Antes de
  // levantarla del todo hay que dejar que ese scroll interno llegue a su
  // fin; si no, alguien con una pantalla baja nunca vería el pie del
  // trust-bar.
  function curtainInternalScrollExhausted(deltaY) {
    if (curtain.scrollHeight <= curtain.clientHeight + 1) return true;
    if (deltaY > 0) return curtain.scrollTop + curtain.clientHeight >= curtain.scrollHeight - 1;
    return curtain.scrollTop <= 0;
  }

  // Con la cortina cerrada, closeCurtain() deja al documento scrolleado
  // exactamente a un viewport de alto (donde termina .curtain-spacer):
  // ese es el "tope" del catálogo, no 0. Comparar contra 0 acá haría que
  // el primer scroll hacia arriba, en vez de reabrir la cortina, se
  // colara como scroll nativo hasta meterse en el propio spacer (vacío,
  // del mismo --bg que la cortina, así que invisible, pero rompe la
  // regla de "un solo gesto" que pidió el usuario).
  function catalogTop() {
    return spacer ? spacer.offsetTop + spacer.offsetHeight : window.innerHeight;
  }
  function atCatalogTop() {
    return window.scrollY <= catalogTop() + 2;
  }

  // Con la cortina levantada, el documento nunca debe quedar por encima
  // del tope del catálogo: ahí solo está .curtain-spacer (vacío). Podía
  // pasar cuando, estando apenas por debajo del tope, se scrolleaba hacia
  // arriba: el gesto no se interceptaba (todavía no era "el tope") y el
  // scroll nativo —un tick de rueda son ~100px, y en touch la inercia
  // sigue sola después de soltar— se metía en el spacer, dejando una
  // pantalla en blanco sin cortina. Cualquier scroll que cruce ese
  // límite se corta seco en el tope; desde ahí, el siguiente gesto
  // hacia arriba es el que baja la cortina.
  function clampToCatalogTop() {
    if (curtainOpen || locked) return;
    const top = catalogTop();
    if (window.scrollY < top - 1) jumpTo(top);
  }

  // Un gesto hacia arriba que no llega a reabrir la cortina (no estamos
  // en el tope) pero que con scroll nativo se pasaría del tope: se frena
  // justo ahí. Devuelve true si se hizo cargo del gesto.
  function snapUpToCatalogTop(deltaUp) {
    const dist = window.scrollY - catalogTop();
    if (dist <= 2 || dist > Math.max(deltaUp * 3, 160)) return false;
    jumpTo(catalogTop());
    return true;
  }

  function onWheel(e) {
    if (locked) { e.preventDefault(); return; }

    if (curtainOpen) {
      if (e.deltaY > WHEEL_THRESHOLD) {
        if (!curtainInternalScrollExhausted(1)) return; // deja que scrollee su propio contenido
        e.preventDefault();
        closeCurtain();
      } else if (e.deltaY < -WHEEL_THRESHOLD) {
        if (!curtainInternalScrollExhausted(-1)) return;
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      return;
    }

    if (e.deltaY < -WHEEL_THRESHOLD) {
      if (atCatalogTop()) {
        e.preventDefault();
        openCurtain();
      } else if (snapUpToCatalogTop(-e.deltaY)) {
        e.preventDefault();
      }
    }
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    if (touchStartY === null) return;
    const deltaY = touchStartY - e.touches[0].clientY; // positivo = dedo sube = gesto de scroll hacia abajo

    if (locked) { e.preventDefault(); return; }

    if (curtainOpen) {
      if (deltaY > TOUCH_THRESHOLD) {
        if (!curtainInternalScrollExhausted(1)) return;
        e.preventDefault();
        closeCurtain();
      } else if (deltaY < -TOUCH_THRESHOLD) {
        if (!curtainInternalScrollExhausted(-1)) return;
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      return;
    }

    if (atCatalogTop() && deltaY < -TOUCH_THRESHOLD) {
      e.preventDefault();
      openCurtain();
    }
  }

  function onTouchEnd() {
    touchStartY = null;
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  window.addEventListener('scroll', clampToCatalogTop, { passive: true });

  document.getElementById('ctaJump')?.addEventListener('click', closeCurtain);
  document.getElementById('ctaJumpDesktop')?.addEventListener('click', closeCurtain);
  document.getElementById('curtainScrollCue')?.addEventListener('click', closeCurtain);
})();

// ---- Volver arriba ----
// Aparece recién después de scrollear un poco (si estuviera siempre
// visible arriba de la página no serviría de nada) y desaparece de
// nuevo cerca del comienzo.
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const SHOW_AFTER_PX = 480;
  const spacer = document.querySelector('.curtain-spacer');
  let ticking = false;

  // "Arriba" es el tope del catálogo (donde termina .curtain-spacer y
  // arranca la barra de filtros), no el 0 del documento: scrollear
  // hasta 0 dejaría a la persona mirando el spacer vacío, con la
  // cortina todavía levantada. Desde ahí, un scroll más hacia arriba
  // es el gesto que vuelve a bajar la cortina (initHeroCurtain).
  function catalogTop() {
    return spacer ? spacer.offsetTop + spacer.offsetHeight : 0;
  }

  function update() {
    btn.classList.toggle('is-visible', window.scrollY > catalogTop() + SHOW_AFTER_PX);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
  btn.addEventListener('click', () => window.scrollTo({ top: catalogTop(), behavior: 'smooth' }));
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

  // La cortina volvió a tapar el catálogo (ver openCurtain): lo que ya
  // se había revelado vuelve a su estado inicial, detrás de la cortina
  // y sin que nadie lo vea, para que la próxima bajada al catálogo
  // tenga otra vez su llegada en vez de encontrar todo ya quieto.
  document.addEventListener('curtain:covered', () => {
    targets.forEach((el) => {
      if (!el.classList.contains('show')) return;
      el.classList.remove('show', 'is-refresh');
      io.observe(el);
    });
  });
})();
