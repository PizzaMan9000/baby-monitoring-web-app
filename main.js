alarm = "";
objectStatus = "";
objects = [];

function preload()
{
    alarm = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model loaded");
    objectStatus = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;
    
}

function draw()
{
    image(video, 0, 0, 400, 400);

    if (objectStatus != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person")
            {
                document.getElementById("babyDetected").innerHTML = "Baby Detected";
                alarm.stop();
            }
            else
            {
                document.getElementById("babyDetected").innerHTML = "Baby Not Detected";
                alarm.play();
            }
    
            if (objects.length < 0)
            {
                document.getElementById("babyDetected").innerHTML = "Baby Not Detected";
                alarm.play();
            }
        }


    }
}