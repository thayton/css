let players = [
    {
        sym: 'x',
        score: 0,
        name: 'Player 1'
    },
    {
        sym: 'o',
        score: 0,
        name: 'Player 2'        
    }
];

let numPlayers = 1;
let currentPlayer = 0;
let computersTurn = false;
let computersTurnTimer = null;
let gameOn = true;

let grid = [
    '', '', '', // 0 1 2
    '', '', '', // 3 4 5
    '', '', ''  // 6 7 8
];

let winningMoves = [
    [ 0, 1, 2 ],
    [ 0, 3, 6 ],
    [ 0, 4, 8 ],
    [ 1, 4, 7 ],
    [ 2, 4, 6 ],    
    [ 2, 5, 8 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ]
];

let startNewGame = () => {
    currentPlayer = 0;    
    computersTurn = false;
    computersTurnTimer = null;
    gameOn = true;

    for (let i = 0; i < 9; i++) {
        let elem = document.querySelector(`.square${i}`);

        elem.classList.remove('x');
        elem.classList.remove('o');
        elem.style.background = 'none';
        
        grid[i] = '';
    }

    let name = players[currentPlayer].name;
    updateStatus(`${name}'s Turn`);    
};

let getWinningMoveStrings = (i) => {
    return winningMoves[i].map(
        squareNum => grid[squareNum]
    ).join('');
};

let highlightWinningMove = (winningMove) => {
    winningMoves[winningMove].forEach((i) => {
        let elem = document.querySelector(`.square${i}`);
        elem.style.background = 'orange';
    });
};

let makeMove = (sym, squareNum) => {
    let elem = document.querySelector(`.square${squareNum}`);
    elem.classList.add(sym);
    grid[squareNum] = sym;
};
    
// Examine the board and see if we can get one move
// close to a winning move
//
// ''    empty and all three available
// 'x'   two available
// 'x o' one empty but o blocks winning string for x
// 'xx ' most preferable since one more move for 'x' and we win
//
let getBestMove = (sym) => {
    let length = 0;
    let regexp = new RegExp(sym, 'g');
    let bestMove = {
        squareNum: -1,
        movesLeft: 2 // moves left after this to win
    };
    
    for (let i = 0; i < winningMoves.length; i++) {
        let s = getWinningMoveStrings(i);
        
        if (s.length === (s.match(regexp) || []).length) {
            if (s.length > length) {
                length = s.length;

                bestMove.movesLeft = 2 - s.length;                
                bestMove.squareNum = winningMoves[i][
                    winningMoves[i].findIndex(j => grid[j] === '')
                ];
            }
        }
    }

    if (bestMove.squareNum === -1) {
        bestMove.squareNum = findOpenSquare();
        bestMove.movesLeft = 2;
    }

    return bestMove;
};

// Find and return the index of any open square in the grid
// where we can make a move. -1 indidates the grid is full!
let findOpenSquare = () => {
    return grid.findIndex(e => e === '');
};

let isStalemate = () => {
    return findOpenSquare() === -1;
};


// Computer chooses next move
let takeTurn = () => {
    let mySym = players[currentPlayer].sym;
    let myBestMove = getBestMove(mySym);
    let theirSym = players[currentPlayer ^ 1].sym;
    let theirBestMove = getBestMove(theirSym);

    if (theirBestMove.movesLeft === 0 && myBestMove.movesLeft > 0) {
        makeMove(mySym, theirBestMove.squareNum);
    } else {
        makeMove(mySym, myBestMove.squareNum);
    }

    if (!gameIsOver()) {
        nextPlayer();
    }
};

// Computer is always Player 2
let isComputersTurn = () => {
    return numPlayers === 1 && currentPlayer === 1;
};

let nextPlayer = () => {
    let name;
    
    currentPlayer ^= 1;
    
    if (numPlayers === 1) {
        computersTurnTimer = isComputersTurn() ? setTimeout(takeTurn, 1500) : null;
    }

    name = players[currentPlayer].name;
    updateStatus(`${name}'s Turn`);    
};

// Return true if current player just won the game
let playerWon = () => {
    let i;
    let s = players[currentPlayer].sym.repeat(3);

    for (i = 0; i < winningMoves.length; i++) {
        if (s == getWinningMoveStrings(i)) {
            break;
        }
    }

    if (i < winningMoves.length) {
        let name = players[currentPlayer].name;
        highlightWinningMove(i);
        updateStatus(`${name} wins`); 
        return true;
    }
    
    return false;
};

let gameIsOver = () => {
    if (playerWon()) {
        players[currentPlayer].score++;
        updateScore();
        
        // Start next game
        gameOn = false;
        setTimeout(startNewGame, 3000);
    } else if (isStalemate()) {            
        updateStatus('Stalemate');
        gameOn = false;            
        setTimeout(startNewGame, 3000);
    }

    return !gameOn;
};

// Player has clicked on square to make a move
document.querySelector('#grid').onclick = (event) => {
    let elem = event.target;
    let squareNum = /\bsquare(\d+)\b/.exec(
        elem.getAttribute('class')
    )[1];

    if (gameOn && !isComputersTurn() && grid[squareNum] === '') {
        makeMove(players[currentPlayer].sym, squareNum);
        
        if (!gameIsOver()) {
            nextPlayer();
        }
    }
};

let updateStatus = (status) => {
    let elem = document.querySelector('.prompt .status');
    elem.innerText = status;
};

let updateScore = () => {
    let player1Score = document.querySelector('.player1 .score');
    let player2Score = document.querySelector('.player2 .score');
    
    player1Score.innerText = players[0].score;
    player2Score.innerText = players[1].score;
};

let resetScore = () => {
    players[0].score = 0;
    players[1].score = 0;

    updateScore();
};

// Go back to start of game where we choose number of players
let reset = () => {
    document.getElementById('choose-num-players').style.display = 'block';
    document.getElementById('choose-sym').style.display = 'none';
    document.getElementById('gameboard').style.display = 'none';
};

// Restart game if player clicks reset
document.querySelector('.reset').onclick = (event) => {
    reset();
};

document.body.onload = () => {
    reset();
};

document.getElementById('choose-num-players').onclick = (event) => {
    if (event.target.dataset.choice === '1' ||
        event.target.dataset.choice === '2') {
        
        numPlayers = parseInt(event.target.dataset.choice);

        if (numPlayers === 1) {
            players[1].name = 'Computer';
            let player2 = document.querySelector('.player2 .name');
            player2.innerText = players[1].name;
        } else {
            players[1].name = 'Player 2';
            let player2 = document.querySelector('.player2 .name');
            player2.innerText = players[1].name;
        }
        
        document.getElementById('choose-num-players').style.display = 'none';
        document.getElementById('choose-sym').style.display = 'block';
        document.getElementById('gameboard').style.display = 'none';
    }
};

document.getElementById('choose-sym').onclick = (event) => {
    if (event.target.innerText === 'X' ||
        event.target.innerText === 'O') {

        players[0].sym = event.target.innerText.toLowerCase();
        players[1].sym = players[0].sym === 'x' ? 'o': 'x';
        
        document.getElementById('choose-num-players').style.display = 'none';
        document.getElementById('choose-sym').style.display = 'none';
        document.getElementById('gameboard').style.display = 'block';

        resetScore();
        startNewGame();
    }
};
