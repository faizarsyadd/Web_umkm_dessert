/* =========================================================
   My Dessert Naswa — Premium Luxury E-commerce (Pure JS)
   - Render products from array
   - Live search, filters, sorting
   - Cart system with localStorage
   - Quick View modal
   - Cart drawer
   - Toast notifications
   - Typing effect
   - Scroll reveal (IntersectionObserver)
   - Active navbar highlight on scroll
   - Back-to-top
   - Skeleton loading
   - Reviews carousel
   - FAQ accordion
   - WhatsApp checkout (no backend)
========================================================= */

/* =========================
   CONFIG
========================= */
const whatsappNumber = "6281318696329"; // change to your real number

/* =========================
   DOM HELPERS
========================= */
const $ = (q, parent = document) => parent.querySelector(q);
const $$ = (q, parent = document) => [...parent.querySelectorAll(q)];

const formatIDR = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
};

const escapeHTML = (str) => {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

/* =========================
   DATA: PRODUCTS (Exactly 5)
========================= */
const products = [
  {
    id: "p1",
    name: "Puding Ulang Tahun",
    desc: "Rasa Puding Yang enak .",
    longDesc:
      " Cocok untuk momen santai maupun hadiah manis untuk Kekasih.",
    price: 90000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/paket2.jpeg",
    ingredients: ["Susu", "Vanilla", "Cream", "coklat", "Agar-agar premium"],
  },
  {
    id: "p2",
    name: "Puding Ulang tahun mini isi 6",
    desc: "Bervariasi.",
    longDesc:
      " Teksturnya lembut, manisnya pas, bikin repeat order.",
    price: 60000,
    rating: 4.9,
    stock: "Limited",
    category: "chocolate",
    bestSeller: true,
    image: "assets/products/puding3.jpeg",
    ingredients: ["Coklat", "Susu", "Cream", "coklat", "Agar-agar premium"],
  },
 {
    id: "p3",
    name: "Puding Sedang",
    desc: "Rasa Puding Yang enak .",
    longDesc:
      " Cocok untuk momen santai maupun hadiah manis untuk Kekasih.",
    price: 90000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/puding2.jpeg",
    ingredients: ["Susu", "Vanilla", "Cream", "coklat", "Agar-agar premium"],
  },
  {
    id: "p4",
    name: "Puding Ulang tahun tipe 2",
    desc: "Bervariasi.",
    longDesc:
      " Puding yg enak manis yg pas.",
    price: 90000,
    rating: 4.9,
    stock: "Limited",
    category: "chocolate",
    bestSeller: true,
    image: "assets/products/puding4.jpeg",
    ingredients: ["Coklat", "Susu", "Cream", "coklat", "Agar-agar premium"],
  },
  {
    id: "p5",
    name: "Puding Ulang Tahun",
    desc: "Rasa Puding Yang enak .",
    longDesc:
      " Cocok untuk momen santai maupun hadiah manis untuk Kekasih.",
    price: 90000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/puding5.jpeg",
    ingredients: ["Susu", "Vanilla", "Cream", "anggur", "Agar-agar premium"],
  },
  {
    id: "p6",
    name: "Puding Hampers Lebaran",
    desc: "Cocok dan pas banget udah mau bulan Ramadhan.",
    longDesc:
      " Paket khusus bulan Ramadhan isi 3",
    price: 35000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/paket1.jpeg",
    ingredients: ["Silverqueen","Tiramisu"],
  },
  {
    id: "p7",
    name: "Puding Hampers Lebaran tipe 2",
    desc: "Cocok dan pas banget udah mau bulan Ramadhan.",
    longDesc:
      " Paket khusus bulan Ramadhan isi 3",
    price: 30000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/puding1.jpeg",
    ingredients: ["Silverqueen","Tiramisu"],
  },
  {
    id: "p8",
    name: "Puding bulat",
    desc: "Cocok dan pas banget buat acara kumpul bareng teman.",
    longDesc:
      " isi banyak buah nya dan jelas rasanya enak",
    price: 155000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/pudingbulat.jpeg",
    ingredients: ["Silverqueen","Tiramisu"],
  },
  {
    id: "p9",
    name: "es capcin",
    desc: "Manis dan menyegarkan dan tentunya enak.",
    longDesc:
      " isi banyak buah nya dan jelas rasanya enak",
    price: 7000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/es.jpeg",
    ingredients: ["Capucino","coffee"],
  },
  {
    id: "p10",
    name: "Tiramisu",
    desc: "Cocok dan pas banget buat kamu yg suka manis.",
    longDesc:
      " seperti browniez manis dengan kacang almond dan enak",
    price: 10000,
    rating: 4.8,
    stock: "Ready",
    category: "classic",
    bestSeller: true,
    image: "assets/products/tiramisu.jpeg",
    ingredients: ["coklat","Tiramisu"],
  },
];

const heroVideo = document.getElementById("heroVideo");
const soundToggle = document.getElementById("soundToggle");

if (heroVideo && soundToggle) {
  // default: muted (autoplay friendly)
  heroVideo.muted = true;

  soundToggle.addEventListener("click", async () => {
    try {
      // toggle mute
      heroVideo.muted = !heroVideo.muted;

      // kalau user nyalain suara, pastiin video play
      if (!heroVideo.muted) {
        await heroVideo.play();
        soundToggle.innerHTML = `<i class="fa-solid fa-volume-high"></i><span>Sound</span>`;
      } else {
        soundToggle.innerHTML = `<i class="fa-solid fa-volume-xmark"></i><span>Mute</span>`;
      }
    } catch (err) {
      console.log("Video sound blocked:", err);
    }
  });
}


/* =========================
   DATA: REVIEWS (6)
========================= */
const reviews = [
  {
    name: "Alya",
    note: "Repeat order 💛",
    rating: 5,
    text: "Vanilla Cream-nya lembut banget dan rasanya premium. Packaging juga elegan, cocok buat gift.",
  },
  {
    name: "Rizky",
    note: "Fast response",
    rating: 5,
    text: "Coklat Lumer beneran lumer! Manisnya pas dan terasa mahal. Admin cepat banget balesnya.",
  },
  {
    name: "Nabila",
    note: "Super creamy",
    rating: 5,
    text: "Oreo Crunch favoritku. Teksturnya creamy tapi ada crunchy-nya, jadi nggak ngebosenin.",
  },
  {
    name: "Dimas",
    note: "Worth it",
    rating: 4,
    text: "Caramel Regal enak, aroma caramelnya classy. Cocok buat pencinta dessert manis elegan.",
  },
  {
    name: "Salsa",
    note: "Fresh & ringan",
    rating: 5,
    text: "Mangga Segar berasa fresh banget. Ringan tapi tetap creamy. Cocok buat siang hari.",
  },
  {
    name: "Fajar",
    note: "Premium vibes",
    rating: 5,
    text: "Overall tampilannya premium banget. Rasanya juga konsisten. Bakal jadi langganan.",
  },
];

/* =========================
   DATA: FAQ
========================= */
const faqs = [
  {
    q: "Cara order via WhatsApp?",
    a: "Pilih menu → Add to Cart → Checkout via WhatsApp. Isi data checkout, lalu pesan akan otomatis terkirim ke admin.",
  },
  {
    q: "Puding tahan berapa lama?",
    a: "Rekomendasi terbaik dikonsumsi dalam 1–2 hari dan simpan di kulkas agar tetap fresh dan creamy.",
  },
  {
    q: "Bisa request topping?",
    a: "Bisa! Tulis request topping di catatan saat checkout (misalnya extra regal / tanpa topping).",
  },
  {
    q: "Minimal order berapa?",
    a: "Tidak ada minimal order, tapi untuk pengiriman tertentu bisa menyesuaikan area dan ketersediaan kurir.",
  },
  {
    q: "Pengiriman area mana?",
    a: "Kami melayani area terdekat sesuai domisili brand. Tanyakan detail area via WhatsApp untuk konfirmasi cepat.",
  },
];

/* =========================
   STATE
========================= */
let activeFilter = "all";
let activeSort = "default";
let searchQuery = "";

let cart = []; // {id, qty}

/* Quick View state */
let currentModalProduct = null;
let modalQty = 1;

/* Reviews carousel state */
let reviewIndex = 0;
let reviewTimer = null;

/* =========================
   STORAGE
========================= */
const CART_KEY = "mdn_cart_v1";

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadCart() {
  const raw = localStorage.getItem(CART_KEY);
  cart = raw ? JSON.parse(raw) : [];
}

/* =========================
   CART HELPERS
========================= */
function getProductById(id) {
  return products.find((p) => p.id === id);
}

function getCartCount() {
  return cart.reduce((acc, item) => acc + item.qty, 0);
}

function getCartSubtotal() {
  return cart.reduce((acc, item) => {
    const p = getProductById(item.id);
    return acc + (p ? p.price * item.qty : 0);
  }, 0);
}

function addToCart(id, qty = 1) {
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });

  saveCart();
  renderCart();
  renderBadge();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
  renderBadge();
}

