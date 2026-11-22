# Rumah Cetak
Situs statis (HTML/CSS/JS), tanpa build.

## Mengedit
- Logo: ganti `assets/logo.svg` dan `favicon.svg` dengan logo asli Anda (nama file sama).
- Angka statistik dan testimoni di `data.js` hanyalah contoh, ganti dengan data asli.
- Semua teks produk, harga, paket, nomor WA, dan demo ada di `assets/data.js`.
- Tema undangan web baru: salin `undangan-web/demo/rustic/`, ganti nama, lalu daftarkan di `data.js`.
- Undangan klien: buat `u/nama-klien/index.html`.

## Deploy di GitHub Pages
1. Buat repo, upload seluruh isi folder ini ke branch `main`.
2. Settings > Pages > Source: Deploy from a branch > `main` / root.
3. Custom domain: `rumahcetak.my.id` (file `CNAME` sudah ada). Di DNS, buat A record ke 185.199.108.153 / .109.153 / .110.153 / .111.153, lalu centang Enforce HTTPS.
4. Tanpa domain? Hapus `CNAME`. Semua link relatif, jadi tetap jalan di `username.github.io/repo`.

## Foto produk
Taruh foto di `assets/img/` (rasio 4:3 paling pas), lalu isi `img:"assets/img/jasmine.jpg"` pada produk di `data.js`. Kosong = tampil placeholder.
Estimasi harga di panel beranda diatur di `est` pada `data.js`.

## Pelacakan, ulasan, rating, terlaris
Lihat `PANDUAN-SHEETS.md`. Selama `api` di `data.js` kosong, fitur ini nonaktif dan tidak menampilkan angka apa pun.
`demo:true` hanya untuk menguji tampilan dengan data contoh berlabel.

## v6
- Footer baru (bar Lacak pesanan + 4 kolom). Isi `email`, `fb`, `igUrl` di `contact` (data.js) agar ikon/email tampil.
- Menu FAQ menggulir ke bagian FAQ di beranda. Halaman /faq/ sudah dihapus.
- Ulasan memakai carousel otomatis jika lebih banyak dari muat. `Code.gs` terbaru mengirim 20 ulasan: tempel ulang, lalu Deploy > Manage deployments > New version.

## v7
- Tampilan baru (font Playfair Display + Plus Jakarta Sans, palet hijau-kuning). Warna ada di blok `:root` pada `assets/style.css` (--dk hijau tua, --g hijau, --y kuning).
- Teks beranda (judul hero, bio, label bagian) ada di `index.html`; bar promo, paket, kalkulator, produk, FAQ ada di `assets/data.js`.
- Foto hero: isi `heroImg` di data.js. Foto karya: isi `img` pada produk.
- Kolom `Nama` baru di sheet Pesanan (lihat PANDUAN-SHEETS.md); `Code.gs` perlu dideploy ulang.

## v8
- Harga undangan fisik diatur di baris paling atas `assets/data.js`: `const F={min:100,hemat:1650,biasa:2000}`. 1–99 lembar = jumlah x biasa, 100+ = jumlah x hemat. Semua tulisan harga (hero, kartu, paket, FAQ, kalkulator) mengikuti angka ini.
- Kartu paket di HP: tiga kartu ringkas + panel rincian di bawahnya.
- Animasi zoom saat kursor diarahkan / ditekan diatur di bagian "animasi interaktif" pada `assets/style.css` (hapus blok itu bila tidak diinginkan).
- Ulasan >2 berputar pelan dari bawah ke atas hanya saat bagian itu terlihat; kecepatan di `live.js` (angka `H/22` = piksel per detik).
- Etalase: isi `img` pada tiap item `cats` di data.js untuk foto kartu etalase.

## v9
Backend pindah dari Google Sheets/Apps Script ke Supabase (lihat panduan panel admin). Isi `sb:{url,key}` di assets/data.js.
Katalog dibaca dari panel lewat assets/catalog.js. Code.gs dan PANDUAN-SHEETS.md tidak dipakai lagi.

## v10
Promo, paket bundling, dan aturan harga fisik dibaca dari panel (tabel settings). Jika tabel kosong atau gagal, web memakai data.js.

