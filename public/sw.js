const offlineUrl = '/offline'

self.addEventListener('install', function(event) {
    const offlineRequest = new Request(offlineUrl)
    event.waitUntil(
        fetch(offlineRequest).then(function(response) {
            return caches.open('offline').then(function(cache) {
                console.log('[oninstall] Cached offline page', response.url)
                return cache.put(offlineRequest, response)
            })
        })
    )
})

self.addEventListener('fetch', function(event) {
    const request = event.request

    if (request.url.match(/\.(css|jpg|jpeg|png|gif|js|woff|woff2|ttf|svg|mp4|webp)$/) || request.url.indexOf(request.referrer) !== 0) {
    } else if (request.method === 'GET') {
        event.respondWith(
            fetch(request).catch(function(error) {
                console.log('[onfetch] Failed. Serving cached offline fallback ' + error)
                return caches.open('offline').then(function(cache) {
                    return cache.match(offlineUrl)
                })
            })
        )
    }
})
