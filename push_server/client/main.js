let swReg

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

fetch('http://localhost:3333').then(res => res.text()).then(console.log)