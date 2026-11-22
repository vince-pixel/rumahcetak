(function(){
const S=window.SITE,R=window.RC,$=s=>document.querySelector(s),B=document.body.dataset.base||"";
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safe=u=>/^https?:\/\//i.test(u)?u:"";
const SB=S.sb||{},live=!!(SB.url||S.demo);
const LAB={fisik:{diterima:"Diterima",draf:"Draf",revisi:"Revisi",cetak:"Cetak",dikirim:"Dikirim",selesai:"Selesai"},web:{diterima:"Diterima",draf:"Draf",revisi:"Revisi",pembuatan:"Pembuatan",aktif:"Link aktif",selesai:"Selesai"},video:{diterima:"Diterima",draf:"Draf",revisi:"Revisi",render:"Rendering",siap:"Siap diunduh",selesai:"Selesai"}};
const rpc=async(f,b)=>{const r=await fetch(SB.url+"/rest/v1/rpc/"+f,{method:"POST",headers:{apikey:SB.key,Authorization:"Bearer "+SB.key,"Content-Type":"application/json"},body:JSON.stringify(b||{})});if(!r.ok)throw 0;return r.json()};
const tgl=d=>d?new Date(d).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}):"";
const D={stats:{ratings:{Rustic:{avg:4.8,n:5},Jasmine:{avg:5,n:3}},sold:{Rustic:5,Jasmine:3},views:{Rustic:40,Jasmine:25,Modern:12},reviews:[{nama:"Contoh",bintang:5,isi:"Ini ulasan contoh untuk menguji tampilan.",produk:"Rustic"}]},
orders:{"RC-DEMO":{ok:1,tipe:"fisik",produk:"Jasmine",tahap:"Dikirim",update:"9 Nov 2026",catatan:"Paket sudah diserahkan ke kurir.",kurir:"JNE",resi:"1234567890"},"RC-DEMO2":{ok:1,tipe:"web",produk:"Rustic",tahap:"Link aktif",update:"9 Nov 2026",catatan:"",link:"https://example.com"}}};
async function api(a,p={},body){
 if(S.demo){if(a=="order")return D.orders[String(p.kode||"").toUpperCase()]||{ok:0};if(a=="stats")return D.stats;return {ok:1}}
 if(!SB.url)throw 0;
 if(a=="order"){const o=await rpc("track_order",{p_code:String(p.kode||"")});if(!o)return {ok:0};const t=o.type=="umkm"?"fisik":o.type;
  return {ok:1,tipe:t,produk:o.product,tahap:(LAB[t]||LAB.fisik)[o.stage]||o.stage,update:tgl(o.updated),catatan:o.note,kurir:o.courier,resi:o.resi,link:o.link}}
 if(a=="stats")return rpc("public_stats");
 if(a=="review"){const r=await rpc("submit_review",{p_code:body.kode,p_stars:body.bintang,p_body:body.isi});return {ok:r.ok,error:r.err}}
 return {ok:0}}
if(S.demo)document.body.insertAdjacentHTML("afterbegin",'<div class="demo-bar">Mode demo: semua rating, ulasan, dan pesanan di halaman ini adalah DATA CONTOH</div>');
async function stats(){if(!live)return null;try{if(S.demo)return D.stats;const c=sessionStorage.getItem("rc_st");if(c){const o=JSON.parse(c);if(Date.now()-o.t<3e5)return o.d}
 const d=await api("stats");sessionStorage.setItem("rc_st",JSON.stringify({t:Date.now(),d}));return d}catch(e){return null}}
