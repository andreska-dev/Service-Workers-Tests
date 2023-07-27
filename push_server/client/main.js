let swReg


//push server url
const serverUrl='http://localhost:3333'


//Update UI for subscribe status

const setSubscribedStatus =(state)=>{
    if(state){
        document.getElementById('Subscribe').className='hidden'
        document.getElementById('Unsubscribe').className=''
    }else{
        document.getElementById('Subscribe').className=''
        document.getElementById('Unsubscribe').className='hidden'
    }
}

//register Service Worker
if(navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js').then(registration =>{
       //reference registration globally
       swReg = registration

       //check if a subscrition exists, and if so, update the UI
       swReg.pushManager.getSubscription().then(setSubscribedStatus)


        //log errors
    }).catch(console.error)
}

//get public key from server
const getApplicationServerKey=()=>{
    //fetch from server
    return fetch(`${serverUrl}/key`)
        //parse respond body as arraybuffer
        .then(res =>res.arrayBuffer())
        //return arrayBuffer as a new Uint8array
        .then(key => new Uint8Array(key));
}

const subscribe =()=>{
    //check if registration is available
    if(!swReg) return console.error('Service worker registration not found');
    //get application server key from push server
    getApplicationServerKey().then(key =>{
        //subscribe
        swReg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key})
            .then(res => res.toJSON())
            .then(subscription => {
                //pass subscription to server
                fetch(`${serverUrl}/subscribe`, {method:'POST',body:JSON.stringify(subscription)})
                    .then(setSubscribedStatus)
                    .catch(unsubscribe)
            //catch subscription error
            }).catch(console.error)
    })
}


//Unsubscribe from push service
const unsubscribe =()=>{
    //unsubscribe and update UI
    swReg.pushManager.getSubscription().then(subscription=>{
        subscription.unsubscribe().then(()=>{
            setSubscribedStatus(false)
        })
    })
}


//fetch example
//fetch('http://localhost:3333/subscribe',{method:'POST'}).then(res => res.text()).then(console.log)
