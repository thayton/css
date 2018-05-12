let timer;
let timerActive = false;
let ticks = 0;

const SECONDS_PER_MINUTE = 60;
const MS_PER_TICK = 10;
const MS_PER_SECOND = 1000;
const TICKS_PER_SECOND = (MS_PER_SECOND / MS_PER_TICK);

const states = ['session', 'break'];
let state = 0;

var secondsToHMS = (totalSeconds) => {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {
        hours   = "0" + hours;
    }
    
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    
    return hours+':'+minutes+':'+seconds;    
};

var getTimerVal = (idPrefix) => {
    let id = idPrefix + '-length';
    let e = window[id];
    let n = parseInt(e.innerText);

    return n * SECONDS_PER_MINUTE;
};

var updateProgressBar = (currTimeSec, currTimeMsec) => {
    let timerStartingValue = getTimerVal(states[state]);
    let diff = timerStartingValue - currTimeSec;
    let perc = (diff / timerStartingValue) * 100; 
    let progressBar = document.querySelector('div#progress-bar > div.progress');

    perc += ((currTimeMsec / MS_PER_SECOND) / timerStartingValue) * 100;
    perc = parseFloat(perc.toFixed(2));

    if (perc > 100)
        perc = 100;
    
    progressBar.style.width = perc + '%';
};

var updateTimerDisplay = (timeInSeconds) => {
    let timerElem = document.getElementById('timer');    
    timerElem.dataset.seconds = timeInSeconds;
    timerElem.innerText = secondsToHMS(timeInSeconds)
};

var tick = () => {
    if (timerActive) {
        let timerElem = document.getElementById('timer');           
        let n = parseInt(timerElem.dataset.seconds);

        if ((++ticks % TICKS_PER_SECOND) !== 0) {
            updateProgressBar(n, ticks * MS_PER_TICK);
            return;
        }

        ticks = 0;
        
        if (n === 0) {
            state = state ^ 1;
            n = getTimerVal(states[state]);
        } else {
            n--;
        }

        updateTimerDisplay(n);
        updateProgressBar(n, ticks * MS_PER_TICK);
    }
};

var startTimer = () => {
    timer = setInterval(tick, MS_PER_TICK);
};

wrapper.onclick = (event) => {
    if (event.target.id === 'timer') {
        timerActive = timerActive ? false : true;
        if (timerActive) {
            startTimer();
        } else {
            clearInterval(timer);
        }
    }

    if (event.target.innerText === '+') {
        let id;
        let parentId = event.target.parentElement.id;
        
        if (event.target.parentElement.id === 'break-length-controls') {
            id = 'break-length';
        } else if (event.target.parentElement.id === 'session-length-controls') {
            id = 'session-length';
        } else {
            return;
        }
        
        let e = window[id];
        let n = parseInt(e.innerText) + 1;

        e.innerText = n;
        updateTimerDisplay(n * SECONDS_PER_MINUTE);
    }

    if (event.target.innerText === '-') {
        let id;
        let parentId = event.target.parentElement.id;
        
        if (parentId === 'break-length-controls') {
            id = 'break-length';
        } else if (parentId === 'session-length-controls') {
            id = 'session-length';          
        } else {
            return;
        }
        
        let e = window[id];
        let n = parseInt(e.innerText) - 1;

        e.innerText = n;
        updateTimerDisplay(n * SECONDS_PER_MINUTE);     
    }    
};

wrapper.onload = () => {
    let minutes = parseInt(window['session-length'].innerText);
    let seconds = minutes * SECONDS_PER_MINUTE;

    timer.dataset.seconds = seconds;
    timer.innerText = secondsToHMS(seconds);
};
