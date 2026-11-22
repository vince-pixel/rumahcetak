// Katalog, promo, harga, galeri, dan tampilan dari panel admin (Supabase).
// Pola "tampil cepat lalu perbarui": halaman memakai salinan terakhir (atau data.js), lalu mengambil yang terbaru;
// jika berbeda, halaman dimuat ulang satu kali. Mode pratinjau (?preview=1 di dalam iframe panel) menerima tampilan langsung.
(function(){
 const S=window.SITE;if(!S)return;
 const B=S.sb||{},PV=new URLSearchParams(location.search).get("preview")==="1"&&window.parent!==window;
 if(PV)window.__rcPreview=true;

 const rpx=n=>"Rp "+Math.round(+n||0).toLocaleString("id-ID");
 const QTY_FLAT=["link","video","desain","paket"];
 const isQty=p=>!QTY_FLAT.includes(p.unit||"pcs");
 const unitPrice=(p,q)=>p.tf&&p.tp>0&&q>=p.tf?p.tp:p.amt;
 const plabel=p=>{if(!(p.amt>0))return p.label0||"Hubungi kami";const u=p.unit||"pcs";if(p.tf&&p.tp>0&&p.tp<p.amt)return rpx(p.tp)+" / "+u+" (min. "+p.tf+")";return rpx(p.amt)+" / "+u+((p.min||1)>1?" (min. "+p.min+")":"")};
 window.RCP={isQty,unitPrice,plabel,rp:rpx};
 const F0=Object.assign({},S.calc&&S.calc.fisik),RPf=n=>"Rp "+Number(n).toLocaleString("id-ID");
 const esc=t=>String(t==null?"":t).replace(/[&<>"\x27]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","\x27":"&#39;"}[c]));
 const sx=t=>String(t==null?"":t).replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
 const fmt=t=>esc(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
 const today=()=>{const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
 const HD={badge:"Percetakan & Studio Kreatif Rumahan",title:"Dari Momen Bahagia hingga Kemasan Usaha,",em:"Rumah Cetak Solusinya.",lead:"Satu Tempat, Cetak Komplet.",text:"Kami hadir memadukan keanggunan undangan cetak fisik bertekstur, kepraktisan undangan web digital interaktif & video reels, hingga stiker label kemasan UMKM siap tempel."};
 const INNER=["faq","ulasan"];
 const SEC={hero:".hero-w",lacak:"form.trk",paket:"#paket",portofolio:"#portofolio",etalase:"#etalase",kalkulator:"#kalkulator",tentang:"#tentang",ulasan:"#sec-testi",faq:"#faq"};
 const HEROIMG0=S.heroImg,ABOUT0=S.about&&S.about.slice();
 let ORIG=null;
 const hex=v=>/^#[0-9a-fA-F]{6}$/.test(v||"")?v:null,num=(v,a,b,d)=>{v=+v;return isFinite(v)&&v>=a&&v<=b?v:d};
 const safeUrl=u=>/^https:\/\/[^\s"'()<>]+$/.test(u||"")?u:"";

 function thumbOf(l){l=String(l||"");let m=l.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/))([\w-]{11})/);if(m)return"https://img.youtube.com/vi/"+m[1]+"/hqdefault.jpg";
  m=l.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:.*&)?id=)([\w-]+)/);if(m)return"https://drive.google.com/thumbnail?id="+m[1]+"&sz=w800";
  return/^https:\/\/[^\s"'()<>]+\.(jpe?g|png|webp|gif|avif)(\?[^\s"'()<>]*)?$/i.test(l)?l:""}
 window.RCP.thumbOf=thumbOf;
 function applyPrices(){const L=S.prices;if(Array.isArray(L))L.forEach(o=>{const p=S.products.find(x=>(o.pid&&x.id==o.pid)||x.name===o.name);if(!p)return;
   if(+o.price>0)p.amt=+o.price;if(+o.min>0)p.min=+o.min;if(o.tf!==""&&o.tf!=null&&+o.tf>=0){p.tf=+o.tf;p.tp=+o.tp||0}});
  S.products.forEach(p=>p.price=plabel(p))}
 const nurl=(v,base)=>{v=String(v||"").trim();if(!v)return"";if(/^https:\/\//.test(v))return safeUrl(v);return safeUrl(base+v.replace(/^@/,"").replace(/[^\w.\-]/g,""))};
 function applyContact(c){if(!c)return;if(c.wa){const w=String(c.wa).replace(/\D/g,"").replace(/^0/,"62");if(w)S.wa=w}
  S.contact={email:sx(c.email||""),fb:nurl(c.fb,"https://facebook.com/"),igUrl:nurl(c.ig,"https://instagram.com/"),phone:sx(c.phone||""),hours:sx(c.hours||""),loc:sx(c.loc||"")};
  if(c.tagline!=null)S.tagline=sx(c.tagline);
  if(c.about){const a=String(c.about).split(/\n+/).map(x=>sx(x.trim())).filter(Boolean);if(a.length){S.aboutC=a;S.about=a}}}
 function applySite(site){
  site=site||{};const late=document.readyState==="complete",main=document.querySelector("main");
  if(main&&!ORIG)ORIG={order:[...main.children]};
  const th=site.theme||{},hr=site.hero||{},lay=site.layout||{};let css="";
  const vars=["g","dk","y","cr","cr2","ink"].filter(k=>hex(th[k])).map(k=>`--${k}:${th[k]}`);if(vars.length)css+=`:root{${vars.join(";")}}`;
  if(["1100","1400"].includes(String(lay.width)))css+=`:root{--w:${lay.width}px}`;
  if(lay.flip)css+=`@media(min-width:1101px){.hero{grid-template-columns:5fr 7fr;grid-template-areas:"hv hl" "hv tr"}}`;
  const FONTS={"Cormorant Garamond":"Cormorant+Garamond:wght@600;700;800","Lora":"Lora:wght@600;700","Poppins":"Poppins:wght@600;700;800"};
  if(FONTS[site.font]){let l=document.getElementById("rc-font");if(!l){l=document.createElement("link");l.id="rc-font";l.rel="stylesheet";document.head.appendChild(l)}l.href="https://fonts.googleapis.com/css2?family="+FONTS[site.font]+"&display=swap";
   css+=`h1,h2,h3,h4,.logo b,.cres strong,.ftrk b{font-family:"${site.font}",Georgia,serif}`}
  css+=`.hero-w.rc-light .hl h1,.hero-w.rc-light .hl p,.hero-w.rc-light .hl .pill,.hero-w.rc-light .trust b,.hero-w.rc-light .trust small{color:#fff}.hero-w.rc-light .hl h1 em{color:var(--y)}`;
  let st=document.getElementById("rc-site-css");if(!st){st=document.createElement("style");st.id="rc-site-css";document.head.appendChild(st)}st.textContent=css;
  // hero
  const hw=document.querySelector(".hero-w"),hl=document.querySelector(".hero .hl");
  if(hl){const pill=hl.querySelector(".pill"),h1=hl.querySelector("h1"),p=hl.querySelector("p"),ab=hl.querySelectorAll(".acts .btn");
   if(!ORIG.hero)ORIG.hero={pill:pill.innerHTML,h1:h1.innerHTML,p:p.innerHTML,a:[...ab].map(x=>x.innerHTML),bg:hw.getAttribute("style")||""};
   pill.innerHTML=hr.badge?esc(hr.badge):ORIG.hero.pill;
   h1.innerHTML=(hr.title||hr.em)?esc(hr.title||HD.title)+" <em>"+esc(hr.em||HD.em)+"</em>":ORIG.hero.h1;
   p.innerHTML=(hr.lead||hr.text)?"<strong>"+esc(hr.lead||HD.lead)+"</strong> "+esc(hr.text||HD.text):ORIG.hero.p;
   [hr.b1,hr.b2].forEach((t,i)=>{if(ab[i])ab[i].innerHTML=t?esc(t):ORIG.hero.a[i]})}
  if(hw){const c1=hex(hr.c1)||"#ffffff",c2=hex(hr.c2)||"#e9f6e6";
   hw.setAttribute("style",hr.bg==="solid"?`background:${c1}`:hr.bg==="gradient"?`background:linear-gradient(160deg,${c1},${c2})`:hr.bg==="image"&&safeUrl(hr.bgImg)?`background:linear-gradient(rgba(0,0,0,${num(hr.shade,0,80,35)/100}),rgba(0,0,0,${num(hr.shade,0,80,35)/100})),url("${safeUrl(hr.bgImg)}") center/cover`:(ORIG.hero?ORIG.hero.bg:""));
   hw.classList.toggle("rc-light",!!hr.light)}
  S.heroDemo=safeUrl(hr.demo)||"";if(window.RC&&window.RC.setDemo)window.RC.setDemo();
  const himg=safeUrl(hr.img);S.heroImg=himg||HEROIMG0;
  if(late){const hi=document.getElementById("himg");if(hi){hi.querySelectorAll("img.rc-h").forEach(x=>x.remove());if(himg)hi.insertAdjacentHTML("afterbegin",`<img class="rc-h" src="${himg}" alt="Hasil cetak Rumah Cetak">`)}}
  // profil
  const ab=Array.isArray(site.about)&&site.about.length?site.about.map(sx):null;S.about=ab||S.aboutC||ABOUT0;
  if(late){const a=document.getElementById("about");if(a)a.innerHTML=S.about.map(x=>`<p>${x}</p>`).join("")}
  // bagian beranda
  if(main&&ORIG){ORIG.order.forEach(el=>{main.appendChild(el);el.style.display=""});
   const so=site.sections||{},ids=Object.keys(SEC).filter(x=>!INNER.includes(x)),ord=Array.isArray(so.order)?so.order.filter(x=>SEC[x]).concat(ids.filter(x=>!(so.order||[]).includes(x))):ids;
   INNER.forEach(id=>{const e=document.querySelector(SEC[id]);if(e)e.style.display=""});const as=document.getElementById("aside");if(as)as.classList.toggle("rf",lay.faqPos==="bottom");
   const blk=id=>{const e=document.querySelector(SEC[id]);return INNER.includes(id)?e:(e?e.closest("main > *"):null)};
   if(Array.isArray(so.order))ord.forEach(id=>{const b=blk(id);if(b)main.appendChild(b)});
   (so.hidden||[]).forEach(id=>{const b=blk(id);if(b)b.style.display="none"})}
 }
 function applySet(st){if(!st)return;if(st.contact)applyContact(st.contact);if(Array.isArray(st.prices))S.prices=st.prices;
  if(st.fisik&&S.calc){const n=st.fisik,o=F0;Object.assign(S.calc.fisik,{min:+n.min||o.min,hemat:+n.hemat||o.hemat,biasa:+n.biasa||o.biasa});
   if(n.min!=o.min||n.hemat!=o.hemat||n.biasa!=o.biasa){const pairs=[[RPf(o.hemat),"\u00a7H",RPf(n.hemat)],[RPf(o.biasa),"\u00a7B",RPf(n.biasa)],["min. "+o.min,"\u00a7m","min. "+n.min],["Min. "+o.min,"\u00a7M","Min. "+n.min]];
    const sw=x=>{let j=JSON.stringify(x);pairs.forEach(p=>j=j.split(p[0]).join(p[1]));pairs.forEach(p=>j=j.split(p[1]).join(p[2]));return JSON.parse(j)};
    if(S.faq)S.faq=sw(S.faq);if(!st.bundles&&S.bundles)S.bundles=sw(S.bundles)}}
  if(st.calc&&S.calc){const c=st.calc;if(c.types&&c.types.length)S.calc.types=c.types.map(t=>({...t,label:sx(t.label)}));if(c.addWeb!=null)S.calc.addWeb=+c.addWeb||0}
  if(st.bundles&&st.bundles.length)S.bundles=st.bundles.map(b=>({lb:esc(b.lb),kicker:esc(b.kicker),chip:esc(b.chip),name:esc(b.name),desc:esc(b.desc),price:esc(b.price),unit:esc(b.unit),cta:esc(b.cta),items:(b.items||[]).map(fmt),hot:b.hot?1:0}));
  if(st.promo){const p=st.promo,t=today(),on=p.active&&(!p.start||t>=p.start)&&(!p.end||t<=p.end);
   S.promo=on&&p.long?{label:esc(p.label),long:fmt(p.long),short:fmt(p.short||p.long),href:/^(#[\w-]+|wa:[^\n]*|https:\/\/[^\s"'<>]+|[\w\-\/]+)$/.test(p.href||"")?p.href:"#paket",link:esc(p.link||"Lihat")}:{label:"",long:"",short:"",href:"#",link:""}}
  if(st.site)applySite(st.site)}
 function applyData(d){if(d.cats&&d.cats.length){S.cats=d.cats.map(c=>({id:c.id,name:sx(c.name),desc:sx(c.descr||"")}));
   S.products=d.products.map(p=>({id:p.id,cat:p.cat,name:sx(p.name),title:sx(p.title||p.name),label0:sx(p.price_label||""),price:"",desc:sx(p.descr||""),demo:p.demo||undefined,video:p.video||"",tag:sx(p.tag||""),img:p.img||"",home:p.home?1:0,created:p.created_at||"",
    unit:sx(p.unit||"pcs"),amt:+p.price||0,min:Math.max(1,+p.min_qty||1),tf:+p.tier_from||0,tp:+p.tier_price||0,images:Array.isArray(p.images)?p.images.filter(u=>typeof u==="string"&&/^https:\/\//.test(u)):[]}));
   S.products.forEach(p=>p.price=plabel(p))}
  if(d.gal&&d.gal.length)S.gallery=d.gal.map(g=>({img:g.img||thumbOf(g.link),cap:sx(g.cap),title:sx(g.title||""),descr:sx(g.descr||""),link:safeUrl(g.link||"")}));
  applySet(d.set);if(d.cats&&d.cats.length)applyPrices()}
 if(PV){const allowed=S.adminOrigins||[];window.addEventListener("message",e=>{if(!allowed.includes(e.origin)||!e.data||e.data.type!=="rc-preview")return;applySite(e.data.site)})}
 if(!B.url)return;
 const K="rc_catalog3",H={apikey:B.key,Authorization:"Bearer "+B.key};
 try{const c=JSON.parse(localStorage.getItem(K)||"null");if(c&&c.d)applyData(c.d)}catch(e){}
 const get=t=>fetch(B.url+"/rest/v1/"+t,{headers:H}).then(r=>{if(!r.ok)throw 0;return r.json()});
 Promise.all([get("categories?select=*&order=sort"),get("products?select=*&order=cat,sort,id"),get("settings?select=key,value").catch(()=>[]),get("gallery_items?select=*&order=sort,id").catch(()=>[])]).then(([cats,products,sets,gal])=>{
  const set={};sets.forEach(x=>set[x.key]=x.value);if(!cats.length&&!Object.keys(set).length&&!gal.length)return;const d={cats,products,set,gal},j=JSON.stringify(d);
  let old="";try{old=JSON.stringify((JSON.parse(localStorage.getItem(K)||"null")||{}).d||"")}catch(e){}
  if(j===old)return;
  try{localStorage.setItem(K,JSON.stringify({d}))}catch(e){return}
  if(PV)return;
  if(!sessionStorage.getItem("rc_cat_rl")){sessionStorage.setItem("rc_cat_rl","1");location.reload()}else sessionStorage.removeItem("rc_cat_rl");
 }).catch(()=>{});
})();
