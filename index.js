import {timeoutWorker} from './timeoutWorker.js';
let audioFile;
const audioInput = document.getElementById('audio-input');
const audioPlayer = document.getElementById('sound-player');


audioInput.value = '';

if (window.Worker) {
    const timeoutWorker = new Worker(new URL("timeoutWorker.js", import.meta.url));
    audioInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        audioFile = file;
        audioPlayer.src = URL.createObjectURL(file);
        audioPlayer.play();
        timeoutWorker.postMessage({ command: 'start'});
        timeoutWorker.onmessage = function(e) {
            if (e.data.action === 'play') {
                audioPlayer.play();
            }
        }
    });
}

