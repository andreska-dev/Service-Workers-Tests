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
        console.log('Take photo');
    });

    //submit message
    $('#send').on("click",()=>{
        //get caption
        let caption =$('#caption').val();
        //check message is ok
        if(!caption){
            //show notification and return
            toastr.warning('Photo & Caption required.', 'Incomplete Message');
            return;
        }
        console.log('adding messsage');
        console.log(caption);

        //reset caption field on success
        $('#caption').val('');
    });
}