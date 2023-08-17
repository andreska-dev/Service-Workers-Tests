class Camera {
    constructor(video_node) {
        //Camera stream node DOM
        this.video_node=video_node;
    }

    //camera feed ON
    switch_on(){
        //get camera feed and show in player
        navigator.mediaDevices.getUserMedia({
            video:{width: 600,height:600},
            audio:false
        }).then(stream =>{
            this.video_node.srcObject = this.stream = stream;
        })
    }

    //camera feed OFF
    switch_off(){
        //pause video node
        this.video_node.pause();
        //stop media stream
        this.stream.getTracks()[0].stop();
    }

    //capture photo from camera stream
    take_photo(){
        //create a <canvas> element to render the photo
        let canvas = document.createElement('canvas');
        //set canvas dimensions same as video stream
        canvas.setAttribute('width',600);
        canvas.setAttribute('height',600);

        //get canvas context
        let context = canvas.getContext('2d');
        //draw image onto the canvas
        context.drawImage(this.video_node,0,0,canvas.width,canvas.height);

        //get the canvas image as a data url
        this.photo = context.canvas.toDataURL();

        //Destroy canvas
        context = null;
        canvas = null;

        return this.photo;
    }

}