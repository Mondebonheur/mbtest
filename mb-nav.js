/**
 * mb-nav.js v4 — Navigation Universelle ONG Monde et Bonheur
 * ============================================================
 * Injecte header fixe + drawer mobile + footer dans toutes les pages.
 *
 * PRÉREQUIS dans chaque page HTML :
 *   1. <link rel="stylesheet" href="mb-styles.css">   ← styles partagés
 *   2. <html data-lang="fr">                           ← langue par défaut
 *   3. <script src="mb-nav.js"></script>               ← juste avant </body>
 *
 * API publique : MBNav.setLang('fr'|'en')  ·  MBNav.toggleMobile()
 */

(function () {
  'use strict';

  /* Éviter double injection */
  if (document.getElementById('mb-nav-injected')) return;



  const styleEl = document.createElement('style');
  styleEl.id = 'mb-nav-css';
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ══════════════════════════════════════════════════
     2. DÉFINITION DU MENU
  ══════════════════════════════════════════════════ */
  const NAV_ITEMS = [
    {
      labelFR: 'Accueil', labelEN: 'Home',
      href: 'index.html', icon: '🏠'
    },
    {
      labelFR: 'À propos', labelEN: 'About Us',
      href: 'apropos.html', icon: '🌍',
      children: [
        { labelFR: '👩 La Présidente — Pitch & Histoire', labelEN: '👩 President — Pitch & Story', href: 'apropos.html#presidente' },
        { labelFR: '🏛️ Valeurs & Mission', labelEN: '🏛️ Values & Mission', href: 'apropos.html#valeurs' },
        { labelFR: '📅 Notre Histoire — Timeline', labelEN: '📅 Our History — Timeline', href: 'apropos.html#histoire' },
        { labelFR: '📋 Fiche institutionnelle', labelEN: '📋 Institutional overview', href: 'apropos.html#fiche' },
      ]
    },
    {
      labelFR: 'Nos Technologies', labelEN: 'Our Technologies',
      href: 'technologies.html', icon: '🔬',
      children: [
        { labelFR: '🔥 Cuisinière "1 Bois / 3 Foyers"', labelEN: '🔥 Cooker "1 Wood / 3 Fires"', href: 'technologies.html#cuisiniere' },
        { labelFR: '⚡ Séchoir Flash "5 Minutes"', labelEN: '⚡ Flash Dryer "5 Minutes"', href: 'technologies.html#sechoir' },
        { labelFR: '♻️ Biométhanisation', labelEN: '♻️ Biodigestion', href: 'technologies.html#biogaz' },
        { labelFR: '💻 MetaScript', labelEN: '💻 MetaScript', href: 'technologies.html#metascript' },
      ]
    },
    {
      labelFR: 'Nos Actions', labelEN: 'Our Work',
      href: 'carte.html', icon: '🗺️',
      children: [
        { labelFR: '🗺️ Carte des interventions', labelEN: '🗺️ Intervention map', href: 'carte.html' },
        { labelFR: '🌾 Batchenga — CUMA féminine', labelEN: '🌾 Batchenga — Women CUMA', href: 'carte.html' },
        { labelFR: '🏗️ Bondjock — Lycée & Biogaz', labelEN: '🏗️ Bondjock — School & Biogas', href: 'carte.html' },
        { labelFR: '🌿 Lomié — École Pygmées Baka', labelEN: '🌿 Lomié — Baka Pygmies School', href: 'carte.html' },
      ]
    },
    {
      labelFR: 'Notre Équipe', labelEN: 'Our Team',
      href: 'equipe.html', icon: '👥',
      children: [
        { labelFR: '👩 Présidente Fondatrice', labelEN: '👩 Founding President', href: 'equipe.html#presidente' },
        { labelFR: '🏛️ Conseil d\'Administration', labelEN: '🏛️ Board of Directors', href: 'equipe.html#ca' },
        { labelFR: '🌍 Coordinateurs Terrain', labelEN: '🌍 Field Coordinators', href: 'equipe.html#terrain' },
        { labelFR: '🇫🇷 Équipe France', labelEN: '🇫🇷 France Team', href: 'equipe.html#france' },
      ]
    },
    {
      labelFR: 'Actualités', labelEN: 'News',
      href: 'actualites.html', icon: '📰'
    },
    {
      labelFR: 'Gouvernance', labelEN: 'Governance',
      href: 'gouvernance.html', icon: '🔒',
      children: [
        { labelFR: '📊 Transparence financière', labelEN: '📊 Financial transparency', href: 'gouvernance.html#fonds' },
        { labelFR: '✅ Accréditations', labelEN: '✅ Accreditations', href: 'gouvernance.html#accred' },
        { labelFR: '📄 Rapports d\'activité', labelEN: '📄 Activity reports', href: 'gouvernance.html#rapports' },
        { labelFR: '👥 Notre Équipe', labelEN: '👥 Our Team', href: 'gouvernance.html#equipe-gov' },
      ]
    },
    {
      labelFR: 'Partenaires', labelEN: 'Partners',
      href: 'partenaires.html', icon: '🤝'
    },
  ];

  /* Items barre mobile bas (raccourcis) */
  

  /* ══════════════════════════════════════════════════
     3. DÉTECTER LA PAGE ACTIVE
  ══════════════════════════════════════════════════ */
  function currentPage() {
    const p = window.location.pathname.split('/').pop() || 'index.html';
    return p === '' ? 'index.html' : p;
  }

  /* ══════════════════════════════════════════════════
     4. CONSTRUIRE LE HEADER
  ══════════════════════════════════════════════════ */
  function buildNavLink(item, l) {
    const label = l === 'fr' ? item.labelFR : item.labelEN;
    const isActive = currentPage() === item.href || currentPage() === item.href.split('#')[0];
    const hasChildren = item.children && item.children.length;

    if (hasChildren) {
      const ddItems = item.children.map(child => {
        const cl = l === 'fr' ? child.labelFR : child.labelEN;
        return `<a class="mb-nav-dd-item" href="${child.href}">${cl}</a>`;
      }).join('');
      return `
        <li class="mb-nav-item">
          <a class="mb-nav-link${isActive?' active':''}" href="${item.href}">
            ${label} <span class="mb-nav-caret">▾</span>
          </a>
          <div class="mb-nav-dropdown">${ddItems}</div>
        </li>`;
    }
    return `
      <li class="mb-nav-item">
        <a class="mb-nav-link${isActive?' active':''}" href="${item.href}">${label}</a>
      </li>`;
  }

  function buildHeader(l) {
    const links = NAV_ITEMS.map(item => buildNavLink(item, l)).join('');
    const mobileLinks = NAV_ITEMS.map(item => {
      const label = l === 'fr' ? item.labelFR : item.labelEN;
      return `<a class="mb-mob-link" href="${item.href}">
        <span class="mb-mob-icon">${item.icon}</span>${label}
      </a>`;
    }).join('');

    const donFR = 'Faire un don';
    const donEN = 'Donate';

    return `
      <a href="index.html" class="mb-nav-logo">
        <div class="mb-nav-disk">MB</div>
        <div>
          <div class="mb-nav-name">Monde et Bonheur</div>
          <span class="mb-nav-tagline fr">ONG · Cameroun &amp; France</span>
          <span class="mb-nav-tagline en">NGO · Cameroon &amp; France</span>
        </div>
      </a>

      <ul class="mb-nav-links" id="mb-nav-links">${links}</ul>

      <div class="mb-nav-right">
        <div class="mb-lang-toggle">
          <button class="mb-lang-btn${l==='fr'?' active':''}" id="mb-btn-fr" onclick="MBNav.setLang('fr')">FR</button>
          <button class="mb-lang-btn${l==='en'?' active':''}" id="mb-btn-en" onclick="MBNav.setLang('en')">EN</button>
        </div>
        <a class="mb-nav-don-btn" href="don.html">
          ❤️ <span class="fr">${donFR}</span><span class="en">${donEN}</span>
        </a>
        <button class="mb-hamburger" id="mb-hamburger" onclick="MBNav.toggleMobile()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile menu (hors header, injecté séparément) -->
    `;
  }

  /* ══════════════════════════════════════════════════
     5. CONSTRUIRE LE FOOTER
  ══════════════════════════════════════════════════ */
  function buildFooter(l) {
    const pagesCol = [
      { labelFR: '🏠 Accueil', labelEN: '🏠 Home', href: 'index.html' },
      { labelFR: '🌍 À propos', labelEN: '🌍 About Us', href: 'apropos.html' },
      { labelFR: '🔬 Nos Technologies', labelEN: '🔬 Our Technologies', href: 'technologies.html' },
      { labelFR: '🗺️ Zones d\'intervention', labelEN: '🗺️ Intervention Zones', href: 'carte.html' },
      { labelFR: '📰 Actualités', labelEN: '📰 News', href: 'actualites.html' },
      { labelFR: '👥 Notre Équipe', labelEN: '👥 Our Team', href: 'equipe.html' },
      { labelFR: '🤝 Partenaires', labelEN: '🤝 Partners', href: 'partenaires.html' },
      { labelFR: '🔒 Gouvernance', labelEN: '🔒 Governance', href: 'gouvernance.html' },
      { labelFR: '❤️ Faire un don', labelEN: '❤️ Donate', href: 'don.html' },
    ];

    const links = pagesCol.map(p =>
      `<li><a href="${p.href}">${l==='fr'?p.labelFR:p.labelEN}</a></li>`
    ).join('');

    return `
      <div class="mb-footer-main">

        <!-- Branding -->
        <div class="mb-footer-brand">
          <div class="mb-footer-disk">MB</div>
          <div class="mb-footer-brand-name">Monde et Bonheur</div>
          <div class="mb-footer-brand-tag fr">
            Association de Solidarité Internationale &amp; Entreprise Sociale.<br>
            « De la Résilience Humaine à l'Innovation Climatique »
          </div>
          <div class="mb-footer-brand-tag en">
            International Solidarity Association &amp; Social Enterprise.<br>
            "From Human Resilience to Climate Innovation"
          </div>
          <div class="mb-footer-socials">
            <a class="mb-footer-social" href="mailto:courrielmondeetbonheur@gmail.com" title="Email">✉️</a>
            <a class="mb-footer-social" href="https://wa.me/237682180363" title="WhatsApp" target="_blank">💬</a>
            <a class="mb-footer-social" href="#" title="Facebook">📘</a>
            <a class="mb-footer-social" href="#" title="LinkedIn">💼</a>
          </div>
        </div>

        <!-- Pages -->
        <div>
          <div class="mb-footer-col-title fr">PAGES</div>
          <div class="mb-footer-col-title en">PAGES</div>
          <ul class="mb-footer-links">${links}</ul>
        </div>

        <!-- Contact -->
        <div>
          <div class="mb-footer-col-title fr">CONTACT</div>
          <div class="mb-footer-col-title en">CONTACT</div>
          <div class="mb-footer-contact">
            <div class="mb-footer-ci">
              <span class="mb-footer-ci-ico">📧</span>
              <a href="mailto:courrielmondeetbonheur@gmail.com">courrielmondeetbonheur@gmail.com</a>
            </div>
            <div class="mb-footer-ci">
              <span class="mb-footer-ci-ico">📞</span>
              <span>+237 682 18 03 63</span>
            </div>
            <div class="mb-footer-ci">
              <span class="mb-footer-ci-ico">📞</span>
              <span>+33 6 23 92 21 71</span>
            </div>
            <div class="mb-footer-ci">
              <span class="mb-footer-ci-ico">📍</span>
              <span class="fr">Yaoundé BP 17663 · Cameroun<br>3 Clos des Chabrats, 24650 Chancelade · France</span>
              <span class="en">Yaoundé BP 17663 · Cameroon<br>3 Clos des Chabrats, 24650 Chancelade · France</span>
            </div>
          </div>
        </div>

        <!-- Accréditations -->
        <div>
          <div class="mb-footer-col-title fr">ACCRÉDITATIONS</div>
          <div class="mb-footer-col-title en">ACCREDITATIONS</div>
          <div class="mb-footer-contact">
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">✅</span><span>MINATD N°00000404 (2006)</span></div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">✅</span><span>MINREX — <span class="fr">Répertoire ONG</span><span class="en">NGO Registry</span></span></div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">✅</span><span>Label FORIM · France</span></div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">✅</span><span>Loi 1901 — <span class="fr">Fondée 2005</span><span class="en">Founded 2005</span></span></div>
            <div class="mb-footer-ci"><span class="mb-footer-ci-ico">⏳</span><span>GCF — <span class="fr">En cours 2026</span><span class="en">In progress 2026</span></span></div>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="mb-footer-bottom">
        <div class="mb-footer-copy fr">
          © 2026 ONG Monde et Bonheur · <span style="color:rgba(255,255,255,.18)">Tous droits réservés</span>
        </div>
        <div class="mb-footer-copy en">
          © 2026 ONG Monde et Bonheur · <span style="color:rgba(255,255,255,.18)">All rights reserved</span>
        </div>
        <div class="mb-footer-accreds">
          <span class="mb-footer-accred">MINATD ✓</span>
          <span class="mb-footer-accred">MINREX ✓</span>
          <span class="mb-footer-accred">FORIM ✓</span>
          <span class="mb-footer-accred fr">96% TERRAIN</span>
          <span class="mb-footer-accred en">96% TO FIELD</span>
          <span class="mb-footer-accred">LOI 1901 ✓</span>
        </div>
      </div>
    `;
  }

  /* ══════════════════════════════════════════════════
     6. INJECTION DANS LE DOM
  ══════════════════════════════════════════════════ */
  function inject() {
    const l = document.documentElement.getAttribute('data-lang') || 'fr';

    // ── Header ──
    let header = document.getElementById('mb-header');
    if (!header) {
      header = document.createElement('header');
      header.id = 'mb-header';
      header.setAttribute('role', 'banner');
      document.body.insertBefore(header, document.body.firstChild);
    }
    header.innerHTML = buildHeader(l);

    // ── Drawer mobile (sous le header, fermé par défaut) ──
    let mobileMenu = document.getElementById('mb-mobile-menu');
    if (!mobileMenu) {
      mobileMenu = document.createElement('nav');
      mobileMenu.id = 'mb-mobile-menu';
      mobileMenu.className = 'mb-mobile-menu';
      mobileMenu.setAttribute('aria-label', 'Navigation mobile');
      document.body.insertBefore(mobileMenu, header.nextSibling);
    }
    buildMobileDrawer(mobileMenu, l);

    // ── Footer ──
    document.querySelectorAll('.mini-footer').forEach(el => el.remove());
    let footer = document.getElementById('mb-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.id = 'mb-footer';
      document.body.appendChild(footer);
    }
    footer.innerHTML = buildFooter(l);

    // Marque d'injection
    if (!document.getElementById('mb-nav-injected')) {
      const marker = document.createElement('meta');
      marker.id = 'mb-nav-injected';
      marker.name = 'mb-nav-injected';
      document.head.appendChild(marker);
    }

    // ── Scroll → header compact ──
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        header.classList.toggle('scrolled', sy > 20);
        header.classList.toggle('compact', sy > 70);
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── Construire le contenu du drawer mobile ── */
  function buildMobileDrawer(menu, l) {
    const cp = currentPage();

    // Grille rapide (3 colonnes icons)
    const gridItems = NAV_ITEMS.slice(0, 6).map(item => {
      const label = l === 'fr' ? item.labelFR : item.labelEN;
      const isActive = cp === item.href;
      return `<a class="mb-mob-grid-item${isActive?' active':''}" href="${item.href}">
        <span class="mb-mob-grid-icon">${item.icon}</span>
        <span class="mb-mob-grid-lbl">${label}</span>
      </a>`;
    }).join('');

    // Liste complète
    const listItems = NAV_ITEMS.map(item => {
      const label = l === 'fr' ? item.labelFR : item.labelEN;
      return `<a class="mb-mob-link" href="${item.href}">
        <span class="mb-mob-icon">${item.icon}</span>${label}
      </a>`;
    }).join('');

    const donLabel  = l === 'fr' ? '❤️ Faire un don maintenant' : '❤️ Donate now';
    const langLabel = l === 'fr' ? 'Langue :' : 'Language:';

    menu.innerHTML = `
      <div class="mb-mob-grid">${gridItems}</div>
      <div class="mb-mob-list">${listItems}</div>
      <a class="mb-mob-don" href="don.html">${donLabel}</a>
      <div class="mb-mob-lang">
        <span style="font-size:12px;color:var(--tp);font-family:'Space Mono',monospace">${langLabel}</span>
        <button class="mb-mob-lang-btn${l==='fr'?' active':''}" onclick="MBNav.setLang('fr')">FR</button>
        <button class="mb-mob-lang-btn${l==='en'?' active':''}" onclick="MBNav.setLang('en')">EN</button>
      </div>
      <div class="mb-mob-contact">
        <div class="mb-mob-contact-row">📧 courrielmondeetbonheur@gmail.com</div>
        <div class="mb-mob-contact-row">📞 +237 682 18 03 63 · WhatsApp</div>
      </div>
    `;
  }

  /* ══════════════════════════════════════════════════
     7. API PUBLIQUE
  ══════════════════════════════════════════════════ */
  window.MBNav = {

    setLang: function (l) {
      document.documentElement.setAttribute('data-lang', l);
      document.documentElement.setAttribute('lang', l);
      ['btnFR','btnEN'].forEach(id => {
        const b = document.getElementById(id);
        if (b) b.classList.toggle('active', id === 'btn' + l.toUpperCase());
      });
      const header = document.getElementById('mb-header');
      const footer = document.getElementById('mb-footer');
      const mobile = document.getElementById('mb-mobile-menu');
      if (header) header.innerHTML = buildHeader(l);
      if (footer) footer.innerHTML = buildFooter(l);
      if (mobile) buildMobileDrawer(mobile, l);
      if (window.MBCarrousel && window.MBCarrousel.rebuildAll) {
        window.MBCarrousel.rebuildAll();
      }
      if (window.MBFaq && window.MBFaq.rebuild) {
        window.MBFaq.rebuild();
      }
    },

    toggleMobile: function () {
      const menu = document.getElementById('mb-mobile-menu');
      const ham  = document.getElementById('mb-hamburger');
      if (menu) menu.classList.toggle('open');
      if (ham)  ham.classList.toggle('open');
    },

    // Fermer menu mobile en cliquant hors
    closeMobile: function () {
      const menu = document.getElementById('mb-mobile-menu');
      const ham  = document.getElementById('mb-hamburger');
      if (menu) menu.classList.remove('open');
      if (ham)  ham.classList.remove('open');
    }
  };

  /* Fermer mobile au clic sur un lien */
  document.addEventListener('click', function (e) {
    const menu = document.getElementById('mb-mobile-menu');
    const ham  = document.getElementById('mb-hamburger');
    if (!menu || !ham) return;
    if (menu.contains(e.target)) {
      MBNav.closeMobile();
      return;
    }
    const header = document.getElementById('mb-header');
    if (header && !header.contains(e.target)) MBNav.closeMobile();
  });

  /* ── Lancer l'injection ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();

  /* ── Lancer l'injection ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
