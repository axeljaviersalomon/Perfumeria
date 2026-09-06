/**
 * catalogo-cart.js
 * Carrito de selección (sin pagos): junta las fragancias que la persona
 * quiere encargar y arma un mensaje de WhatsApp pre-escrito con el pedido,
 * para que solo tenga que tocar "Enviar".
 *
 * Decisión de diseño: este módulo no importa nada de catalogo-app.js ni
 * conoce la forma de femenino/masculino/unisex. Se apoya únicamente en
 * atributos data-item-* que renderItem() deja en cada .item, y en
 * delegación de eventos sobre document. Esto permite que el carrito viva
 * en un archivo aparte, sin acoplarse al render del catálogo ni rearmar
 * listeners cuando el DOM cambia.
 *
 * Persistencia: el carrito se guarda en localStorage para sobrevivir
 * recargas de página; si localStorage no está disponible (modo privado,
 * cuota llena) el carrito sigue funcionando en memoria durante la sesión.
 */

const CART_STORAGE_KEY = 'perfumeria-cart-v1';
const WHATSAPP_NUMBER = '5491161970675';
const TOAST_DURATION_MS = 1800;
const CLOSE_TRANSITION_MS = 320; // debe coincidir con la transición CSS de .cart-panel

// Estado del carrito: { [id]: { id, name, brand, inspired, qty } }
let cart = loadCart();
let toastTimer = null;
let lastFocusedBeforeOpen = null;

// ---- Persistencia ----

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    // Sin persistencia disponible: el carrito sigue vivo en memoria.
  }
}

