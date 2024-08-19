let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const timeDisplay = document.getElementById('time-display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start-btn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        elapsedTime = Date.now() - startTime;
        clearInterval(timer);
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
});

document.getElementById('lap-btn').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsContainer.appendChild(lapItem);
    }
});

function updateTime() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - startTime;
    timeDisplay.textContent = formatTime(timeElapsed);
}

function formatTime(timeInMillis) {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeInMillis % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + ':' +
        String(milliseconds).padStart(2, '0')
    );
}
