
// Service Worker
self.addEventListener('message',(e)=>{
    //respopnder a todos los clientes
    self.clients.matchAll().then((clientes)=>{
        clientes.forEach((client)=>{
            if(e.source.id === client.id)
            client.postMessage("Private Hello from SW");
        })
    });
});