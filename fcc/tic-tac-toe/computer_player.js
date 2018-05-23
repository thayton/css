// TODO: https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13/
import { grid, findOpenSquare, winningMoves, getWinningMoveStrings } from './common';

export class ComputerPlayer {
    constructor(sym, grid, ui) {
        this.sym = sym;
        this.grid = grid;
        this.ui = ui;
    }

    // Examine the board and see if we can get one move closer to winning
    getBestMove(sym) {
        let length = 0;
        let regexp = new RegExp(sym, 'g');
        let bestMove = {
            squareNum: -1,
            movesLeft: 2 // moves left after this to win
        };

        // ''    empty and all three available
        // 'x'   two available
        // 'x o' one empty but o blocks winning string for x
        // 'xx ' most preferable since one more move for 'x' and we win
        for (let i = 0; i < winningMoves.length; i++) {
            let s = getWinningMoveStrings(i);
        
            if (s.length === (s.match(regexp) || []).length) {
                if (s.length > length) {
                    length = s.length;

                    bestMove.movesLeft = 2 - s.length;                
                    bestMove.squareNum = winningMoves[i][
                        winningMoves[i].findIndex(j => this.grid[j] === '')
                    ];
                }
            }
        }

        if (bestMove.squareNum === -1) {
            bestMove.squareNum = findOpenSquare();
            bestMove.movesLeft = 2;
        }

        return bestMove;
    }

    // Computer chooses its next move    
    takeTurn() {
        let myBestMove = this.getBestMove(this.sym);
        let theirSym = this.sym === 'x' ? 'o';
        let theirBestMove = this.getBestMove(theirSym);

        if (theirBestMove.movesLeft === 0 && myBestMove.movesLeft > 0) {
            fillSquare(mySym, theirBestMove.squareNum);
        } else {
            fillSquare(mySym, myBestMove.squareNum);
        }
    }
}
