
// Service Worker
self.addEventListener('message',(e)=>{
    //verificar si es update
    if(e.data==="update_self"){
        console.log('Service Worker Updating');
        self.skipWaiting();
    }
});