/**
 * mb-carrousel.js — Composant Actualités Carrousel
 * ONG Monde et Bonheur — 2026
 * 
 * Usage dans n'importe quelle page :
 *   1. Ajouter le HTML du carrousel (voir ci-dessous)
 *   2. <script src="mb-carrousel.js"></script>
 *   3. Appeler MBCarrousel.init('id-du-conteneur')
 * 
 * HTML requis (à coller dans la page) :
 * ─────────────────────────────────────
 * <section class="mb-carrousel-section" id="mb-actu-section">
 *   <div class="mbc-header">
 *     <div>
 *       <div class="section-lbl fr">ACTUALITÉS RÉCENTES</div>
 *       <div class="section-lbl en">LATEST NEWS</div>
 *       <div class="mbc-title fr">Ce qui se passe sur le terrain</div>
 *       <div class="mbc-title en">What's happening in the field</div>
 *     </div>
 *     <div class="mbc-controls">
 *       <button class="mbc-btn" onclick="MBCarrousel.move('mb-carr', -1)">←</button>
 *       <button class="mbc-btn" onclick="MBCarrousel.move('mb-carr', 1)">→</button>
 *       <a href="actualites.html" class="mbc-see-all fr">Toutes les actus →</a>
 *       <a href="actualites.html" class="mbc-see-all en">All news →</a>
 *     </div>
 *   </div>
 *   <div class="mbc-track-wrap">
 *     <div class="mbc-track" id="mb-carr-track"></div>
 *   </div>
 *   <div class="mbc-dots" id="mb-carr-dots"></div>
 * </section>
 */

