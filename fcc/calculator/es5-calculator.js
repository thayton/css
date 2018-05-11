// Handle divide by zero
var State = {
    INIT: 0, DIGIT: 1, OP: 2, RESULT: 3
};

var MAX_PRECISION = 10;
var MAX_DIGITS = 11;
var state = State.INIT;
var entry = document.getElementById('entry');
var keypad = document.getElementById('keypad');
var equation = document.getElementById('equation');
var eqn = []; // list of numbers, operators
    
var allClear = () => {
    state = State.INIT;    
    entry.innerText = '0';

    eqn = [];
    displayEqn();
};

var clearEntry = () => {
    if (state === State.RESULT) {
        allClear();
    } else {
        eqn.pop();

	if (eqn.length === 0) {
            entry.innerText = '0';	    	    
            state = State.INIT;
	} else {
            entry.innerText = eqn[eqn.length - 1];	    
	    state = isOp(eqn[eqn.length - 1]) ? State.OP : State.DIGIT;
	}
	
        displayEqn();	
    }
};

// User entered too many digits to fit on calculator screen
// or the result is too large to fit on calculator screen
var digitLimitMet = () => {
    entry.innerText = '0';
    eqn = [];    
    equation.innerText = 'Digit Limit Met';
    state = State.INIT;
};

var isOp = (op) => {
    return [ '+', '-', 'X', '%' ].indexOf(op) !== -1;
};

var displayEqn = () => {
    if (eqn.length === 0) {
        equation.innerText = '0';
        return;
    }
    
    equation.innerText = '';
    
    for (var i = 0; i < eqn.length; i++) {
        equation.innerText += eqn[i];
    }
};

var eqnAppendToLast = (x) => {
    if (eqn.length === 0) {
        eqn[0] = x;
    } else {
        var n = eqn.length - 1;
        eqn[n] += x;
    }
};

var handleOp = (op) => {
    if (state === State.DIGIT || state === State.RESULT) {
        state = State.OP;       
        entry.innerText = op;
        eqn.push(op);   
        displayEqn();
    }
};

var doOp = (x, op, y) => {
    switch (op) {
    case '+':
        x += y;
        break;
        
    case '-':
        x -= y;  
        break;
        
    case 'X':
        x *= y;
        break;
        
    case '%':
        x /= y;  
        break;
    }

    return x;
};

var handleEq = () => {
    var result;
    var lastOp;

    if (state !== State.DIGIT) {
        return;
    }
    
    result = parseFloat(eqn[0]);

    /* reduce */
    for (var i = 1; i < eqn.length; i++) {
        if (isOp(eqn[i])) {
            lastOp = eqn[i];
        } else {
            result = doOp(result, lastOp, parseFloat(eqn[i]));
        }
    }

    result = parseFloat(result.toPrecision(MAX_PRECISION));
    
    if (result.length > MAX_DIGITS) {
	digitLimitMet();
	return;
    }
    
    entry.innerText = result;
    
    eqn.push('=')
    eqn.push(result);    
    displayEqn();
    
    eqn = [ result ];
    state = State.RESULT;
};

/* number or '.' */
var handleDigit = (txt) => {
    if (state !== State.DIGIT) {
        entry.innerText = txt;
        eqn.push(txt);
    } else {
	if (txt === '.' && entry.innerText.indexOf('.') !== -1) {
	    // Can't have multiple decimal points 
	    return;
	}

	if (txt === '0' && entry.innerText === '0') {
	    // Don't display multiple zeros */
	    return;
	}
	
	if (entry.innerText.length === MAX_DIGITS) {
	    digitLimitMet();
	    return;
	}
	
        entry.innerText += txt;
        eqnAppendToLast(txt);
    }

    displayEqn();
    
    state = State.DIGIT;    
};

// XXX Add keyboard support for numbers
keypad.onclick = function(event) {
    var txt = event.target.innerText;
    var num = parseInt(txt);
    
    if (Number.isNaN(num) && txt !== '.') {
        if (isOp(txt)) {
            handleOp(txt);
        } else if (txt === 'AC') {
            allClear();
        } else if (txt === 'CE') {
            clearEntry();
        } else if (txt === '=') {
            handleEq();
        }
    } else {
        handleDigit(txt);
    }
};

window.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
	return; // Do nothing if the event was already processed
    }
    
    console.log('key = ' + event.key + ' type ' + typeof(event.key));

    switch (event.key) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    case 'Decimal':
	handleDigit(event.key);
	break;
	
    case '+': case '-': case 'X': case '%':
	handleOp(event.key);
	break;

    case '=': case 'Enter':
	handleEq('=');
	break;

    case 'Clear': case 'Backspace':
	clearEntry();
	break;
	
    default:
	return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window
