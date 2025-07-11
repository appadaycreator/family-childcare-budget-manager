const CACHE_NAME = 'family-childcare-budget-v1';
const urlsToCache = [
  './',
  './index.html',
  './lp.html',
  './how-to-use.html',
  './terms.html',
  './privacy.html',
  './contact.html',
  './manifest.json',
  './favicon.ico'
];

// Service Workerのインストール
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache addAll failed:', error);
      })
  );
});

// Service Workerのフェッチ
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュに存在する場合はキャッシュから返す
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Service Workerのアクティベート
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 