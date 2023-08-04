//main app logic

const _init=()=>{
    //switch on camera viewfinder
    $('#viewfinder').on("show.bs.modal",()=>{
        console.log('camera ON')
    });
    $('#viewfinder').on("hidden.bs.modal",()=>{
        console.log('camera OFF')
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