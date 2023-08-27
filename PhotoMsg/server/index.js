//static server Express
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const fs = require('fs');

//create http server
const app = express();
const server = http.Server(app);

//create web socket server
const io = socketio(server);

//init server messages from disk
const messageData=fs.readFileSync(`${__dirname}/db.json`).toString();
const messages = messageData? JSON.parse(messageData):[];
//listen for new socket client (connection)
io.on('connection',(socket)=>{
    //send all messages to clients
    socket.emit('all_messages',messages);

    //Listen for new messages
    socket.on('new_message',(message)=>{
    //add to messages
        messages.unshift(message);
    //persist to disk
        fs.writeFileSync(`${__dirname}/db.json`,JSON.stringify(messages));
        //broadcast new message
        socket.broadcast.emit('new_message',message);
    });
});
//Server app directory
app.use(express.static(`${__dirname}/../app`));

//Server node_modules directory
app.use('/modules',express.static(`${__dirname}/../node_modules`));

//start server
server.listen(8000,()=>console.log('Photo message running on localhost:8000'));