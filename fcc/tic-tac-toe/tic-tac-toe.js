let players = [ 'x', 'o' ];
let currentPlayer = 0;

let grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let getRowCol = (boxNum) => {
    let rowCol = [ parseInt(boxNum / 3), boxNum % 3 ];
    return rowCol;
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
    }
};
