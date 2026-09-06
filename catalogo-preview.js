/**
 * catalogo-preview.js
 * Previsualización de una fragancia: al tocar cualquier item del
 * catálogo (fuera del botón "+"), se abre un carrusel con la foto más
 * grande, el nombre, la marca y el perfume en el que está inspirada,
 * más un botón para agregarla al carrito sin tener que cerrarla.
 *
 * Arquitectura: 3 lugares fijos (anterior / activa en el centro, más
 * grande / siguiente), siempre los mismos 3 nodos del DOM (clonados una
 * sola vez desde <template id="previewSlideTemplate"> al cargar la
 * página). Deslizar o usar las flechas no mueve una card individual: las
 * 3 rotan de lugar con una única transición continua (ver setSlot/
 * commitSwipe), y la que queda "de sobra" se recicla instantáneamente
 * fuera de pantalla (siempre a ±100vw, invisible sin importar el ancho
 * de viewport) para reaparecer como el próximo vecino, deslizándose
 * hacia su lugar. Así los 3 lugares quedan siempre respetados, sin que
 * ninguna card compita por el mismo espacio que otra.
 *
 * Decisión de diseño: igual que catalogo-cart.js, este módulo no
 * conoce nada de femenino/masculino/unisex ni de cómo se arma el
 * catálogo. Lee los data-item-* que renderItem() deja en cada .item
 * (más el <img> ya renderizado, para no duplicar esa lógica) y, para
 * agregar al carrito, dispara un evento personalizado en vez de llamar
 * directamente a una función del carrito: así ninguno de los dos
 * módulos necesita importar ni conocer al otro.
 */

const PREVIEW_ADD_EVENT = 'perfume:add-to-cart';
const SWIPE_THRESHOLD = 64; // px de arrastre para confirmar el cambio de fragancia
const SWIPE_EDGE_RESISTANCE = 0.35; // arrastre "elástico" cuando no hay vecino de ese lado
const SLOT_CLASSES = ['slot-prev', 'slot-current', 'slot-next', 'slot-exit-left', 'slot-exit-right', 'slot-enter-left', 'slot-enter-right'];

let viewport = null;
let backdrop = null;
let slides = { prev: null, current: null, next: null };

let lastFocusedBeforePreviewOpen = null;

// Fragancias navegables por swipe/flechas: se recalculan cada vez que se
// abre el carrusel (respetan los filtros de categoría/marca activos en
// ese momento) y no cambian mientras sigue abierto.
let navItems = [];
let navIndex = -1;
let drag = null;
let swipeGen = 0; // ver commitSwipe: identifica a qué swipe pertenece cada reciclado
// Solo bloquea que se ROTEN los 3 lugares de nuevo mientras la rotación
// anterior sigue en pantalla (con 3 nodos nada más, dos rotaciones a la
// vez pueden dejar a alguno sin lugar). NO bloquea agarrar la card y
// arrastrarla: eso sigue siendo instantáneo en todo momento.
let rotating = false;

// Solo cuenta los .item que no están ocultos por los filtros de
// catalogo-app.js (que ocultan agregando "is-hidden" a un ancestro).
function getVisibleItems() {
  return Array.from(document.querySelectorAll('.item')).filter((el) => !el.closest('.is-hidden'));
}

function setSlot(slide, name) {
  if (!slide) return;
  slide.classList.remove(...SLOT_CLASSES);
  slide.classList.add(`slot-${name}`);

  // Solo la card activa es un diálogo operable para el lector de
  // pantalla y por teclado: las vecinas se pueden tocar/clickear (ver
  // onViewportClick), pero su botón de cerrar y el de agregar quedan
  // fuera del tab y del árbol de accesibilidad hasta que pasan al
  // centro (si no, con Tab se llega a botones invisibles).
  const isCurrent = name === 'current';
  slide.setAttribute('aria-hidden', String(!isCurrent));
  slide.querySelectorAll('.preview-close, .preview-add').forEach((btn) => {
    btn.tabIndex = isCurrent ? 0 : -1;
  });
}

