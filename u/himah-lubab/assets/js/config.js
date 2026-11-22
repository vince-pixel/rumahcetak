/**
 * PUSAT KONFIGURASI DATA UNDANGAN PERNIKAHAN
 * Ubah data di bawah ini untuk menyesuaikan nama mempelai, jadwal, rekening, kado, dan URL Google Sheets.
 */
const WEDDING_CONFIG = {
  // 1. Data Mempelai
  initials: "H & L",
  coupleShortName: "Himah & Lubab",
  weddingDateDisplay: "Senin, 30 November 2026",
  weddingDateNumeric: "30 . 11 . 2026",
  countdownTargetISO: "2026-11-30T10:00:00+08:00",

  heroPhoto: "assets/images/hero.svg",
  quoteText: "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.”",
  quoteSource: "— QS. Ar-Rum: 21",

  bride: {
    fullName: "Muhimatul 'Aliyah",
    parents: "Putri Ke-3 dari<br><strong>Bapak Maftukhin</strong><br>&amp; <strong>Ibu Komariyah</strong>",
    photo: "assets/images/wanita.svg",
    instagramHandle: "@zhai_il",
    instagramUrl: "https://www.instagram.com/zhai_il?utm_source=ig_web_button_share_sheet&avpt=ZDNlZDc0MzIxNw=="
  },

  groom: {
    fullName: "Lubabul Mubahisin",
    parents: "Putra Ke-2 dari<br><strong>Bapak Sawabiqul Himam</strong><br>&amp; <strong>Ibu Khayati</strong>",
    photo: "assets/images/pria.svg",
    instagramHandle: "@lubab.babul",
    instagramUrl: "https://www.instagram.com/lubab.babul?utm_source=ig_web_button_share_sheet&gwpx=ZDNlZDc0MzIxNw=="
  },

  // 2. Jadwal & Lokasi Terpisah (Akad & Resepsi)
  akad: {
    title: "Akad Nikah Himah & Lubab",
    dateText: "Senin, 30 November 2026",
    timeText: "10.00 WIB s/d selesai",
    venueName: "Masjid Abu Bakar Ash Shidiq",
    address: "Bangunsari, Jatisari, Kedungreja Rt 04 Rw 06",
    // Format waktu UTC untuk Google Calendar: YYYYMMDDTHHMMSSZ (WIB = UTC+7, jadi 08:00 WIB = 01:00 UTC)
    calendarStartUTC: "20261129T230000Z",
    calendarEndUTC: "20261130T030000Z",
    mapsUrl: "https://maps.app.goo.gl/yQc6E4MfssguL7DE7"
  },

  resepsi: {
    title: "Resepsi Pernikahan Himah & Lubab",
    dateText: "Senin, 30 November 2026",
    timeText: "08.00 WIB s/d selesai",
    venueName: "Kediaman Mempelai Putri",
    address: "Bangunsari, Jatisari, Kedungreja Rt 04 Rw 06",
    // 11:00 WIB = 04:00 UTC, 14:00 WIB = 07:00 UTC
    calendarStartUTC: "20261129T230000Z",
    calendarEndUTC: "20261130T030000Z",
    mapsUrl: "https://maps.app.goo.gl/yQc6E4MfssguL7DE7"
  },

  // 3. Tanda Kasih — Transfer Bank / E-Wallet
  bankAccounts: [
    {
      bank: "Seabank",
      number: "901544265871",
      holder: "a.n. Muhimatul 'Aliyah"
    },
    {
      bank: "Seabank",
      number: "901851143113",
      holder: "a.n. Lubabul Mubahisin"
    },
    {
      bank: "Bank BCA",
      number: "8930768571",
      holder: "a.n. Lubabul Mubahisin"
    },
    {
      bank: "Bank BRI",
      number: "603301033886539",
      holder: "a.n. Lubabul Mubahisin"
    }
  ],

  // 4. Tanda Kasih — 4 Pilihan Kado Shopee Affiliate (Layout 2 Kolom)
  giftProducts: [
    {
      name: "BedCover Set Sprei Microfiber//AntiGeser",
      price: "Rp 2xx.xxx",
      image: "assets/images/kado-1.webp",
      affiliateUrl: "https://s.shopee.co.id/5AuBomoBjD"
    },
    {
      name: "Hampers Handuk Couple Bordir",
      price: "Rp 1xx.xxx",
      image: "assets/images/kado-2.webp",
      affiliateUrl: "https://s.shopee.co.id/AAIrn7fWNV"
    },
    {
      name: "Set Piring dan Mangkok Keramik 6 Pcs Motif Bunga",
      price: "Rp 7x.xxx",
      image: "assets/images/kado-3.webp",
      affiliateUrl: "https://s.shopee.co.id/2gCqqlWEtJ"
    },
    {
      name: "Kopi Set I Tea Set (Teko plus tutup 1 pcs, Cangkir 5 pcs, Lepek 5 pcs)",
      price: "Rp 1xx.xxx",
      image: "assets/images/kado-4.webp",
      affiliateUrl: "https://s.shopee.co.id/1qdjsU2sBL"
    }
  ],

  // Alamat Pengiriman Kado
  shipping: {
    recipient: "Penerima: Muhimatul 'Aliyah",
    address: "Bangunsari, Jatisari, Kedungreja Rt 04 Rw 06. Rumah Kayim Tukhin Jatisari"
  },

  // 5. Integrasi Google Sheets RSVP (Tempel URL Web App Google Apps Script Anda di sini)
  googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbxv6j4KelAZjC3I4iqvnU2bgm-5UPsUsmVGtCLooobNxgaG4vAL9wVMy-cIy-ixexJj/exec",

  // 6. Footer Branding Bisnis
  branding: {
    name: "Rumah Cetak",
    tagline: "Satu Tempat, Cetak Komplet • rumahcetak.my.id",
    url: "https://rumahcetak.my.id"
  }
};