function updateCartQty(id, qty) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty = qty;
  if (item.qty <= 0) removeFromCart(id);

  saveCart();
  renderCart();
  renderBadge();
}

/* =========================
   TOAST
========================= */
function toast(title, message = "") {
  const wrap = $("#toastWrap");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `
    <div>
      <strong>${escapeHTML(title)}</strong>
      <span>${escapeHTML(message)}</span>
    </div>
    <i class="fa-solid fa-sparkles"></i>
  `;
  wrap.appendChild(el);

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    setTimeout(() => el.remove(), 260);
  }, 2200);
}

/* =========================
   SKELETON LOADING
========================= */
function renderSkeletons(targetEl, count = 6) {
  targetEl.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const sk = document.createElement("div");
    sk.className = "skeleton-card";
    sk.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line lg"></div>
        <div class="skeleton-line md"></div>
        <div class="skeleton-line sm"></div>
      </div>
    `;
    targetEl.appendChild(sk);
  }
}

/* =========================
   RENDER: STARS
========================= */
function renderStars(rating, max = 5) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = max - full - half;

  let html = "";
  for (let i = 0; i < full; i++) html += `<i class="fa-solid fa-star"></i>`;
  if (half) html += `<i class="fa-solid fa-star-half-stroke"></i>`;
  for (let i = 0; i < empty; i++) html += `<i class="fa-regular fa-star"></i>`;
  return `<div class="stars" aria-label="Rating ${rating}">${html}</div>`;
}

/* =========================
   FILTER + SORT + SEARCH
========================= */
function getVisibleProducts() {
  let list = [...products];

  // Search
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  // Filter
  if (activeFilter === "best") {
    list = list.filter((p) => p.bestSeller);
  } else if (activeFilter !== "all") {
    list = list.filter((p) => p.category === activeFilter);
  }

  // Sort
  if (activeSort === "low") {
    list.sort((a, b) => a.price - b.price);
  } else if (activeSort === "high") {
    list.sort((a, b) => b.price - a.price);
  } else if (activeSort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

/* =========================
   RENDER: PRODUCTS
========================= */
function renderProducts() {
  const grid = $("#productGrid");

  // skeleton first (premium feel)
  renderSkeletons(grid, 6);

  // simulate loading (smooth)
  setTimeout(() => {
    const list = getVisibleProducts();
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="product-card" style="grid-column: 1 / -1; padding: 18px;">
          <h3 style="margin:0; font-family:'Playfair Display', serif;">Tidak ditemukan</h3>
          <p style="margin:8px 0 0; color: rgba(36,24,15,.65); line-height:1.7;">
            Coba kata kunci lain atau ubah filter.
          </p>
        </div>
      `;
      return;
    }

    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "product-card reveal";
      card.innerHTML = `
        <div class="product-media">
          <img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy" />
          <div class="stock-badge ${p.stock === "Ready" ? "stock-ready" : "stock-limited"}">
            ${escapeHTML(p.stock)}
          </div>
        </div>

        <div class="product-body">
          <h3 class="product-title">${escapeHTML(p.name)}</h3>
          <p class="product-desc">${escapeHTML(p.desc)}</p>

          <div class="product-meta">
            <span class="price">${formatIDR(p.price)}</span>
            ${renderStars(p.rating)}
          </div>

          <div class="product-meta">
            <div class="pill">
              <i class="fa-solid fa-tag"></i>
              <span>${escapeHTML(p.category)}</span>
            </div>
            <div class="pill">
              <i class="fa-solid fa-gem"></i>
              <span>${p.bestSeller ? "Best Seller" : "Premium"}</span>
            </div>
          </div>

          <div class="product-actions">
            <div class="action-row">
              <button class="btn btn-primary btn-sm" data-add="${p.id}">
                <i class="fa-solid fa-bag-shopping"></i>
                Add to Cart
              </button>
              <button class="btn btn-ghost btn-sm" data-quick="${p.id}">
                <i class="fa-solid fa-eye"></i>
                Quick View
              </button>
            </div>

            <button class="btn btn-soft btn-sm" data-buy="${p.id}">
              <i class="fa-brands fa-whatsapp"></i>
              Buy Now via WhatsApp
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // re-run reveal observer for newly injected nodes
    initRevealObserver();

  }, 650);
}

/* =========================
   RENDER: BEST SELLER (2)
========================= */
function renderBestSeller() {
  const target = $("#bestSellerGrid");
  const best = products.filter((p) => p.bestSeller).slice(0, 2);

  target.innerHTML = "";
  best.forEach((p) => {
    const el = document.createElement("article");
    el.className = "best-card reveal";
    el.innerHTML = `
      <div class="best-media">
        <img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy" />
        <div class="best-badge">
          <i class="fa-solid fa-crown"></i>
          <span>Best Seller</span>
        </div>
      </div>

      <div class="best-body">
        <h3 class="best-title">${escapeHTML(p.name)}</h3>
        <p class="best-desc">${escapeHTML(p.desc)}</p>

        <div class="best-row">
          <span class="price">${formatIDR(p.price)}</span>
          ${renderStars(p.rating)}
        </div>

        <div class="best-row">
          <button class="btn btn-primary" data-add="${p.id}">
            <i class="fa-solid fa-bag-shopping"></i>
            Add to Cart
          </button>
          <button class="btn btn-ghost" data-quick="${p.id}">
            <i class="fa-solid fa-eye"></i>
            Quick View
          </button>
        </div>
      </div>
    `;
    target.appendChild(el);
  });

  initRevealObserver();
}

/* =========================
   MODAL: QUICK VIEW
========================= */
function openQuickView(productId) {
  const p = getProductById(productId);
  if (!p) return;

  currentModalProduct = p;
  modalQty = 1;

  $("#modalImg").src = p.image;
  $("#modalTitle").textContent = p.name;
  $("#modalDesc").textContent = p.longDesc;
  $("#modalPrice").textContent = formatIDR(p.price);

  $("#modalBadge").textContent = p.stock;
  $("#modalBadge").style.color = p.stock === "Ready" ? "var(--success)" : "var(--warning)";

  $("#modalRating").innerHTML = renderStars(p.rating);
  $("#modalCategory").innerHTML = `
    <i class="fa-solid fa-tag"></i>
    <span>${escapeHTML(p.category)}</span>
  `;

  const ing = $("#modalIngredients");
  ing.innerHTML = "";
  p.ingredients.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = x;
    ing.appendChild(li);
  });

  $("#qtyValue").textContent = modalQty;

  showModal("#quickModal");
}

function closeQuickView() {
  hideModal("#quickModal");
  currentModalProduct = null;
}

/* =========================
   MODAL: GENERIC
========================= */
function showModal(selector) {
  const modal = $(selector);
  const overlay = $("#overlay");
  overlay.classList.add("show");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal(selector) {
  const modal = $(selector);
  const overlay = $("#overlay");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  // only hide overlay if no other modal/drawer open
  const anyModalOpen = $$(".modal").some((m) => m.classList.contains("show"));
  const cartOpen = $("#cartDrawer").classList.contains("open");

  if (!anyModalOpen && !cartOpen) overlay.classList.remove("show");
}

/* =========================
   CART DRAWER
========================= */
function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  $("#overlay").classList.add("show");
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");

  const anyModalOpen = $$(".modal").some((m) => m.classList.contains("show"));
  if (!anyModalOpen) $("#overlay").classList.remove("show");
}

function renderBadge() {
  $("#cartBadge").textContent = getCartCount();
}

function renderCart() {
  const wrap = $("#cartItems");
  wrap.innerHTML = "";

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="cart-item" style="grid-template-columns: 1fr;">
        <div>
          <h4 style="margin:0; font-family:'Playfair Display', serif;">Cart kosong</h4>
          <p style="margin:8px 0 0;">Tambahkan pudding favoritmu dulu ✨</p>
        </div>
      </div>
    `;
  } else {
    cart.forEach((item) => {
      const p = getProductById(item.id);
      if (!p) return;

      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${p.image}" alt="${escapeHTML(p.name)}" />
        <div>
          <h4>${escapeHTML(p.name)}</h4>
          <p>${formatIDR(p.price)} • ${p.stock}</p>

          <div class="cart-row">
            <span class="price">${formatIDR(p.price * item.qty)}</span>

            <div class="cart-actions">
              <div class="qty-control" style="padding:8px 10px;">
                <button class="qty-btn" data-cart-minus="${p.id}" aria-label="Kurangi">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" data-cart-plus="${p.id}" aria-label="Tambah">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>

              <button class="remove-btn" data-remove="${p.id}" aria-label="Hapus item">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      wrap.appendChild(el);
    });
  }

  const subtotal = getCartSubtotal();
  $("#subtotalText").textContent = formatIDR(subtotal);
  $("#totalText").textContent = formatIDR(subtotal);
}

