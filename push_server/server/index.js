//Modules
const http = require('http')
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
            response.end('Subscribed')
        })

     //public key
    } else if(url.match(/^\/key\/?/)){
        //respopnse with public key
        response.end('public key')

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