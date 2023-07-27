//Modules
const http = require('http')
const push = require('./push')
//create http server
http.createServer((request,response)=>{
    //Enable CORS
    response.setHeader('Access-Control-Allow-Origin','*')

    //get requested VARS
    const {url,method} =request;

    //subscribe
    if(method === 'POST' && url.match(/^\/subscribe\/?/)){
        //get post body
        let body =[]
        //read body stream
        request.on('data',chunk=> body.push(chunk)).on('end',()=>{
            //parse subscription body to object
            let subscription = JSON.parse(body.toString())
            //store subscription from push notifications
            push.addSubscription(subscription)
            response.end('Subscribed')
        })

     //public key
    } else if(url.match(/^\/key\/?/)){
        //Get key from push module
        response.end(push.getkey())

     //push notification
    } else if(method ==='POST'&&url.match(/^\/push\/?/)){
        //get post body
        let body =[]
        //read body stream
        request.on('data',chunk=> body.push(chunk)).on('end',()=>{
            response.end('Push sent')
        });

    //not found
    } else{
        response.status=404;
        response.end('Error: Unknown Request');
    }

    //start the server
}).listen(3333,()=>{console.log('Server Running')})