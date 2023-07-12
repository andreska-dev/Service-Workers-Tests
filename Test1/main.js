//revisar si el navegador soporta service workers
if(navigator.serviceWorker){
    //registrar el sw
    navigator.serviceWorker.register('sw.js').then(function(registration){
        console.log("SW Registrado");
    }).catch(console.log);
}


var root = document.getElementById('root');
var h1 = document.createElement('h1');
h1.textContent="Prueba de SW 1";
h1.className='h1-center';
root.appendChild(h1);
//get camera feed
fetch(camera_feed.html).then((res)=>{
return Response.text();
}).then((html)=>{
    document.getElementById('camera').innerHTML=html;
});