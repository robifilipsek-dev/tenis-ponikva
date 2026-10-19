# Tenis Ponikva – rezervacije igrišč

Spletna aplikacija za rezervacijo teniških igrišč (Vue + Firebase), v eni datoteki `index.html`.

## Datoteke

| Datoteka | Namen |
|---|---|
| `index.html` | celotna aplikacija |
| `manifest.webmanifest` | podatki za namestitev na začetni zaslon (PWA) |
| `sw.js` | service worker: hitrejše odpiranje in odpiranje brez povezave |
| `icons/` | ikone aplikacije (192, 512, maskable 512, Apple 180) |

Vse datoteke morajo ostati v isti mapi, `icons/` pa kot podmapa.

## Objava na GitHub Pages

1. Naloži vse datoteke (z mapo `icons`) v repozitorij.
2. Settings → Pages → Source: *Deploy from a branch*, veja `main`, mapa `/ (root)`.
3. Aplikacija bo na `https://<uporabnik>.github.io/<repozitorij>/`.
4. V Firebase konzoli (Authentication → Settings → Authorized domains) dodaj `<uporabnik>.github.io`, sicer prijava z Google ne bo delovala.

## Nova različica

Ko spremeniš `index.html`, v `sw.js` poviši številko v `CACHE` (npr. `tenis-ponikva-v2`), da se stari predpomnilnik zamenja.

## Opomba

Brez povezave se odpre aplikacija sama, rezervacije pa se berejo iz Firebase in brez interneta niso na voljo.
