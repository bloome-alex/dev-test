/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-148cb7e5'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/AboutView-0a88411a.js",
    "revision": null
  }, {
    "url": "assets/AboutView-4d995ba2.css",
    "revision": null
  }, {
    "url": "assets/index-5da63856.css",
    "revision": null
  }, {
    "url": "assets/index-b99dd169.js",
    "revision": null
  }, {
    "url": "favicon-32x32.png",
    "revision": "af5d3296ff7c8bdb8a0d1cad66014e70"
  }, {
    "url": "favicon.ico",
    "revision": "b952ef7567b8da743669df7548c1c269"
  }, {
    "url": "icon-192x192.png",
    "revision": "62c1edf267ac79daa7cc6a3cbfcbd6b9"
  }, {
    "url": "icon-512x512.png",
    "revision": "0925993d8a087cfef3c23362e2e6e0df"
  }, {
    "url": "index.html",
    "revision": "a7c9ac1f9b512452d9eb778572800c5d"
  }, {
    "url": "logo.svg",
    "revision": "cf527b5ce09118bda672763c81c631dc"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "icon-192x192.png",
    "revision": "62c1edf267ac79daa7cc6a3cbfcbd6b9"
  }, {
    "url": "icon-512x512.png",
    "revision": "0925993d8a087cfef3c23362e2e6e0df"
  }, {
    "url": "manifest.webmanifest",
    "revision": "2780bf3902540d5c7b8807235e4a92d1"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