// Llena una de las 3 cards con la foto, marca, nombre y demás datos de
// una fragancia (sirve tanto para la activa como para sus vecinas: las
// 3 cards son la misma plantilla).
function fillSlide(slide, itemEl) {
  slide.classList.remove('is-empty');
  const sourceImg = itemEl.querySelector('img');
  const img = slide.querySelector('.preview-img');
  img.src = sourceImg ? sourceImg.src : '';
  img.alt = itemEl.dataset.itemInspired || '';
  img.classList.toggle('is-placeholder', !!sourceImg?.classList.contains('is-placeholder'));

  slide.querySelector('.preview-brand').textContent = itemEl.dataset.itemBrand || '';
  slide.querySelector('.preview-name').textContent = itemEl.dataset.itemName || '';
  slide.querySelector('.preview-inspired span').textContent = itemEl.dataset.itemInspired || '';

  // El botón de "agregar" necesita los mismos datos que catalogo-cart.js
  // usa para las fragancias del catálogo; quedan en la propia card.
  slide.dataset.itemId = itemEl.dataset.itemId;
  slide.dataset.itemName = itemEl.dataset.itemName;
  slide.dataset.itemBrand = itemEl.dataset.itemBrand;
  slide.dataset.itemInspired = itemEl.dataset.itemInspired;

  // Por si se reasigna esta card mientras la fragancia anterior todavía
  // estaba en medio de la secuencia de "agregado -> cierre".
  const addBtn = slide.querySelector('.preview-add');
  const label = addBtn.querySelector('span:last-child');
  if (label) {
    if (!addBtn.dataset.originalLabel) addBtn.dataset.originalLabel = label.textContent;
    label.textContent = addBtn.dataset.originalLabel;
  }
  addBtn.classList.remove('is-confirmed');
  addBtn.disabled = false;
}

// Sin vecino de ese lado (primera o última fragancia de la lista): la
// card queda vacía y oculta en vez de mostrar contenido repetido o viejo.
function emptySlide(slide) {
  slide.classList.add('is-empty');
}

// Las fotos del catálogo usan loading="lazy": si la fragancia todavía
// no se scrolleó a la vista, el navegador ni la pidió por red todavía.
// Sin esto, la card a dos swipes de distancia (la que recién se
// convierte en vecina cuando ya diste un swipe) puede tardar en
// aparecer la primera vez que se muestra. Precargarla con un <img> de
// memoria (no lazy) fuerza esa descarga de antemano, aunque todavía no
// se vea en ningún lado: para cuando le toque mostrarse, ya está en la
// caché del navegador y aparece al instante.
const preloadedImageUrls = new Set();
function preloadItemImage(itemEl) {
  if (!itemEl) return;
  const src = itemEl.querySelector('img')?.src;
  if (!src || preloadedImageUrls.has(src)) return;
  preloadedImageUrls.add(src);
  new Image().src = src;
}

// Adelanta la descarga de la fragancia a dos lugares de distancia hacia
// cada lado (la de un lugar ya se precarga sola: es la vecina visible,
// que fillSlide llena apenas se abre o se rota el carrusel).
function preloadFurtherNeighbors(index) {
  preloadItemImage(navItems[index - 2]);
  preloadItemImage(navItems[index + 2]);
}

function buildSlides() {
  const template = document.getElementById('previewSlideTemplate');
  if (!viewport || !template) return;
  const nodes = [];
  for (let i = 0; i < 3; i += 1) {
    const clone = template.content.cloneNode(true);
    const slide = clone.querySelector('.preview-slide');
    // Las 3 cards vienen del mismo <template>: sin un id propio por
    // clon, las 3 tendrían el mismo aria-labelledby (ids repetidos,
    // inválido en el documento).
    const nameEl = slide.querySelector('.preview-name');
    nameEl.id = `previewName-${i}`;
    slide.setAttribute('aria-labelledby', nameEl.id);
    viewport.appendChild(slide);
    nodes.push(slide);
  }
  slides = { prev: nodes[0], current: nodes[1], next: nodes[2] };
  setSlot(slides.prev, 'prev');
  setSlot(slides.current, 'current');
  setSlot(slides.next, 'next');
}

function setDragX(px) {
  viewport.style.setProperty('--drag-x', `${px}px`);
}

function onPreviewKeydown(e) {
  if (e.key === 'Escape') { closePreview(false); return; }
  if (e.key === 'ArrowLeft') { commitSwipe(-1); return; }
  if (e.key === 'ArrowRight') { commitSwipe(1); }
}

