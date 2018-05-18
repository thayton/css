const CHOOSE_NUM_PLAYERS = 0;
const CHOOSE_SYM         = 1;
const GAME_ON            = 2;

let state = CHOOSE_NUM_PLAYERS;

let players = [ 'x', 'o' ];
let currentPlayer = 0;
let computersTurn = false;
let computersTurnTimer = null;
let gameOn = true;
let numPlayers = 1;

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

let init = () => {
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


let gameIsOver = () => {
    if (playerWon()) {
        // Record score
        // Start next game
        gameOn = false;
        setTimeout(init, 3000);
    } else if (isStalemate()) {            
        console.log('Stalemate. Want to play again?');
        gameOn = false;            
        setTimeout(init, 3000);
    }

    return !gameOn;
};

let nextPlayer = () => {
    if (numPlayers === 1) {
        if (computersTurn) {
            computersTurn = false;
            computersTurnTimer = null;
        } else {
            computersTurn = true;
            computersTurnTimer = setTimeout(takeTurn, 1000);
        }
    }
    
    currentPlayer ^= 1;
};

// Computer chooses next move
let takeTurn = () => {
    let mySym = players[currentPlayer];
    let myBestMove = getBestMove(mySym);
    let theirSym = players[currentPlayer ^ 1];
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

let playerWon = () => {
    let i;
    let s = players[currentPlayer].repeat(3);

    for (i = 0; i < winningMoves.length; i++) {
        if (s == getWinningMoveStrings(i)) {
            break;
        }
    }

    if (i < winningMoves.length) {
        highlightWinningMove(i);
        return true;
    }
    
    return false;
};

document.querySelector('#grid').onclick = (event) => {
    let elem = event.target;
    let squareNum = /\bsquare(\d+)\b/.exec(
        elem.getAttribute('class')
    )[1];

    if (gameOn && !computersTurn && grid[squareNum] === '') {
        makeMove(players[currentPlayer], squareNum);
        
        if (!gameIsOver()) {
            nextPlayer();
        }
    }
};

