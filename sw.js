// Aplikacija za rezervacije potrebuje živo omrežno povezavo za prijavo in podatke.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// Navigacijo naložimo sveže. Ob prekinitvi povezave pokažemo jasno obvestilo,
// namesto da bi neuspešno ponavljali isto omrežno zahtevo.
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => new Response(
      '<!doctype html><html lang="sl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Povezava ni na voljo</title><body style="margin:0;padding:2rem;font:16px system-ui,sans-serif;background:#f4f6f5;color:#18392e"><main style="max-width:32rem;margin:10vh auto;padding:2rem;background:white;border-radius:1rem;box-shadow:0 8px 30px #18392e18"><h1 style="font-size:1.4rem">Ni internetne povezave</h1><p>Za prijavo in rezervacijo igrišča je potrebna internetna povezava. Ko bo povezava znova na voljo, ponovno odprite aplikacijo.</p></main></body></html>',
      { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
    ))
  );
});