function openPreview(itemEl) {
  if (!viewport || !backdrop || !slides.current) return;

  navItems = getVisibleItems();
  navIndex = navItems.indexOf(itemEl);
  const prevItem = navIndex > 0 ? navItems[navIndex - 1] : null;
  const nextItem = navIndex < navItems.length - 1 ? navItems[navIndex + 1] : null;

  const all = [slides.prev, slides.current, slides.next];
  all.forEach((s) => s.classList.add('no-anim'));
  setDragX(0);

  if (prevItem) fillSlide(slides.prev, prevItem); else emptySlide(slides.prev);
  fillSlide(slides.current, itemEl);
  if (nextItem) fillSlide(slides.next, nextItem); else emptySlide(slides.next);
  preloadFurtherNeighbors(navIndex);

  setSlot(slides.prev, 'prev');
  setSlot(slides.current, 'current');
  setSlot(slides.next, 'next');

  // Fuerza el reflow antes de sacar "no-anim": sin esto, la primera vez
  // que se abre el carrito se vería una animación de entrada indeseada
  // en vez de que las 3 cards ya estén en su lugar final.
  // eslint-disable-next-line no-unused-expressions
  slides.current.offsetHeight;
  requestAnimationFrame(() => {
    all.forEach((s) => s.classList.remove('no-anim'));
  });

  lastFocusedBeforePreviewOpen = document.activeElement;

  viewport.hidden = false;
  backdrop.hidden = false;
  // Doble rAF: con uno solo, el navegador a veces no llega a pintar el
  // estado inicial (opacity:0) antes de pasar a "is-open", y el
  // backdrop-filter del fondo se queda sin componer (se ve el catálogo
  // sin oscurecer/desenfocar detrás de la card por un instante).
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      viewport.classList.add('is-open');
      backdrop.classList.add('is-open');
    });
  });

  document.body.classList.add('cart-open-lock');
  document.addEventListener('keydown', onPreviewKeydown);
  slides.current.querySelector('.preview-close')?.focus();
}

// `vanish`: true cuando el cierre lo dispara la confirmación de "agregar
// al carrito" (usa la transición más marcada de .is-vanishing en la
// card activa en vez del simple fundido de cerrar con la X o el fondo).
function closePreview(vanish) {
  if (!viewport || !backdrop || !slides.current) return;

  if (vanish) slides.current.classList.add('is-vanishing');
  viewport.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  document.body.classList.remove('cart-open-lock');
  document.removeEventListener('keydown', onPreviewKeydown);

  const finishedSlide = slides.current;
  setTimeout(() => {
    viewport.hidden = true;
    backdrop.hidden = true;
    finishedSlide.classList.remove('is-vanishing');
  }, vanish ? 400 : 460); // debe coincidir con la transición CSS de .preview-viewport

  if (lastFocusedBeforePreviewOpen instanceof HTMLElement) lastFocusedBeforePreviewOpen.focus();
}

