/*self.addEventListener('install',(e)=>{
    console.log('Install Event');
    let installPromise = new Promise((resolve)=>{
        //async tasks
        setTimeout(resolve,1000);
    });

    e.waitUntil(installPromise);
});
self.addEventListener('activate',(e)=>{
    console.log('Activate Event');
});*/

//fetch event listener

self.addEventListener('fetch',(e)=>{
    console.log('Fetch event: '+e.request.url);
  /*  if(e.request.url.endsWith('/camera_feed.html')){
        fetch(e.request).then((res)=>{
            if(res.ok){
                return res;
            }
            else{
                return new Response('Camera feed not available');
            }
        });
    }*/



});