/* =========================
   WHATSAPP MESSAGE BUILDER
========================= */
function buildCartMessage({ name, address, payment, note }) {
  const lines = [];
  lines.push("Halo Admin My Dessert Naswa, saya mau pesan:");
  lines.push("");

  cart.forEach((item) => {
    const p = getProductById(item.id);
    if (!p) return;
    const lineTotal = p.price * item.qty;
    lines.push(`${p.name} x${item.qty} = ${formatIDR(lineTotal)}`);
  });

  lines.push("");
  lines.push(`Total: ${formatIDR(getCartSubtotal())}`);
  lines.push(`Nama: ${name}`);
  lines.push(`Alamat: ${address}`);
  lines.push(`Pembayaran: ${payment}`);
  lines.push(`Catatan: ${note ? note : "-"}`);

  return lines.join("\n");
}

function openWhatsApp(text) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

/* Single product checkout */
function buyNowWhatsApp(productId, qty = 1) {
  const p = getProductById(productId);
  if (!p) return;

  const total = p.price * qty;
  const msg = [
    "Halo Admin My Dessert Naswa, saya mau pesan:",
    "",
    `${p.name} x${qty} = ${formatIDR(total)}`,
    "",
    `Total: ${formatIDR(total)}`,
    "Nama: -",
    "Alamat: -",
    "Pembayaran: -",
    "Catatan: -",
  ].join("\n");

  openWhatsApp(msg);
}

