document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Ikon Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Terapkan Data dari WEDDING_CONFIG
  populateWeddingData();

  // 2. Tangkap Parameter Nama Tamu (?to=Nama+Tamu)
  initGuestNameFromURL();

  // 3. Logika Buka Undangan, Musik Otomatis & Bunga/Daun Berguguran
  initCoverAndAudio();

  // 4. Hitung Mundur Waktu Nyata
  initCountdown();

  // 5. Fitur Salin Rekening & Salin Alamat
  initCopyActions();

  // 6. Animasi Scroll Reveal (Konten & Ornamen)
  initScrollReveal();

  // 7. Navigasi Mengambang Otomatis Hilang Saat Menyentuh Footer
  initFooterObserver();

  // 8. RSVP & Ucapan (Sinkron Google Sheets + Fallback LocalStorage)
  initRSVP();
});

/* =========================================================
   POPULASI DATA DARI CONFIG.JS
========================================================= */
function populateWeddingData() {
  const cfg = WEDDING_CONFIG;

  setText("cover-initials", cfg.initials);
  setText("cover-names", cfg.coupleShortName);
  setText("cover-date", cfg.weddingDateDisplay);
  setText("hero-names", cfg.coupleShortName);
  setText("hero-date", cfg.weddingDateNumeric);
  setText("closing-names", cfg.coupleShortName);

  const heroPhoto = document.getElementById("hero-photo");
  if (heroPhoto) heroPhoto.src = cfg.heroPhoto;

  const quoteEl = document.getElementById("hero-quote");
  if (quoteEl) {
    quoteEl.innerHTML = `${cfg.quoteText}<footer>${cfg.quoteSource}</footer>`;
  }

  // Mempelai Pria
  setText("groom-name", cfg.groom.fullName);
  setHTML("groom-parents", cfg.groom.parents);
  const groomPhoto = document.getElementById("groom-photo");
  if (groomPhoto) groomPhoto.src = cfg.groom.photo;
  const groomIg = document.getElementById("groom-ig");
  if (groomIg) groomIg.href = cfg.groom.instagramUrl;
  setText("groom-ig-text", cfg.groom.instagramHandle);

  // Mempelai Wanita
  setText("bride-name", cfg.bride.fullName);
  setHTML("bride-parents", cfg.bride.parents);
  const bridePhoto = document.getElementById("bride-photo");
  if (bridePhoto) bridePhoto.src = cfg.bride.photo;
  const brideIg = document.getElementById("bride-ig");
  if (brideIg) brideIg.href = cfg.bride.instagramUrl;
  setText("bride-ig-text", cfg.bride.instagramHandle);

  // Akad Nikah
  setText("akad-date", cfg.akad.dateText);
  setText("akad-time", cfg.akad.timeText);
  setText("akad-venue", cfg.akad.venueName);
  setText("akad-address", cfg.akad.address);
  const akadCal = document.getElementById("akad-calendar-btn");
  if (akadCal) akadCal.href = buildGoogleCalendarUrl(cfg.akad);
  const akadMap = document.getElementById("akad-maps-btn");
  if (akadMap) akadMap.href = cfg.akad.mapsUrl;

  // Resepsi Pernikahan
  setText("resepsi-date", cfg.resepsi.dateText);
  setText("resepsi-time", cfg.resepsi.timeText);
  setText("resepsi-venue", cfg.resepsi.venueName);
  setText("resepsi-address", cfg.resepsi.address);
  const resepsiCal = document.getElementById("resepsi-calendar-btn");
  if (resepsiCal) resepsiCal.href = buildGoogleCalendarUrl(cfg.resepsi);
  const resepsiMap = document.getElementById("resepsi-maps-btn");
  if (resepsiMap) resepsiMap.href = cfg.resepsi.mapsUrl;

  // Render Rekening Transfer
  const bankList = document.getElementById("bank-list");
  if (bankList) {
    bankList.innerHTML = cfg.bankAccounts
      .map(
        (acc) => `
        <div class="bank-card">
          <div>
            <div class="bank-name">${escapeHtml(acc.bank)}</div>
            <div class="bank-number">${escapeHtml(acc.number)}</div>
            <div class="bank-holder">${escapeHtml(acc.holder)}</div>
          </div>
          <button type="button" class="btn-copy-mini" data-copy="${escapeHtml(acc.number)}">
            <i data-lucide="copy" class="icon-xs"></i>
            <span>Salin</span>
          </button>
        </div>
      `
      )
      .join("");
  }

  // Render 4 Kado Shopee Affiliate (Layout 2 Kolom)
  const productGrid = document.getElementById("gift-products-grid");
  if (productGrid) {
    productGrid.innerHTML = cfg.giftProducts
      .map(
        (item) => `
        <article class="product-card">
          <div class="product-img-wrap">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" class="product-img" loading="lazy">
          </div>
          <div class="product-body">
            <h5 class="product-title">${escapeHtml(item.name)}</h5>
            <span class="product-price">${escapeHtml(item.price)}</span>
            <a href="${escapeHtml(item.affiliateUrl)}" target="_blank" rel="noopener noreferrer" class="btn-shopee">
              <i data-lucide="shopping-bag" class="icon-xs"></i>
              <span>Beli di Shopee</span>
            </a>
          </div>
        </article>
      `
      )
      .join("");
  }

  // Alamat Pengiriman
  setText("shipping-recipient", cfg.shipping.recipient);
  setText("shipping-address-text", cfg.shipping.address);

  // Footer Branding
  setText("footer-brand-name", cfg.branding.name);
  setText("footer-brand-tagline", cfg.branding.tagline);
  const brandLink = document.getElementById("footer-brand-link");
  if (brandLink) brandLink.href = cfg.branding.url;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function buildGoogleCalendarUrl(eventObj) {
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = encodeURIComponent(eventObj.title);
  const dates = `${eventObj.calendarStartUTC}/${eventObj.calendarEndUTC}`;
  const location = encodeURIComponent(`${eventObj.venueName}, ${eventObj.address}`);
  const details = encodeURIComponent(`Undangan Pernikahan ${WEDDING_CONFIG.coupleShortName} - ${eventObj.title}`);
  return `${baseUrl}&text=${text}&dates=${dates}&location=${location}&details=${details}`;
}

/* =========================================================
   NAMA TAMU DINAMIS DARI URL (?to=)
========================================================= */
function initGuestNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  const guestParam = params.get("to") || params.get("kepada");
  if (guestParam && guestParam.trim() !== "") {
    const cleanName = guestParam.trim();
    setText("guest-name", cleanName);
    const rsvpNameInput = document.getElementById("rsvp-name");
    if (rsvpNameInput) rsvpNameInput.value = cleanName;
  }
}

