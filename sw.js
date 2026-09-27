const CACHE = "goarxyz-shell-v2";
const PRECACHE = ["./" , "./goar.html", "./manifest.webmanifest", "./favicon.svg"];
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => {})));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = req.url;
  if (url.includes("api.themoviedb.org") || url.includes("image.tmdb.org") || url.includes("youtube") || url.includes("vidrock.") || url.includes("googlevideo.com") || url.includes("libcurl") || url.includes("hls.js") || url.includes("wisp.") || url.startsWith("blob:") || url.startsWith("data:")) return;
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match("./goar.html")));
    return;
  }
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
