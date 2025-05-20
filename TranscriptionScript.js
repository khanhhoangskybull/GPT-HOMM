let recognization = new webkitSpeechRecognition();

var result = false;
var stop = true; // Initially stopped
var started = false; // Recognition has not started yet
recognization.continuous = true;
recognization.interimResults = true;
var GameObjName = null;

function SetGameObjectName(name) {
    GameObjName = name;
    console.log(GameObjName);
}

function runspeechrecognition(listenContinuous) {
    recognization.onstart = () => {
        console.log("Speech recognition started");
        started = true;
        result = false;
        stop = false;
    };

    recognization.onresult = (e) => {
        //var transcript = e.results[0][0].transcript;
        //console.log("Speech recognition result:", transcript);

        //window.Gameinstance.SendMessage(GameObjName, "Result", transcript);
        //result = true;

        //if (listenContinuous && !stop) {
        //    setTimeout(() => {
        //        if (!started) {
        //            recognization.start(); // Restart recognition
        //        }
        //    }, 100);
        //}
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; ++i) {
            transcript += e.results[i][0].transcript;
        }

        console.log("Transcript:", transcript);
        window.Gameinstance.SendMessage(GameObjName, "Result", transcript);
        result = true;
    };

    recognization.onend = () => {
        console.log("Speech recognition ended");
        started = false;

        //if (!result && listenContinuous && !stop) {
        //    setTimeout(() => {
        //        if (!started) {
        //            recognization.start(); // Restart recognition
        //        }
        //    }, 100);
        //}

        if (listenContinuous && !stop) {
            setTimeout(() => {
                if (!started) recognization.start();
            }, 100);
        }
    };

    // Start recognition if it is not running and has not been stopped
    if (!started && stop) {
        stop = false;
        recognization.start();
    }
}

function stoprecognition() {
    console.log("Stopping speech recognition");
    recognization.stop();
    stop = true;
    started = false;
}

function downloadfile(fileName, content) {
    const link = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = fileName + ".txt";
    link.click();
}
