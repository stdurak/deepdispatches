import { next } from '@vercel/edge';

export const config = {
  // Linklerin bu yapıyla başladığından emin ol (örn: /dispatch/dossier-008)
  matcher: '/dispatch/:path*', 
};

// Her bir dosya için özel bilgilerimizi tanımlıyoruz
const DOSSIER_DATA: Record<string, { title: string; desc: string; image: string }> = {
  'dossier-001': {
    title: 'Beyond Human Exceptionalism: 5 Mind-Bending Insights Into Orca Culture',
    desc: 'What if intelligence isn\'t a ladder climbing toward humanity, but a vast, interconnected evolutionary tree?',
    image: '/orca-cover.jpg',
  },
  'dossier-002': {
    title: 'The Posidonia Crisis: The Lungs of the Mediterranean',
    desc: 'An unvarnished assessment of Mediterranean seagrass meadows: from ancient carbon vaults to anchor chain scarring.',
    image: '/posidonia-hero.jpg',
  },
  'dossier-003': {
    title: 'The Lessepsian Mirage: How the Suez Canal Weaponized the Mediterranean',
    desc: 'Thirty years of context collapse into a single truth: the Lionfish is not a monster. It is a victim.',
    image: '/lionfish-hero.jpg',
  },
  'dossier-004': {
    title: 'The Ocean’s Double Agents: Split-Screen Camouflage...',
    desc: 'Three hundred million years before human telecommunications, cuttlefish engineered a living, biophotonic equivalent.',
    image: '/cuttlefish-hero.jpg',
  },
  'dossier-005': {
    title: 'When Oceans Stop Talking: The Surprising Science of the Indo-Pacific Breakup',
    desc: 'A landmark WHOI study reveals that the long-standing marriage between the Indian and Pacific Oceans is failing.',
    image: '/indopacific-hero-poster.jpg',
  },
  'dossier-006': {
    title: 'Tracked Across the Southern Ocean: Young Emperor Penguins',
    desc: 'Satellite telemetry of 48 juveniles reveals a 1,500-kilometer open-ocean migration highway.',
    image: '/penguin-hero.jpg', // Görselin gerçek adıyla değiştir
  },
  'dossier-007': {
    title: 'Mediterranean Sea Levantine Lessepsian Corridor',
    desc: 'Interactive corridor and seasonal thermal timeline exploring Indo-Pacific dispersal across the Mediterranean basin.',
    image: '/mediterranean-lessepsian-cover.jpg',
  },
  'dossier-008': {
    title: 'October 2026 Was the Warmest Month in 176 Years of Climate Records',
    desc: 'Berkeley Earth confirms a new all-time monthly anomaly record driven by record ocean warmth and a Super El Niño.',
    image: '/october-2026-heat-record-cover.jpg', // Eğer bu görsel yoksa varsayılan Orca çıkar
  }
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop() || '';
  
  const data = DOSSIER_DATA[id];

  // Eğer url'deki id bizim listemizde yoksa varsayılan ana sayfayı göster
  if (!data) {
    return next();
  }

  // Görselin tam (absolute) URL'sini oluştur
  const absoluteImageUrl = `https://www.deepdispatches.com${data.image}`;

  try {
    // Vite'ın ürettiği ana index.html dosyasını çek
    const response = await fetch(new URL('/index.html', request.url));
    let html = await response.text();

    // 1. Sekme Başlığını ve Meta Title'ları değiştir
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${data.title} | Deep Dispatches</title>`);
    html = html.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${data.title}"`);
    html = html.replace(/<meta name="twitter:title" content="[^"]*"/g, `<meta name="twitter:title" content="${data.title}"`);

    // 2. Açıklamaları (Description) değiştir
    html = html.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${data.desc}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${data.desc}"`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*"/g, `<meta name="twitter:description" content="${data.desc}"`);

    // 3. Görselleri değiştir (Daha önce eklediğimiz özellik)
    html = html.replace(/<meta property="og:image" content="[^"]*"/g, `<meta property="og:image" content="${absoluteImageUrl}"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/g, `<meta name="twitter:image" content="${absoluteImageUrl}"`);

    // Botlara değiştirilmiş HTML'i sun
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  } catch (e) {
    return next();
  }
}