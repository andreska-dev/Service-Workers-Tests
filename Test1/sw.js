self.addEventListener('install',(e)=>{
    console.log('Install Event');
    let installPromise = new Promise((resolve)=>{
        //async tasks
        setTimeout(resolve,3000);
    });

    e.waitUntil(installPromise);
});
self.addEventListener('activate',(e)=>{
    console.log('Activate Event');
});

