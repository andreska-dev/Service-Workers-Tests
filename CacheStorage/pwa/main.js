
// Progressive Enhancement (SW supported)
// // if ('serviceWorker' in navigator) {
// if (navigator.serviceWorker) {
//   // Register the SW
//   navigator.serviceWorker.register('/sw.js').then((registration) => {
//   }).catch(console.log);
// }




//Revisar si el navegador soporta cache storage
//el soporte para Service worker incluye el soporte para cache storage
if (window.caches) {
    //Abre el cache storage
    //caches.open('prueba-2');



    //Ver los caches que tenemos
    //caches.keys().then(console.log);

    //verificar si existe un cache en especifico
    //caches.has('prueba-2').then(console.log);


    //eliminar un cache
    //caches.delete('prueba-1').then(console.log);

    caches.open('pwa-v1.1').then((cache) => {
        //incluir el indez.html en el cache
        //este metodo hace un fetch y guarda el resultado en el cache
        cache.addAll([
            '/index.html',
            '/style.css',
            'main.js',
        ]);
        //eliminar un elemento del cache
        cache.delete('style.css');
        

        //obtener la respuesta del fetch
        cache.match('index.html').then((res) => {
            //obtener respuesta del body
            res.text().then(console.log);
        });
    });



}