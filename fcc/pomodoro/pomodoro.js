let timer;
let timerActive = false;
let timerStartingValue = 60;

var updateProgressBar = () => {
    let timerElem = document.getElementById('timer');
    let curr = parseInt(timerElem.innerText);
    let diff = timerStartingValue - curr;
    let perc = Math.ceil( (diff / timerStartingValue) * 100 ); 
    let progressBar = document.querySelector('div#progress-bar > div.progress');

    progressBar.style.width = perc + '%';
};

var tick = () => {
    if (timerActive) {
	let timerElem = document.getElementById('timer');	    
	let n = parseInt(timerElem.innerText);
	
	if (n === 0) {
	    n = timerStartingValue;
	} else {
	    n--;
	}

	timerElem.innerText = n;
	updateProgressBar();
    }
};

var startTimer = () => {
    timer = setInterval(tick, 1000);
};

wrapper.onclick = function(event) {
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
