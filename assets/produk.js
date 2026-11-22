/* Halaman produk: produk/?p=nama-produk */
(function(){
const S=window.SITE,R=window.RC,CP=window.RCP,$=s=>document.querySelector(s),root=$("#pdp");if(!root||!R)return;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const q0=(new URLSearchParams(location.search).get("p")||"").toLowerCase();
const p=S.products.find(x=>R.slug(x.name)===q0||String(x.id)===q0);
if(!p){root.innerHTML=`<div class="pd-nf"><h1>Produk tidak ditemukan</h1><p>Produk yang Anda cari mungkin sudah tidak tersedia.</p><a class="btn" href="../layanan/">Lihat semua layanan</a></div>`;document.title="Produk tidak ditemukan — Rumah Cetak";return}
const fm=n=>"Rp "+Math.round(n).toLocaleString("id-ID"),qty=CP.isQty(p),mn=Math.max(1,p.min||1),u0=p.unit||"pcs",addWeb=+(S.calc&&S.calc.addWeb)||0,hasPrice=p.amt>0,canWeb=hasPrice&&p.cat!=="undangan-web"&&addWeb>0;
const nm=p.title||p.name,catN=R.cn(p.cat),URLP=R.ROOT+"produk/?p="+R.slug(p.name);
document.title=nm+" — Rumah Cetak";
/* media */
const yt=u=>{const m=String(u||"").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/))([\w-]{11})/);return m?m[1]:""};
const media=[];[p.img,...(p.images||[])].filter(Boolean).forEach(u=>media.push({t:"img",u}));
if(p.video){const id=yt(p.video);if(id)media.push({t:"yt",id,u:p.video});else if(/^https:\/\//.test(p.video))media.push({t:"link",u:p.video})}
let mi=0;
const mainHTML=m=>!m?`<div class="ph">${R.ic(p.cat,"ic big")}<span>Foto ${esc(p.name)}</span></div>`:m.t==="img"?`<img src="${esc(R.U(m.u))}" alt="${esc(nm)}" referrerpolicy="no-referrer">`:m.t==="yt"?`<iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}" title="Video ${esc(nm)}" allow="accelerometer;encrypted-media;picture-in-picture" allowfullscreen loading="lazy"></iframe>`:`<a class="vl" href="${esc(m.u)}" target="_blank" rel="noopener noreferrer">${R.ic("play","ic big")}<b>Tonton video</b><span>Dibuka di tab baru</span></a>`;
const thumbHTML=(m,i)=>`<button type="button" class="pth${i===mi?" on":""}" data-i="${i}" aria-label="Media ${i+1}">${m.t==="img"?`<img src="${esc(R.U(m.u))}" alt="" referrerpolicy="no-referrer">`:`<span>${R.ic("play")}</span>`}</button>`;
const drawMedia=()=>{$("#pm").innerHTML=mainHTML(media[mi]);const t=$("#pts");if(t)t.innerHTML=media.map(thumbHTML).join("")};
/* harga */
const tier=hasPrice&&qty&&p.tf&&p.tp>0;
const priceHTML=()=>!hasPrice?`<div class="pd-price"><b>Hubungi kami</b><small>Harga disesuaikan dengan kebutuhan Anda</small></div>`:
 `<div class="pd-price"><b id="pp">${fm(CP.unitPrice(p,qty?(+$("#pq")?.value||mn):1))}</b><small>/ ${esc(u0)}${mn>1?` · min. ${mn} ${esc(u0)}`:""}</small>${tier?`<span class="pd-tier">Harga hemat ${fm(p.tp)}/${esc(u0)} mulai ${p.tf} ${esc(u0)}</span>`:""}</div>`;
root.innerHTML=`<div class="pd-wrap"><nav class="pd-bc" aria-label="Jalur"><a href="../layanan/">Layanan</a> › <a href="../${esc(p.cat)}/">${esc(catN)}</a> › <span>${esc(p.name)}</span></nav>
<div class="pd"><div class="pd-g"><div class="pd-main" id="pm"></div>${media.length>1?'<div class="pd-th" id="pts"></div>':""}</div>
<div class="pd-i"><span class="bdg2 ${esc(p.cat)}">${esc(catN)}</span><h1>${esc(nm)}</h1><div class="pd-meta" id="pmeta"></div>${priceHTML()}<p class="pd-desc">${esc(p.desc).replace(/\n/g,"<br>")}</p>
${hasPrice?`<div class="pd-calc"><h2>Estimasi biaya</h2>${qty?`<div class="pd-q"><label for="pq">Jumlah (${esc(u0)})</label><div class="stp2"><button type="button" id="pm1" aria-label="Kurangi">−</button><input id="pq" type="number" inputmode="numeric" min="${mn}" max="100000" value="${p.tf||mn}"><button type="button" id="pp1" aria-label="Tambah">+</button></div></div>`:""}${canWeb?`<label class="chk"><input type="checkbox" id="pw"><span>Tambahkan Undangan Website Interaktif (+${fm(addWeb)})</span></label>`:""}<div class="pd-res"><div id="pdet"></div><strong id="ptot"></strong><p class="hint" id="phint"></p></div></div>`:""}
<div class="pd-cta">${p.demo?`<a class="btn soft" href="${esc(R.U(p.demo))}" target="_blank" rel="noopener">${R.ic("mobile")}Lihat Demo</a>`:""}<a class="btn wa" id="pwa" href="#">${R.ic("chat")}Pesan via WhatsApp</a></div></div></div>
<div id="pmore"></div></div>`;
drawMedia();$("#pts")&&($("#pts").onclick=e=>{const b=e.target.closest("[data-i]");if(b){mi=+b.dataset.i;drawMedia()}});
/* hitung */
const upd=()=>{const q=qty?Math.max(mn,Math.floor(+($("#pq")||{}).value)||mn):1,u=hasPrice?CP.unitPrice(p,q):0,sub=u*q,add=canWeb&&$("#pw")&&$("#pw").checked?addWeb:0,tot=sub+add;
 if(hasPrice){$("#pp").textContent=fm(u);$("#pdet").textContent=`${qty?q.toLocaleString("id-ID")+" "+u0:"1 "+u0} × ${fm(u)} = ${fm(sub)}${add?` + Undangan web ${fm(add)}`:""}`;$("#ptot").textContent=fm(tot);
  let h="";if(tier){if(q>=p.tf)h=`Harga hemat aktif (min. ${p.tf} ${u0})`;else{const mm=p.tf*p.tp;h=sub>mm?`Pesan ${p.tf} ${u0}: ${fm(mm)} (hemat ${fm(sub-mm)}), lebih murah dari ${q} ${u0}.`:`${fm(p.tp)}/${u0} berlaku mulai ${p.tf} ${u0}.`}}$("#phint").textContent=h}
 const L=["Halo, saya mau pesan:","Produk: "+nm,"Kategori: "+catN];
 if(hasPrice){L.push("Jumlah: "+q.toLocaleString("id-ID")+" "+u0,"Harga: "+q+" × "+fm(u)+" = "+fm(sub));if(add)L.push("Tambahan undangan web: "+fm(add));L.push("Total estimasi: "+fm(tot))}else L.push("Mohon info harga.");
 L.push("Link: "+URLP);if(p.demo)L.push("Demo: "+(/^https?:/.test(p.demo)?p.demo:R.ROOT+p.demo));
 $("#pwa").href=R.wa(L.join("\n"))};
const pq=$("#pq");if(pq){pq.oninput=upd;$("#pm1").onclick=()=>{pq.value=Math.max(mn,(+pq.value||mn)-(mn>=25?25:mn>=10?10:1));upd()};$("#pp1").onclick=()=>{pq.value=Math.min(100000,(+pq.value||mn)+(mn>=25?25:mn>=10?10:1));upd()};pq.onblur=()=>{if((+pq.value||0)<mn)pq.value=mn;upd()}}
const pw=$("#pw");if(pw)pw.onchange=upd;upd();
/* rating & terjual */
const meta=()=>{const s=R.statFor&&R.statFor(p.name);if(!s)return;$("#pmeta").innerHTML=(s.r?`<span class="rt">${R.ic("star")}${s.r.avg} (${s.r.n})</span>`:"<span>Belum ada ulasan</span>")+(s.so?`<span>${s.so} terjual</span>`:"")};
R.onStats=meta;meta();
/* produk lainnya */
const more=S.products.filter(x=>x.cat===p.cat&&x.name!==p.name).slice(0,4);
if(more.length){$("#pmore").innerHTML=`<h2 class="pd-mh">Produk lainnya di ${esc(catN)}</h2><div class="grid" id="pg2">${more.map(R.card).join("")}</div>`;R.refill&&R.refill()}
})();
