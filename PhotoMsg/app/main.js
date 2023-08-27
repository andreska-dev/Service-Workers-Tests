//init new camera instance with the player node

const camera = new Camera(document.getElementById('player'));

//main app logic

const _init=()=>{

    //innit new Message instance
    const messages = new Message();

    //notify user of connection error
    window.addEventListener('messages_error',()=>{
        toastr.error('Messages could not be retrieved. <br> Will keep trying.','Network connection error');
    });

    //listen for new message event
    window.addEventListener('new_message',(e)=>{
        renderMessage(e.detail);
    });

    //listen for existing messages from server
    window.addEventListener('messages_ready',()=>{
        //remove loader
        $('#loader').remove();
        //check some messages exists
        if(messages.all.length==0) toastr.info('Add the first message','no messages');
        //empty out existing messages if this update is from reconnection
        $('#messages').empty();
        //loop and render all messages
        messages.all.reverse().forEach(renderMessage);
    });

    //switch on camera viewfinder
    $('#viewfinder').on("show.bs.modal",()=>{
        camera.switch_on();
    });
    $('#viewfinder').on("hidden.bs.modal",()=>{
        camera.switch_off();
    })

    //take photo
    $('#shutter').on("click",()=>{
        let photo = camera.take_photo();
        //show photo preview in camera button
        $('#camera').css('background-image', `url(${photo})`).addClass('withphoto');
    });

    //submit message
    $('#send').on("click",()=>{
        //get caption
        let caption =$('#caption').val();
        //check message is ok
        if(!camera.photo || !caption){
            //show notification and return
            toastr.warning('Photo & Caption required.', 'Incomplete Message');
            return;
        }
        //add new message
        let message = messages.add(camera.photo,caption);
        //render new message in feed
        renderMessage(message);

        //reset caption and photo field on success
        $('#caption').val('');
        $('#camera').css('background-image','').removeClass('withphoto');
        camera.photo = null;
    });

    //create new message element
    const renderMessage= (message) =>{
        //message HTML
        let msgHTML = `
        <div style="display: none" class="row message bg-light mb-2 rounded shadow">
            <div class="col-2 p-1">
                <img src="${message.photo}" class="photo w-100 rounded">
            </div>
            <div class="col-10 p-1">
                ${message.caption}
            </div>
        </div>
        `;
        //prepend to container messages
        $(msgHTML).prependTo('#messages').show(500)

        //bind a new listener to the img to show in modal
            .find('img').on("click",showPhoto);
    };
    //show message photo in modal
    const showPhoto=(e)=>{
        let photoSrc = $(e.currentTarget).attr('src');
        //set to photoframe in modal
        $('#photoframe img').attr('src',photoSrc);
        $('#photoframe').modal('show');
    };
}