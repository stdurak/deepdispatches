export default async function handler(req: any, res: any) {
  // Sadece POST isteklerine izin ver
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  
  const PUBLICATION_ID = 'pub_2383c5ca-1813-4b13-b35f-6b498cd01829'; 
  const API_KEY = process.env.BEEHIIV_API_KEY; 

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!API_KEY) {
    console.error("BEEHIIV_API_KEY bulunamadi! Vercel ayarlarini kontrol edin.");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API Hatasi:', data);
      return res.status(response.status).json({ error: data.message || 'Subscription failed' });
    }

    console.log('Yeni abone basariyla eklendi:', email);
    return res.status(200).json({ success: true, message: 'Successfully subscribed!' });
    
  } catch (error) {
    console.error('Sunucu Hatasi:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
