self.addEventListener('install',(e)=>{
    console.log('Install Event');
    let installPromise = new Promise((resolve)=>{
        //async tasks
        setTimeout(resolve,1000);
    });

    e.waitUntil(installPromise);
});
self.addEventListener('activate',(e)=>{
    console.log('Activate Event');
});

//fetch event listener

self.addEventListener('fetch',(e)=>{
    if(e.request.url.endsWith('css')){
        console.log('fetch event FOR STYLE : '+e.request.url);
    }else{
        console.log('fetch event: '+e.request.url);
    }

});