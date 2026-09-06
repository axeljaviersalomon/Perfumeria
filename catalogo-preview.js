/**
 * catalogo-preview.js
 * Previsualización de una fragancia: al tocar cualquier item del
 * catálogo (fuera del botón "+"), se abre un panel con la foto más
 * grande, el nombre, la marca y el perfume en el que está inspirada,
 * más un botón para agregarla al carrito sin tener que cerrarla.
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

let lastFocusedBeforePreviewOpen = null;

function getPreviewEls() {
  return {
    backdrop: document.getElementById('previewBackdrop'),
    modal: document.getElementById('previewModal'),
    close: document.getElementById('previewClose'),
    img: document.getElementById('previewImg'),
    brand: document.getElementById('previewBrand'),
    name: document.getElementById('previewName'),
    inspired: document.getElementById('previewInspired'),
    addBtn: document.getElementById('previewAdd')
  };
}

function fillPreview(itemEl) {
  const { img, brand, name, inspired } = getPreviewEls();
  const sourceImg = itemEl.querySelector('img');

  img.src = sourceImg ? sourceImg.src : '';
  img.alt = itemEl.dataset.itemInspired || '';
  img.classList.toggle('is-placeholder', !!sourceImg?.classList.contains('is-placeholder'));

  brand.textContent = itemEl.dataset.itemBrand || '';
  name.textContent = itemEl.dataset.itemName || '';
  inspired.textContent = itemEl.dataset.itemInspired || '';

  // El botón de "agregar" necesita los mismos datos que catalogo-cart.js
  // usa para las fragancias del catálogo; quedan en el propio botón.
  const { addBtn } = getPreviewEls();
  addBtn.dataset.itemId = itemEl.dataset.itemId;
  addBtn.dataset.itemName = itemEl.dataset.itemName;
  addBtn.dataset.itemBrand = itemEl.dataset.itemBrand;
  addBtn.dataset.itemInspired = itemEl.dataset.itemInspired;
}

function onPreviewKeydown(e) {
  if (e.key === 'Escape') closePreview();
}

function openPreview(itemEl) {
  const { backdrop, modal, close } = getPreviewEls();
  if (!backdrop || !modal) return;

  fillPreview(itemEl);
  lastFocusedBeforePreviewOpen = document.activeElement;

  modal.hidden = false;
  backdrop.hidden = false;
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
    backdrop.classList.add('is-open');
  });

  document.body.classList.add('cart-open-lock');
  document.addEventListener('keydown', onPreviewKeydown);
  if (close) close.focus();
}

function closePreview() {
  const { backdrop, modal } = getPreviewEls();
  if (!backdrop || !modal) return;

  modal.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  document.body.classList.remove('cart-open-lock');
  document.removeEventListener('keydown', onPreviewKeydown);

  setTimeout(() => {
    modal.hidden = true;
    backdrop.hidden = true;
  }, 320); // debe coincidir con la transición CSS de .preview-modal

  if (lastFocusedBeforePreviewOpen instanceof HTMLElement) lastFocusedBeforePreviewOpen.focus();
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

// Cambia brevemente el texto del botón para confirmar el agregado sin
// depender del toast del carrito, que puede quedar tapado por este
// mismo panel al estar ambos centrados en pantalla.
function flashAdded(addBtn) {
  const label = addBtn.querySelector('span:last-child');
  if (!label) return;
  const original = label.textContent;
  label.textContent = '¡Agregado!';
  addBtn.classList.add('is-confirmed');
  setTimeout(() => {
    label.textContent = original;
    addBtn.classList.remove('is-confirmed');
  }, 1200);
}

function initPreviewOpenClose() {
  const { backdrop, close, addBtn } = getPreviewEls();
  close?.addEventListener('click', closePreview);
  backdrop?.addEventListener('click', closePreview);
  addBtn?.addEventListener('click', () => {
    dispatchAddToCart(addBtn.dataset);
    flashAdded(addBtn);
  });
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
