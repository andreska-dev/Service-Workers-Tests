class Message{
    constructor() {
        this.messages =[];

        //connect to socket server
        this.socket = io('https://photo-message.onrender.com');
        //handle connection error
        this.socket.once('connect_error',()=>{
            //notify main.js via an event
            window.dispatchEvent(new Event('messages_error'));
        });

        //listen for new message from server
        this.socket.on('all_messages',(messages)=>{
            //update local messages array
            this.messages = messages;
            //notify client with an event
            window.dispatchEvent(new Event('messages_ready'));
        });

        //listen for new message from server
        this.socket.on('new_message',(message)=>{
            //Add to local messages
            this.messages.unshift(message);
            //notify main with an event
            window.dispatchEvent(new CustomEvent('new_message',{detail:message}));
        });
    }

    //get all messages
    get all(){
        return this.messages;
    }

    //add a new message
    add(data_uri, caption_text){

        //create msj obj
        let message = {
            photo: data_uri,
            caption:caption_text
        }

        //Add to local messages
        this.messages.unshift(message);

        //Emit to server
        this.socket.emit('new_message',message);

        //return formated mej obj
        return message;
    }
}