// ---- Helpers de escape ----
// Los nombres vienen de catalogo-data.js (contenido propio, no de un
// usuario), pero igual se escapa antes de inyectar en innerHTML/selectores
// por buena práctica y para blindar ante nombres con comillas o acentos.

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function escapeAttrSelector(value) {
  return String(value).replace(/["\\]/g, '\\$&');
}

// ---- Operaciones sobre el carrito ----

function getTotalCount() {
  return Object.values(cart).reduce((sum, entry) => sum + entry.qty, 0);
}

function addItem({ id, name, brand, inspired }) {
  if (!id) return;
  if (!cart[id]) {
    cart[id] = { id, name, brand, inspired, qty: 0 };
  }
  cart[id].qty += 1;
  saveCart();
  renderCartList();
  updateItemBadge(id);
  showToast(`${name} agregado al carrito`);
}

function changeQty(id, delta) {
  const entry = cart[id];
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) delete cart[id];
  saveCart();
  renderCartList();
  updateItemBadge(id);
}

function removeItem(id) {
  if (!cart[id]) return;
  delete cart[id];
  saveCart();
  renderCartList();
  updateItemBadge(id);
}

function clearCart() {
  const affectedIds = Object.keys(cart);
  cart = {};
  saveCart();
  renderCartList();
  affectedIds.forEach(updateItemBadge);
}

// Sincroniza el numerito que aparece pegado al botón "+" de cada
// fragancia del catálogo con la cantidad real que tiene en el carrito.
function updateItemBadge(id) {
  const itemEl = document.querySelector(`.item[data-item-id="${escapeAttrSelector(id)}"]`);
  if (!itemEl) return;
  const qtyEl = itemEl.querySelector('.cart-add-qty');
  if (!qtyEl) return;

  const qty = cart[id] ? cart[id].qty : 0;
  qtyEl.textContent = qty > 0 ? qty : '';
  qtyEl.classList.toggle('is-visible', qty > 0);

  // Reinicia la animación de "bump" para dar feedback en cada cambio.
  qtyEl.classList.remove('is-bump');
  void qtyEl.offsetWidth; // fuerza reflow para poder re-disparar la animación
  qtyEl.classList.add('is-bump');
}

function restoreItemBadgesFromCart() {
  Object.keys(cart).forEach(updateItemBadge);
}

// ---- Render del panel ----

function renderCartRow(entry) {
  const safeName = escapeHtml(entry.name);
  return `
    <li class="cart-row" data-item-id="${escapeHtml(entry.id)}">
      <div class="cart-row-info">
        <div class="cart-row-name">${safeName}</div>
        <div class="cart-row-brand">${escapeHtml(entry.brand)}</div>
      </div>
      <div class="cart-row-qty">
        <button type="button" class="cart-qty-btn" data-action="decrease" aria-label="Restar uno a ${safeName}">−</button>
        <span class="cart-qty-value">${entry.qty}</span>
        <button type="button" class="cart-qty-btn" data-action="increase" aria-label="Sumar uno a ${safeName}">+</button>
      </div>
      <button type="button" class="cart-row-remove" data-action="remove" aria-label="Quitar ${safeName} del carrito">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </li>
  `;
}

function renderCartList() {
  const listEl = document.getElementById('cartList');
  const emptyEl = document.getElementById('cartEmpty');
  const footEl = document.getElementById('cartFoot');
  const badgeEl = document.getElementById('cartBadge');
  const totalCountEl = document.getElementById('cartTotalCount');
  if (!listEl) return;

  const entries = Object.values(cart).sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const total = getTotalCount();

  badgeEl.textContent = String(total);
  badgeEl.classList.toggle('is-visible', total > 0);

  if (entries.length === 0) {
    listEl.innerHTML = '';
    emptyEl.hidden = false;
    footEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  footEl.hidden = false;
  totalCountEl.textContent = String(total);
  listEl.innerHTML = entries.map(renderCartRow).join('');
}

// ---- Pedido por WhatsApp ----

function buildWhatsAppMessage() {
  const entries = Object.values(cart).sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const lines = entries.map((entry) => `• ${entry.name} (${entry.brand}) x${entry.qty}`);
  const total = getTotalCount();
  const totalLabel = total === 1 ? 'fragancia' : 'fragancias';

  return [
    'Hola! Quiero encargar estas fragancias de Perfumería Fina:',
    '',
    ...lines,
    '',
    `Total: ${total} ${totalLabel}.`,
    '¡Gracias!'
  ].join('\n');
}

function openWhatsAppOrder() {
  if (getTotalCount() === 0) return;
  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ---- Toast de confirmación ----

function showToast(text) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;

  toast.textContent = text;
  toast.classList.remove('is-visible');
  void toast.offsetWidth; // fuerza reflow para reiniciar la transición
  toast.classList.add('is-visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), TOAST_DURATION_MS);
}

// ---- Apertura / cierre del panel ----

function onCartKeydown(e) {
  if (e.key === 'Escape') closeCart();
}

function openCart() {
  const panel = document.getElementById('cartPanel');
  const backdrop = document.getElementById('cartBackdrop');
  const toggle = document.getElementById('cartToggle');
  const closeBtn = document.getElementById('cartClose');
  if (!panel || !backdrop || !toggle) return;

  lastFocusedBeforeOpen = document.activeElement;

  panel.hidden = false;
  backdrop.hidden = false;
  // El cambio de "hidden" a visible necesita un frame antes de animar,
  // para que el navegador registre el estado inicial de la transición.
  requestAnimationFrame(() => {
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
  });

  toggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('cart-open-lock');
  document.addEventListener('keydown', onCartKeydown);
  if (closeBtn) closeBtn.focus();
}

function closeCart() {
  const panel = document.getElementById('cartPanel');
  const backdrop = document.getElementById('cartBackdrop');
  const toggle = document.getElementById('cartToggle');
  if (!panel || !backdrop || !toggle) return;

  panel.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('cart-open-lock');
  document.removeEventListener('keydown', onCartKeydown);

  setTimeout(() => {
    panel.hidden = true;
    backdrop.hidden = true;
  }, CLOSE_TRANSITION_MS);

  if (lastFocusedBeforeOpen instanceof HTMLElement) lastFocusedBeforeOpen.focus();
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  if (panel && panel.classList.contains('is-open')) {
    closeCart();
  } else {
    openCart();
  }
}

// ---- Wiring de eventos (delegación) ----

function initCartToggle() {
  const toggle = document.getElementById('cartToggle');
  const closeBtn = document.getElementById('cartClose');
  const backdrop = document.getElementById('cartBackdrop');
  toggle?.addEventListener('click', toggleCart);
  closeBtn?.addEventListener('click', closeCart);
  backdrop?.addEventListener('click', closeCart);
}

function initCartActions() {
  document.getElementById('cartClear')?.addEventListener('click', clearCart);
  document.getElementById('cartOrder')?.addEventListener('click', openWhatsAppOrder);
}

// Un solo listener en document cubre tanto los botones "+" del catálogo
// (renderizados dinámicamente) como los controles de cada fila del
// carrito (que se vuelven a renderizar en cada cambio de cantidad).
function initDelegatedClicks() {
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.cart-add-btn');
    if (addBtn) {
      const itemEl = addBtn.closest('.item');
      if (!itemEl) return;
      addItem({
        id: itemEl.dataset.itemId,
        name: itemEl.dataset.itemName,
        brand: itemEl.dataset.itemBrand,
        inspired: itemEl.dataset.itemInspired
      });
      return;
    }

    const qtyBtn = e.target.closest('.cart-qty-btn');
    if (qtyBtn) {
      const row = qtyBtn.closest('.cart-row');
      const id = row?.dataset.itemId;
      if (id) changeQty(id, qtyBtn.dataset.action === 'increase' ? 1 : -1);
      return;
    }

    const removeBtn = e.target.closest('.cart-row-remove');
    if (removeBtn) {
      const row = removeBtn.closest('.cart-row');
      const id = row?.dataset.itemId;
      if (id) removeItem(id);
    }
  });
}

// ---- Arranque ----
initCartToggle();
initCartActions();
initDelegatedClicks();
renderCartList();
restoreItemBadgesFromCart();
