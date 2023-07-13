
// Service Worker
self.addEventListener('message',(e)=>{
    //respopnder a todos los clientes
    self.clients.matchAll().then((clientes)=>{
        clientes.forEach((client)=>{
            client.postMessage("Hello from SW");
        })
    });
});