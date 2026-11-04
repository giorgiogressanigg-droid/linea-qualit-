// Tiene l'intera app nella memoria dell'iPad: si apre anche senza internet.
const CACHE = "lq-app-8e54d4fb0d";
const FILES = ["./", "index.html", "app.js", "pdf.worker.min.mjs", "style.css", "icon.svg", "icon-180.png", "icon-192.png", "icon-512.png", "manifest.webmanifest"];
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).catch(() => caches.match("./"))));
});
