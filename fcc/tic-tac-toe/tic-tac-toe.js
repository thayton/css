let players = [ 'x', 'o' ];
let currentPlayer = 0;
let computersTurn = 1;

let grid = [
    ['', '', ''], // 0 1 2
    ['', '', ''], // 3 4 5
    ['', '', '']  // 6 7 8
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

let getRowCol = (boxNum) => {
    let rowCol = [ parseInt(boxNum / 3), boxNum % 3 ];
    return rowCol;
};

let getValAtBoxNum = (boxNum) => {
    let [ row, col ] = getRowCol(boxNum);
    return grid[row][col];
};

let getWinningMoveStrings = (i) => {
    return winningMoves[i].map(
        boxNum => getValAtBoxNum(boxNum)
    ).join('');
};

let highlightWinningMove = (winningMove) => {
    winningMoves[winningMove].forEach((i) => {
        let e = document.querySelector(`.box${i}`);
        e.style.background = 'orange';
    });
};

let playerWon = (boxNum) => {
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

document.querySelector('.wrapper').onclick = (event) => {
    let elem = event.target;
    let boxNum = /\bbox(\d+)\b/.exec(
        elem.getAttribute('class')
    )[1];

    let [row, col] = getRowCol(boxNum);

    if (grid[row][col] === '') {
        grid[row][col] = players[currentPlayer];
        elem.classList.add(
            players[currentPlayer]
        );

        // Check if boxes are all full - no next move
        if (playerWon(boxNum)) {
            // Highlight the winning boxes
            // Record score
            // Start next game
        } else {
            currentPlayer ^= 1;
        }
    }
};
