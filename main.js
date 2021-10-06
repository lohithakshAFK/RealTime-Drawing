nose_x = 0;
nose_y = 0;
left_wrist_x = 0;
right_wrist_x = 0;
difference = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(400,400);
    canvas = createCanvas(450,450);
    canvas.position(560,100);
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses)
}

function draw(){
    background("#BBDEFB");
    stroke("#CE202C");
    fill("#CE202C");
    square(nose_x,nose_y,difference);
}

function modelLoaded(){
    console.log("PoseNet Loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        difference = floor( left_wrist_x - right_wrist_x);
        console.log("Nose x = " + nose_x + ", Nose Y = " + nose_y);
        console.log("Left Wrist X = " + left_wrist_x + " , Right wrist X = " + right_wrist_x + "(Difference = " + difference + ")");
        document.getElementById("square_size").innerHTML = "The length of the square is " + difference + "pixels";
    }
}