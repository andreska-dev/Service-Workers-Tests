//modules
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')
const Storage = require('node-storage')
//vapid keys
const vapid = require('./vapid.json')

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