/* =========================
   CHECKOUT FLOW
========================= */
function openCheckout() {
  if (cart.length === 0) {
    toast("Cart masih kosong", "Tambah produk dulu sebelum checkout.");
    return;
  }
  showModal("#checkoutModal");
}

function closeCheckout() {
  hideModal("#checkoutModal");
}

function setFieldError(id, msg) {
  const el = document.querySelector(`[data-error="${id}"]`);
  if (el) el.textContent = msg || "";
}

function validateCheckoutForm() {
  const name = $("#coName").value.trim();
  const address = $("#coAddress").value.trim();

  let ok = true;

  setFieldError("coName", "");
  setFieldError("coAddress", "");

  if (!name) {
    setFieldError("coName", "Nama wajib diisi.");
    ok = false;
  }
  if (!address) {
    setFieldError("coAddress", "Alamat wajib diisi.");
    ok = false;
  }

  return ok;
}

/* =========================
   CONTACT FORM (WhatsApp)
========================= */
function validateContactForm() {
  const name = $("#cName").value.trim();
  const phone = $("#cPhone").value.trim();
  const msg = $("#cMsg").value.trim();

  setFieldError("cName", "");
  setFieldError("cPhone", "");
  setFieldError("cMsg", "");

  let ok = true;

  if (!name) {
    setFieldError("cName", "Nama wajib diisi.");
    ok = false;
  }

  if (!phone || phone.length < 9) {
    setFieldError("cPhone", "Nomor WhatsApp tidak valid.");
    ok = false;
  }

  if (!msg || msg.length < 5) {
    setFieldError("cMsg", "Pesan minimal 5 karakter.");
    ok = false;
  }

  return ok;
}

