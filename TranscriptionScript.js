let recognization = new webkitSpeechRecognition();
let isRecognizing = false;
let GameObjName = null;

recognization.continuous = true;
recognization.interimResults = true;

function SetGameObjectName(name) {
    GameObjName = name;
    console.log("GameObject for result:", GameObjName);
}

function runspeechrecognition(listenContinuous) {
    if (isRecognizing) {
        console.log("Recognition already running.");
        return;
    }

    recognization.onstart = () => {
        console.log("Speech recognition started");
        isRecognizing = true;
    };

    recognization.onresult = (e) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; ++i) {
            transcript += e.results[i][0].transcript;
        }

        console.log("Transcript:", transcript);
        if (GameObjName) {
            window.Gameinstance.SendMessage(GameObjName, "Result", transcript);
        }
    };

    recognization.onend = () => {
        console.log("Speech recognition ended");
        isRecognizing = false;

        if (listenContinuous) {
            setTimeout(() => {
                if (!isRecognizing) {
                    recognization.start(); // restart
                }
            }, 300); // delay an chút để tránh spam
        }
    };

    try {
        recognization.start();
    } catch (e) {
        console.warn("Recognition start error:", e);
    }
}

function stoprecognition() {
    if (isRecognizing) {
        recognization.stop();
        isRecognizing = false;
        console.log("Speech recognition stopped.");
    }
}

function downloadfile(fileName, content) {
    const link = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = fileName + ".txt";
    link.click();
}
