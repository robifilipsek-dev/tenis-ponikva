// Reservations use the live network. No booking or account data is cached here.
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
