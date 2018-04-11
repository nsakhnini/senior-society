//TODO: why it doesn't work with desktop firefox?
window.onload = function () {
    console.log("in recognition");
    var isSpeaking = false; //To track if the speaking is in progress or not
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition ; //Getting the Speech Recognition API
    var recognition = new SpeechRecognition();//Initiation of a speech recognition instance
    var spokenText = '';
    var confidence = 0.0;
    recognition.lang = 'en-US';//Language
    recognition.interimResults = false;//No results that are not final
    //The click handler to start and handle speech recognition
    function speak(res) {
        if(!isSpeaking) {
            recognition.start();
            isSpeaking = true;
            console.log('Ready to receive a command.');
        }
        else{
            abortSpeech();
        }
        //Recognition successful
        recognition.onresult = function (event) {
            console.log("on result");
            spokenText = event.results[0][0].transcript;
            confidence = event.results[0][0].confidence;
            console.log('Result: ' + spokenText + ' Confidence: ' + confidence );
            res.value = spokenText;
        };
        //When the user is not speaking
        recognition.onspeechend = function () {
            recognition.stop();
            isSpeaking = false;
            console.log("speech end");
        };
        //No match,, asks for repetition and starts a new recognition cycle
        recognition.onnomatch = function () {//Add a message
            window.alert( 'Sorry, I didn\'t understand that. Can you please repeat?');
            if(!isSpeaking) {
                recognition.start();
                isSpeaking = true;
                console.log('Ready to receive a command.');
            }
        };
        //Capture other errors
        recognition.onerror = function (event) {
            if(event.error != "aborted") {
                window.alert('Sorry, I didn\'t understand that. Please try again');
            }
            if(isSpeaking) {
                isSpeaking = false;
            }
            console.log('Error occurred in recognition: ' + event.error);
        };
    }
    //To abort a speech in progress
    function abortSpeech() {
        if(isSpeaking){
            recognition.abort();
            isSpeaking = false;
            console.log("aborted");
        }
    }

    //Use the API
    var par = document.getElementById("searchMic"); //The clickable object
    var res =document.getElementById("searchText"); //Where do I want my results
    if (par != null && res != null)
        par.addEventListener("click", function(){speak(res)}); //Adding the click listener
};