/* =========================================================
   COVER, PEMUTAR MUSIK OTOMATIS & KELOPAK BUNGA/DAUN JATUH
========================================================= */
let isInvitationOpened = false;
let petalsInterval = null;

function initCoverAndAudio() {
  const btnOpen = document.getElementById("btn-open-invitation");
  const cover = document.getElementById("cover");
  const audio = document.getElementById("bg-music");
  const btnMusic = document.getElementById("btn-toggle-music");
  const floatingNav = document.getElementById("floating-nav");

  if (btnOpen && cover) {
    btnOpen.addEventListener("click", () => {
      isInvitationOpened = true;
      cover.classList.add("is-opened");
      document.documentElement.classList.remove("scroll-locked");

      if (floatingNav) {
        floatingNav.classList.remove("is-hidden");
      }

      // Mulai animasi kelopak bunga & daun berguguran yang meriah
      startFallingPetals();

      if (audio) {
        audio.play().then(() => {
          btnMusic?.classList.add("is-playing");
        }).catch(() => {
          btnMusic?.classList.remove("is-playing");
        });
      }
    });
  }

  if (btnMusic && audio) {
    btnMusic.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        btnMusic.classList.add("is-playing");
      } else {
        audio.pause();
        btnMusic.classList.remove("is-playing");
      }
    });
  }
}

