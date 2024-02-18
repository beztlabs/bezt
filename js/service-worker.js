const CACHE_NAME = "bezt-pwa-cache-v1.0";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/assets/img/bezt-logo-192.svg",
  "/assets/img/bezt-logo-dark.png",
  "/assets/img/bezt-logo-white.png",
  "/assets/img/bg-mobile-fallback.jpg",
  "/assets/img/email.png",
  "/assets/img/og-image.jpeg",
  "/assets/mp4/bg.mp4",
];

// caching
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(urlsToCache);
    })
  );
});

// delete old caches
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache");
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercepting and caching requests
self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
