const UI = {
    player1Name: document.querySelector('.player1 .name'),
    player2Name: document.querySelector('.player2 .name'),
    
    player1Score: document.querySelector('.player1 .score'),
    player2Score: document.querySelector('.player2 .score'),

    reset: document.querySelector('.reset'),    
    status: document.querySelector('.prompt .status'),
    
    chooseNumPlayers: document.getElementById('choose-num-players'),
    chooseSym: document.getElementById('choose-sym'),
    gameBoard: document.getElementById('gameboard'),

    highlightSquare: function(squareNum) {
        let elem = document.querySelector(`.square${squareNum}`);
        elem.style.background = 'orange';
    },
    
    fillSquare: function(squareNum, sym) {
        let elem = document.querySelector(`.square${squareNum}`);
        elem.classList.add(sym);
    },
    
    clearSquare: function(squareNum) {
        let elem = document.querySelector(`.square${squareNum}`);

        elem.classList.remove('x');
        elem.classList.remove('o');
        elem.style.background = 'none';
    },
};
