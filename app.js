// OUVRIO — version web de découverte. Les données viennent de donnees/catalogue.json (instantané des données PUBLIQUES,
// mis à jour par GitHub Actions). Toute action réelle (demande, contact, compte…) invite à installer l'application Android.
(function () {
  'use strict';
  // ------------------------------------------------------------------ Réglages
  var CONFIG = {
    apk: 'https://github.com/Incarne23/ouvrio-android/releases/latest/download/OUVRIO.apk',
    version: '0.8.5', size: '42,5 Mo', date: '26 novembre 2026',
    whatsapp: '2250556032123', // numéro officiel d'assistance (+225 05 56 03 21 23), format international sans « + »
    whatsappText: 'Bonjour, je découvre OUVRIO depuis la plateforme web et j’ai besoin d’assistance.',
    email: 'myouvrio@gmail.com',
    legal: 'https://ouvrio-app-api.onrender.com',
    sha: '73:F8:A2:3E:C8:D7:B7:50:DC:BD:03:E8:C8:ED:72:50:85:32:39:84:8C:37:61:0D:3D:6A:B7:FF:E0:B4:1F:1B',
  };

  // ------------------------------------------------------------------ Icônes (Feather, comme dans l'application)
  var P = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    bag: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    case: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    percent: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    left: '<polyline points="15 18 9 12 15 6"/>', right: '<polyline points="9 18 15 12 9 6"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    img: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  };
  function ic(n, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + P[n] + '</svg>'; }
  var WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5-1.3A11 11 0 1 0 20.5 3.5z" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"/><path d="M8.6 7.2c.3-.6.6-.6.9-.6h.6c.2 0 .5 0 .7.6l.9 2.1c.1.3 0 .5-.1.7l-.6.7c-.2.2-.2.4-.1.6.6 1.1 1.8 2.3 3 2.9.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.7-.2l2.1 1c.3.1.4.3.4.6 0 .5-.2 1.4-.9 2-.7.6-1.7.8-2.9.4-1.3-.4-2.9-1.2-4.3-2.6-1.5-1.5-2.4-3.1-2.7-4.4-.3-1.1-.1-2 .4-2.6z" fill="#fff"/></svg>';

  // ------------------------------------------------------------------ Outils
  var D = null; // données
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function img(src, alt, cls) { return src ? '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async"' + (cls ? ' class="' + cls + '"' : (/\.svg$/.test(src) ? ' class="svg"' : '')) + '>' : ''; }
  function initial(n) { return esc(String(n || '?').trim().charAt(0).toUpperCase()); }
  function cat(slug) { return D.categories.filter(function (c) { return c.slug === slug; })[0]; }
  function shop(id) { return D.shops.filter(function (s) { return s.id === +id; })[0]; }
  function prod(id) { return D.products.filter(function (p) { return p.id === +id; })[0]; }
  function fold(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  var UA = navigator.userAgent || '';
  var IN_APP = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger/i.test(UA);
  var ANDROID = /Android/i.test(UA);

  // ------------------------------------------------------------------ Composants
  function topMain() {
    return '<div class="top"><div class="brand"><a href="#/" aria-label="Accueil OUVRIO"><img src="logo.webp" width="440" height="120" alt="OUVRIO"></a>' +
      '<a class="pill" href="' + CONFIG.apk + '" data-apk>' + ic('dl') + 'Télécharger OUVRIO</a></div>' + fbBanner() +
      '<button class="search" data-go="#/recherche">' + ic('search') + '<span>Plombier, coiffure…</span><b>' + ic('pin') + esc((D.countries[0] || {}).name || 'Côte d’Ivoire') + '</b></button></div>';
  }
  function topSub(title) { return '<div class="top sub"><button class="back" data-back aria-label="Retour">' + ic('left') + '</button><h1>' + esc(title) + '</h1><a class="pill" href="' + CONFIG.apk + '" data-apk>' + ic('dl') + 'Télécharger</a></div>'; }
  function fbBanner() {
    if (!(IN_APP && ANDROID)) return '';
    return '<div class="fb"><p>Pour installer OUVRIO facilement, ouvrez cette page dans Chrome.</p><a href="intent://' + esc(location.host + location.pathname) + '#Intent;scheme=https;package=com.android.chrome;end">Ouvrir dans Chrome</a></div>';
  }
  function catCard(c) { return '<a class="cat" href="#/service/' + encodeURIComponent(c.slug) + '"><div class="im">' + (img(c.image, c.name) || ic('tool')) + '</div><span>' + esc(c.name) + '</span></a>'; }
  function shopCard(s, full) {
    var logo = '<div class="logo">' + (s.logo ? img(s.logo, s.name) : initial(s.name)) + '</div>';
    var meta = '<div class="meta">' + (s.category ? '<span>' + esc(s.category) + '</span>' : '') + (s.city ? '<span>' + esc(s.flag) + ' ' + esc(s.city) + '</span>' : '') +
      (s.rating ? '<span>★ ' + esc(s.rating.average) + ' (' + esc(s.rating.count) + ')</span>' : '') + '</div>';
    var name = '<h4>' + esc(s.name) + (s.premium ? '<span class="prem">PREMIUM</span>' : '') + '</h4>';
    if (full) return '<a class="shopc full" href="#/boutique/' + s.id + '">' + logo + '<div class="bd">' + name + meta + '<div class="meta"><span>' + s.products.length + ' produit' + (s.products.length > 1 ? 's' : '') + '</span></div></div>' + ic('right', ' style="width:18px;height:18px;color:#6B7487;flex:none"') + '</a>';
    return '<a class="shopc" href="#/boutique/' + s.id + '"><div class="bn">' + (s.banner ? img(s.banner, '') : '') + logo + '</div><div class="bd">' + name + meta + '</div></a>';
  }
  function prodCard(p) {
    return '<a class="prod" href="#/produit/' + p.id + '">' + (p.promo ? '<span class="promo">-' + esc(p.promo) + ' %</span>' : '') + '<div class="im">' + (p.images[0] ? img(p.images[0], p.name) : ic('img')) + '</div>' +
      '<div class="bd"><h4>' + esc(p.name) + '</h4><div class="price">' + esc(p.price || 'Prix sur demande') + (p.old_price ? '<span class="old">' + esc(p.old_price) + '</span>' : '') + '</div>' +
      '<div class="meta"><span>' + esc(p.shop.name) + '</span></div></div></a>';
  }
  function emptyShops() {
    return '<div class="empty"><h4>Les boutiques partenaires arrivent bientôt</h4><p>Commerçant, entreprise, marque ? Présentez vos produits aux clients d’OUVRIO.</p><button class="btn b-cta" data-gate="boutique">' + ic('bag') + 'Ouvrir votre boutique</button></div>';
  }
  function ctaBlock(kind) {
    var c = kind === 'pro' ? D.content.provider : D.content.partner;
    var cls = kind === 'pro' ? 'o' : 'p';
    var pts = (c.points || []).map(function (x) { return '<li>' + ic('check') + '<span>' + esc(x) + '</span></li>'; }).join('');
    return '<div class="cta ' + cls + '"><h3>' + esc(c.title || (kind === 'pro' ? 'Devenez prestataire OUVRIO' : 'Ouvrez votre boutique sur OUVRIO')) + '</h3>' + (c.text ? '<p>' + esc(c.text) + '</p>' : '') + (pts ? '<ul>' + pts + '</ul>' : '') +
      '<button class="btn ' + (kind === 'pro' ? 'b-w' : 'b-cta') + '" data-gate="' + (kind === 'pro' ? 'prestataire' : 'boutique') + '">' + (kind === 'pro' ? 'Créer mon espace prestataire' : 'Devenir partenaire') + '</button></div>';
  }
  function foot() {
    return '<div class="foot">OUVRIO · Version web de découverte<br><a href="' + CONFIG.legal + '/conditions" rel="noopener">Conditions</a><a href="' + CONFIG.legal + '/confidentialite" rel="noopener">Confidentialité</a><a href="' + CONFIG.legal + '/suppression-compte" rel="noopener">Supprimer un compte</a><a href="#/installer">Installer l’application</a></div>';
  }
  var HOW = [
    ['Choisissez un service', 'Plomberie, électricité, coiffure, ménage… plus de ' + 10 + ' métiers.'],
    ['Décrivez votre besoin', 'Un formulaire simple, adapté à chaque métier, avec votre ville et votre commune.'],
    ['Un professionnel vous contacte', 'Votre demande est transmise aux professionnels de votre zone.'],
    ['Suivez et notez la prestation', 'Tout se passe dans votre compte OUVRIO, gratuit pour les clients.'],
  ];

  // ------------------------------------------------------------------ Écrans
  var S = {};
  S.home = function () {
    var h = D.content.hero || {};
    var shops = D.shops.slice().sort(function (a, b) { return (b.featured - a.featured) || (b.premium - a.premium); });
    var promos = D.products.filter(function (p) { return p.promo; });
    var html = '<div class="hero" data-go="#/demande">' + (h.image ? img(h.image, '') : '') + '<div><span class="tag">OUVRIO</span><h3>' + esc(h.title || 'Le bon professionnel, au bon moment.') + '</h3><p>' + esc(h.subtitle || '') + '</p><b>Faire une demande ›</b></div></div>' +
      '<div class="quick"><button data-go="#/explorer"><span class="qi" style="background:#E6ECF5;color:#0B2447">' + ic('tool') + '</span>Services</button>' +
      '<button data-go="#/boutiques"><span class="qi" style="background:#FDE7D6;color:#C24E00">' + ic('bag') + '</span>Boutiques</button>' +
      (D.features.emploi ? '<button data-go="#/emploi"><span class="qi" style="background:#E3F4EC;color:#12805C">' + ic('case') + '</span>Emploi</button>' : '<button data-go="#/compte"><span class="qi" style="background:#E3F4EC;color:#12805C">' + ic('users') + '</span>Espaces</button>') +
      '<button data-go="#/promos"><span class="qi" style="background:#FFF3CC;color:#8A5A00">' + ic('percent') + '</span>Promos</button></div>' +
      '<div class="row"><h2>De quel service avez-vous besoin ?</h2></div><div class="cats">' + D.categories.slice(0, 9).map(catCard).join('') + '</div>' +
      '<button class="btn b-g mt" data-go="#/explorer">Voir les ' + D.categories.length + ' services ' + ic('right') + '</button>' +
      '<h2>Comment ça marche ?</h2><div class="steps">' + HOW.map(function (x) { return '<div class="st"><div><b>' + x[0] + '</b><span>' + x[1] + '</span></div></div>'; }).join('') + '</div>' +
      '<div class="row"><h2>Boutiques partenaires</h2>' + (shops.length ? '<a href="#/boutiques">Tout voir</a>' : '') + '</div>' +
      (shops.length ? '<div class="hs">' + shops.slice(0, 10).map(function (s) { return shopCard(s); }).join('') + '</div>' : emptyShops()) +
      (D.products.length ? '<div class="row"><h2>' + (promos.length ? 'Bonnes affaires' : 'Produits des boutiques') + '</h2><a href="#/boutiques">Tout voir</a></div><div class="prods">' + (promos.length ? promos : D.products).slice(0, 6).map(prodCard).join('') + '</div>' : '') +
      ctaBlock('pro') + ctaBlock('partner') +
      (D.features.emploi ? '<div class="cta n"><h3>OUVRIO Emploi</h3><p>Chauffeurs, personnel de maison, personnel de cuisine : trouvez du personnel ou un travail en toute confiance.</p><button class="btn b-w" data-go="#/emploi">Découvrir OUVRIO Emploi</button></div>' : '') +
      foot();
    return { top: topMain(), body: html, tab: 'accueil' };
  };
  S.explorer = function () {
    return { top: topMain(), tab: 'explorer', body: '<h2>Tous les services</h2><p class="sub2">Choisissez un service pour découvrir ce qu’OUVRIO peut faire pour vous.</p><div class="cats">' + D.categories.map(catCard).join('') + '</div>' + foot() };
  };
  S.service = function (slug) {
    var c = cat(slug); if (!c) return S.explorer();
    return { top: topSub(c.name), tab: 'explorer', body: (c.image ? '<div class="banner">' + img(c.image, c.name) + '</div>' : '') +
      '<p class="lead">' + esc(c.description || c.short || '') + '</p>' +
      (c.needs.length ? '<h2>Besoins fréquents</h2><div class="chips">' + c.needs.map(function (n) { return '<a class="chip" href="#/demande/' + encodeURIComponent(c.slug) + '">' + esc(n) + '</a>'; }).join('') + '</div>' : '') +
      '<div class="note">' + ic('shield') + '<span>Décrivez votre besoin : votre demande est transmise aux professionnels de ce métier dans votre zone. Un professionnel vous contacte. Gratuit pour les clients.</span></div>' +
      '<a class="btn b-cta mt" href="#/demande/' + encodeURIComponent(c.slug) + '">' + ic('send') + 'Faire une demande de ' + esc(c.name.toLowerCase()) + '</a>' +
      '<button class="btn b-l mt" data-gate="prestataire">Je suis professionnel en ' + esc(c.name.toLowerCase()) + '</button>' };
  };
  S.demande = function (slug) {
    if (!slug) return { top: topSub('Faire une demande'), tab: 'demande', body: '<p class="lead">De quel service avez-vous besoin ?</p><div class="list mt">' +
      D.categories.map(function (c) { return '<a class="li" href="#/demande/' + encodeURIComponent(c.slug) + '"><span class="ic">' + (c.image ? img(c.image, '') : ic('tool')) + '</span><div><b>' + esc(c.name) + '</b><small>' + esc(c.short || '') + '</small></div>' + ic('right') + '</a>'; }).join('') + '</div>' };
    var c = cat(slug); if (!c) return S.demande();
    var q = c.questions.map(function (x) {
      var lab = '<label class="f">' + esc(x.label) + (x.required ? ' <i>*</i>' : '') + '</label>';
      if (x.options.length) return lab + '<select class="in"><option value="">Choisir…</option>' + x.options.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select>';
      return lab + (x.type === 'textarea' ? '<textarea class="in"></textarea>' : '<input class="in"' + (x.type === 'number' ? ' inputmode="numeric"' : '') + '>');
    }).join('');
    return { top: topSub('Demande : ' + c.name), tab: 'demande', body: '<p class="lead">Décrivez votre besoin. Un professionnel de votre zone vous contactera.</p>' +
      (c.needs.length ? '<label class="f">Votre besoin <i>*</i></label><select class="in"><option value="">Choisir…</option>' + c.needs.map(function (n) { return '<option>' + esc(n) + '</option>'; }).join('') + '</select>' : '') + q +
      '<label class="f">Décrivez votre besoin <i>*</i></label><textarea class="in" placeholder="Exemple : fuite sous l’évier de la cuisine depuis ce matin."></textarea>' +
      '<label class="f">Ville et commune <i>*</i></label><input class="in" placeholder="Exemple : Abidjan, Cocody">' +
      '<button class="btn b-cta mt" style="margin-top:20px" data-gate="demande">' + ic('send') + 'Envoyer ma demande</button>' +
      '<div class="note">' + ic('lock') + '<span>Vos coordonnées ne sont jamais affichées publiquement. L’envoi se fait depuis votre compte OUVRIO, dans l’application.</span></div>' };
  };
  S.boutiques = function () {
    var shops = D.shops;
    return { top: topMain(), tab: 'boutiques', body: '<h2>Boutiques partenaires</h2>' + (shops.length ? '<div class="list">' + shops.map(function (s) { return shopCard(s, true); }).join('') + '</div>' : emptyShops()) +
      (D.products.length ? '<h2>Produits</h2><div class="prods">' + D.products.map(prodCard).join('') + '</div>' : '') + (shops.length ? ctaBlock('partner') : '') + foot() };
  };
  S.promos = function () {
    var list = D.products.filter(function (p) { return p.promo; });
    return { top: topSub('Promotions'), tab: 'accueil', body: list.length ? '<p class="lead">Les prix réduits des boutiques partenaires.</p><div class="prods mt">' + list.map(prodCard).join('') + '</div>' :
      '<div class="empty mt"><h4>Pas de promotion en ce moment</h4><p>Les bonnes affaires des boutiques partenaires apparaîtront ici.</p><a class="btn b-cta" href="#/boutiques">Voir les boutiques</a></div>' };
  };
  S.boutique = function (id) {
    var s = shop(id); if (!s) return S.boutiques();
    var prods = s.products.map(prod).filter(Boolean);
    return { top: topSub(s.name), tab: 'boutiques', body: '<div class="shopc" style="width:auto;margin-top:6px"><div class="bn" style="height:120px">' + (s.banner ? img(s.banner, '') : '') + '<div class="logo" style="width:64px;height:64px">' + (s.logo ? img(s.logo, s.name) : initial(s.name)) + '</div></div>' +
      '<div class="bd" style="padding-top:34px"><h4 style="font-size:18px;white-space:normal">' + esc(s.name) + (s.premium ? '<span class="prem">PREMIUM</span>' : '') + '</h4><div class="meta">' + (s.category ? '<span>' + esc(s.category) + '</span>' : '') +
      (s.city ? '<span>' + esc(s.flag) + ' ' + esc(s.city) + '</span>' : '') + (s.rating ? '<span>★ ' + esc(s.rating.average) + ' (' + esc(s.rating.count) + ' avis)</span>' : '') + '</div>' +
      (s.description ? '<p class="desc" style="margin-top:10px">' + esc(s.description) + '</p>' : '') + '</div></div>' +
      '<button class="btn b-wa mt" data-gate="contact">' + WA_ICON.replace('<svg', '<svg style="width:22px;height:22px"') + 'Contacter la boutique</button>' +
      '<button class="btn b-l mt" data-gate="favori">' + ic('heart') + 'Ajouter à mes favoris</button>' +
      '<button class="btn b-l mt" data-gate="avis">' + ic('star') + 'Laisser un avis</button>' +
      '<h2>Produits (' + prods.length + ')</h2>' + (prods.length ? '<div class="prods">' + prods.map(prodCard).join('') + '</div>' : '<p class="sub2">Les produits de cette boutique arrivent bientôt.</p>') };
  };
  S.produit = function (id) {
    var p = prod(id); if (!p) return S.boutiques();
    var s = shop(p.shop.id) || p.shop;
    return { top: topSub(p.name), tab: 'boutiques', body: '<div class="gal">' + (p.images.length ? p.images.map(function (u) { return '<div>' + img(u, p.name) + '</div>'; }).join('') : '<div>' + ic('img') + '</div>') + '</div>' +
      (p.images.length > 1 ? '<p class="small">Faites glisser pour voir les ' + p.images.length + ' photos</p>' : '') +
      '<div class="pt">' + esc(p.name) + '</div><div class="price" style="font-size:20px">' + esc(p.price || 'Prix sur demande') + (p.old_price ? '<span class="old">' + esc(p.old_price) + '</span>' : '') + (p.promo ? ' <span class="promo" style="position:static;vertical-align:3px">-' + esc(p.promo) + ' %</span>' : '') + '</div>' +
      (p.availability ? '<span class="avail">' + esc(p.availability) + '</span>' : '') +
      '<button class="btn b-wa mt" style="margin-top:16px" data-gate="commande">' + WA_ICON.replace('<svg', '<svg style="width:22px;height:22px"') + 'Commander ce produit</button>' +
      '<button class="btn b-l mt" data-gate="favori">' + ic('heart') + 'Ajouter à mes favoris</button>' +
      (p.description ? '<h2>Description</h2><p class="desc">' + esc(p.description) + '</p>' : '') +
      '<h2>Vendu par</h2>' + (s.products ? shopCard(s, true) : '<div class="card">' + esc(p.shop.name) + '</div>') +
      ((p.brand || p.category) ? '<div class="meta" style="margin-top:12px">' + (p.category ? '<span>Catégorie : ' + esc(p.category) + '</span>' : '') + (p.brand ? '<span>Marque : ' + esc(p.brand) + '</span>' : '') + '</div>' : '') };
  };
  S.emploi = function () {
    return { top: topSub('OUVRIO Emploi'), tab: 'accueil', body: '<p class="lead">La mise en relation de confiance entre employeurs et personnes qui cherchent du travail.</p>' +
      '<div class="list mt">' + [['case', 'Chauffeurs'], ['home', 'Personnel de maison'], ['tool', 'Personnel de cuisine']].map(function (x) { return '<div class="li"><span class="ic">' + ic(x[0]) + '</span><div><b>' + x[1] + '</b><small>Mise en relation par l’équipe OUVRIO</small></div></div>'; }).join('') + '</div>' +
      '<div class="cta p"><h3>Vous cherchez du personnel ?</h3><p>Déposez votre demande : l’équipe OUVRIO vous met en relation avec des profils de votre ville.</p><button class="btn b-cta" data-gate="employeur">Je cherche du personnel</button></div>' +
      '<div class="cta n"><h3>Vous cherchez un travail ?</h3><p>Créez votre profil candidat gratuitement et recevez des offres près de chez vous.</p><button class="btn b-w" data-gate="candidat">Je cherche un travail</button></div>' };
  };
  S.compte = function () {
    var spaces = [['user', 'Espace client', 'Publiez vos demandes, suivez-les et notez les prestations. Gratuit.', 'compte'],
      ['tool', 'Espace prestataire', 'Recevez les demandes de votre métier et de votre zone.', 'prestataire'],
      ['bag', 'Boutique partenaire', 'Vitrine, produits, prix, contacts WhatsApp et statistiques.', 'boutique']];
    if (D.features.emploi) spaces.push(['case', 'Candidat OUVRIO Emploi', 'Votre profil pour trouver un travail près de chez vous.', 'candidat']);
    return { top: topMain(), tab: 'compte', body: '<div class="cta n" style="margin-top:6px"><h3>Votre compte OUVRIO</h3><p>Un seul compte gratuit pour tous vos espaces, dans l’application Android.</p>' +
      '<button class="btn b-w" data-gate="compte">Créer mon compte</button><button class="btn mt" style="color:#fff;border:1.5px solid rgba(255,255,255,.4)" data-gate="connexion">Se connecter</button></div>' +
      '<h2>Les espaces OUVRIO</h2><div class="list">' + spaces.map(function (x) { return '<button class="li" data-gate="' + x[3] + '"><span class="ic">' + ic(x[0]) + '</span><div><b>' + x[1] + '</b><small>' + x[2] + '</small></div>' + ic('right') + '</button>'; }).join('') + '</div>' +
      '<h2>Aide</h2><div class="list"><a class="li" href="#/installer"><span class="ic">' + ic('dl') + '</span><div><b>Installer l’application</b><small>Version ' + CONFIG.version + ' · ' + CONFIG.size + '</small></div>' + ic('right') + '</a>' +
      '<button class="li" data-help><span class="ic">' + ic('info') + '</span><div><b>Assistance</b><small>Une question ? Écrivez-nous.</small></div>' + ic('right') + '</button></div>' + foot() };
  };
  S.recherche = function () {
    return { top: topSub('Rechercher'), tab: null, body: '<input class="in" id="q" type="search" placeholder="Plombier, coiffure, téléphone…" autocomplete="off"><div id="res" class="mt"></div>', after: function () {
      var q = $('q'); q.focus();
      function run() {
        var t = fold(q.value.trim()); var out = '';
        if (t.length < 2) { $('res').innerHTML = '<p class="sub2" style="margin-top:6px">Tapez au moins 2 lettres.</p>'; return; }
        var cs = D.categories.filter(function (c) { return fold(c.name + ' ' + c.short + ' ' + c.needs.join(' ')).indexOf(t) >= 0; });
        var ss = D.shops.filter(function (s) { return fold(s.name + ' ' + s.category + ' ' + s.description).indexOf(t) >= 0; });
        var ps = D.products.filter(function (p) { return fold(p.name + ' ' + p.category + ' ' + p.brand).indexOf(t) >= 0; });
        if (cs.length) out += '<h2>Services</h2><div class="cats">' + cs.map(catCard).join('') + '</div>';
        if (ss.length) out += '<h2>Boutiques</h2><div class="list">' + ss.map(function (s) { return shopCard(s, true); }).join('') + '</div>';
        if (ps.length) out += '<h2>Produits</h2><div class="prods">' + ps.map(prodCard).join('') + '</div>';
        $('res').innerHTML = out || '<div class="empty mt"><h4>Aucun résultat</h4><p>Décrivez votre besoin : un professionnel peut vous aider.</p><a class="btn b-cta" href="#/demande">Faire une demande</a></div>';
      }
      q.addEventListener('input', run); run();
    } };
  };
  S.installer = function () {
    return { top: topSub('Installer OUVRIO'), tab: null, body: '<div class="cta n" style="margin-top:6px;text-align:center"><img src="icone-192.png" width="72" height="72" alt="" style="margin:0 auto 10px;border-radius:18px"><h3>Application OUVRIO pour Android</h3><p>Version ' + CONFIG.version + ' · ' + CONFIG.size + ' · Mise à jour le ' + CONFIG.date + '</p>' +
      '<a class="btn b-cta" href="' + CONFIG.apk + '" data-apk>' + ic('dl') + 'Télécharger OUVRIO pour Android</a></div>' + benefits() + '<h2>Comment installer OUVRIO ?</h2>' + installSteps() + trust() + foot() };
  };
  function benefits() {
    return '<ul class="ben" style="margin-top:18px">' + [['send', 'Envoyez vos demandes et soyez contacté par un professionnel'], ['bell', 'Suivez vos demandes et recevez les réponses'], ['tool', 'Devenez prestataire et recevez des clients'], ['bag', 'Contactez les boutiques et ouvrez la vôtre']]
      .map(function (b) { return '<li><span>' + ic(b[0]) + '</span>' + b[1] + '</li>'; }).join('') + '</ul>';
  }
  function installSteps() {
    return '<ol class="ins"><li><b>Téléchargez le fichier</b>Si Chrome demande une confirmation, appuyez sur <span class="k">Télécharger quand même</span>.</li>' +
      '<li><b>Ouvrez OUVRIO.apk</b>Appuyez sur <span class="k">Ouvrir</span> à la fin du téléchargement, ou ouvrez le dossier <span class="k">Téléchargements</span>.</li>' +
      '<li><b>Autorisez l’installation (une seule fois)</b>Si Android affiche « source inconnue », appuyez sur <span class="k">Paramètres</span>, activez <span class="k">Autoriser cette source</span>, puis revenez.</li>' +
      '<li><b>Installez puis ouvrez</b>Appuyez sur <span class="k">Installer</span>. Si Play Protect affiche un message : <span class="k">Plus de détails</span> puis <span class="k">Installer quand même</span>. Enfin <span class="k">Ouvrir</span>.</li></ol>';
  }
  function trust() {
    return '<div class="card mt"><b style="display:flex;gap:8px;align-items:center">' + ic('shield', ' style="width:20px;height:20px;color:#12805C"') + 'Application officielle OUVRIO</b><p class="sub2" style="margin:8px 0">Publiée uniquement ici par OUVRIO, signée avec le certificat officiel : chaque mise à jour s’installe par-dessus, sans perdre votre compte. Ni caméra, ni micro, ni localisation demandés. La version Google Play est en préparation.</p><p class="fp">SHA-256 : ' + CONFIG.sha + '</p></div>';
  }

  // ------------------------------------------------------------------ Fenêtres (invitation, installation, assistance)
  var GENERAL = 'Vous pouvez explorer notre plateforme, découvrir les services et les boutiques. Pour effectuer vos demandes, contacter les professionnels, créer votre compte et profiter de toutes les fonctionnalités, téléchargez l’application officielle OUVRIO.';
  var GATES = {
    demande: ['Votre demande est presque prête !', 'Pour l’envoyer et trouver un professionnel, téléchargez l’application OUVRIO.'],
    contact: ['Vous découvrez OUVRIO ! 🎉', 'Pour contacter cette boutique, téléchargez l’application officielle OUVRIO.'],
    commande: ['Vous découvrez OUVRIO ! 🎉', 'Pour commander ce produit et contacter le vendeur, téléchargez l’application officielle OUVRIO.'],
    favori: ['Vous découvrez OUVRIO ! 🎉', 'Pour enregistrer vos favoris, téléchargez l’application officielle OUVRIO.'],
    avis: ['Vous découvrez OUVRIO ! 🎉', 'Pour laisser un avis, téléchargez l’application officielle OUVRIO.'],
    prestataire: ['Devenez prestataire OUVRIO 🛠️', 'Pour créer votre espace prestataire, publier vos services et recevoir des demandes près de chez vous, téléchargez l’application officielle OUVRIO.'],
    boutique: ['Ouvrez votre boutique OUVRIO 🛍️', 'Pour créer votre boutique et présenter vos produits, téléchargez l’application officielle OUVRIO.'],
    employeur: ['Vous découvrez OUVRIO ! 🎉', 'Pour déposer votre demande de personnel, téléchargez l’application officielle OUVRIO.'],
    candidat: ['Vous découvrez OUVRIO ! 🎉', 'Pour créer votre profil candidat et postuler, téléchargez l’application officielle OUVRIO.'],
    compte: ['Vous découvrez OUVRIO ! 🎉', 'Pour créer votre compte gratuit, téléchargez l’application officielle OUVRIO.'],
    connexion: ['Vous découvrez OUVRIO ! 🎉', 'Pour vous connecter à votre compte, téléchargez l’application officielle OUVRIO.'],
  };
  function closeLayer() { $('layer').innerHTML = ''; document.body.style.overflow = ''; }
  function sheet(html) {
    $('layer').innerHTML = '<div class="ov" data-close><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>' + html + '</div></div>';
    document.body.style.overflow = 'hidden';
  }
  function gate(kind) {
    var g = GATES[kind] || ['Vous découvrez OUVRIO ! 🎉', GENERAL];
    sheet('<h3>' + esc(g[0]) + '</h3><p class="lead">' + esc(g[1]) + '</p>' + (kind === 'demande' ? '' : '<p class="lead" style="margin-top:-6px;font-size:13.5px">Vous pouvez continuer à explorer la plateforme, les services et les boutiques.</p>') + benefits() +
      '<a class="btn b-cta" href="' + CONFIG.apk + '" data-apk>📲 TÉLÉCHARGER OUVRIO</a><button class="btn b-g mt" data-close>CONTINUER À EXPLORER</button>' +
      '<p class="small">L’application est gratuite à télécharger · Android · Version ' + CONFIG.version + ' · ' + CONFIG.size + '</p>');
  }
  function afterDownload() {
    sheet('<div class="okbox">' + ic('check') + '<span>Téléchargement lancé ! Suivez ces étapes pour installer OUVRIO.</span></div>' + installSteps() +
      (IN_APP ? '<div class="fb"><p>Rien ne se passe ? Ouvrez la page dans Chrome puis réessayez.</p><a href="intent://' + esc(location.host + location.pathname) + '#Intent;scheme=https;package=com.android.chrome;end">Chrome</a></div>' : '') +
      '<button class="btn b-g mt" data-close>Continuer à explorer</button><button class="btn b-l mt" data-help>Besoin d’aide pour installer ?</button>');
  }
  function waLink() { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.whatsappText); }
  function help() { window.open(waLink(), '_blank', 'noopener'); }

  // ------------------------------------------------------------------ Navigation
  var TABS = [['accueil', 'Accueil', 'home', '#/'], ['explorer', 'Explorer', 'grid', '#/explorer'], ['demande', 'Demande', 'plus', '#/demande'], ['boutiques', 'Boutiques', 'bag', '#/boutiques'], ['compte', 'Compte', 'user', '#/compte']];
  var depth = 0, views = 0, snackShown = false;
  function route() {
    var h = (location.hash || '#/').replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    var name = h[0] || 'home'; var fn = S[name] || S.home;
    var v = fn(h[1]);
    $('top').innerHTML = v.top; $('main').innerHTML = '<div class="view">' + v.body + '</div>';
    $('tabs').innerHTML = TABS.map(function (t) { return '<button class="' + (t[0] === 'demande' ? 'c ' : '') + (v.tab === t[0] ? 'on' : '') + '" data-go="' + t[3] + '">' + (t[0] === 'demande' ? '<span class="p">' + ic('plus') + '</span>' : ic(t[2])) + t[1] + '</button>'; }).join('');
    if (v.after) v.after();
    window.scrollTo(0, 0);
    views++; if (views === 4 && !snackShown) snack();
  }
  function snack() {
    snackShown = true;
    var d = document.createElement('div'); d.className = 'snack'; d.id = 'snack';
    d.innerHTML = '<p><b>OUVRIO vous plaît ?</b><br>Installez l’application gratuite.</p><a class="pill" href="' + CONFIG.apk + '" data-apk>Télécharger</a><button class="x" aria-label="Fermer" data-snackx>' + ic('x') + '</button>';
    document.body.appendChild(d);
  }
  function go(href) { if (location.hash === href) route(); else { depth++; location.hash = href; } }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-close],[data-go],[data-back],[data-gate],[data-dl],[data-apk],[data-help],[data-snackx],a[href^="#/"]');
    if (!t) return;
    if (t.hasAttribute('data-close')) { if (e.target === t || t.tagName === 'BUTTON') closeLayer(); return; }
    if (t.hasAttribute('data-apk')) { var sn = $('snack'); if (sn) sn.remove(); setTimeout(afterDownload, 700); return; } // le lien télécharge réellement l'APK, puis on affiche les étapes
    e.preventDefault();
    if (t.hasAttribute('data-snackx')) { var s = $('snack'); if (s) s.remove(); return; }
    if (t.hasAttribute('data-help')) { if (t.tagName !== 'A') help(); else return; return; }
    if (t.hasAttribute('data-dl')) { var s2 = $('snack'); if (s2) s2.remove(); gate(); $('layer').querySelector('h3').textContent = 'Installez OUVRIO 📲'; return; }
    if (t.hasAttribute('data-gate')) { gate(t.getAttribute('data-gate')); return; }
    if (t.hasAttribute('data-back')) { if (depth > 0) { depth--; history.back(); } else location.hash = '#/'; return; }
    closeLayer(); go(t.getAttribute('data-go') || t.getAttribute('href'));
  });
  window.addEventListener('hashchange', function () { closeLayer(); route(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLayer(); });

  $('wa').innerHTML = WA_ICON; $('wa').href = waLink();

  fetch('donnees/catalogue.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
    d.categories = d.categories || []; d.shops = d.shops || []; d.products = d.products || []; d.countries = d.countries || []; d.features = d.features || {}; d.content = d.content || { hero: {}, provider: {}, partner: {} };
    D = d; HOW[0][1] = 'Plomberie, électricité, coiffure, ménage… ' + D.categories.length + ' métiers.'; route();
  }).catch(function () {
    $('main').innerHTML = '<div class="load"><p>Impossible de charger OUVRIO pour le moment.</p><a class="btn b-cta" href="' + CONFIG.apk + '" data-apk>' + ic('dl') + 'Télécharger l’application</a><button class="btn b-g mt" onclick="location.reload()">Réessayer</button></div>';
  });
})();
