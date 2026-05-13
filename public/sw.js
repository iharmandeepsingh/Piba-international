const CACHE_NAME = 'piba-international-v1'
const STATIC_CACHE_NAME = 'piba-static-v1'
const DYNAMIC_CACHE_NAME = 'piba-dynamic-v1'

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main-app.js',
  '/_next/static/chunks/app/_not-found.js',
  '/_next/static/chunks/app/page.js',
  '/images/logo.jpeg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

const API_ENDPOINTS = [
  '/api/auth',
  '/api/certifications',
  '/api/events',
  '/api/members',
  '/api/payments'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Static assets cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated')
        return self.clients.claim()
      })
      .catch((error) => {
        console.error('Service Worker: Activation failed', error)
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return
  }
  
  // Handle API requests
  if (API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
    event.respondWith(
      handleApiRequest(request)
    )
    return
  }
  
  // Handle static assets and pages
  if (request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'image') {
    event.respondWith(
      handleStaticRequest(request)
    )
    return
  }
  
  // Handle other requests with network-first strategy
  event.respondWith(
    handleDynamicRequest(request)
  )
})

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed for API request, trying cache')
    
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'No network connection and no cached data available'
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
  // Try cache first
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    // Try network
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed for static request')
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline')
    }
    
    // Return error for other static requests
    return new Response('Resource not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    })
  }
}

// Handle dynamic requests with network-first strategy
async function handleDynamicRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network failed for dynamic request, trying cache')
    
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return error response
    return new Response('Resource not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    })
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      performBackgroundSync()
    )
  }
})

async function performBackgroundSync() {
  try {
    // Get all pending actions from IndexedDB
    const pendingActions = await getPendingActions()
    
    for (const action of pendingActions) {
      try {
        // Retry the action
        await fetch(action.url, action.options)
        
        // Remove successful action from pending list
        await removePendingAction(action.id)
        
        console.log('Service Worker: Background sync successful for action', action.id)
      } catch (error) {
        console.error('Service Worker: Background sync failed for action', action.id, error)
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: 'You have a new notification from PIBA International',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  }
  
  if (event.data) {
    const data = event.data.json()
    options.body = data.body || options.body
    options.title = data.title || 'PIBA International'
    options.data = { ...options.data, ...data }
  }
  
  event.waitUntil(
    self.registration.showNotification(options.title || 'PIBA International', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    return
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/')
        }
      })
    )
  }
})

// IndexedDB helpers for offline actions
async function getPendingActions() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PibaOfflineDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pendingActions'], 'readonly')
      const store = transaction.objectStore('pendingActions')
      const getAllRequest = store.getAll()
      
      getAllRequest.onerror = () => reject(getAllRequest.error)
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('pendingActions')) {
        db.createObjectStore('pendingActions', { keyPath: 'id' })
      }
    }
  })
}

async function removePendingAction(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PibaOfflineDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['pendingActions'], 'readwrite')
      const store = transaction.objectStore('pendingActions')
      const deleteRequest = store.delete(id)
      
      deleteRequest.onerror = () => reject(deleteRequest.error)
      deleteRequest.onsuccess = () => resolve()
    }
  })
}

// Cache cleanup
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('piba-') && cacheName !== STATIC_CACHE_NAME) {
              return caches.delete(cacheName)
            }
          })
        )
      })
    )
  }
})
