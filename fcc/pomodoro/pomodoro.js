let timer;
let timerActive = false;
let timerStartingValue = 60;

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

var updateProgressBar = () => {
    let timerElem = document.getElementById('timer');
    let curr = parseInt(timerElem.dataset.seconds);
    let diff = timerStartingValue - curr;
    let perc = Math.ceil( (diff / timerStartingValue) * 100 ); 
    let progressBar = document.querySelector('div#progress-bar > div.progress');

    progressBar.style.width = perc + '%';
};

var tick = () => {
    if (timerActive) {
        let timerElem = document.getElementById('timer');           
        let n = parseInt(timerElem.dataset.seconds);
        
        if (n === 0) {
            n = timerStartingValue;
        } else {
            n--;
        }

        timerElem.dataset.seconds = n;
        timerElem.innerText = secondsToHMS(n)
        
        updateProgressBar();
    }
};

var startTimer = () => {
    timer = setInterval(tick, 1000);
};

wrapper.onclick = (event) => {
    console.log(event);

    if (event.target.id === 'timer') {
        timerActive = timerActive ? false : true;
        if (timerActive) {
            startTimer();
        } else {
            clearInterval(timer);
        }
    }
};

wrapper.onload = () => {
    let minutes = parseInt(window['session-length'].innerText);
    let seconds = minutes * 60;

    timer.dataset.seconds = seconds;
    timer.innerText = secondsToHMS(seconds);
};
