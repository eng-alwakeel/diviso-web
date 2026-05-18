const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Crawler User-Agent patterns
const crawlerPatterns = [
  'whatsapp',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'telegrambot',
  'slackbot',
  'discordbot',
  'googlebot',
  'bingbot',
  'applebot',
  'facebot',
  'pinterest',
  'snapchat',
];

// Page metadata map with optional custom image
const pageMetadata: Record<string, { title: string; description: string; image?: string }> = {
  '/from': {
    title: 'استخدمت تطبيق بسيط للقسمة بين الأصدقاء',
    description: 'خصوصًا في الشعبنة، ريحنا من اللخبطة. اللي حاب يجرّبه 👇',
  },
  '/launch': {
    title: 'القسمة دايمًا تلخبط؟ خلّها واضحة',
    description: 'قسّم مصاريف السفر، الطلعات، والسكن مع أصحابك بسهولة وبدون إحراج.',
    image: '/og/launch-1200x630.png',
  },
  '/install': {
    title: 'ثبّت Diviso على جوالك',
    description: 'قسّم المصاريف مع أصحابك بسهولة، وافتح التطبيق مباشرة من شاشة الجوال.',
    image: '/og/install-1200x630.png',
  },
};

// Scenario-specific metadata for ?demo= parameter
const scenarioMetadata: Record<string, { title: string; description: string }> = {
  travel: {
    title: 'مسافرين مع بعض؟',
    description: 'دايم واحد يدفع أكثر 😅 Diviso يقسم المصاريف بعدل ويطلع لكل واحد له أو عليه.',
  },
  friends: {
    title: 'طلعة مطعم؟ قهوة؟ بنزين؟',
    description: 'Diviso يخلي القسمة واضحة بدون نقاش.',
  },
  housing: {
    title: 'إيجار، كهرباء، مشتريات؟',
    description: 'Diviso ينظم السكن المشترك بعدل.',
  },
  activities: {
    title: 'نشاط جماعي = مصاريف جماعية',
    description: 'Diviso يقسمها بسهولة.',
  },
  desert: {
    title: 'رحلة بر؟',
    description: 'أكل وبنزين ومستلزمات. Diviso يحسبها عليكم بدون لخبطة.',
  },
  groups: {
    title: 'أي مجموعة فيها أكثر من شخص',
    description: 'Diviso يخلي الحساب عادل للجميع.',
  },
  family: {
    title: 'مصاريف عائلية؟',
    description: 'Diviso يخلي كل شيء واضح ومرتاح.',
  },
  carpool: {
    title: 'مشوار وبنزين وقهوة؟',
    description: 'Diviso يقسمها بسهولة.',
  },
  events: {
    title: 'مناسبة أو عزيمة؟',
    description: 'Diviso يطلع القسمة صح من أول مرة.',
  },
  friday: {
    title: 'شلة الجمعة؟',
    description: 'Diviso يخلي القسمة بينكم عادلة بدون نقاش.',
  },
};

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return crawlerPatterns.some(pattern => ua.includes(pattern));
}

