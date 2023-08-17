//init new camera instance with the player node

const camera = new Camera(document.getElementById('player'));

//main app logic

const _init=()=>{
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

        //render new message in feed
        renderMessage({photo:camera.photo, caption});

        //reset caption and photo field on success
        $('#caption').val('');
        $('#camera').css('background-image','').removeClass('withphoto');
        camera.photo = null;
    });

    //create new message element
    const renderMessage= (message) =>{
        //message HTML

    }
}