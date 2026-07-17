// =====================================================
// TODDY MUSIC - Service Worker v1.0
// Author : Toddy Official
// =====================================================

const CACHE_NAME = "toddy-music-v1.0";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./Cover album.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {

        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {

            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });

            return networkResponse;

          })
          .catch(() => {

            if (event.request.destination === "document") {
              return caches.match("./index.html");
            }

          });

      })
  );

});
