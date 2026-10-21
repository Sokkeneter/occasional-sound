import {timeoutWorker} from './timeoutWorker.js';
let audioFiles = [];
const audioInput = document.getElementById('audio-input');
const audioPlayer = document.getElementById('sound-player');


audioInput.value = '';

if (window.Worker) {
    const timeoutWorker = new Worker(new URL("timeoutWorker.js", import.meta.url));
    audioInput.addEventListener('change', function(event) {
        audioFiles = event.target.files;
        if (audioFiles.lenght <0 ) return;
        // audioPlayer.src = URL.createObjectURL(audioFiles[0]);
        // audioPlayer.play();
        timeoutWorker.postMessage({ command: 'start', audioFiles: audioFiles });
        timeoutWorker.onmessage = function(e) {
            if (e.data.action === 'play') {
                audioPlayer.src = URL.createObjectURL(event.target.files[e.data.audioNumber]);
                audioPlayer.play();
            }
        }
    });
}

