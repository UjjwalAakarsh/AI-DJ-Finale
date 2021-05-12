leftWristScore=0
rightWristScore=0
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
song=""
function preload(){
song=loadSound("music.mp3")
}
function setup(){
canvas=createCanvas(500,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
video.size(500,500)
//Code for initializing posenet
poseNet=ml5.poseNet(video,check_model_loaded)
//Code for executing posenet
poseNet.on("pose",gotPoses)
}
function gotPoses(results){
    if (results.length>0) {
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("leftWristX= "+leftWristX)
        console.log("leftWristY= "+leftWristY)
        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("rightWristX= "+rightWristX)
        console.log("rightWristY= "+rightWristY)
        leftWristScore=results[0].pose.keypoints[9].score
        rightWristScore=results[0].pose.keypoints[10].score
    }
}
function check_model_loaded(){
    console.log("Model Loaded")
}
function draw(){
image(video,0,0,600,500)
fill("red")
stroke("red")
circle(leftWristX,leftWristY,30)
leftWristYNumber=Number(leftWristY)
leftWristYWithoutDecimals=floor(leftWristYNumber)
volume=leftWristYWithoutDecimals/500
song.setVolume(volume)
document.getElementById("volume").innerHTML="volume- "+volume

//Code for contoling the speed of song
circle(rightWristX,rightWristY,30)
if (rightWristY>0 && rightWristY<=100) {
    song.rate(0.5)
    document.getElementById("speed").innerHTML="Speed=0.5x"
}
else if (rightWristY>100 && rightWristY<=200) {
    song.rate(1)
    document.getElementById("speed").innerHTML="Speed=1x"
}
else if (rightWristY>200 && rightWristY<=300) {
    song.rate(1.5)
    document.getElementById("speed").innerHTML="Speed=1.5x"
}
else if (rightWristY>300 && rightWristY<=400) {
    song.rate(2)
    document.getElementById("speed").innerHTML="Speed=2x"
}
else if (rightWristY>400 && rightWristY<=500) {
    song.rate(2.5)
    document.getElementById("speed").innerHTML="Speed=2.5x"
}
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
