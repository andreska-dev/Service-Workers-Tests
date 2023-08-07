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

}