/* ═══════════════════════════════════════════════════
   DONNÉES — Articles & Médias MB
   (Modifier ici pour mettre à jour toutes les pages)
═══════════════════════════════════════════════════ */
window.MB_NEWS_ITEMS = [
  {
    id: 1,
    cat: 'event',
    catFR: '🗓 ÉVÉNEMENT',
    catEN: '🗓 EVENT',
    catClass: 'cat-event',
    emoji: '🎉',
    bg: 'linear-gradient(135deg,#3d2000,#8a5000)',
    dateFR: '15 Nov 2026',
    dateEN: 'Nov 15, 2026',
    titleFR: 'Gala de l\'Impact — Les 20 Ans de MB',
    titleEN: 'Impact Gala — MB\'s 20th Anniversary',
    excerptFR: 'Soirée de fundraising à Yaoundé. Objectif : lever 500M FCFA. Toutes les parties prenantes invitées.',
    excerptEN: 'Fundraising evening in Yaoundé. Target: raise 500M FCFA. All stakeholders invited.',
    link: 'partenaires.html',
    featured: true
  },
  {
    id: 2,
    cat: 'terrain',
    catFR: '🌾 TERRAIN',
    catEN: '🌾 FIELD',
    catClass: 'cat-terrain',
    emoji: '🌾',
    bg: 'linear-gradient(135deg,#0d3320,#1a5c3a)',
    dateFR: 'Fév 2026',
    dateEN: 'Feb 2026',
    titleFR: 'Séchoir Flash opérationnel à Batchenga : +40% revenus',
    titleEN: 'Flash Dryer operational in Batchenga: +40% income',
    excerptFR: 'La CUMA de Batchenga double ses revenus sur le poisson fumé grâce au séchoir Flash MB.',
    excerptEN: 'Batchenga CUMA doubles smoked fish income thanks to the MB Flash Dryer.',
    link: 'carte.html',
    featured: false
  },
  {
    id: 3,
    cat: 'media',
    catFR: '📻 MÉDIA',
    catEN: '📻 MEDIA',
    catClass: 'cat-media',
    emoji: '📻',
    bg: 'linear-gradient(135deg,#2d1a00,#7a4500)',
    dateFR: 'Jan 2026',
    dateEN: 'Jan 2026',
    titleFR: 'RFI Afrique — "Les cuisinières qui sauvent les forêts"',
    titleEN: 'RFI Africa — "The cookers saving the forests"',
    excerptFR: 'Radio France Internationale consacre 8 minutes à l\'innovation "1 Bois / 3 Foyers" de MB.',
    excerptEN: 'Radio France Internationale dedicates 8 minutes to MB\'s "1 Wood / 3 Fires" innovation.',
    link: 'actualites.html',
    featured: false
  },
  {
    id: 4,
    cat: 'tech',
    catFR: '💻 TECH',
    catEN: '💻 TECH',
    catClass: 'cat-tech',
    emoji: '💻',
    bg: 'linear-gradient(135deg,#1e1040,#3a2080)',
    dateFR: 'Déc 2025',
    dateEN: 'Dec 2025',
    titleFR: 'MetaScript : +28% en Physique-Chimie dans les lycées pilotes',
    titleEN: 'MetaScript: +28% in Physics-Chemistry in pilot schools',
    excerptFR: 'Premier bilan documenté des 12 lycées pilotes camerounais équipés de MetaScript.',
    excerptEN: 'First documented assessment from 12 MetaScript-equipped Cameroonian pilot schools.',
    link: 'technologies.html',
    featured: false
  },
  {
    id: 5,
    cat: 'terrain',
    catFR: '🌾 TERRAIN',
    catEN: '🌾 FIELD',
    catClass: 'cat-terrain',
    emoji: '🌿',
    bg: 'linear-gradient(135deg,#0d2b14,#1a5c3a)',
    dateFR: 'Nov 2025',
    dateEN: 'Nov 2025',
    titleFR: 'École Baka de Lomié : 107 élèves — record historique',
    titleEN: 'Baka School Lomié: 107 pupils — all-time record',
    excerptFR: 'L\'école primaire Baka enregistre un record d\'inscription. Les filles : +40% en un an.',
    excerptEN: 'Baka primary school records enrolment all-time high. Girls: +40% in one year.',
    link: 'carte.html',
    featured: false
  },
  {
    id: 6,
    cat: 'tech',
    catFR: '💻 TECH',
    catEN: '💻 TECH',
    catClass: 'cat-tech',
    emoji: '♻️',
    bg: 'linear-gradient(135deg,#1e0d35,#4a2080)',
    dateFR: 'Oct 2025',
    dateEN: 'Oct 2025',
    titleFR: 'Bondjock : premiers m³ de biogaz produits — lycée autonome',
    titleEN: 'Bondjock: first biogas cubic metres produced — autonomous school',
    excerptFR: 'Le digesteur pilote du Lycée de Bondjock produit ses premiers m³. Éclairage biogaz en route.',
    excerptEN: 'Bondjock High School pilot digester produces its first cubic metres. Biogas lighting on the way.',
    link: 'technologies.html',
    featured: false
  },
  {
    id: 7,
    cat: 'media',
    catFR: '📰 PRESSE',
    catEN: '📰 PRESS',
    catClass: 'cat-media',
    emoji: '📰',
    bg: 'linear-gradient(135deg,#1a2a00,#3a5a00)',
    dateFR: 'Sep 2025',
    dateEN: 'Sep 2025',
    titleFR: 'Le Monde Afrique : "MetaScript démocratise les sciences"',
    titleEN: 'Le Monde Africa: "MetaScript democratises science"',
    excerptFR: 'Double page dans Le Monde Afrique sur l\'impact éducatif de MetaScript au Cameroun.',
    excerptEN: 'Double-page feature in Le Monde Africa on MetaScript\'s educational impact in Cameroon.',
    link: 'actualites.html',
    featured: false
  },
  {
    id: 8,
    cat: 'terrain',
    catFR: '🌾 TERRAIN',
    catEN: '🌾 FIELD',
    catClass: 'cat-terrain',
    emoji: '👩',
    bg: 'linear-gradient(135deg,#1a3d22,#2d6b3a)',
    dateFR: 'Août 2025',
    dateEN: 'Aug 2025',
    titleFR: '23 femmes de Batchenga certifiées en gestion agricole',
    titleEN: '23 Batchenga women certified in agricultural management',
    excerptFR: 'Clôture de la formation FORIM-MB. 3 mois, 23 femmes, 97% de taux de présence.',
    excerptEN: 'FORIM-MB training completion. 3 months, 23 women, 97% attendance rate.',
    link: 'carte.html',
    featured: false
  },
  {
    id: 9,
    cat: 'media',
    catFR: '📺 MÉDIA',
    catEN: '📺 MEDIA',
    catClass: 'cat-media',
    emoji: '📺',
    bg: 'linear-gradient(135deg,#0d2040,#1a4a6b)',
    dateFR: 'Juil 2025',
    dateEN: 'Jul 2025',
    titleFR: 'CRTV — Reportage biogaz Bondjock (2M téléspectateurs)',
    titleEN: 'CRTV — Bondjock biogas feature (2M viewers)',
    excerptFR: 'La CRTV diffuse 12 minutes sur le méthaniseur de Bondjock. 2 millions de téléspectateurs.',
    excerptEN: 'CRTV airs 12-minute Bondjock digester feature. 2 million viewers.',
    link: 'actualites.html',
    featured: false
  }
];

