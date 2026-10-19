// Service worker za Tenis Ponikva.
// Shrani lupino aplikacije (HTML, ikone, knjižnice s CDN), da se aplikacija odpre hitreje in tudi brez povezave.
// Rezervacij (Firebase/Firestore) NE shranjuje – te se vedno berejo sveže.
// Ob vsaki objavi nove različice povišaj številko v CACHE.
const CACHE = 'tenis-ponikva-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const CDN_HOSTS = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com', 'www.gstatic.com'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    const sameOrigin = url.origin === self.location.origin;
    if (!sameOrigin && !CDN_HOSTS.includes(url.hostname)) return; // Firebase API ipd. gre mimo

    // Odpiranje strani: najprej omrežje (vedno sveža različica), brez povezave pa predpomnilnik
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); return res; })
                .catch(() => caches.match('index.html').then((r) => r || caches.match('./')))
        );
        return;
    }

    // Ostalo: takoj iz predpomnilnika, v ozadju osveži
    event.respondWith(
        caches.open(CACHE).then((cache) =>
            cache.match(req).then((cached) => {
                const network = fetch(req).then((res) => {
                    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
                    return res;
                }).catch(() => cached);
                return cached || network;
            })
        )
    );
});
