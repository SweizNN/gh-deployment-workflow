const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionTypeDisplay = document.getElementById('session-type');
const completedSessionsDisplay = document.getElementById('completed-sessions');
const workDurationInput = document.getElementById('work-duration');
const shortBreakInput = document.getElementById('short-break');
const longBreakInput = document.getElementById('long-break');
const alarmSound = document.getElementById('alarm-sound');

let timer;
let timeInSeconds;
let sessionType = 'Work';
let completedSessions = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeInSeconds > 0) {
            timeInSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            alarmSound.play();
            switchSession();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timeInSeconds = workDurationInput.value * 60;
    sessionType = 'Work';
    completedSessions = 0;
    updateTimerDisplay();
    sessionTypeDisplay.textContent = sessionType;
    completedSessionsDisplay.textContent = completedSessions;
}

function switchSession() {
    if (sessionType === 'Work') {
        completedSessions++;
        completedSessionsDisplay.textContent = completedSessions;
        if (completedSessions % 4 === 0) {
            sessionType = 'Long Break';
            timeInSeconds = longBreakInput.value * 60;
        } else {
            sessionType = 'Short Break';
            timeInSeconds = shortBreakInput.value * 60;
        }
    } else {
        sessionType = 'Work';
        timeInSeconds = workDurationInput.value * 60;
    }
    sessionTypeDisplay.textContent = sessionType;
    updateTimerDisplay();
    startTimer();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

workDurationInput.addEventListener('change', () => {
    if (sessionType === 'Work') {
        timeInSeconds = workDurationInput.value * 60;
        updateTimerDisplay();
    }
});

shortBreakInput.addEventListener('change', () => {
    if (sessionType === 'Short Break') {
        timeInSeconds = shortBreakInput.value * 60;
        updateTimerDisplay();
    }
});

longBreakInput.addEventListener('change', () => {
    if (sessionType === 'Long Break') {
        timeInSeconds = longBreakInput.value * 60;
        updateTimerDisplay();
    }
});

// Initial setup
timeInSeconds = workDurationInput.value * 60;
updateTimerDisplay();