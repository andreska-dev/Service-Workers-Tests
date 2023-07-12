//revisar si el navegador soporta service workers
if(navigator.serviceWorker){
    //registrar el sw
    navigator.serviceWorker.register('sw.js').then(function(registration){
        console.log("SW Registrado");
    }).catch(console.log);

}

//get camera feed
fetch('camera_feed.html').then((response)=>{
return response.text();
}).then((html)=>{
    document.getElementById('camera').innerHTML=html;
});