const lc=s=>String(s).trim().toLowerCase();
const nm=(o,f)=>{const r={};for(const k in o||{}){const x=lc(k);r[x]=r[x]==null?o[k]:f(r[x],o[k])}return r};
const pn=n=>(S.products.find(p=>lc(p.name)==lc(n))||{name:n}).name;
function carousel(list){const host=$("#testi");if(!host)return;$("#sec-testi").hidden=false;
 const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 const item=t=>`<figure class="card rvc"><blockquote>${esc(t.isi)}</blockquote><figcaption><span class="rt">${R.ic("star").repeat(Math.min(5,Math.max(1,+t.bintang||1)))}</span><br><b>${esc(t.nama)}</b> · ${esc(pn(t.produk))}${S.demo?" · contoh":" · Pembeli terverifikasi"}</figcaption></figure>`;
 const items=list.map(item);let user=false,vis=true,hold=false,tm;const run=!rm&&items.length>2;
 function apply(){const t=host.querySelector(".rv-t");if(!t)return;t.classList.toggle("paused",user||hold||!vis);const b=host.querySelector(".rv-p");if(b)b.textContent=user?"▶ Putar":"❚❚ Jeda"}
 function build(){if(items.length<=2){host.className="rv static";host.innerHTML=`<div class="rv-t">${items.join("")}</div>`;return}
  host.className="rv "+(run?"run":"manual");host.innerHTML=`<div class="rv-win"><div class="rv-t">${(run?items.concat(items):items).join("")}</div></div>`+(run?'<div class="rv-c"><button type="button" class="ghost sm rv-p"></button></div>':"");
  const win=host.querySelector(".rv-win"),t=host.querySelector(".rv-t"),cs=[...t.children],gap=parseFloat(getComputedStyle(t).rowGap)||16;
  win.style.height=(cs[0].offsetHeight+cs[1].offsetHeight+gap)+"px";
  if(run){const H=(t.scrollHeight+gap)/2;t.style.setProperty("--h",H+"px");t.style.animationDuration=Math.max(10,H/22)+"s"}apply()}
 host.onclick=e=>{if(e.target.closest(".rv-p")){user=!user;apply()}};
 host.onmouseenter=()=>{hold=true;apply()};host.onmouseleave=()=>{hold=false;apply()};host.onfocusin=host.onmouseenter;host.onfocusout=host.onmouseleave;
 host.ontouchstart=()=>{hold=true;apply();clearTimeout(tm)};host.ontouchend=()=>{clearTimeout(tm);tm=setTimeout(()=>{hold=false;apply()},2500)};
 if("IntersectionObserver" in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting;apply()},{threshold:.2}).observe(host);
 let w=innerWidth;addEventListener("resize",()=>{if(innerWidth!=w){w=innerWidth;build()}});build()}
let R2={},SO={},V={},best=new Set,pop=new Set;
function paint(){document.querySelectorAll(".prod").forEach(c=>{const n=lc(c.dataset.p),r=R2[n],so=SO[n]||0;
  c.querySelector(".meta").innerHTML=(r?`<span class="rt">${R.ic("star")}${r.avg} (${r.n})</span>`:"<span>Belum ada ulasan</span>")+(so?`<span>${so} terjual</span>`:"");
  if(!c.querySelector(".tag")){const pr=S.products.find(p=>lc(p.name)==n),lab=best.has(n)?"Terlaris":pop.has(n)?"Populer":(pr&&pr.created&&Date.now()-new Date(pr.created)<2592e6?"Baru":"");if(lab)c.querySelector(".pic").insertAdjacentHTML("beforeend",'<em class="tag">'+lab+'</em>')}})}
R.refill=paint;R.statFor=n=>({r:R2[lc(n)],so:SO[lc(n)]||0});
function fill(s){if(!s||s.error)return;
 R2=nm(s.ratings,(a,b)=>({n:a.n+b.n,avg:Math.round((a.avg*a.n+b.avg*b.n)/(a.n+b.n)*10)/10}));SO=nm(s.sold,(a,b)=>a+b);V=nm(s.views,(a,b)=>a+b);
 best=new Set(Object.entries(SO).sort((a,b)=>b[1]-a[1]).slice(0,3).filter(x=>x[1]>0).map(x=>x[0]));pop=new Set(Object.entries(V).filter(x=>x[1]>0&&!best.has(x[0])).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]));
 const sc=p=>(V[lc(p.name)]||0)+(SO[lc(p.name)]||0)*5;if(S.products.some(sc)&&R.setSort)R.setSort(sc);paint();R.onStats&&R.onStats();
 if(s.reviews&&s.reviews.length)carousel(s.reviews)}
stats().then(s=>{fill(s);if(location.hash=="#faq"){const e=$("#faq");e&&e.scrollIntoView()}});
document.addEventListener("click",e=>{const a=e.target.closest(".prod a,.prod button");if(!a||!SB.url||S.demo||window.__rcPreview)return;const n=a.closest(".prod").dataset.p,k="rc_c_"+n+new Date().toDateString();
 try{if(localStorage.getItem(k))return;localStorage.setItem(k,1)}catch(_){}
 let dv="";try{dv=localStorage.getItem("rc_dev")||("d"+Math.random().toString(36).slice(2)+Date.now().toString(36));localStorage.setItem("rc_dev",dv)}catch(_){dv="d"+Math.random().toString(36).slice(2)+"anon"}
 fetch(SB.url+"/rest/v1/rpc/track_click",{method:"POST",keepalive:true,headers:{apikey:SB.key,Authorization:"Bearer "+SB.key,"Content-Type":"application/json"},body:JSON.stringify({p_product:n,p_device:dv})}).catch(()=>{})});
