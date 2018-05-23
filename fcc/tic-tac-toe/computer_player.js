import UI from 'UI';
import { grid, findOpenSquare, winningMoves, getWinningMoveStrings } from 'grid';

class ComputerPlayer {
    constructor(sym) {
        this.sym = sym;
    }

    // Examine the board and see if we can get one move closer to winning
    // TODO: https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13/    
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
    }

    // Computer chooses its next move    
    takeTurn() {
        let myBestMove = this.getBestMove(this.sym);
        let theirSym = this.sym === 'x' ? 'o';
        let theirBestMove = this.getBestMove(theirSym);
        let squareNum;
        
        if (theirBestMove.movesLeft === 0 && myBestMove.movesLeft > 0) {
            squareNum = theirBestMove.squareNum;
        } else {
            squareNum = myBestMove.squareNum;
        }

        UI.fillSquare(squareNum, this.sym);
        grid[squareNum] = this.sym;
    }
}

export default ComputerPlayer;
