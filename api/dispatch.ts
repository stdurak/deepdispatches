const DISPATCH_META: Record<
  string,
  { title: string; description: string; image: string }
> = {
  'dossier-001': {
    title: 'Beyond Human Exceptionalism: 5 Mind-Bending Insights Into Orca Culture — Deep Dispatches',
    description:
      'Decades of groundbreaking research in neuroscience and marine biology are dismantling our assumptions about mind and social complexity.',
    image: 'https://www.deepdispatches.com/orca-cover.jpg',
  },
  'dossier-002': {
    title: 'The Posidonia Crisis: The Lungs of the Mediterranean — Deep Dispatches',
    description:
      'An unvarnished assessment of Mediterranean seagrass meadows: from ancient anoxic carbon vaults to anchor chain scarring.',
    image: 'https://www.deepdispatches.com/posidonia/hero.jpg', // public/ klasöründeki gerçek dosya adını kontrol edin
  },
  'dossier-003': {
    title: 'The Lessepsian Mirage: How the Suez Canal Weaponized the Mediterranean — Deep Dispatches',
    description:
      'In a warming sea, human engineering shattered a 3-million-year-old thermal wall. Now, the Mediterranean is an alien frontier.',
    image: 'https://www.deepdispatches.com/lionfish-cover.jpg', // public/ klasöründeki gerçek dosya adını kontrol edin
  },
  'dossier-004': {
    title: 'The Ocean’s Double Agents: Split-Screen Camouflage & Encrypted Polarization — Deep Dispatches',
    description:
      'Three hundred million years before human telecommunications, cuttlefish engineered living biophotonics and encrypted polarized light.',
    image: 'https://www.deepdispatches.com/cuttlefish-cover.jpg', // public/ klasöründeki gerçek dosya adını kontrol edin
  },
  'dossier-005': {
    title: 'When Oceans Stop Talking: The Surprising Science of the Indo-Pacific Breakup — Deep Dispatches',
    description:
      'For 400 years, the Indian and Pacific Oceans maintained a synchronized atmospheric conversation. Human emissions are breaking the link.',
    image: 'https://www.deepdispatches.com/indopacific-cover.jpg', // public/ klasöründeki gerçek dosya adını kontrol edin
  },
  'dossier-006': {
    title: 'Tracked Across the Southern Ocean: Young Emperor Penguins in Industrial Fishing Zones — Deep Dispatches',
    description:
      'Satellite telemetry of 48 juveniles reveals a 1,500-km migration highway colliding directly with commercial krill and toothfish fleets.',
    image: 'https://www.deepdispatches.com/penguins/juvenile-penguin-chick.jpg',
  },
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: any, res: any) {
  const rawId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const id = typeof rawId === 'string' ? rawId : '';
  const meta = DISPATCH_META[id];

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'www.deepdispatches.com';
  const baseUrl = `${proto}://${host}`;

  try {
    // Derlenmiş statik index.html iskeletini çek
    const htmlResponse = await fetch(`${baseUrl}/index.html`);
    let html = await htmlResponse.text();

    if (meta) {
      const safeTitle = escapeHtml(meta.title);
      const safeDesc = escapeHtml(meta.description);
      const safeImage = escapeHtml(meta.image);
      const pageUrl = `${baseUrl}/dispatch/${encodeURIComponent(id)}`;

      html = html
        .replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`)
        .replace(
          /(<meta\s+name="description"\s+content=")[^"]*(")/i,
          `$1${safeDesc}$2`
        )
        .replace(
          /(<meta\s+property="og:url"\s+content=")[^"]*(")/i,
          `$1${pageUrl}$2`
        )
        .replace(
          /(<meta\s+property="og:title"\s+content=")[^"]*(")/i,
          `$1${safeTitle}$2`
        )
        .replace(
          /(<meta\s+property="og:description"\s+content=")[^"]*(")/i,
          `$1${safeDesc}$2`
        )
        .replace(
          /(<meta\s+property="og:image"\s+content=")[^"]*(")/i,
          `$1${safeImage}$2`
        )
        .replace(
          /(<meta\s+name="twitter:url"\s+content=")[^"]*(")/i,
          `$1${pageUrl}$2`
        )
        .replace(
          /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i,
          `$1${safeTitle}$2`
        )
        .replace(
          /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i,
          `$1${safeDesc}$2`
        )
        .replace(
          /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/i,
          `$1${safeImage}$2`
        );
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).send(html);
  } catch (error) {
    return res.redirect(302, '/');
  }
}