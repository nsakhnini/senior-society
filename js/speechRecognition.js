//TODO: why it doesn't work with firefox?
window.onload = function () {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var diagnostic = document.getElementById('output');
    document.getElementsByTagName("body")[0].onclick = function () {
        //TODO: if listening don't listen again, make it universal
        recognition.start();
        console.log('Ready to receive a command.');
    };
    recognition.onresult = function (event) {
        //TODO: make sure it listens and captures the whole sentence
        console.log("on result");
        //var last = event.results.length - 1;
        var result = event.results.transcript;
        diagnostic.textContent = 'Result received: ' + result + '.';
        console.log('Result: ' + result + ' Confidence: ' + event.results[0][0].confidence);
    };
    recognition.onspeechend = function () {
        recognition.stop();
        console.log("speech end");
    };
    recognition.onnomatch = function () {//Add a message
        //TODO: show a message or alert, or use TTS to tell that you didn;t understand
        diagnostic.textContent = 'Sorry, I didn\'t understand that.';
    };
    recognition.onerror = function (event) {
        //TODO: ask for repetition
        diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
    };
};