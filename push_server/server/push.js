//modules
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')
//vapid keys
const vapid = require('./vapid.json')

//create URL safe vapid public key
module.exports.getkey =()=>urlsafeBase64.decode(vapid.publicKey)