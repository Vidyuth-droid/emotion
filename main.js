//https://teachablemachine.withgoogle.com/models/sQkfypVsB/
preditction_1="";
preditction_2=""
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});
camera=document.getElementById("webcamera");
Webcam.attach("#webcamera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}
console.log("ml5 version - ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/sQkfypVsB/model.json",modelLoaded);
function modelLoaded(){
    console.log('Model is loaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is "+preditction_1;
    speak_data2=" And the second prediction is "+preditction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult)
}
function gotResult(error,result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        preditction_1=result[0].label;
        preditction_2=result[1].label;
        speak();
    if (result[0].label=="happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;"
    }
    if (result[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;"
    }
    if (result[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;"
    }
    if (result[1].label=="happy"){
        document.getElementById("update_emoji2").innerHTML="&#128522;"
    }
    if (result[1].label=="sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532;"
    }
    if (result[1].label=="angry"){
        document.getElementById("update_emoji2").innerHTML="&#128548;"
    }
    }
}
