
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
// if (navigator.serviceWorker) {
  // Register the SW
  // navigator.serviceWorker.register('/sw.js').then(function(registration){
  // }).catch(console.log);
// }


//verificar que sea posible enviar notificaciones
if(window.Notification){

function showNotification(){
  let notificationOpts ={
    body: 'notification information',
    icon: '/thumb.png'
  }
  //incluir las opts
  let n = new Notification('Nueva Notificacion de PWA.',notificationOpts);

  //listenner del click
  n.onclick =()=>{
  console.log('Notification clicked');
  }
}

  //Administrar permisos de usuario 
  if(Notification.permission ==='granted'){
    showNotification();
  }else if(Notification.permission !== 'denied'){
    Notification.requestPermission((permission)=>{
        if(permission ==='granted'){
          showNotification();
        }
    });
  }

}
