var song = ""
var stat = ""
objects = []

function setup() {
canvas = createCanvas (380,380)
canvas.center()
video = createCapture(VIDEO)
video.size(380,380)
video.hide()
objectDetector = ml5.objectDetector('cocossd',modelLoaded)
document.getElementById('status').innerHTML = "Status : Detecting Baby"
}

function modelLoaded(){
    console.log("modelLoaded")
    stat = "true"
    
}

function preload() {
 song = loadSound("alarm.mp3")
}

function draw() {
image(video, 0, 0, 380, 380) 

 if(stat=="true"){
     r = random(255)
     g=random(255)
     b=random(255)
    objectDetector.detect(video,gotResults)
    
        for(i=0;i<1;i++){
            if(objects[i].label =="person"){
                document.getElementById("baby").innerHTML = "Baby Found"
            }else{
                document.getElementById("baby").innerHTML = "Baby Not Found"
                song.play("alarm.mp3")
            }

            fill(r,g,b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label+" "+percent+"% ",objects[i].x,objects[i].y)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
}
}

function gotResults(results){
console.log(results)
    objects = results
    
}
