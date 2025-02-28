"use strict";

/**
 * ==========================================================
 * SERVICE WORKER
 * ==========================================================
 *
 * This Service Worker is designed for Web applications with
 * Pusher Beams integration, providing offline support and
 * strategies to serve content offline and ensures that push
 * notifications work reliably.
 * 
 * Key Features:
 * - Caching for offline support with dynamic cache cleanup.
 * - Support for navigation preload for improved load performance.
 * - Caches all static assets for React site, ensuring users can
 *   access the site even without an internet connection.
 * - Background sync for handling pending requests.
 * - Push notification support.
 * 
 * Developed by: Hossein Pira
 * Email: h3dev.pira@gmail.com
 * Telegram: @h3dev
 * Instagram: @h3dev.pira
 *
 */

// Cache name and version
const CACHE_NAME = "task-manager-client-1";
const OFFLINE_URL = "/assets/offline.html";

// List of assets to cache for offline support
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/vitejs.svg",
  "/sw.js",
];

// Import Pusher Beams Service Worker
importScripts("https://js.pusher.com/beams/service-worker.js");

/**
 * Install event handler
 *
 * Caches the offline page and important assets during installation.
 * Ensures that the offline page and critical files are available
 * if the user loses internet connectivity.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));

      // Fetch and cache all files in cache/ and assets/
      const cacheUrls = await fetchFiles(["/cache/", "/assets/"]);
      await cache.addAll(cacheUrls);
    })()
  );
  self.skipWaiting();
});

// Function to dynamically fetch files from specific directories
async function fetchFiles(directories) {
  const urls = [];
  for (const dir of directories) {
    try {
      const response = await fetch(dir);
      if (!response.ok) continue;

      const files = await response.json();
      urls.push(...files.map((file) => `${dir}${file}`));
    } catch (error) {
      console.error(`Failed to fetch files from ${dir}:`, error);
    }
  }
  return urls;
}

/**
 * Activate event handler
 *
 * Cleans up old caches that no longer match the current CACHE_NAME
 * to ensure that the service worker uses only the most recent cache.
 * Also enables navigation preload if supported.
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
      self.clients.claim();
    })()
  );
});

/**
 * Fetch event handler
 *
 * Manages fetch events to serve cached content when available,
 * or fallback to the offline page in case of a network failure
 * during navigation requests. For other requests, it checks the
 * cache first before making a network request.
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;

        const response = await fetch(event.request);
        if (event.request.method === "GET") {
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        if (event.request.mode === "navigate") {
          const cache = await caches.open(CACHE_NAME);
          return cache.match(OFFLINE_URL);
        }
      }
    })()
  );
});

/**
 * Background Sync for Pending Requests
 *
 * This allows the app to handle pending requests when the user
 * regains internet connection.
 */
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

/**
 * Push Notification Handler
 *
 * Handles incoming push notifications and displays them
 * even if the app is closed.
 */
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "New Notification";
  event.waitUntil(
    self.registration.showNotification("Task Manager", {
      body: data,
      icon: "/vitejs.svg",
    })
  );
});
