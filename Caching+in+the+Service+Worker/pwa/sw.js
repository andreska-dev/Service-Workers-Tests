
// Service Worker

//cache global, el nombre debe contener la version
const pwaCache = 'pwa-cache-v2';

//initial cache, cuando se instala el service worker
self.addEventListener('install',(e) =>{

//abrir el cache y asignarlo a una variable para esperar a que se complete
let cacheReady = caches.open(pwaCache).then((cache) =>{
    console.log('Cache abierto');
    //incluir todo lo necesario para renderizar el app
    //si una de estas peticiones falla, todas las demas van a fallar
   return cache.addAll([
    '/',
    'style.css',
    'thumb.png',
    'main.js'
    ]);
});

//esperar a que se complete el cache
e.waitUntil(cacheReady);
});


//cuando se cambia el service worker hay que recuperar o actualizar el cache
self.addEventListener('activate',(e) =>{
    let cachedClean =caches.keys().then((keys) =>{
        //iterar sobre los caches
        keys.forEach((key) =>{
            if(key !== pwaCache){
                //eliminar los caches anteriores
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(cachedClean);
});


//interceptar peticiones fetch
self.addEventListener('fetch',(e) =>{
    //dejar pasar las peticiones remotas
    if(!e.request.url.match(location.origin)) return;

    //enviar peticiones locales desde el cache
        //abrir el cache y buscar la peticion
        let newRes = caches.open(pwaCache).then((cache) =>{
            return cache.match(e.request).then((res) =>{
                //verificar si la peticion fue encontrada en cache
                if(res){
                    console.log(`Sirviendo ${res.url} desde cache.`);
                    return res;
                }
                //si no se encuentra en cache, se hace la peticion a la red
                //departe del cliente y se incluye en el cache
                return fetch(e.request).then((newRes) =>{
                    console.log(`Sirviendo ${res.url} desde la red.`);
                    cache.put(e.request,newRes.clone());
                    //es necesario clonar ya que no se puede usar dos veces
                    return newRes;
                });

            });
        });
        //responder con el cache
        e.respondWith(newRes);
    
});