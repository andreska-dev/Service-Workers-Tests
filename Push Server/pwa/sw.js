
// Service Worker
//enviar notificacion como push
self.addEventListener('push',(e)=>{
let n = self.registration.showNotification('Notificacion desde el SW.');
//devuelve Promise asi que esperamos a que se muestre
e.waitUntil(n);
});