// Rota las 3 cards un lugar (offset=1 avanza a la siguiente fragancia,
// offset=-1 retrocede a la anterior) con una única transición continua:
// la activa pasa al lugar del vecino correspondiente y ese vecino pasa
// al centro. La card que queda sin lugar se recicla instantáneamente
// fuera de pantalla (invisible) y reaparece deslizándose desde el lado
// opuesto como el nuevo vecino de ese costado.
//
// Solo hay 3 nodos físicos para 3 lugares: si se llega a rotar de nuevo
// antes de que la rotación anterior termine de reciclar a la card
// sobrante, dos rotaciones se disputan el mismo nodo y se puede terminar
// sin ninguna card en "current". Por eso, ROTAR (esta función) espera a
// que la anterior termine su fase visible (rotating) — pero agarrar y
// arrastrar la card (onPointerDown/onPointerMove) nunca espera nada, así
// que deslizar se sigue sintiendo instantáneo aunque el "commit" en sí
// tenga esta pequeña protección.
function commitSwipe(offset) {
  if (rotating) return;
  const targetIndex = navIndex + offset;
  if (targetIndex < 0 || targetIndex >= navItems.length) return;

  const goingNext = offset > 0;
  const outgoing = goingNext ? slides.prev : slides.next; // se recicla
  const stayCurrent = slides.current; // pasa al costado opuesto
  const staySide = goingNext ? slides.next : slides.prev; // pasa al centro

  // Las 3 cards quedan marcadas con este swipe, no solo la que se
  // recicla: si no, el callback pendiente de reciclado de un swipe
  // anterior (que revisa el marcado de SU "outgoing") podía no darse
  // cuenta de que ese mismo nodo ya fue reutilizado con otro rol por
  // este swipe más nuevo, y terminaba pisándolo con un lugar viejo.
  const myGen = ++swipeGen;
  outgoing.dataset.swipeGen = String(myGen);
  stayCurrent.dataset.swipeGen = String(myGen);
  staySide.dataset.swipeGen = String(myGen);
  rotating = true;

  setSlot(outgoing, goingNext ? 'exit-left' : 'exit-right');
  setSlot(stayCurrent, goingNext ? 'prev' : 'next');
  setSlot(staySide, 'current');

  navIndex = targetIndex;
  const capturedIndex = navIndex; // instantánea: evita leer un navIndex ya
  // actualizado por un swipe posterior cuando este setTimeout/callback
  // se dispare más tarde.
  preloadFurtherNeighbors(capturedIndex);
  slides = goingNext
    ? { prev: stayCurrent, current: staySide, next: outgoing }
    : { prev: outgoing, current: staySide, next: stayCurrent };

  let settled = false;
  const finishPhase1 = () => {
    if (settled) return; // por si transitionend y el respaldo llegan juntos
    settled = true;
    stayCurrent.removeEventListener('transitionend', onPhase1End);
    rotating = false; // ya se puede rotar de nuevo
    // Un swipe posterior ya reclamó esta card para otra cosa: reciclarla
    // ahora la dejaría en un estado incorrecto (contenido/lugar de un
    // swipe que ya no corresponde).
    if (outgoing.dataset.swipeGen !== String(myGen)) return;

    const newNeighborItem = goingNext ? navItems[capturedIndex + 1] : navItems[capturedIndex - 1];
    outgoing.classList.add('no-anim');
    setSlot(outgoing, goingNext ? 'enter-right' : 'enter-left');
    if (newNeighborItem) fillSlide(outgoing, newNeighborItem); else emptySlide(outgoing);
    // eslint-disable-next-line no-unused-expressions
    outgoing.offsetHeight; // fuerza el reflow: el salto a "fuera de pantalla" no debe animarse

    let slidIn = false;
    const slideIntoPlace = () => {
      if (slidIn) return;
      slidIn = true;
      if (outgoing.dataset.swipeGen !== String(myGen)) return;
      outgoing.classList.remove('no-anim');
      setSlot(outgoing, goingNext ? 'next' : 'prev');
    };
    // El doble rAF es lo que hace que este último tramo (de "fuera de
    // pantalla" a su lugar de vecina) también se vea animado en vez de
    // saltar; el setTimeout es solo un respaldo por si el navegador
    // pausó los rAF de esta pestaña (por ejemplo, si queda en segundo
    // plano a mitad de la animación) — sin él, esa card quedaría
    // invisible para siempre en vez de perderse solo esta animación.
    requestAnimationFrame(() => requestAnimationFrame(slideIntoPlace));
    setTimeout(slideIntoPlace, 200);
  };
  function onPhase1End(ev) {
    if (ev.propertyName !== 'transform') return;
    finishPhase1();
  }
  stayCurrent.addEventListener('transitionend', onPhase1End);
  setTimeout(finishPhase1, 420); // respaldo si transitionend no llega a disparar
}

function onPointerDown(e) {
  // A propósito no bloquea si ya hay una transición en curso: agarrar la
  // card a mitad de camino (y que el arrastre siga al dedo desde ahí) es
  // lo que hace que deslizar varias veces seguidas se sienta instantáneo
  // en vez de tener que esperar a que cada animación termine.
  const slide = e.target.closest('.preview-slide');
  if (!slide || !slide.classList.contains('slot-current')) return;
  if (e.target.closest('.preview-add, .preview-close')) return;
  if (navItems.length < 2) return; // nada para deslizar

  drag = { id: e.pointerId, startX: e.clientX, startY: e.clientY, dx: 0, locked: false, active: false };
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', onPointerUp);
}

function onPointerMove(e) {
  if (!drag || e.pointerId !== drag.id) return;
  const dx = e.clientX - drag.startX;
  const dy = e.clientY - drag.startY;

  if (!drag.locked) {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
    drag.locked = true;
    drag.active = Math.abs(dx) > Math.abs(dy);
    if (drag.active) {
      [slides.prev, slides.current, slides.next].forEach((s) => s.classList.add('no-anim'));
      viewport.setPointerCapture(e.pointerId);
    }
  }
  if (!drag.active) return;

  let value = dx;
  const hasPrev = navIndex > 0;
  const hasNext = navIndex < navItems.length - 1;
  if ((value > 0 && !hasPrev) || (value < 0 && !hasNext)) value *= SWIPE_EDGE_RESISTANCE;
  drag.dx = value;
  setDragX(value);
}

