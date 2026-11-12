// Page content and booking data use the live network.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

// Glavno stran (index.html) vedno naložimo sveže, mimo predpomnilnika brskalnika,
// da se po posodobitvi aplikacije takoj prikaže nova različica.
self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => fetch(event.request))
  );
});
