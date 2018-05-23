export const winningMoves = [
    [ 0, 1, 2 ],
    [ 0, 3, 6 ],
    [ 0, 4, 8 ],
    [ 1, 4, 7 ],
    [ 2, 4, 6 ],    
    [ 2, 5, 8 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ]
];

export const getWinningMoveStrings = (i) => {
    return winningMoves[i].map(
        squareNum => grid[squareNum]
    ).join('');
};