function startFallingPetals() {
  const container = document.getElementById("falling-petals-layer");
  if (!container || petalsInterval) return;

  // 4 variasi bentuk SVG: kelopak bunga terracotta, kelopak krem mawar, daun sage, dan daun zaitun rustic
  const particleShapes = [
    `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C16.5 6.5 19 11.5 16.5 17C14.5 21 9.5 21 7.5 17C5 11.5 7.5 6.5 12 2Z" fill="#D49A7A"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3C17 6 20 12 16 18C13.5 21.5 9.5 20.5 8 17C5.5 11.5 7.5 6 12 3Z" fill="#E6C6B3"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none"><path d="M19 4C11 5 6 10 5 19C14 18 19 13 19 4Z" fill="#7D8C6B"/><path d="M5 19L16 8" stroke="#5E6D4E" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C15.5 7 16 14 12 21C8 14 8.5 7 12 2Z" fill="#9BAA88"/><path d="M12 3V20" stroke="#738262" stroke-width="1" stroke-linecap="round"/></svg>`
  ];

  function spawnParticle() {
    if (!container) return;

    const particle = document.createElement("div");
    particle.className = "falling-particle";

    const inner = document.createElement("span");
    inner.className = "falling-particle-inner";
    inner.innerHTML = particleShapes[Math.floor(Math.random() * particleShapes.length)];

    // Pengaturan acak agar jatuhnya alami dan meriah
    const leftPercent = Math.random() * 96;
    const sizePx = (Math.random() * 9 + 12).toFixed(1); // 12px - 21px
    const fallDuration = (Math.random() * 4.5 + 6.5).toFixed(2); // 6.5s - 11s
    const swayDuration = (Math.random() * 1.8 + 2.2).toFixed(2); // 2.2s - 4s
    const swayDistance = Math.floor(Math.random() * 26 + 14); // 14px - 40px
    const opacityVal = (Math.random() * 0.25 + 0.7).toFixed(2); // 0.70 - 0.95

    particle.style.left = `${leftPercent}%`;
    particle.style.setProperty("--p-size", `${sizePx}px`);
    particle.style.setProperty("--fall-duration", `${fallDuration}s`);
    particle.style.setProperty("--p-opacity", opacityVal);

    inner.style.setProperty("--sway-duration", `${swayDuration}s`);
    inner.style.setProperty("--sway-dist", `${swayDistance}px`);

    particle.appendChild(inner);
    container.appendChild(particle);

    // Hapus partikel setelah selesai jatuh agar memori tetap ringan
    setTimeout(() => {
      particle.remove();
    }, parseFloat(fallDuration) * 1000 + 200);
  }

  // Gelombang awal (22 kelopak & daun langsung bermunculan meriah saat buka undangan)
  for (let i = 0; i < 22; i++) {
    setTimeout(spawnParticle, i * 140);
  }

  // Kelanjutan guguran bunga & daun secara berkala
  petalsInterval = setInterval(spawnParticle, 420);
}

/* =========================================================
   HITUNG MUNDUR (COUNTDOWN)
========================================================= */
function initCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.countdownTargetISO).getTime();
  const statusEl = document.getElementById("countdown-status");

  function updateTimer() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      setText("cd-days", "00");
      setText("cd-hours", "00");
      setText("cd-minutes", "00");
      setText("cd-seconds", "00");
      if (statusEl) statusEl.textContent = "Alhamdulillah, acara pernikahan sedang/telah berlangsung.";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setText("cd-days", String(days).padStart(2, "0"));
    setText("cd-hours", String(hours).padStart(2, "0"));
    setText("cd-minutes", String(minutes).padStart(2, "0"));
    setText("cd-seconds", String(seconds).padStart(2, "0"));
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* =========================================================
   SALIN NOMOR REKENING & ALAMAT PENGANTIN
========================================================= */
function initCopyActions() {
  document.addEventListener("click", (e) => {
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      const textToCopy = copyBtn.getAttribute("data-copy");
      copyTextToClipboard(textToCopy, "Nomor rekening berhasil disalin!");
    }
  });

  const btnCopyAddress = document.getElementById("btn-copy-address");
  if (btnCopyAddress) {
    btnCopyAddress.addEventListener("click", () => {
      const fullShipping = `${WEDDING_CONFIG.shipping.recipient} — ${WEDDING_CONFIG.shipping.address}`;
      copyTextToClipboard(fullShipping, "Alamat pengantin berhasil disalin!");
    });
  }
}

function copyTextToClipboard(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => showToast(message));
  } else {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast(message);
  }
}

