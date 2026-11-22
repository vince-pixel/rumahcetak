// ===== EDIT DI SINI: kontak, teks, produk, paket, kalkulator =====
// Foto: taruh di assets/img/ lalu isi img:"assets/img/nama.jpg". Kosong = tempat foto.
const F={min:100,hemat:1650,biasa:2000}; // 1–99 lembar = jumlah x biasa; 100+ = jumlah x hemat
const RP=n=>"Rp "+n.toLocaleString("id-ID");
window.SITE = {
  brand:"Rumah Cetak", tagline:"Satu Tempat, Cetak Komplet.",
  wa:"6281234567890", // format 62, tanpa + atau 0
  url:"https://rumahcetak.my.id", // dipakai untuk link di pesan WhatsApp
  sb:{url:"https://yvceewejfaqxidnprvdc.supabase.co",key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Y2Vld2VqZmFxeGlkbnBydmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNzEyNjUsImV4cCI6MjExMDY0NzI2NX0.Davm6iVfNMcwVn8C3gK1Uki0fRQAoiSDyHYvQM6UAF4"}, adminOrigins:["https://admin.rumahcetak.my.id"], // alamat panel admin yang boleh mengirim pratinjau langsung
  // Supabase: Project URL dan kunci publik (anon). Kosong = pelacakan/ulasan/rating nonaktif, katalog dari file ini
  api:"",     // URL Apps Script (/exec). Kosong = pelacakan/ulasan/rating nonaktif
  demo:false, // true = DATA CONTOH berlabel, hanya untuk uji tampilan
  heroImg:"", // foto kartu hero, mis. "assets/img/hero.jpg"
  kurir:{"JNE":"https://www.jne.co.id/id/tracking/trace","J&T":"https://www.jet.co.id/track","SiCepat":"https://www.sicepat.com/checkAwb","AnterAja":"https://anteraja.id/tracking","Pos Indonesia":"https://www.posindonesia.co.id/id/tracking"},
  promo:{label:"Promo Spesial",long:"Pesan Undangan Fisik min. 200 Pcs, <b>GRATIS Undangan Web Interaktif</b> senilai Rp 75.000!",short:"Cetak min. 200 pcs <b>Free Undangan Web!</b>",href:"#paket",link:"Klaim Kupon"}, // long kosong = bar disembunyikan
  contact:{email:"",fb:"",igUrl:"",phone:"+62 812-3456-7890",hours:"Senin–Sabtu, 09.00–17.00",loc:"Jakarta, Indonesia"}, // email/fb/igUrl kosong = disembunyikan
  nav:[
    {t:"Layanan",href:"layanan/",menu:[
      {g:"Digital",items:[["Undangan Web","undangan-web/"],["Undangan Video","undangan-video/"],["Jasa Desain","jasa-desain/"]]},
      {g:"Non-digital",items:[["Undangan Fisik","undangan-fisik/"],["Produk Lain",""],["Paket UMKM","umkm/"]]}]},
    {t:"Lacak Pesanan",href:"lacak/"},{t:"Galeri",href:"galeri/"},{t:"FAQ",href:"#faq",home:true},{t:"Tentang Kami",href:"#ftr"}],
  about:["Percetakan & Studio Kreatif Rumahan yang melayani pembuatan undangan fisik premium, undangan web interaktif, video reels, dan stiker kemasan UMKM siap tempel.","Sebagai percetakan dan studio kreatif rumahan, kami tidak memperlakukan pesanan Anda sebagai sekadar nomor antrean mesin industri massal. Setiap detail teks, lipatan kertas, dan garis potong kami awasi dengan ketelitian tinggi agar momen spesial Anda berjalan sempurna."],
  gallery:[], // isi: {img:"assets/img/foto1.jpg",cap:"Keterangan"}
  cats:[
    {id:"undangan-web",name:"Undangan Web",desc:"Daftar seluruh tema website pernikahan, demo online, form doa ucapan tamu, dan integrasi maps."},
    {id:"undangan-video",name:"Undangan Video",desc:"Video animasi gerak vertikal sinematik resolusi tinggi 1080p untuk status WA dan konten Instagram."},
    {id:"undangan-fisik",name:"Undangan Fisik",desc:"Koleksi kertas Jasmine, Kraft, Art Carton, Linen, harga lebih hemat mulai 100 lembar."},
    {id:"umkm",name:"Paket UMKM",desc:"Stiker kemasan kiss-cut, kartu ucapan, dan nota usaha."},
    {id:"jasa-desain",name:"Jasa Desain",desc:"Desain undangan, label, dan kemasan sesuai kebutuhan Anda."}],
  steps:[["Pilih Model & Konsultasi","Pilih tema dari katalog atau ajukan ide kustom Anda melalui chat WhatsApp."],["Pratinjau Draf & Revisi Bebas","Kami kirimkan link demo website atau preview desain cetak untuk disetujui bersama."],["Produksi Presisi & Kirim Aman","Cetak tajam, dipotong rapi menggunakan guillotine cutter, dan dikemas tebal bubble wrap."]],
  bundles:[
    {lb:"Starter",kicker:"Pernikahan Intim",chip:"Min. 100 Pcs",name:"Paket Cetak Hemat",desc:"Fokus pada kualitas sentuhan kertas fisik mewah.",price:RP(F.hemat),unit:"/ lembar (min. "+F.min+")",cta:"Pilih Paket Fisik",items:["Bahan Kertas Art Carton 260gsm / Jasmine Halus","Gratis Plastik OPP pembungkus per lembar","Gratis Label Stiker Tamu (Print Nama Tamu)","Garis lipatan rel presisi, mudah dilipat rapi"]},
    {hot:1,lb:"Populer",kicker:"Paket Komplit Kombo",chip:"All-in-One",name:"All-in-One Luxury",desc:"Satu pintu untuk semua kebutuhan undangan fisik & digital.",price:"Rp 499.000",unit:"Paket Komplit Siap Sebar",cta:"Ambil Paket All-in-One",items:["<b>200 Pcs Undangan Fisik Jasmine Glitter</b> + Plastik & Label","<b>1 Undangan Website Interaktif</b> (Musik, RSVP & Peta Maps)","<b>1 Video Undangan Animasi HD</b> (Format Vertikal Reels 1080p)","Aktif 1 Tahun & unlimited ganti data tamu undangan","Konsultasi & revisi desain sampai puas tanpa ribet"]},
    {lb:"Starter",kicker:"Solusi Branding Kemasan",chip:"Bikin Produk Naik Kelas",name:"Paket UMKM Starter",desc:"Stiker label presisi siap tempel tanpa bikin kantong cemas.",price:"mulai Rp 450.000",unit:"/ paket kemasan",cta:"Pesan Paket UMKM",items:["<b>500 Pcs Stiker Label Kemasan</b> (Kiss-Cut Bulat/Kotak)","<b>100 Pcs Kartu Ucapan / Thank You Card</b> Art Carton","Pilihan bahan Chromo mengkilap atau Vinyl anti air","Bantu penataan posisi logo & nomor WA usaha gratis"]}],
  calc:{addWeb:75000,fisik:F,
    types:[{label:"Undangan Fisik Jasmine Glitter (Softcover)",k:"fisik"},{label:"Undangan Fisik Art Carton 260gsm",k:"fisik"},{label:"Undangan Vintage Kraft + Tali Rami",k:"fisik"},{label:"Undangan Fisik Linen",k:"fisik"},
      {label:"Stiker Label Kemasan Kiss-Cut (min. 100 pcs)",k:"umkm",price:600,min:100},{label:"Kartu Ucapan / Thank You Card (min. 100 pcs)",k:"umkm",price:1500,min:100},
      {label:"Undangan Web Interaktif (1 tema)",k:"flat",price:75000,web:1},{label:"Video Undangan Reels (1 video)",k:"flat",price:50000}],
    notes:{fisik:["Sudah termasuk potong presisi & plastik pembungkus","Free konsultasi desain via WhatsApp"],umkm:["Potong presisi, siap tempel/pakai","Free konsultasi desain via WhatsApp"],flat:["Free konsultasi desain via WhatsApp"]}},
  faq:[["Berapa lama pengerjaan?","Undangan web 2–3 hari kerja. Cetak fisik 5–7 hari kerja setelah draf disetujui."],["Berapa kali revisi draf?","Sesuai paket, 2 sampai 3 kali sebelum naik cetak."],["Bisa pesan dalam jumlah sedikit?",`Bisa. Undangan fisik ${RP(F.biasa)}/lembar untuk pesanan 1–${F.min-1} lembar, dan ${RP(F.hemat)}/lembar mulai ${F.min} lembar.`],["Berapa lama link undangan web aktif?","Minimal 12 bulan, dan bisa diperpanjang."]],
  products:[
    {cat:"undangan-web",name:"Rustic",title:"Tema Rustic Floral Warm",price:"Rp 75.000 / link",desc:"Tone earth color elegan, ornamen bunga kering, countdown, maps interaktif, dan pemutar audio otomatis.",demo:"undangan-web/demo/rustic/",home:1,tag:"",img:""},
    {cat:"undangan-web",name:"Modern",title:"Tema Modern Editorial Minimalis",price:"Rp 75.000 / link",desc:"Gaya majalah estetik hitam putih yang menonjolkan foto prewedding dengan kesan luxury berkelas.",demo:"undangan-web/demo/modern/",home:1,tag:"",img:""},
    {cat:"undangan-web",name:"Adat",title:"Tema Adat",price:"Rp 75.000 / link",desc:"Ornamen adat, bisa disesuaikan dengan daerah.",tag:"Baru",img:""},
    {cat:"undangan-video",name:"Reels Floral",title:"Video Animasi Teaser Reels (9:16)",price:"Rp 50.000 / video",desc:"Durasi 30–45 detik resolusi 1080p jernih, pas untuk status WhatsApp, TikTok, dan Instagram Reels.",home:1,tag:"",img:""},
    {cat:"undangan-video",name:"Reels Minimal",title:"Reels Minimal",price:"Rp 50.000 / video",desc:"Teks bergerak, musik pilihan Anda.",tag:"",img:""},
    {cat:"undangan-fisik",name:"Jasmine",title:"Softcover Jasmine 210gsm Glitter",price:`${RP(F.hemat)} / lembar (min. ${F.min})`,desc:"Kertas bertekstur kerlip halus berkilau, dicetak warna pekat dengan finishing lipat rapi tanpa sobek.",home:1,tag:"",img:""},
    {cat:"undangan-fisik",name:"Art Carton",title:"Art Carton 260gsm",price:`${RP(F.hemat)} / lembar (min. ${F.min})`,desc:"Kertas tebal halus dengan cetak warna tajam dan hasil rapi.",tag:"Baru",img:""},
    {cat:"undangan-fisik",name:"Linen",title:"Linen",price:`${RP(F.hemat)} / lembar (min. ${F.min})`,desc:"Serat kain, hangat saat disentuh.",tag:"",img:""},
    {cat:"undangan-fisik",name:"Kraft",title:"Vintage Kraft Samson & Tali Rami",price:`${RP(F.hemat)} / lembar (min. ${F.min})`,desc:"Konsep natural rustic menggunakan kertas kraft cokelat tebal berpadu ikatan tali goni otentik.",home:1,tag:"",img:""},
    {cat:"jasa-desain",name:"Desain Undangan Custom",title:"Desain Undangan Custom",price:"Hubungi kami",desc:"Desain khusus sesuai tema dan warna acara Anda.",tag:"",img:""},
    {cat:"jasa-desain",name:"Desain Label & Kemasan",title:"Desain Label & Kemasan",price:"Hubungi kami",desc:"Label produk dan kemasan untuk usaha Anda.",tag:"",img:""},
    {cat:"umkm",name:"Stiker Label Kiss-Cut",title:"Stiker Label Kemasan Kiss-Cut Presisi",price:"mulai Rp 600 / pcs (min. 100)",desc:"Sudah terpotong bulat/kotak rapi, tinggal kupas dan tempel.",home:1,tag:"",img:""},
    {cat:"umkm",name:"Kartu Ucapan",title:"Kartu Ucapan",price:"mulai Rp 1.500 / pcs",desc:"Untuk toko online dan hampers.",tag:"",img:""},
    {cat:"umkm",name:"Nota Usaha",title:"Nota Usaha",price:"mulai Rp 25.000 / buku",desc:"Rangkap 2 atau 3, kop usaha Anda.",tag:"",img:""}]
};
/* Harga per produk (cadangan bila panel tidak terjangkau). unit: lembar/pcs/buku/set (jumlah bebas) atau link/video/desain/paket (1 paket).
   amt = harga satuan, min = minimal pesan, tf = harga hemat mulai jumlah, tp = harga hemat per satuan. */
(function(){const PX={"Rustic":{unit:"link",amt:75000},"Modern":{unit:"link",amt:75000},"Adat":{unit:"link",amt:75000},"Reels Floral":{unit:"video",amt:50000},"Reels Minimal":{unit:"video",amt:50000},
 "Jasmine":{unit:"lembar",amt:F.biasa,min:1,tf:F.min,tp:F.hemat},"Art Carton":{unit:"lembar",amt:F.biasa,min:1,tf:F.min,tp:F.hemat},"Linen":{unit:"lembar",amt:F.biasa,min:1,tf:F.min,tp:F.hemat},"Kraft":{unit:"lembar",amt:F.biasa,min:1,tf:F.min,tp:F.hemat},
 "Stiker Label Kiss-Cut":{unit:"pcs",amt:600,min:100},"Kartu Ucapan":{unit:"pcs",amt:1500,min:100},"Nota Usaha":{unit:"buku",amt:25000}};
 window.SITE.products.forEach(p=>Object.assign(p,{min:1,tf:0,tp:0,amt:0,images:[]},PX[p.name]||{}))})();
