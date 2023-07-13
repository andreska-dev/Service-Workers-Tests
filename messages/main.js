
// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('/sw.js').then(function(registration){

  //avisar en caso de update
  registration.onupdatefound=()=>{
    //referenciar el nuevo sw
    let newSW = registration.installing;
    //avisar al usuario del update
    if(confirm("App update found. Do you want to update it now?")){
        newSW.postMessage('update_self');
    }
  } ;

  }).catch(console.log);

}
