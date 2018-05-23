export const grid = [
    '', '', '', // 0 1 2
    '', '', '', // 3 4 5
    '', '', ''  // 6 7 8
];

// Find and return the index of any open square in the grid
// where we can make a move. -1 indidates the grid is full!
export const findOpenSquare = () => {
    return grid.findIndex(e => e === '');
}
