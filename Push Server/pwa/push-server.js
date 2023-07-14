//module web-push
const webpush = require('web-push');
const vapid = require('./vapid.json');
//configure keys
webpush.setVapidDetails(
    'mailto:redkillah420@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

const pushSubscription = {
    endpoint:'https://fcm.googleapis.com/fcm/send/fx_Yj713V_A:APA91bGuPJDNKbkhTXmdC0AI1GHILIP98yomgSuywr7_T1UCNHmwwNF1lCYn0ykwcL-OmklhB0nj7LpdTHwoy1f3iraBQ5dDBlHIfgAtCxXxHFu1BQqjYu6DpKbASpijoau7O16q0oSq',
    keys: {
        auth: 'MpE2NO7Sig88IhrVyEZJZA',
        p256dh: 'BIJCIXyDo8pgyUMWRR-l1QInPfIwt4jMnMQXbiIyz3o_R7-6rWU_ihGbXTFDbpH3et-Mf7TVQoZawFKY09Exm-k'
    }
};

webpush.sendNotification(pushSubscription, 'Notification from the push server');
console.log('Notification sent to the client');