## v11
Klik produk dikirim ke Supabase (track_click) dan label otomatis Terlaris/Populer/Baru. Perbaikan: rating, terjual, dan label sekarang juga tampil di halaman katalog (sebelumnya hanya di beranda).

## v12
Tampilan (warna, hero, urutan bagian, lebar, font, profil), galeri, dan aturan harga kalkulator dibaca dari panel (Supabase). Mode pratinjau `?preview=1` hanya menerima pesan dari `adminOrigins` di data.js. Foto dari Supabase kini tampil di semua halaman.

## v13 (perbaikan tampilan)
Perubahan dari v12:
- **Paket**: harga selalu satu baris; ukuran huruf mengikuti lebar kartu (di HP, kata "mulai" ada di baris kecil di atas nominal).
- **Ulasan & FAQ**: "Kata klien" kini bagian sendiri (`#ulasan`) dan FAQ berada di bawahnya. Tanpa ulasan, bagian itu hilang dan FAQ naik otomatis. Posisinya bisa diatur lewat Editor Website di panel (urutan bagian).
- **Kalkulator**: batas bawah slider mengikuti minimal pesan produk (min. 100 → slider mulai di 100). Layanan harga tetap (video) bisa ditambah undangan web, dengan rincian tertulis.
- **Demo**: popup HP dihapus. Tombol demo langsung membuka link demo di tab baru. Tombol demo di hero memakai `heroDemo` (diisi dari Editor Website), atau demo produk pertama.
- **Kartu**: label layanan dan label Terlaris/Populer/Baru tidak bertabrakan di HP; kartu etalase tanpa garis bawah dan tanpa teks "Buka Etalase"; kartu produk di HP 2 kolom ala marketplace.
- **Hero di HP**: tata letak sama seperti desktop (teks kiri, gambar kanan), hanya diperkecil.
- **Bar promo**: satu baris; tombol berbentuk pil kuning selalu di kanan.
- **Ikon**: semua ikon ada di `assets/icons/` (satu berkas SVG per ikon). Ganti berkas dengan nama sama, ikon berubah di semua halaman. Daftar dan ukuran px ada di `assets/icons/ICONS.md`. Logo dan favicon juga di folder itu (`logo.svg`, `favicon.svg`, `favicon-*.png`); `favicon.svg` di root dan `assets/logo.svg` sudah dipindahkan.

Langkah: unggah seluruh isi zip ke repo (timpa file lama), hapus `favicon.svg` dan `assets/logo.svg` lama bila masih ada. Tidak ada perubahan SQL.
Catatan: `assets/override.js` tidak dipakai halaman mana pun; boleh dihapus.

## v14
- **FAQ dan ulasan** berada di kolom kanan "Dedikasi Studio Rumahan" (FAQ di atas, ulasan di bawahnya; di HP menumpuk). Urutan dan tampil/sembunyi diatur di Editor Website panel.
- **Harga per produk** (satuan, harga, minimal pesan, harga hemat) dibaca dari panel; `assets/data.js` hanya cadangan. Kartu, kalkulator, dan halaman produk memakai angka yang sama. Harga promo dari panel menimpa harga katalog.
- **Halaman produk** `produk/?p=nama-produk` (berkas `produk/index.html` + `assets/produk.js`): foto/video, harga, deskripsi, estimasi biaya, tombol demo, dan pesan WhatsApp berisi produk, jumlah, hitungan harga, dan link. Semua kartu produk mengarah ke sini.
- **Galeri** mendukung item dari link (foto langsung, YouTube, Google Drive) dengan judul, keterangan, deskripsi.
- **Kontak dan profil** (WA, telepon, email, alamat, jam layanan, Facebook, Instagram, tagline, Tentang Kami) dari panel; footer menyembunyikan bagian yang kosong tanpa merusak tata letak.
- Perbaikan: tombol bar promo mendukung tujuan WhatsApp (`wa:pesan`) dan halaman relatif.
Langkah: jalankan SQL Tahap 6 di panel (lihat panduan panel), lalu unggah isi zip ini ke repo (timpa).
