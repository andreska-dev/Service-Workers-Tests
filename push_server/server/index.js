//Modules
const http = require('http')
//create http server
http.createServer((request,response)=>{
    //Enable CORS
    response.setHeader('Access-Control-Allow-Origin','*')

    response.end('Hello from HTTP server - Updated')

    //start the server
}).listen(3333,()=>{console.log('Server Running')})