//@ts-nocheck

const CACHE_NAME = "arithmetist-v9"

//Delete old caches when the cache-name changes
self.addEventListener("activate", async event => {
  const existingCaches = await caches.keys()
  const invalidCaches = existingCaches.filter(c => c !== CACHE_NAME)
  await Promise.all(invalidCaches.map(ic => caches.delete(ic)))
})

// for local development, skip caching entirely
// for production use, cache everything
// cache is invalidated by publishing a new
// service worker with a new CACHE_NAME.
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      if (self.location.hostname === "localhost") {
        return fetch(event.request)
      }
      return cache.match(event.request).then(function (response) {
        if (!!response) {
          return response
        } else {
          return fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone())
            return response
          })
        }
      })
    })
  )
})
