// timer-worker.js
let isRunning = false;
let timeoutId = null;
let audioFiles = [];

self.onmessage = function(e) {
    audioFiles = e.data.audioFiles;
    if (e.data.command === 'start') {
        isRunning = true;
        scheduleNext();
    } else if (e.data.command === 'stop') {
        isRunning = false;
        if (timeoutId) clearTimeout(timeoutId);
    }
};

function scheduleNext() {
    if (!isRunning || audioFiles.length < 1) return;
    
    const timeout = getRandomInt(50, 120) * 1000; // 10000 milisecond is 1 second. timeout is in miliseconds but getrandomint is in seconds
    console.log('timeout:', timeout);
    timeoutId = setTimeout(() => {
        randomFileNumber = getRandomInt(0, audioFiles.length );
        console.log('random file:', randomFileNumber);
        // audioPlayer.src = URL.createObjectURL(file);

        // Send message to main thread to play the audio
        self.postMessage({ action: 'play', audioNumber: randomFileNumber });
        scheduleNext();
    }, timeout);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}