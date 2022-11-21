const cacheName = "cache-v1";
const cacheURLS = [
    "/workout-timer/index.html"
];

this.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(cacheURLS)),
    );
});
  
this.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
  