function generateOgHtml(path: string, fullUrl: string, demoType?: string): string {
  let metadata = pageMetadata[path] || {
    title: 'Diviso | قسّم بذكاء، سافر براحة',
    description: 'قسّم المصاريف بين الأصدقاء والعائلة بسهولة',
  };

  // Override with scenario-specific metadata if ?demo= exists for /launch
  if (path === '/launch' && demoType && scenarioMetadata[demoType]) {
    metadata = {
      ...metadata,
      title: scenarioMetadata[demoType].title,
      description: scenarioMetadata[demoType].description,
    };
  }

  const appUrl = 'https://diviso.app';
  const ogImage = metadata.image 
    ? `${appUrl}${metadata.image}` 
    : `${appUrl}/og-image.png`;
  
  // CTA button text based on path
  const ctaText = path === '/launch' ? 'جرّب الآن' : 'جرّب Diviso';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${metadata.title} | Diviso</title>
  <meta name="title" content="${metadata.title}">
  <meta name="description" content="${metadata.description}">
  
  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${metadata.title}">
  <meta property="og:description" content="${metadata.description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="ar_SA">
  <meta property="og:site_name" content="Diviso">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${metadata.title}">
  <meta name="twitter:description" content="${metadata.description}">
  <meta name="twitter:image" content="${ogImage}">
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);
      color: white;
      text-align: center;
      padding: 2rem;
    }
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.4;
    }
    p {
      font-size: 1.1rem;
      opacity: 0.95;
      margin-bottom: 2rem;
      max-width: 320px;
      line-height: 1.6;
    }
    .cta-btn {
      display: inline-block;
      background: white;
      color: #65a30d;
      font-size: 1.2rem;
      font-weight: 700;
      padding: 1rem 2.5rem;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    }
    .footer {
      margin-top: 3rem;
      font-size: 0.875rem;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <img src="${appUrl}/logo.svg" alt="Diviso" class="logo" onerror="this.style.display='none'">
  <h1>${metadata.title}</h1>
  <p>${metadata.description}</p>
  <a href="${fullUrl}" class="cta-btn">${ctaText}</a>
  <div class="footer">Diviso - قسّم بذكاء</div>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/from';
    const utmSource = url.searchParams.get('utm_source') || '';
    const userAgent = req.headers.get('user-agent') || '';

    // Build the full redirect URL
    const appUrl = 'https://diviso.app';
    let fullUrl = `${appUrl}${path}`;
    
    // Preserve UTM parameters
    const utmParams = [];
    if (utmSource) utmParams.push(`utm_source=${encodeURIComponent(utmSource)}`);
    url.searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') && key !== 'utm_source') {
        utmParams.push(`${key}=${encodeURIComponent(value)}`);
      }
    });
    if (utmParams.length > 0) {
      fullUrl += `?${utmParams.join('&')}`;
    }

    // Get demo parameter for scenario-specific OG
    const demoParam = url.searchParams.get('demo') || undefined;

    // ------ Dynamic OG for group invites: /i/:code ------
    // Allows WhatsApp/Telegram/Facebook to show a personalized preview
    // before any redirect happens.
    const inviteMatch = path.match(/^\/i\/([A-Za-z0-9_-]+)$/);
    let inviteMeta: { title: string; description: string; image?: string } | null = null;
    if (inviteMatch) {
      const token = inviteMatch[1];
      try {
        const supaUrl = Deno.env.get('SUPABASE_URL');
        const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
        if (supaUrl && anonKey) {
          const rpcRes = await fetch(`${supaUrl}/rest/v1/rpc/get_invite_preview`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: anonKey,
              Authorization: `Bearer ${anonKey}`,
            },
            body: JSON.stringify({ p_token: token }),
          });
          if (rpcRes.ok) {
            const preview = await rpcRes.json();
            if (preview && preview.is_valid) {
              const inviter = preview.inviter_name
                ? `${preview.inviter_name} دعاك`
                : 'دعوة';
              const grp = preview.group_name || 'مجموعة';
              inviteMeta = {
                title: `${inviter} إلى ${grp} على Diviso`,
                description: 'قسّموا المصاريف بدون تعقيد — انضم وشوف كم لك وكم عليك.',
              };
            } else {
              inviteMeta = {
                title: 'دعوة Diviso',
                description: 'انضم وشارك في قسمة المصاريف بسهولة وعدالة.',
              };
            }
          }
        }
      } catch (e) {
        console.error('Failed to fetch invite preview for OG:', e);
      }
    }

    // Check if request is from a crawler
    if (isCrawler(userAgent)) {
      console.log(`Crawler detected: ${userAgent.substring(0, 50)}... for path: ${path}, demo: ${demoParam || 'none'}`);

      let html: string;
      if (inviteMeta) {
        // Inject invite metadata via the same generator
        const original = pageMetadata[path];
        pageMetadata[path] = inviteMeta;
        html = generateOgHtml(path, fullUrl, demoParam);
        if (original) pageMetadata[path] = original;
        else delete pageMetadata[path];
      } else {
        html = generateOgHtml(path, fullUrl, demoParam);
      }

      return new Response(html, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }


    // For regular users, redirect to the app
    console.log(`Regular user redirect to: ${fullUrl}`);
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': fullUrl,
      },
    });

  } catch (error) {
    console.error('Error in og-handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
