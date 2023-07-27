//modules
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')
const Storage = require('node-storage')
//vapid keys
const vapid = require('./vapid.json')
//configure web-push
webpush.setVapidDetails(
    'mailto:redkillah420@gmail.com' ,
    vapid.publicKey,
    vapid.privateKey
)

//subscriptions
const store = new Storage(`${__dirname}/db`)
//inicializar en las de la db o en vacio
let subscriptions =store.get('subscriptions')||[]

//create URL safe vapid public key
module.exports.getkey =()=>urlsafeBase64.decode(vapid.publicKey)

module.exports.addSubscription=(subscription)=>{
    //add to subscriptions array
    subscriptions.push(subscription)
    //persist subscriptions
    store.put('subscriptions',subscriptions)
}

//send notifications to all registered subscriptions
module.exports.send= (message) =>{
    //notification promises
    let notifications =[]
    //loop subscritions
    subscriptions.forEach((subscription,i)=>{
        //send notification
       let p= webpush.sendNotification(subscription,message)
            .catch(status=>{
                //check for "410 gone"
                if(status.statusCode === 410)
                    subscriptions[i]['delete']=true;
                return null
            })
    //push notification promise to an array
        notifications.push(p);
    })

    //clean subscriptions marked for deletion
    Promise.all(notifications).then(()=>{
        //filter subscriptions array
        subscriptions=subscriptions.filter(subscription => !subscription.delete)
        //persist 'cleaned' subscriptions
        store.put('subscriptions',subscriptions)
    })
}