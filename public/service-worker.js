if (workbox) {
    workbox.core.setCacheNameDetails({
        prefix: 'dfs-vicofrascolla',
        // suffix: process.env.VUE_APP_VERSION,
        // precache: 'custom-precache-name',
        // runtime: 'custom-runtime-name'
    })

    self.addEventListener('install', e => {
        e.waitUntil(
            caches.open('vicofrascolla').then(cache => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/manifest.json',
                    '/img/icons/android-chrome-192x192.png',
                    '/img/icons/android-chrome-512x512.png',
                    '/img/icons/apple-touch-icon-60x60.png',
                    '/img/icons/apple-touch-icon-76x76.png',
                    '/img/icons/apple-touch-icon-120x120.png',
                    '/img/icons/apple-touch-icon-152x152.png',
                    '/img/icons/apple-touch-icon-180x180.png',
                    '/img/icons/apple-touch-icon.png',
                    '/img/icons/favicon-16x16.png',
                    '/img/icons/favicon-32x32.png',
                    '/img/icons/msapplication-icon-144x144.png',
                    '/img/icons/mstile-150x150.png',
                    '/img/icons/safari-pinned-tab.svg',
                    'https://fonts.googleapis.com/css?family=Stylish&display=swap',
                    'https://fonts.googleapis.com/icon?family=Material+Icons'
                ])
            })
        )
    })

    workbox.precaching.suppressWarnings()
    workbox.precaching.precacheAndRoute(self.__precacheManifest)

    // install new service worker when ok
    self.addEventListener('message', msg => {
        if (msg.data.action === 'skipWaiting') {
            self.skipWaiting()
        }
    })
}
else {
    console.log(`La caja de trabajo no se cargó`);
}

// Control de objetos
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request)
        })
    )
})