/* ═══════════════════════════════════════════════════
   CSS DU COMPOSANT (injecté une seule fois dans <head>)
═══════════════════════════════════════════════════ */
(function injectCSS(){
  if(document.getElementById('mb-carr-style')) return;
  const style = document.createElement('style');
  style.id = 'mb-carr-style';
  style.textContent = `
    .mb-carrousel-section{padding:55px 8%;overflow:hidden;}
    .mb-carrousel-section.on-light{background:#f0ede6;}
    .mb-carrousel-section.on-dark{background:linear-gradient(135deg,#0d1f14,#1a3d22);}
    .mbc-header{max-width:1200px;margin:0 auto 1.6rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.8rem;}
    .mbc-title{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700;color:#1a1a18;}
    .on-dark .mbc-title{color:white;}
    .mbc-controls{display:flex;align-items:center;gap:.5rem;}
    .mbc-btn{width:38px;height:38px;border-radius:50%;border:1.5px solid rgba(26,92,58,.18);background:white;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;transition:all .2s;color:#1a1a18;}
    .mbc-btn:hover{background:#1a5c3a;color:white;border-color:#1a5c3a;}
    .on-dark .mbc-btn{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);color:white;}
    .on-dark .mbc-btn:hover{background:#2d8a58;}
    .mbc-see-all{font-size:13px;font-weight:600;color:#1a5c3a;cursor:pointer;display:flex;align-items:center;gap:.3rem;text-decoration:none;}
    .on-dark .mbc-see-all{color:rgba(255,255,255,.65);}
    .mbc-see-all:hover{text-decoration:underline;}
    .mbc-track-wrap{max-width:1200px;margin:0 auto;overflow:hidden;position:relative;}
    .mbc-track{display:flex;gap:1.2rem;transition:transform .45s cubic-bezier(.25,.46,.45,.94);will-change:transform;}
    .mbc-card{flex-shrink:0;width:calc((100% - 2.4rem) / 3);background:white;border-radius:14px;overflow:hidden;border:1.5px solid rgba(26,92,58,.08);box-shadow:0 4px 24px rgba(0,0,0,.07);transition:all .25s;cursor:pointer;display:flex;flex-direction:column;}
    .on-dark .mbc-card{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.1);}
    .mbc-card:hover{transform:translateY(-5px);box-shadow:0 16px 50px rgba(0,0,0,.13);}
    .mbc-card-img{width:100%;height:155px;object-fit:cover;}
    .mbc-card-img-ph{width:100%;height:155px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;}
    .mbc-card-body{padding:1rem 1.1rem 1.2rem;flex:1;display:flex;flex-direction:column;}
    .mbc-meta{display:flex;align-items:center;gap:.4rem;margin-bottom:.5rem;flex-wrap:wrap;}
    .mbc-cat{font-family:'Space Mono',monospace;font-size:8.5px;letter-spacing:.05em;padding:2px 7px;border-radius:8px;font-weight:700;}
    .mbc-card-date{font-size:11px;color:#8a8a82;}
    .on-dark .mbc-card-date{color:rgba(255,255,255,.38);}
    .mbc-card-title{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;line-height:1.3;color:#1a1a18;margin-bottom:.3rem;flex:1;}
    .on-dark .mbc-card-title{color:white;}
    .mbc-card-excerpt{font-size:12px;color:#4a4a44;line-height:1.6;}
    .on-dark .mbc-card-excerpt{color:rgba(255,255,255,.52);}
    .mbc-dots{display:flex;justify-content:center;gap:.4rem;max-width:1200px;margin:1.2rem auto 0;}
    .mbc-dot{width:7px;height:7px;border-radius:50%;background:rgba(26,92,58,.18);cursor:pointer;transition:all .25s;}
    .mbc-dot.active{background:#1a5c3a;width:20px;border-radius:4px;}
    .on-dark .mbc-dot{background:rgba(255,255,255,.18);}
    .on-dark .mbc-dot.active{background:#f5a623;width:20px;}
    /* Cat couleurs */
    .cat-terrain{background:#e8f5ee;color:#1a5c3a;}
    .cat-tech{background:#e8f0ff;color:#3a3a9a;}
    .cat-media{background:#fff0e8;color:#8a3a00;}
    .cat-event{background:#fdf3e3;color:#c8860a;}
    /* Responsive */
    @media(max-width:860px){
      .mbc-card{width:calc((100% - 1.2rem) / 2);}
    }
    @media(max-width:540px){
      .mbc-card{width:calc(100% - 0rem);}
      .mb-carrousel-section{padding:45px 5%;}
    }
  `;
  document.head.appendChild(style);
})();

