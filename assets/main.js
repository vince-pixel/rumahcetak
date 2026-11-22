(function(){
const S=window.SITE,B=document.body.dataset.base||"",$=s=>document.querySelector(s);const U=u=>/^(https?:)?\/\//.test(u)?u:B+u;
const wa=t=>`https://wa.me/${S.wa}?text=${encodeURIComponent(t)}`;
const P={"undangan-web":"M3 5h18v12H3zM8 21h8M12 17v4","undangan-video":"M5 4h14v16H5zM10 9l5 3-5 3z","undangan-fisik":"M3 6l9 7 9-7M3 6h18v13H3z",umkm:"M4 4h9l7 7-9 9-7-7zM8.5 8.5h.01",
pin:"M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4",phone:"M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2",
clock:"M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0",star:"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
chat:"M4 5h16v11H9l-5 4z",tag:"M4 4h9l7 7-9 9-7-7z",paper:"M6 3h9l4 4v14H6zM15 3v4h4",truck:"M3 6h11v9H3zM14 9h4l3 3v3h-7M7 17.5h.01M17 17.5h.01",
check:"M5 12l5 5 9-10",arrow:"M5 12h14M13 6l6 6-6 6",ig:"M4 4h16v16H4zM12 8a4 4 0 100 8 4 4 0 000-8M17 7h.01",fb:"M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z",
play:"M8 5l11 7-11 7z",mobile:"M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",close:"M6 6l12 12M18 6L6 18",chev:"M9 6l6 6-6 6"};
P.mail=P["undangan-fisik"];P["jasa-desain"]="M4 20l1-4L16 5l3 3L8 19z";
const FF=S.calc.fisik,rp=n=>"Rp "+n.toLocaleString("id-ID");
const IB=new URL(B+"assets/icons/",document.baseURI).href;
const ic=(n,c="ic")=>`<i class="${c}" style="--m:url(${IB}${n}.svg)" aria-hidden="true"></i>`;
const L=`<a class="logo" href="${B||'./'}"><img src="${B}assets/icons/logo.svg" alt="" width="42" height="42"><span class="lg"><b>${S.brand}</b><small>Studio &amp; Percetakan</small></span></a>`;
if(S.promo&&S.promo.long){const h0=S.promo.href||"#paket",h=/^wa:/.test(h0)?wa(h0.slice(3)):/^(https?:)?\/\//.test(h0)?h0:B+h0;document.body.insertAdjacentHTML("afterbegin",`<aside class="promo" aria-label="Pengumuman"><div class="pt"><span class="pl">${S.promo.label}</span> <span class="l">${S.promo.long}</span><span class="s">${S.promo.short}</span></div><a class="pbtn" href="${h}">${S.promo.link}<b aria-hidden="true">→</b></a></aside>`)}
const dn=n=>n.menu?`<div class="dd"><a class="ddl" href="${B}${n.href}">${n.t}</a><button type="button" class="ddb" aria-expanded="false" aria-label="Submenu ${n.t}"></button><div class="sub">${n.menu.map(g=>`<div><h4>${g.g}</h4>${g.items.map(i=>i[1]?`<a href="${B}${i[1]}">${i[0]}</a>`:`<span class="soon">${i[0]} (segera hadir)</span>`).join("")}</div>`).join("")}</div></div>`:`<a href="${n.href[0]=="#"?(n.home?B+n.href:n.href):B+n.href}">${n.t}</a>`;
$("#hdr").innerHTML=`${L}<nav id="nav" aria-label="Menu utama">${S.nav.map(dn).join("")}</nav><a class="btn wab" href="${wa('Halo Rumah Cetak, saya ingin konsultasi pesanan')}" aria-label="Konsultasi WA">${ic("chat")}<span>Konsultasi WA</span></a><button type="button" class="burger" aria-expanded="false" aria-controls="nav" aria-label="Menu"><span></span><span></span><span></span></button>`;
{const H=$("#hdr"),bg=H.querySelector(".burger"),nv=H.querySelector("#nav"),hv=matchMedia("(hover:hover)");let op=false,pin=false;
const set=o=>{op=o;nv.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);if(!o){pin=false;nv.querySelectorAll(".dd.open").forEach(d=>{d.classList.remove("open");d.querySelector(".ddb").setAttribute("aria-expanded","false")})}};
bg.onmouseenter=()=>{if(hv.matches&&!op)set(true)};
bg.onclick=()=>{if(op&&!pin&&hv.matches)pin=true;else{set(!op);pin=op}};
H.onmouseleave=()=>{if(hv.matches&&op&&!pin&&bg.offsetParent)set(false)};
nv.onclick=e=>{const b=e.target.closest(".ddb");if(b){const d=b.parentElement,o=!d.classList.contains("open");d.classList.toggle("open",o);b.setAttribute("aria-expanded",o);return}if(e.target.closest("a"))set(false)};
document.addEventListener("keydown",e=>{if(e.key=="Escape")set(false)});
document.addEventListener("click",e=>{if(op&&!H.contains(e.target))set(false)});
addEventListener("resize",()=>{if(!bg.offsetParent)set(false)})}
const c=S.contact||{},soc=(n,h,i)=>h?`<a class="soc" href="${h}" target="_blank" rel="noopener" aria-label="${n}">${ic(i)}</a>`:"";
const telN=String(c.phone||"").replace(/\D/g,"").replace(/^0/,"62");
const colAbout=(S.tagline||(S.about&&S.about[0]))?`<div><h4>Tentang Kami</h4>${S.tagline?`<p class="ft">${S.tagline}</p>`:""}${S.about&&S.about[0]?`<p>${S.about[0]}</p>`:""}</div>`:"";
const colHours=c.hours?`<div><h4>Jam Layanan</h4><p>${c.hours}</p></div>`:"";
const ctItems=[telN&&c.phone?`<a href="tel:+${telN}">${ic("phone")}${c.phone}</a>`:"",S.wa?`<a href="${wa('Halo')}">${ic("chat")}WhatsApp</a>`:"",c.email?`<a href="mailto:${c.email}">${ic("mail")}${c.email}</a>`:"",c.loc?`<span>${ic("pin")}${c.loc}</span>`:""].filter(Boolean).join("");
const socs=soc("Facebook",c.fb,"fb")+soc("Instagram",c.igUrl,"ig");
const colCt=(ctItems||socs)?`<div><h4>Hubungi Kami</h4>${ctItems}${socs?`<div class="socs">${socs}</div>`:""}</div>`:"";
$("#ftr").innerHTML=`<div class="fbar">${L}<form class="ftrk" action="${B}lacak/"><b>Lacak pesanan</b><input name="kode" required autocomplete="off" placeholder="Masukkan kode pesanan" aria-label="Kode pesanan"><button class="btn y">Lacak</button></form></div><div class="fgrid">${colAbout}<div><h4>Tautan</h4><a href="${B}layanan/">Layanan</a><a href="${B}lacak/">Lacak Pesanan</a><a href="${B}galeri/">Galeri</a><a href="${B}#faq">FAQ</a></div>${colHours}${colCt}</div><small>© ${new Date().getFullYear()} ${S.brand} · Rapi, Cepat, Tepat.</small>`;
/* tombol demo: langsung ke link demo (tab baru) */
const demoMain=()=>S.heroDemo||(S.products.find(p=>p.demo)||{}).demo||"";
const setDemo=()=>document.querySelectorAll("[data-demo-main]").forEach(a=>{const d=demoMain();if(d){a.href=U(d);a.target="_blank";a.rel="noopener";a.hidden=false}else a.hidden=true});
/* produk */
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const ROOT=S.url?S.url.replace(/\/+$/,"")+"/":new URL(B||"./",location.href).href;
const CL={"undangan-web":"c-web","undangan-video":"c-video","undangan-fisik":"c-fisik",umkm:"c-umkm","jasa-desain":"c-web"};
const cn=id=>(S.cats.find(x=>x.id==id)||{name:""}).name;
const msg=p=>`Halo, saya tertarik dengan ${cn(p.cat)} - ${p.name}.\nLink: ${ROOT}${p.cat}/#${slug(p.name)}`+(p.demo?`\nDemo: ${ROOT}${p.demo}`:"");
const pp=s=>{const k=/^(.*?)\s+(\/.*)$/.exec(s||"");return k?`${k[1]}<small>${k[2]}</small>`:(s||"")};
const card=p=>{const im=p.img?`<img src="${U(p.img)}" alt="${p.name}" loading="lazy">`:`<div class="ph">${ic(p.cat,"ic big")}<span>Foto ${p.name}</span></div>`;
return `<article class="card prod" id="${slug(p.name)}" data-p="${p.name}"><div class="pic">${im}<span class="bdg ${CL[p.cat]}">${cn(p.cat)}</span>${p.tag?`<em class="tag">${p.tag}</em>`:""}</div><div class="bd"><h3><a class="pl" href="${B}produk/?p=${slug(p.name)}">${p.title||p.name}</a></h3><p>${p.desc}</p><div class="meta"></div><div class="row"><b>${pp(p.price)}</b><span class="ra">${p.demo?`<a class="btn soft sm dmo" href="${U(p.demo)}" target="_blank" rel="noopener">${ic("mobile")}Coba Demo</a>`:""}<a class="go" href="${B}produk/?p=${slug(p.name)}" aria-label="Lihat ${p.name}">${ic("arrow")}</a></span></div></div></article>`};
const RC=window.RC={card,ic,wa,ROOT,setDemo,slug,cn,rp:n=>"Rp "+Math.round(n).toLocaleString("id-ID"),U};setDemo();
const set=(i,h)=>{const e=$(i);if(e)e.innerHTML=h};
const g=$("#grid");if(g)g.innerHTML=S.products.filter(p=>p.cat===g.dataset.cat).map(card).join("");
let fil="all",srt=null;const tabs=[["all","Semua"],["undangan-web","Undangan Web"],["undangan-video","Undangan Video"],["undangan-fisik","Undangan Fisik"],["umkm","Kemasan UMKM"]];
const drawPort=()=>{const pg=$("#port");if(!pg)return;let l=S.products.filter(p=>p.home&&(fil=="all"||p.cat==fil));if(srt)l=[...l].sort((a,b)=>srt(b)-srt(a));
 pg.innerHTML=l.map(card).join("");$("#ptabs").innerHTML=tabs.map(t=>`<button type="button" data-f="${t[0]}" aria-pressed="${fil==t[0]}">${t[1]}</button>`).join("");RC.refill&&RC.refill()};
RC.setSort=f=>{srt=f;drawPort()};if($("#ptabs"))$("#ptabs").onclick=e=>{const b=e.target.closest("[data-f]");if(b){fil=b.dataset.f;drawPort()}};drawPort();
const catCard=(x,href)=>`<a class="card cat" href="${href}"><div class="pic">${x.img?`<img src="${U(x.img)}" alt="${x.name}" loading="lazy">`:`<div class="ph">${ic(x.id,"ic big")}</div>`}</div><div class="bd"><h3>${x.name}</h3><p>${x.desc}</p></div></a>`;
set("#cats",S.cats.map(x=>catCard(x,B+x.id+"/")).join(""));
const cf=id=>S.cats.find(c=>c.id==id.replace("/",""))||{};
set("#svc",S.nav[0].menu.map(g=>`<h2 class="gh">${g.g}</h2><div class="cats">${g.items.map(i=>i[1]?catCard(Object.assign({},cf(i[1]),{name:i[0]}),B+i[1]):`<div class="card cat soonc"><div class="pic"><div class="ph">${ic("tag","ic big")}</div></div><div class="bd"><h3>${i[0]}</h3><p>Segera hadir.</p></div></div>`).join("")}</div>`).join(""));
{const fp=S.products.filter(p=>p.cat==="undangan-fisik"&&p.amt>0);let bst=null;fp.forEach(p=>{const u=p.tf&&p.tp>0&&p.tp<p.amt?[p.tp,p.tf]:[p.amt,p.min||1];if(!bst||u[0]<bst[0])bst=u});
 if(bst){set("#hb",`${rp(bst[0])}/lembar`);set("#hm",bst[1]>1?`min. ${bst[1]} lembar`:"")}else{set("#hb",`${rp(FF.hemat)}/lembar`);set("#hm",`min. ${FF.min} lembar`)}
 const f0=fp.find(p=>p.tf&&p.tp>0);set("#fnote",f0?`Pilih jenis kertas. ${rp(f0.amt)}/lembar untuk 1–${f0.tf-1} lembar, ${rp(f0.tp)}/lembar mulai ${f0.tf} lembar.`:"Pilih jenis kertas yang Anda butuhkan.")}
const pr=s=>{const k=/^(mulai\s+)(.+)$/i.exec(s||"");return k?`<small class="pf">mulai</small><strong>${k[2]}</strong>`:`<strong>${s}</strong>`};
const bi0=S.bundles.findIndex(x=>x.hot);let bi=bi0<0?0:bi0;
const bwa=x=>wa("Halo, saya mau "+x.name+".\nLink: "+ROOT+"#paket");
set("#bundles",S.bundles.map((x,i)=>`<article class="bund${x.hot?" hot":""}" data-i="${i}">${x.hot?`<span class="medal" aria-hidden="true">${ic("star")}</span><span class="pop">Paling Direkomendasikan</span>`:""}<span class="lb">${x.lb||""}</span><div class="bk"><span>${x.kicker}</span><em>${x.chip}</em></div><h3>${x.name}</h3><p class="bd2">${x.desc}</p><div class="bp">${pr(x.price)}<small class="u">${x.unit}</small></div><ul>${x.items.map(i=>`<li>${ic("check")}<span>${i}</span></li>`).join("")}</ul><a class="btn ${x.hot?"y":"soft"}" href="${bwa(x)}">${x.cta}</a></article>`).join("")+'<div class="bdet" id="bdet" aria-live="polite"></div>');
const drawDet=()=>{const x=S.bundles[bi],d=$("#bdet");if(!d)return;d.innerHTML=`<h3>${x.name}</h3><p class="bp2">${pr(x.price)} <small class="u">${x.unit}</small></p><ul>${x.items.map(i=>`<li>${ic("check")}<span>${i}</span></li>`).join("")}</ul><a class="btn y" href="${bwa(x)}">${x.cta}</a>`;document.querySelectorAll(".bund").forEach(b=>b.classList.toggle("sel",+b.dataset.i==bi))};
if($("#bundles")){$("#bundles").onclick=e=>{const b=e.target.closest(".bund");if(b&&!e.target.closest("a")){bi=+b.dataset.i;drawDet()}};drawDet()}
set("#steps",S.steps.map((s,i)=>`<li class="st"><i>${i+1}</i><div><h4>${s[0]}</h4><p>${s[1]}</p></div></li>`).join(""));
set("#faqlist",S.faq.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join(""));
set("#about",S.about.map(x=>`<p>${x}</p>`).join(""));
set("#gal",(S.gallery.length?S.gallery:Array(6).fill(0)).map(x=>{if(!x)return `<figure class="card"><div class="pic"><div class="ph">${ic("paper","ic big")}<span>Dokumentasi segera hadir</span></div></div></figure>`;
 const im=x.img?`<img src="${U(x.img)}" alt="${x.title||x.cap||""}" loading="lazy" referrerpolicy="no-referrer">`:`<div class="ph">${ic(x.link?"play":"paper","ic big")}<span>${x.link?"Buka tautan":""}</span></div>`;
 const tx=`${x.title?`<h3>${x.title}</h3>`:""}${x.cap?`<p class="gc">${x.cap}</p>`:""}${x.descr?`<p class="gd">${x.descr}</p>`:""}`;
 const inner=`<div class="pic">${im}</div>${tx?`<figcaption>${tx}</figcaption>`:""}`;
 return `<figure class="card gal">${x.link?`<a class="gl" href="${x.link}" target="_blank" rel="noopener noreferrer">${inner}</a>`:inner}</figure>`}).join(""));
if(S.heroImg&&$("#himg"))$("#himg").insertAdjacentHTML("afterbegin",`<img src="${U(S.heroImg)}" alt="Hasil cetak Rumah Cetak">`);
/* kalkulator: daftar dari katalog produk (harga, minimal, harga hemat) */
const E=$("#calc");
if(E){const C=S.calc,fm=n=>"Rp "+Math.round(n).toLocaleString("id-ID"),CP=window.RCP,MAXQ=1000,addWeb=+C.addWeb||0;
const ci=id=>{const i=S.cats.findIndex(c=>c.id==id);return i<0?99:i};
const Ps=S.products.filter(p=>p.amt>0).map((p,i)=>[p,i]).sort((a,b)=>ci(a[0].cat)-ci(b[0].cat)||a[1]-b[1]).map(x=>x[0]);
if(!Ps.length){E.innerHTML='<p style="margin:0">Daftar harga belum tersedia. Hubungi kami lewat WhatsApp.</p>'}else{
const groups=[...new Set(Ps.map(p=>p.cat))];
E.innerHTML=`<div class="cl"><label>Pilih Kebutuhan Cetak<select id="ct">${groups.map(g=>`<optgroup label="${cn(g)}">${Ps.map((p,i)=>p.cat==g?`<option value="${i}">${p.title||p.name}</option>`:"").join("")}</optgroup>`).join("")}</select></label><div id="cq"><div class="qh"><span>Jumlah Pesanan (Quantity):</span><span class="qn"><input id="cn" type="number" inputmode="numeric" min="1" max="100000" value="200" aria-label="Jumlah pesanan"><b id="cun">pcs</b></span></div><input id="cr" type="range" min="25" max="${MAXQ}" step="25" value="200" aria-label="Geser jumlah pesanan"><div class="qs"><span id="qa"></span><span id="qb"></span><span id="qc"></span></div></div><label class="chk" id="cwl"><input type="checkbox" id="cw"><span>Tambahkan Undangan Website Interaktif (+${fm(addWeb)})</span></label></div><div class="cres"><small>ESTIMASI TOTAL BIAYA:</small><strong id="ctot"></strong><p id="cunit"></p><p id="chint" class="hint"></p><ul id="cnote"></ul><a class="btn wa" id="cwa" href="#">${ic("chat")}Kunci Harga Ini di WA</a></div>`;
const n=$("#cn"),r=$("#cr"),sel=$("#ct");let last=-1;
const stepFor=x=>x%25==0?25:x%10==0?10:x%5==0?5:1;
const NOTE={"undangan-fisik":C.notes.fisik,umkm:C.notes.umkm};
const up=()=>{const ti=+sel.value,p=Ps[ti],qty=CP.isQty(p),mn=Math.max(1,p.min||1),u0=p.unit||"pcs";
 const sm=mn>1?mn:25,st=stepFor(sm),mx=Math.max(MAXQ,sm+st*8);
 r.min=sm;r.max=mx;r.step=st;n.min=mn;
 if(ti!==last){last=ti;n.value=mn>1?mn:(p.tf||10)}
 const v0=Math.floor(+n.value)||0;if(document.activeElement!==n&&v0<mn)n.value=mn;
 const q=qty?Math.max(mn,Math.floor(+n.value)||mn):1;r.value=Math.min(mx,Math.max(sm,q));
 const u=CP.unitPrice(p,q),sub=u*q,add=p.cat!=="undangan-web"&&addWeb>0&&$("#cw").checked?addWeb:0,tot=sub+add;
 const nm=p.title||p.name;
 $("#cq").hidden=!qty;$("#cwl").hidden=p.cat==="undangan-web"||!(addWeb>0);$("#cun").textContent=u0;
 $("#qa").textContent=sm.toLocaleString("id-ID")+" "+u0;$("#qb").textContent=Math.round((sm+mx)/2/st)*st+" "+u0;$("#qc").textContent=mx.toLocaleString("id-ID")+" "+u0;
 $("#ctot").textContent=fm(tot);
 $("#cunit").textContent=`${qty?q.toLocaleString("id-ID")+" "+u0:nm+" 1"} × ${fm(u)}${qty?" = "+fm(sub):""}${add?` + Undangan web ${fm(add)} = ${fm(tot)}`:(qty?"":" = "+fm(tot))}`;
 let h="";if(qty&&p.tf&&p.tp>0){if(q>=p.tf)h=`Harga hemat aktif (min. ${p.tf} ${u0})`;else{const mm=p.tf*p.tp;h=sub>mm?`Pesan ${p.tf} ${u0}: ${fm(mm)} (hemat ${fm(sub-mm)}), lebih murah dari ${q} ${u0}.`:`${fm(p.tp)}/${u0} berlaku mulai ${p.tf} ${u0}.`}}
 $("#chint").textContent=h;$("#cnote").innerHTML=(NOTE[p.cat]||C.notes.flat||[]).map(x=>`<li>${ic("check")}${x}</li>`).join("");
 $("#cwa").href=wa(`Halo, saya hitung estimasi di website:\nProduk: ${nm}\n${qty?`Jumlah: ${q} ${u0}\nHitungan: ${q} × ${fm(u)} = ${fm(sub)}`:`Harga: ${fm(u)}`}${add?`\nTambahan undangan web: ${fm(add)}`:""}\nTotal sekitar ${fm(tot)}.\nLink: ${ROOT}produk/?p=${slug(p.name)}`)};
E.addEventListener("input",e=>{if(e.target.id=="cr")n.value=r.value;up()});E.addEventListener("change",up);up()}}
addEventListener("load",()=>{if(location.hash=="#faq"){const e=$("#faq");e&&e.scrollIntoView()}});
})();