function onPointerUp(e) {
  if (!drag || e.pointerId !== drag.id) return;
  viewport.removeEventListener('pointermove', onPointerMove);
  viewport.removeEventListener('pointerup', onPointerUp);
  viewport.removeEventListener('pointercancel', onPointerUp);

  if (drag.active) {
    const dx = drag.dx;
    const goNext = dx <= -SWIPE_THRESHOLD && navIndex < navItems.length - 1;
    const goPrev = dx >= SWIPE_THRESHOLD && navIndex > 0;

    // Vuelve a habilitar la transición y suelta el arrastre a mano: si
    // no llegó al umbral, esto solo la hace volver suavemente a su
    // lugar; si sí llegó, commitSwipe cambia de lugar desde esta misma
    // posición arrastrada, como un único movimiento continuo.
    [slides.prev, slides.current, slides.next].forEach((s) => s.classList.remove('no-anim'));
    setDragX(0);
    if (goNext) commitSwipe(1);
    else if (goPrev) commitSwipe(-1);
  }
  drag = null;
}

function dispatchAddToCart(dataset) {
  document.dispatchEvent(
    new CustomEvent(PREVIEW_ADD_EVENT, {
      detail: {
        id: dataset.itemId,
        name: dataset.itemName,
        brand: dataset.itemBrand,
        inspired: dataset.itemInspired
      }
    })
  );
}

// Confirma visualmente el agregado (cambia el texto del botón en vez de
// depender del toast del carrito, que puede quedar tapado por este mismo
// carrusel al estar ambos centrados en pantalla) y después cierra la
// card entera: así la persona vuelve al catálogo en vez de quedarse
// mirando una card que ya cumplió su función.
function flashAddedThenClose(addBtn) {
  const label = addBtn.querySelector('span:last-child');
  const original = label ? label.textContent : '';
  if (label) label.textContent = '¡Agregado!';
  addBtn.classList.add('is-confirmed');
  addBtn.disabled = true;

  setTimeout(() => closePreview(true), 850);

  // Deja el botón listo para la próxima vez que se abra esta u otra
  // fragancia, una vez que la card ya terminó de desaparecer.
  setTimeout(() => {
    if (label) label.textContent = original;
    addBtn.classList.remove('is-confirmed');
    addBtn.disabled = false;
  }, 1300);
}

// Delegación sobre #previewViewport: cubre las 3 cards (clonadas del
// mismo <template>) sin necesitar un listener por cada una, y sigue
// funcionando aunque sus roles/lugares roten con cada swipe.
function onViewportClick(e) {
  if (e.target.closest('.preview-close')) { closePreview(false); return; }

  const addBtn = e.target.closest('.preview-add');
  if (addBtn) {
    if (addBtn.disabled) return;
    const slide = addBtn.closest('.preview-slide');
    if (!slide || !slide.classList.contains('slot-current')) return; // solo la card activa agrega
    dispatchAddToCart(slide.dataset);
    flashAddedThenClose(addBtn);
    return;
  }

  const slide = e.target.closest('.preview-slide');
  if (!slide) return;
  if (slide.classList.contains('slot-prev')) commitSwipe(-1);
  else if (slide.classList.contains('slot-next')) commitSwipe(1);
}

function initPreviewOpenClose() {
  backdrop = document.getElementById('previewBackdrop');
  viewport = document.getElementById('previewViewport');
  if (!viewport) return;
  buildSlides();
  viewport.addEventListener('click', onViewportClick);
  viewport.addEventListener('pointerdown', onPointerDown);
  backdrop?.addEventListener('click', () => closePreview(false));
}

// Delegación sobre document: cubre todos los .item aunque el catálogo
// ya esté renderizado dinámicamente. Ignora los clicks que vienen del
// botón "+" (ese ya tiene su propio comportamiento en catalogo-cart.js)
// y soporta abrir con Enter/Espacio para navegación por teclado.
function initItemClicks() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.cart-add-btn')) return;
    const itemEl = e.target.closest('.item');
    if (itemEl) openPreview(itemEl);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target.closest('.cart-add-btn')) return;
    const itemEl = e.target.closest('.item');
    if (!itemEl) return;
    e.preventDefault();
    openPreview(itemEl);
  });
}

// ---- Arranque ----
initPreviewOpenClose();
initItemClicks();
