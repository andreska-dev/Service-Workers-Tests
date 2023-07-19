// Service Worker

// Cache name
const pwaCache = 'pwa-cache-1';

// Static assets to cache on install
const staticCache = [ '/', 'index.html', '/style.css', '/main.js', '/thumb.png' ];

// SW install and cache static assets
self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open(pwaCache)
        .then( cache => cache.addAll(staticCache) )
    );
});

// SW Activate and cache cleanup
self.addEventListener('activate', (e) => {
    let cacheCleaned = caches.keys().then((keys) => {
        keys.forEach( (key) => {
            if (key !== pwaCache) return caches.delete(key);
        });
    });
    e.waitUntil(cacheCleaned);
});


// SW fetch handler with different caching strategies
self.addEventListener('fetch', (e) => {
    //1. Cache only strategy (static assets) AKA App Shell
    /*e.respondWith( 
        caches.match(e.request) 
    );*/
    //Si el usuario o el navegador borra cache, no se verá la app



    //2. cache with network fallback strategy (dynamic content)
    /*e.respondWith(
        caches.match(e.request).then( (cacheRes) => {
            //si esta en cache, la devuelve
            if(cacheRes) return cacheRes;
            //si no esta en cache, la pide a la red
            return fetch(e.request).then( (newRes) => {
                //y la guarda en cache
                caches.open(pwaCache).then( (cache) => cache.put(e.request, newRes) );
                //y la devuelve
                return newRes.clone();
            });
        } )
    );*/
    //la estrategia 2 es mas robusta para los static assets


    //3. Network with cache fallback strategy (dynamic content)
    //Asegura que el usuario siempre tenga la ultima version de los datos
    //al hacer fetch primero puede que se comporte de manera lenta
    //generando una mala expereincia de usuario
   /* e.respondWith(
        fetch(e.request).then( (res) => {
            //guarda la respuesta en cache
            caches.open(pwaCache).then( (cache) => cache.put(e.request, res) );
            //y la devuelve
            return res.clone();
            //fallback a cache si no hay conexion
        }).catch( (err) => caches.match(e.request) )
    );*/


    //4. Cache with network update strategy (dynamic content)

    /*e.respondWith(
        //ir al cache y devolver al usuario, despues hacer el update del cache
        //la version actualizada siempre va a estar en cache y no mostrandose al usuario
        caches.open(pwaCache).then( (cache) => {
            //return from cache
            return cache.match(e.request).then( (cacheRes) => {
                //update cache
                let updatedCache = fetch(e.request).then( (newRes) => {
                    //si la respuesta es 200, la guarda en cache
                    cache.put(e.request, newRes.clone());
                    return newRes; 
                });
                //return cache response or updated response
                return cacheRes || updatedCache;
            } );
        } )
    );*/
    //funciona pero puede que los datos no esten actualizados, pero es mas rapido



    //5. cache & network race 
    //devuelve la respuesta mas rapida, ya sea del cache o de la red
    let firstResponded = new Promise( (resolve, reject) => {

        //track rejections
        let firstRejectionReceived = false;
        let rejectOnce=() =>{
            if(firstRejectionReceived) reject('No response received');
            else firstRejectionReceived = true;
        };

        //try network
        fetch(e.request).then( (res) => {
            res.ok ? resolve(res) : rejectOnce();
        }).catch(rejectOnce);

        //try cache
        caches.match(e.request).then( (res) => {
            res ? resolve(res) : rejectOnce();
        }).catch(rejectOnce);
    });
    e.respondWith(firstResponded);

});
