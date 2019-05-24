/*
    📱 PWA
*/

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready () {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        registered () {
            console.log('Service worker registrado')
        },
        cached () {
            console.log('está cacheado')
        },
        updatefound () {
            // registration.waiting.postMessage({action: 'skipWaiting'}) // No funcionó
        },
        updated (registration) {
            registration.waiting.postMessage({action: 'skipWaiting'})
        },
        offline () {
            console.log('está en offline.')
        },
        error (error) {
            console.error('error de service-worker', error)
        }
    })

    if (navigator.serviceWorker) {
        var refreshing
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            window.location.reload()
            refreshing = true
        })
    }
}
