const MAX_PRECISION = 10;
const MAX_DIGITS_SCREEN_TOP = 11;
const MAX_DIGITS_SCREEN_BOTTOM = 11;

// Handle divide by zero
const State = {
    INIT: 0, DIGIT: 1, OP: 2, RESULT: 3
};

var isOp = (op) => {
    return [ '+', '-', '*', '%' ].indexOf(op) !== -1;
};

var doOp = (x, op, y) => {
    switch (op) {
    case '+':
        x += y;
        break;
        
    case '-':
        x -= y;  
        break;
        
    case '*':
        x *= y;
        break;
        
    case '%':
        x /= y;  
        break;
    }

    return x;
};

class Screen {
    constructor(screenTopId, screenBottomId) {
	this.top = document.getElementById(screenTopId);
	this.bottom = document.getElementById(screenBottomId);
    }

    updateTop(text) {
	this.top.innerText = text;
    }

    updateBottom(text) {

    }

    clearTop() {

    }

    clearBottom() {

    }
}

class Calculator {
    constructor (entryId, keypadId, equationId) {
	this.state = State.INIT;
	this.entry = document.getElementById(entryId);//ui
	this.keypad = document.getElementById(keypadId); //ui	
	this.equation = document.getElementById(equationId); //ui
	this.eqn = [];
    }

    allClear() {
	this.state = State.INIT;    
	this.entry.innerText = '0';

	this.eqn = [];
	this.displayEqn();
    }

    clearEntry() {
	if (this.state === State.RESULT) {
            this.allClear();
	} else {
            this.eqn.pop();

	    if (this.eqn.length === 0) {
		this.entry.innerText = '0';	    	    
		this.state = State.INIT;
	    } else {
		this.entry.innerText = this.eqn[this.eqn.length - 1];	    
		this.state = isOp(this.eqn[this.eqn.length - 1]) ? State.OP : State.DIGIT;
	    }
	
            this.displayEqn();	
	}
    }

    // User entered too many digits to fit on calculator screen
    // or the result is too large to fit on calculator screen
    digitLimitMet() {
	this.entry.innerText = '0';
	this.eqn = [];    
	this.equation.innerText = 'Digit Limit Met';
	this.state = State.INIT;
    }

    displayEqn() {
	if (this.eqn.length === 0) {
            equation.innerText = '0';
	} else {
	    equation.innerText = '';
    
	    for (var i = 0; i < this.eqn.length; i++) {
		this.equation.innerText += this.eqn[i];
	    }
	}
    }

    eqnAppendToLast(x) {
	if (this.eqn.length === 0) {
            this.eqn[0] = x;
	} else {
            var n = this.eqn.length - 1;
            this.eqn[n] += x;
	}
    }

    handleOp(op) {
	if (this.state === State.DIGIT || this.state === State.RESULT) {
            this.state = State.OP;       
            this.entry.innerText = op;
            this.eqn.push(op);   
            this.displayEqn();
	}
    }

    computeResult() {
	let result;
	let lastOp;

	result = parseFloat(this.eqn[0]);

	/* reduce */
	for (var i = 1; i < this.eqn.length; i++) {
            if (isOp(this.eqn[i])) {
		lastOp = this.eqn[i];
            } else {
		result = doOp(result, lastOp, parseFloat(this.eqn[i]));
            }
	}

	result = parseFloat(result.toPrecision(MAX_PRECISION));
	return result;
    }
    
    handleEq() {
	let result;

	if (this.state !== State.DIGIT) {
            return;
	}
    
	result = this.computeResult();
	if (result.length > MAX_DIGITS_TOP_SCREEN) {
	    this.digitLimitMet();
	    return;
	}
    
	this.entry.innerText = result;
    
	this.eqn.push('=')
	this.eqn.push(result);    
	this.displayEqn();
    
	this.eqn = [ result ];
	this.state = State.RESULT;
    }

    /* number or '.' */
    handleDigit(txt) {
	if (this.state !== State.DIGIT) {
            this.entry.innerText = txt;
	    if (this.state !== State.RESULT) {
		this.eqn.push(txt);
	    } else {
		this.eqn = [ txt ];
	    }
	} else {
	    if (txt === '.' && this.entry.innerText.indexOf('.') !== -1) {
		// Can't have multiple decimal points 
		return;
	    }

	    if (txt === '0' && this.entry.innerText === '0') {
		// Don't display multiple zeros */
		return;
	    }
	
	    if (this.entry.innerText.length === MAX_DIGITS_SCREEN_TOP) {
		this.digitLimitMet();
		return;
	    }
	
            this.entry.innerText += txt;
            this.eqnAppendToLast(txt);
	}

	this.displayEqn();
	this.state = State.DIGIT;    
    }
}

const calculator = new Calculator('entry', 'keypad', 'equation');

// XXX Add keyboard support for numbers
keypad.onclick = function(event) {
    let txt = event.target.innerText;
    let num = parseInt(txt);
    
    if (Number.isNaN(num) && txt !== '.') {
        if (isOp(txt)) {
            calculator.handleOp(txt);
        } else if (txt === 'AC') {
            calculator.allClear();
        } else if (txt === 'CE') {
            calculator.clearEntry();
        } else if (txt === '=') {
            calculator.handleEq();
        }
    } else {
        calculator.handleDigit(txt);
    }
};

window.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
	return; // Do nothing if the event was already processed
    }
    
    //console.log('key = ' + event.key + ' type ' + typeof(event.key));

    switch (event.key) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    case 'Decimal':
	calculator.handleDigit(event.key);
	break;
	
    case '+': case '-': case '*': case '%':
	calculator.handleOp(event.key);
	break;

    case '=': case 'Enter':
	calculator.handleEq('=');
	break;

    case 'Clear': case 'Backspace':
	calculator.clearEntry();
	break;
	
    default:
	return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window