let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* =========================================================
   ANIMASI MUNCUL SAAT DI-SCROLL (KONTEN & ORNAMEN)
========================================================= */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* =========================================================
   NAVIGASI MENGAMBANG OTOMATIS HILANG SAAT MENYENTUH FOOTER
========================================================= */
function initFooterObserver() {
  const footer = document.getElementById("sec-footer");
  const floatingNav = document.getElementById("floating-nav");
  if (!footer || !floatingNav) return;

  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!isInvitationOpened) return;
        if (entry.isIntersecting) {
          floatingNav.classList.add("is-hidden");
        } else {
          floatingNav.classList.remove("is-hidden");
        }
      });
    },
    { threshold: 0.08 }
  );

  footerObserver.observe(footer);
}

/* =========================================================
   RSVP & UCAPAN (GOOGLE SHEETS + LOCAL FALLBACK)
========================================================= */
const LOCAL_WISHES_KEY = "rustic_wedding_rsvp_wishes_v1";

function initRSVP() {
  const form = document.getElementById("rsvp-form");
  const feedback = document.getElementById("rsvp-feedback");
  const submitBtn = document.getElementById("btn-submit-rsvp");

  loadWishes();

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.getElementById("rsvp-name").value.trim();
    const jumlah = document.getElementById("rsvp-guests").value;
    const status = document.getElementById("rsvp-status").value;
    const ucapan = document.getElementById("rsvp-message").value.trim();

    if (!nama || !ucapan) {
      feedback.className = "form-feedback error";
      feedback.textContent = "Mohon lengkapi nama dan ucapan Anda.";
      return;
    }

    submitBtn.disabled = true;
    feedback.className = "form-feedback";
    feedback.textContent = "Mengirim konfirmasi...";

    const payload = {
      nama,
      jumlah,
      status,
      ucapan,
      waktu: new Date().toLocaleString("id-ID")
    };

    try {
      const scriptUrl = WEDDING_CONFIG.googleSheetsScriptUrl;
      if (scriptUrl && scriptUrl.startsWith("https://")) {
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      saveWishLocally(payload);
      renderWishesList(getLocalWishes());

      feedback.className = "form-feedback success";
      feedback.textContent = "Terima kasih! Konfirmasi & ucapan Anda telah tersimpan.";
      document.getElementById("rsvp-message").value = "";
    } catch (err) {
      feedback.className = "form-feedback error";
      feedback.textContent = "Terjadi kendala jaringan. Silakan coba lagi.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

async function loadWishes() {
  const scriptUrl = WEDDING_CONFIG.googleSheetsScriptUrl;
  if (scriptUrl && scriptUrl.startsWith("https://")) {
    try {
      const res = await fetch(scriptUrl);
      const data = await res.json();
      if (Array.isArray(data)) {
        renderWishesList(data);
        return;
      }
    } catch (e) {
      // Gunakan fallback lokal jika GET belum tersedia
    }
  }
  renderWishesList(getLocalWishes());
}

function getLocalWishes() {
  try {
    const raw = localStorage.getItem(LOCAL_WISHES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  return [
    {
      nama: "Raka & Keluarga",
      jumlah: "2 Orang",
      status: "Hadir",
      ucapan: "Selamat menempuh hidup baru Bima & Sekar! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah."
    }
  ];
}

function saveWishLocally(newWish) {
  const current = getLocalWishes();
  current.unshift(newWish);
  localStorage.setItem(LOCAL_WISHES_KEY, JSON.stringify(current));
}

function renderWishesList(wishes) {
  const container = document.getElementById("wishes-list");
  const countEl = document.getElementById("wishes-count");
  if (!container) return;

  if (countEl) countEl.textContent = wishes.length;

  if (!wishes.length) {
    container.innerHTML = `<p class="empty-wishes">Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu!</p>`;
    return;
  }

  container.innerHTML = wishes
    .map(
      (item) => `
      <div class="wish-item">
        <div class="wish-header">
          <span class="wish-author">${escapeHtml(item.nama)}</span>
          <span class="wish-badge">${escapeHtml(item.status)}</span>
        </div>
        <p class="wish-text">${escapeHtml(item.ucapan)}</p>
      </div>
    `
    )
    .join("");
}

/* =========================================================
   HELPER FUNCTIONS
========================================================= */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}