function sendContactWhatsApp() {
  const name = $("#cName").value.trim();
  const phone = $("#cPhone").value.trim();
  const msg = $("#cMsg").value.trim();

  const text = [
    "Halo Admin My Dessert Naswa, saya mau tanya:",
    "",
    `Nama: ${name}`,
    `WhatsApp: ${phone}`,
    `Pesan: ${msg}`,
  ].join("\n");

  openWhatsApp(text);
}

/* =========================
   TYPING EFFECT
========================= */
function typingEffect(el, words) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex >= word.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 65);
  };

  tick();
}

/* =========================
   SCROLL REVEAL
========================= */
let revealObserver = null;

function initRevealObserver() {
  if (revealObserver) revealObserver.disconnect();

  const items = $$(".reveal");
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => revealObserver.observe(el));
}

/* =========================
   ACTIVE NAV HIGHLIGHT
========================= */
function initActiveNav() {
  const sections = ["home", "best-seller", "menu", "reviews", "faq", "contact"].map((id) => ({
    id,
    el: document.getElementById(id),
  }));

  const links = $$(".nav-link");

  const setActive = (id) => {
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
  );

  sections.forEach((s) => s.el && obs.observe(s.el));
}

/* =========================
   BACK TO TOP
========================= */
function initBackToTop() {
  const btn = $("#backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =========================
   MOBILE MENU
========================= */
function initMobileMenu() {
  const burger = $("#hamburger");
  const menu = $("#mobileMenu");

  const toggle = () => {
    burger.classList.toggle("active");
    menu.classList.toggle("open");
    const open = menu.classList.contains("open");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  };

  burger.addEventListener("click", toggle);

  $$(".m-link").forEach((a) => {
    a.addEventListener("click", () => {
      if (menu.classList.contains("open")) toggle();
    });
  });
}

/* =========================
   REVIEWS CAROUSEL
========================= */
function renderReviews() {
  const track = $("#reviewTrack");
  const dots = $("#reviewDots");

  track.innerHTML = "";
  dots.innerHTML = "";

  reviews.forEach((r, idx) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-top">
        <div class="review-person">
          <div class="avatar">${escapeHTML(r.name.slice(0, 1).toUpperCase())}</div>
          <div>
            <div class="review-name">${escapeHTML(r.name)}</div>
            <div class="review-note">${escapeHTML(r.note)}</div>
          </div>
        </div>
        ${renderStars(r.rating)}
      </div>

      <p class="review-text">“${escapeHTML(r.text)}”</p>
    `;
    track.appendChild(card);

    const dot = document.createElement("button");
    dot.className = "dot-btn";
    dot.setAttribute("aria-label", `Review ${idx + 1}`);
    dot.addEventListener("click", () => {
      reviewIndex = idx;
      updateReviewCarousel();
      restartReviewAuto();
    });
    dots.appendChild(dot);
  });

  updateReviewCarousel();
}

function updateReviewCarousel() {
  const track = $("#reviewTrack");
  track.style.transform = `translateX(-${reviewIndex * 100}%)`;

  const dotBtns = $$(".dot-btn", $("#reviewDots"));
  dotBtns.forEach((d, i) => d.classList.toggle("active", i === reviewIndex));
}

function nextReview() {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  updateReviewCarousel();
}

function prevReview() {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  updateReviewCarousel();
}

function restartReviewAuto() {
  if (reviewTimer) clearInterval(reviewTimer);
  reviewTimer = setInterval(nextReview, 4200);
}

/* =========================
   FAQ RENDER + ACCORDION
========================= */
function renderFAQ() {
  const wrap = $("#faqWrap");
  wrap.innerHTML = "";

  faqs.forEach((f, idx) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `
      <button class="faq-q" aria-expanded="false">
        <span>${escapeHTML(f.q)}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="faq-a">
        <div>
          <p>${escapeHTML(f.a)}</p>
        </div>
      </div>
    `;

    const btn = $(".faq-q", item);
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // close others (premium accordion behavior)
      $$(".faq-item", wrap).forEach((x) => {
        x.classList.remove("open");
        const b = $(".faq-q", x);
        if (b) b.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });

    wrap.appendChild(item);

    // open first by default
    if (idx === 0) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
}

/* =========================
   EVENTS (DELEGATION)
========================= */
function initDelegatedClicks() {
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    const quickBtn = e.target.closest("[data-quick]");
    const buyBtn = e.target.closest("[data-buy]");
    const removeBtn = e.target.closest("[data-remove]");
    const minusBtn = e.target.closest("[data-cart-minus]");
    const plusBtn = e.target.closest("[data-cart-plus]");

    if (addBtn) {
      const id = addBtn.getAttribute("data-add");
      addToCart(id, 1);
      toast("Added to cart", "Produk berhasil ditambahkan.");
      return;
    }

    if (quickBtn) {
      const id = quickBtn.getAttribute("data-quick");
      openQuickView(id);
      return;
    }

    if (buyBtn) {
      const id = buyBtn.getAttribute("data-buy");
      buyNowWhatsApp(id, 1);
      return;
    }

    if (removeBtn) {
      const id = removeBtn.getAttribute("data-remove");
      removeFromCart(id);
      toast("Item dihapus", "Produk sudah dihapus dari cart.");
      return;
    }

    if (minusBtn) {
      const id = minusBtn.getAttribute("data-cart-minus");
      const item = cart.find((x) => x.id === id);
      if (!item) return;
      updateCartQty(id, item.qty - 1);
      return;
    }

    if (plusBtn) {
      const id = plusBtn.getAttribute("data-cart-plus");
      const item = cart.find((x) => x.id === id);
      if (!item) return;
      updateCartQty(id, item.qty + 1);
      return;
    }
  });
}

/* =========================
   INIT UI CONTROLS
========================= */
function initControls() {
  // Search
  $("#searchInput").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  // Filters
  $$(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      renderProducts();
    });
  });

  // Sorting
  $("#sortSelect").addEventListener("change", (e) => {
    activeSort = e.target.value;
    renderProducts();
  });

  // Cart open/close
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);

  // Overlay click closes
  $("#overlay").addEventListener("click", () => {
    closeCart();
    closeQuickView();
    closeCheckout();
  });

  // Hero order button -> open cart or jump menu
  $("#heroOrderBtn").addEventListener("click", () => {
    // premium behavior: open cart if already has items, else scroll to menu
    if (cart.length > 0) openCart();
    else document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });

 document.addEventListener("click", (e) => {
  const modal = $("#quickModal");
  if (!modal.classList.contains("show")) return;

  if (e.target.closest("#modalAddCart")) return;
  if (e.target.closest("[data-quick]")) return;
  if (e.target.closest("#qtyPlus") || e.target.closest("#qtyMinus")) return;
  if (e.target.closest("#modalBuyNow")) return;

  closeQuickView();
});


  // Modal qty
  $("#qtyMinus").addEventListener("click", () => {
    modalQty = Math.max(1, modalQty - 1);
    $("#qtyValue").textContent = modalQty;
  });

  $("#qtyPlus").addEventListener("click", () => {
    modalQty = Math.min(99, modalQty + 1);
    $("#qtyValue").textContent = modalQty;
  });

  // Modal add cart
  $("#modalAddCart").addEventListener("click", () => {
    if (!currentModalProduct) return;
    addToCart(currentModalProduct.id, modalQty);
    toast("Added to cart", `Qty ${modalQty} ditambahkan.`);
    closeQuickView();
  });

  // Modal buy now
  $("#modalBuyNow").addEventListener("click", () => {
    if (!currentModalProduct) return;
    buyNowWhatsApp(currentModalProduct.id, modalQty);
  });

  // Clear cart
  $("#clearCartBtn").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    renderBadge();
    toast("Cart dibersihkan", "Silakan pilih menu lagi ✨");
  });

  // Checkout
  $("#checkoutBtn").addEventListener("click", () => {
    openCheckout();
  });

  $("#checkoutClose").addEventListener("click", closeCheckout);

  $("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateCheckoutForm()) return;

    const name = $("#coName").value.trim();
    const address = $("#coAddress").value.trim();
    const payment = $("#coPay").value;
    const note = $("#coNote").value.trim();

    const msg = buildCartMessage({ name, address, payment, note });
    openWhatsApp(msg);

    toast("Checkout dibuka", "Pesan siap dikirim via WhatsApp.");
    closeCheckout();
  });

  // Contact form
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateContactForm()) return;
    sendContactWhatsApp();
    toast("Terkirim", "WhatsApp siap dibuka.");
  });

  // Social WhatsApp link
  $("#socialWhatsApp").addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp("Halo Admin My Dessert Naswa 👋 Saya mau order / tanya menu.");
  });

  // Reviews controls
  $("#nextReview").addEventListener("click", () => {
    nextReview();
    restartReviewAuto();
  });

  $("#prevReview").addEventListener("click", () => {
    prevReview();
    restartReviewAuto();
  });

  // Escape key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeQuickView();
      closeCheckout();
    }
  });
}

/* =========================
   INIT
========================= */
function init() {
  // Year
  $("#yearNow").textContent = new Date().getFullYear();

  // Load cart
  loadCart();
  renderCart();
  renderBadge();

  // Render sections
  renderBestSeller();
  renderProducts();
  renderReviews();
  renderFAQ();

  // Effects
  typingEffect($("#typingText"), ["Vanilla", "Coklat", "Oreo", "Caramel"]);
  initRevealObserver();
  initActiveNav();
  initBackToTop();
  initMobileMenu();

  // Events
  initDelegatedClicks();
  initControls();

  // Auto reviews
  restartReviewAuto();
}

document.addEventListener("DOMContentLoaded", init);
