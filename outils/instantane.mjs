// INSTANTANÉ DES DONNÉES PUBLIQUES D'OUVRIO — exécuté par GitHub Actions (aucun secret nécessaire).
// Lit uniquement des adresses PUBLIQUES de l'API OUVRIO (celles que l'application affiche sans connexion) et n'en garde
// qu'une LISTE BLANCHE de champs : aucun téléphone, WhatsApp, e-mail, adresse, site, avis nominatif ni donnée interne.
// Les images sont copiées sur le site (chargement rapide, pas d'attente du serveur).
// Le serveur ne compte pas les visites des robots : l'en-tête User-Agent ci-dessous contient « bot ».
import { mkdir, writeFile, readFile, rm, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const API = (process.env.OUVRIO_API || 'https://ouvrio-app-api.onrender.com').replace(/\/$/, '');
const OUT = path.resolve(process.env.SORTIE || 'donnees');
const IMG = path.join(OUT, 'img');
const UA = 'OUVRIO-decouverte-instantane-bot/1.0';
const MAX_SHOPS = 40, MAX_PRODUCTS = 80, MAX_IMAGES_PER_PRODUCT = 4;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(p, { raw = false, tries = 4 } = {}) {
  for (let i = 1; ; i++) {
    try {
      const r = await fetch(API + p, { headers: { 'User-Agent': UA, Accept: raw ? '*/*' : 'application/json' }, signal: AbortSignal.timeout(90000) });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error(`HTTP ${r.status} sur ${p}`);
      return raw ? { buf: Buffer.from(await r.arrayBuffer()), type: r.headers.get('content-type') || '' } : await r.json();
    } catch (e) { if (i >= tries) throw e; await sleep(5000 * i); } // le serveur peut être en train de se réveiller
  }
}
// Les coordonnées écrites à la main dans un texte (téléphone, e-mail, lien WhatsApp) sont masquées.
const PHONE = /\+?\d(?:[\s.-]?\d){7,}/g, EMAIL = /[\w.+-]+@[\w-]+\.[\w.-]+/g, WA = /(https?:\/\/)?(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\S*/gi;
const redact = (s) => s.replace(WA, '[lien masqué]').replace(EMAIL, '[e-mail masqué]').replace(PHONE, '[numéro masqué]');
const text = (v, max = 600) => (typeof v === 'string' ? redact(v.replace(/\s+/g, ' ').trim()).slice(0, max) : null) || null;
const label = (v) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, 40) : null) || null; // prix et libellés courts : pas de masquage
// Description HTML d'un produit → texte simple (jamais de HTML recopié tel quel).
const plain = (html, max = 1500) => text(String(html || '').replace(/<\/(p|li|h\d|div)>|<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, '’'), max);
const lines = (v) => String(v || '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(0, 8);

const saved = new Map();
async function image(url, { variants = [] } = {}) {
  if (!url || typeof url !== 'string' || !/^(\/img\/|\/v1\/(medias|contenus\/images)\/)/.test(url)) return null; // seulement les images du serveur OUVRIO
  if (saved.has(url)) return saved.get(url);
  const src = url.replace(/([?&]w=)\d+/, '$1720'); // images de produits : 720 px suffisent sur téléphone (chargement plus rapide)
  let got = null;
  for (const u of [...variants, src]) { try { got = await get(u, { raw: true, tries: 2 }); } catch { got = null; } if (got && /^image\//.test(got.type)) break; got = null; }
  if (!got) { saved.set(url, null); return null; }
  const ext = got.type.includes('svg') ? 'svg' : got.type.includes('png') ? 'png' : got.type.includes('jpeg') ? 'jpg' : 'webp';
  const name = createHash('sha256').update(got.buf).digest('hex').slice(0, 16) + '.' + ext;
  await writeFile(path.join(IMG, name), got.buf);
  const rel = 'donnees/img/' + name; saved.set(url, rel); return rel;
}
const smaller = (u) => (/\.webp$/.test(u || '') ? [u.replace(/\.webp$/, '-sm.webp')] : []);

async function main() {
  await rm(IMG, { recursive: true, force: true }); await mkdir(IMG, { recursive: true });

  const cfg = await get('/v1/app/configuration');
  const features = { emploi: !!(cfg && cfg.features && cfg.features.emploi), promotions: !!(cfg && cfg.features && cfg.features.promotions) };
  const filtres = await get('/v1/catalogue/filtres');
  const countries = (filtres && filtres.countries || []).map((c) => ({ code: c.code, name: c.name, flag: c.flag }));

  const contenus = (await get('/v1/contenus') || {}).items || {};
  const hero = contenus['home.hero'] || {}, pro = contenus['home.provider_cta'] || {}, part = contenus['home.partner_cta'] || {};
  const content = {
    hero: { title: text(hero.title, 120), subtitle: text(hero.subtitle, 300), image: await image(hero.image_url) },
    provider: { title: text(pro.title, 120), text: text(pro.text, 400), points: lines(pro.points) },
    partner: { title: text(part.title, 120), text: text(part.text, 400), points: lines(part.points) },
  };

  const cats = ((await get('/v1/services/categories')) || {}).items || [];
  const categories = [];
  for (const c of cats) {
    const f = await get('/v1/services/categories/' + encodeURIComponent(c.slug));
    categories.push({
      slug: c.slug, name: text(c.name, 80), short: text(c.short_description, 200),
      image: await image(c.image_url, { variants: smaller(c.image_url) }),
      description: f ? text(f.category && f.category.description, 600) : null,
      needs: f ? (f.subcategories || []).map((s) => text(s.name, 80)).filter(Boolean) : [],
      questions: f ? (f.questions || []).slice(0, 8).map((q) => ({ label: text(q.label, 120), type: ['select', 'radio', 'checkbox', 'number', 'textarea'].includes(q.type) ? q.type : 'text', options: (q.options || []).slice(0, 12).map((o) => text(o, 80)), required: !!q.required })) : [],
      urgency: f && Array.isArray(f.urgency) ? f.urgency.map((u) => text(u.label || u.name || u, 60)).filter(Boolean) : [],
    });
  }

  const shopList = (((await get('/v1/catalogue/boutiques')) || {}).items || []).slice(0, MAX_SHOPS);
  const shops = [];
  for (const s of shopList) {
    const d = await get('/v1/catalogue/boutiques/' + Number(s.id));
    if (!d) continue;
    shops.push({
      id: Number(s.id), name: text(s.name, 80), category: text(s.category, 60), description: text(d.description || s.short_description, 500),
      logo: await image(s.logo_url), banner: await image(s.banner_url), premium: !!s.premium, featured: !!s.featured,
      city: text(s.location && s.location.city, 60), country: text(s.location && s.location.country, 4), flag: s.location && s.location.flag || '',
      rating: s.rating && s.rating.count ? { count: Number(s.rating.count), average: Number(s.rating.average) } : null,
      since: d.member_since ? String(d.member_since).slice(0, 7) : null,
      products: (d.products || []).map((p) => Number(p.id)),
    });
  }
  const shopIds = new Set(shops.map((s) => s.id));
  const prodList = (((await get('/v1/catalogue/produits?limite=' + MAX_PRODUCTS)) || {}).items || []);
  const ids = [...new Set([...prodList.map((p) => Number(p.id)), ...shops.flatMap((s) => s.products)])].slice(0, MAX_PRODUCTS);
  const products = [];
  for (const id of ids) {
    const p = await get('/v1/catalogue/produits/' + id);
    if (!p || !p.shop || !shopIds.has(Number(p.shop.id))) continue;
    const imgs = [];
    for (const u of (p.images || []).slice(0, MAX_IMAGES_PER_PRODUCT)) { const x = await image(u); if (x) imgs.push(x); }
    products.push({
      id: Number(p.id), name: text(p.name, 120), price: label(p.price_label), old_price: label(p.old_price_label), promo: p.promo_percent ? Number(p.promo_percent) : null,
      availability: text(p.availability_label, 40), brand: text(p.brand, 60), category: text(p.category, 60), images: imgs, description: plain(p.description_html),
      shop: { id: Number(p.shop.id), name: text(p.shop.name, 80) }, city: text(p.location && p.location.city, 60), flag: p.location && p.location.flag || '',
    });
  }
  for (const s of shops) s.products = s.products.filter((id) => products.some((p) => p.id === id));

  const data = { features, countries, content, categories, shops, products };
  // Contrôle de sécurité : aucune coordonnée personnelle ne doit apparaître (numéros, e-mails, liens WhatsApp).
  const dump = JSON.stringify(data, (k, v) => (['price', 'old_price', 'image', 'images', 'logo', 'banner'].includes(k) ? undefined : v));
  const bad = dump.match(/[\w.+-]+@[\w-]+\.[\w.]+|wa\.me|whatsapp\.com|\+?\d(?:[\s.-]?\d){7,}/i);
  if (bad) throw new Error('Donnée sensible détectée dans l’instantané (« ' + bad[0].slice(0, 6) + '… ») : rien n’est publié.');

  const file = path.join(OUT, 'catalogue.json');
  let prev = null; try { prev = JSON.parse(await readFile(file, 'utf8')); } catch {}
  const same = prev && JSON.stringify({ ...prev, updated_at: null }) === JSON.stringify({ ...data, updated_at: null });
  await writeFile(file, JSON.stringify({ ...data, updated_at: same ? prev.updated_at : new Date().toISOString() }));
  console.log(`Instantané : ${categories.length} catégories, ${shops.length} boutiques, ${products.length} produits, ${(await readdir(IMG)).length} images.${same ? ' (inchangé)' : ''}`);
}
main().catch((e) => { console.error('ÉCHEC :', e.message); process.exit(1); });