const tf=$("#trk-form");
if(tf){const out=$("#trk-out"),inp=tf.kode,ST={fisik:["Diterima","Draf","Revisi","Cetak","Dikirim","Selesai"],web:["Diterima","Draf","Revisi","Pembuatan","Link aktif","Selesai"],video:["Diterima","Draf","Revisi","Rendering","Siap diunduh","Selesai"]};ST.umkm=ST.fisik;
 const run=async k=>{k=k.trim().toUpperCase();if(!k)return;out.innerHTML="<p>Mencari…</p>";
  try{const o=await api("order",{kode:k});
   if(!o||!o.ok){out.innerHTML=`<div class="glass pad"><h3>Kode tidak ditemukan</h3><p>Periksa kembali kodenya, atau tanyakan lewat WhatsApp.</p><a class="btn" href="${R.wa("Halo, saya mau cek pesanan "+k)}">Tanya via WhatsApp</a></div>`;return}
   const st=ST[o.tipe]||ST.fisik,i=Math.max(st.indexOf(o.tahap),0);
   const li=st.map((s,j)=>`<li class="${j<i?"done":j==i?"now":""}"><span>${j<i?R.ic("check"):j+1}</span>${esc(s)}</li>`).join("");let ex="";
   if(safe(o.link))ex+=`<p><a class="btn" href="${esc(safe(o.link))}" target="_blank" rel="noopener">Buka tautan</a> <button type="button" class="btn ghost" data-copy="${esc(safe(o.link))}">Salin tautan</button></p>`;
   if(o.resi){const kl=safe((S.kurir||{})[o.kurir]);ex+=`<p>${R.ic("truck")} ${esc(o.kurir||"Kurir")}: <b>${esc(o.resi)}</b> <button type="button" class="btn ghost" data-copy="${esc(o.resi)}">Salin resi</button> ${kl?`<a class="btn" href="${esc(kl)}" target="_blank" rel="noopener">Lacak di situs kurir</a>`:""}</p>`}
   if(o.tahap=="Selesai")ex+=`<p><a class="btn y" href="${B}ulasan/?kode=${encodeURIComponent(k)}">Tulis ulasan</a></p>`;
   out.innerHTML=`<div class="glass pad"><h3>${esc(o.produk||"Pesanan")} · ${esc(k)}</h3><ol class="stp">${li}</ol><p>Tahap: <b>${esc(o.tahap)}</b>${o.update?` · diperbarui ${esc(o.update)}`:""}</p>${o.catatan?`<p>${esc(o.catatan)}</p>`:""}${ex}</div>`}
  catch(e){out.innerHTML=`<div class="glass pad"><p>Layanan pelacakan belum aktif atau sedang bermasalah. Tanyakan lewat WhatsApp.</p><a class="btn" href="${R.wa("Halo, saya mau cek pesanan "+k)}">Tanya via WhatsApp</a></div>`}};
 tf.onsubmit=e=>{e.preventDefault();history.replaceState(null,"","?kode="+encodeURIComponent(inp.value.trim()));run(inp.value)};
 const q=new URLSearchParams(location.search).get("kode");if(q){inp.value=q;run(q)}
 out.onclick=e=>{const b=e.target.closest("[data-copy]");if(b)navigator.clipboard.writeText(b.dataset.copy).then(()=>b.textContent="Tersalin ✓")}}
const rf=$("#rv-form");
if(rf){const q=new URLSearchParams(location.search).get("kode");if(q)rf.kode.value=q;
 rf.onsubmit=async e=>{e.preventDefault();const m=$("#rv-msg"),b=rf.bintang.value;if(!b){m.textContent="Pilih jumlah bintang dulu.";return}
  m.textContent="Mengirim…";try{const r=await api("review",{},{kode:rf.kode.value.trim().toUpperCase(),bintang:+b,isi:rf.isi.value.trim()});
   m.textContent=r.ok?"Terima kasih! Ulasan Anda tampil setelah kami periksa.":(r.error||"Gagal mengirim.");if(r.ok)rf.reset()}catch(_){m.textContent="Layanan belum aktif. Coba lagi nanti."}}}
})();