/* ═══════════════════════════════════════════════════
   MOTEUR DU CARROUSEL
═══════════════════════════════════════════════════ */
const MBCarrousel = (function(){

  // Stockage des états par instance
  const instances = {};

  function getVisibleCount(){
    return window.innerWidth > 860 ? 3 : window.innerWidth > 540 ? 2 : 1;
  }

  function getLang(){
    return document.documentElement.getAttribute('data-lang') || 'fr';
  }

  // ── Construire les cartes HTML ──
  function buildCard(item){
    const l = getLang();
    const title    = l==='fr' ? item.titleFR    : item.titleEN;
    const excerpt  = l==='fr' ? item.excerptFR  : item.excerptEN;
    const date     = l==='fr' ? item.dateFR     : item.dateEN;
    const catLabel = l==='fr' ? item.catFR      : item.catEN;
    return `
      <div class="mbc-card" onclick="location.href='${item.link}'">
        <div class="mbc-card-img-ph" style="background:${item.bg}">${item.emoji}</div>
        <div class="mbc-card-body">
          <div class="mbc-meta">
            <span class="mbc-cat ${item.catClass}">${catLabel}</span>
            <span class="mbc-card-date">${date}</span>
          </div>
          <div class="mbc-card-title">${title}</div>
          <div class="mbc-card-excerpt">${excerpt}</div>
        </div>
      </div>`;
  }

  // ── Initialiser une instance ──
  function init(trackId, options){
    options = options || {};
    const items   = options.items || window.MB_NEWS_ITEMS || [];
    const limit   = options.limit || items.length;
    const subset  = items.slice(0, limit);

    const track = document.getElementById(trackId + '-track');
    const dots  = document.getElementById(trackId + '-dots');
    if(!track) return;

    track.innerHTML = subset.map(buildCard).join('');

    const vis   = getVisibleCount();
    const pages = Math.max(1, Math.ceil(subset.length / vis));

    instances[trackId] = { idx:0, pages, trackId };

    if(dots){
      dots.innerHTML = Array.from({length:pages},(_,i)=>
        `<div class="mbc-dot${i===0?' active':''}" onclick="MBCarrousel.goTo('${trackId}',${i})"></div>`
      ).join('');
    }
  }

  // ── Déplacer le carrousel ──
  function move(trackId, dir){
    const inst = instances[trackId];
    if(!inst) return;
    inst.idx = (inst.idx + dir + inst.pages) % inst.pages;
    goTo(trackId, inst.idx);
  }

  // ── Aller à un index ──
  function goTo(trackId, i){
    const inst = instances[trackId];
    if(!inst) return;
    inst.idx = i;
    const track = document.getElementById(trackId + '-track');
    const dots  = document.getElementById(trackId + '-dots');
    const vis   = getVisibleCount();
    if(track){
      // Calcul du décalage : i * nbVisible * (largeur_carte + gap)
      const cardW = track.querySelector('.mbc-card') ?
        track.querySelector('.mbc-card').offsetWidth : 300;
      const gap = 1.2 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      track.style.transform = `translateX(-${i * vis * (cardW + gap)}px)`;
    }
    if(dots){
      dots.querySelectorAll('.mbc-dot').forEach((d,j)=>
        d.classList.toggle('active', j===i));
    }
  }

  // ── Auto-play ──
  function autoplay(trackId, intervalMs){
    intervalMs = intervalMs || 5000;
    return setInterval(()=>move(trackId, 1), intervalMs);
  }

  // ── Reconstruire au changement de langue ──
  function rebuildAll(){
    Object.keys(instances).forEach(id=>{
      const track = document.getElementById(id+'-track');
      if(!track) return;
      const items = window.MB_NEWS_ITEMS || [];
      track.innerHTML = items.slice(0, instances[id].pages * getVisibleCount()).map(buildCard).join('');
    });
  }

  // Observer les changements de langue
  const langObs = new MutationObserver(()=>rebuildAll());
  if(document.documentElement){
    langObs.observe(document.documentElement, {attributes:true, attributeFilter:['data-lang']});
  }

  return { init, move, goTo, autoplay, rebuildAll };
})();

/* ═══════════════════════════════════════════════════
   AUTO-INIT — détecte les blocs .mb-carrousel-section
   avec data-carr-id et les initialise automatiquement
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('[data-carr-id]').forEach(function(section){
    const id = section.getAttribute('data-carr-id');
    const limit = parseInt(section.getAttribute('data-carr-limit')) || undefined;
    const autoplayMs = parseInt(section.getAttribute('data-carr-autoplay')) || 0;
    MBCarrousel.init(id, { limit });
    if(autoplayMs) MBCarrousel.autoplay(id, autoplayMs);
  });
});
