//static server Express
const express = require('express');
const http = require('http');

//create http server
const app = express();
const server = http.Server(app);

//Server app directory
app.use(express.static(`${__dirname}/../app`));

//Server node_modules directory
app.use('/modules',express.static(`${__dirname}/../node_modules`));

//start server
server.listen(8000,()=>console.log('Photo message running on localhost:8000'));