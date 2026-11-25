import { next } from '@vercel/edge';

export const config = {
  matcher: '/dispatch/:path*',
};

const OG_MAP: Record<string, string> = {
  'dossier-001': '/orca-cover.jpg',
  'dossier-002': '/posidonia-hero.jpg',
  'dossier-003': '/lionfish-hero.jpg',
  'dossier-004': '/cuttlefish-hero.jpg',
  'dossier-005': '/indopacific-hero-poster.jpg',
  'dossier-006': '/penguin-hero.jpg', // Bu görselin adının public klasöründe doğru olduğundan emin ol
  'dossier-007': '/mediterranean-lessepsian-cover.jpg',
  'dossier-008': '/october-2026-heat-record-cover.jpg',
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop() || '';
  const image = OG_MAP[id];

  // Eğer bu ID'ye ait özel bir görsel yoksa varsayılan Orca'yı göster ve devam et
  if (!image) {
    return next();
  }

  const absoluteUrl = `https://www.deepdispatches.com${image}`;

  try {
    // Ana HTML dosyasını çek
    const response = await fetch(new URL('/index.html', request.url));
    let html = await response.text();

    // Open Graph (WhatsApp, Facebook, LinkedIn) görselini değiştir
    html = html.replace(
      /<meta property="og:image" content="[^"]*"/g,
      `<meta property="og:image" content="${absoluteUrl}"`
    );
    
    // Twitter / X görselini değiştir
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"/g,
      `<meta name="twitter:image" content="${absoluteUrl}"`
    );

    // Botlara özelleştirilmiş HTML'i sun
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  } catch (e) {
    return next();
  }
}