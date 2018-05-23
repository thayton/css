import UI from 'UI';
import ComputerPlayer from 'computer_player';
import { grid, findOpenSquare, winningMoves, getWinningMoveStrings } from 'grid';

class Game {
    constructor() {
        this.players = [
            {
                name: 'Player 1',
                score: 0, 
                sym: null
            },
            {
                name: 'Player 2',
                sym: null,
                score: 0
            }
        ];

        this.gameOn = false;
    }

    chooseNumPlayers() {
        UI.chooseNumPlayers.onclick = (event) => {
            if (event.target.dataset.choice === '1' ||
                event.target.dataset.choice === '2') {
        
                this.numPlayers = parseInt(event.target.dataset.choice);

                if (this.numPlayers === 1) {
                    UI.player2Name.innerText = players[1].name = 'Computer';
                } else {
                    UI.player2Name.innerText = players[1].name = 'Player 2';
                }
        
                UI.chooseNumPlayers.style.display = 'none';
                UI.chooseSym.style.display = 'block';
                UI.gameboard.style.display = 'none';
            }
        }
    }

    chooseSymbol() {
        UI.chooseSym.onclick = (event) => {
            if (event.target.innerText === 'X' ||
                event.target.innerText === 'O') {

                this.players[0].sym = event.target.innerText.toLowerCase();
                this.players[1].sym = players[0].sym === 'x' ? 'o': 'x';

                if (this.numPlayers === 1) {
                    this.computerPlayer = new ComputerPlayer(this.players[1].sym);
                    this.computersTurnTimer = null;            
                }
                
                UI.chooseNumPlayers.style.display = 'none';
                UI.chooseSym.style.display = 'none';
                UI.gameboard.style.display = 'block';

                this.startNewGame();
            }
        };
    }
    
    startNewGame() {
        this.currentPlayer = this.players[0];
        this.computersTurnTimer = null; // clear any old timers?

        for (let i = 0; i < grid.length; i++) {
            UI.clearSquare(i);
            grid[i] = '';
        }

        this.resetScore();        
        this.gameOn = true;
        this.displayStatus(this.currentPlayer.name + '\'s Turn');
    }

    registerPlayersMoveHandler() {
        UI.grid.onclick = (event) => {
            let elem = event.target;
            let squareNum = /\bsquare(\d+)\b/.exec(
                elem.getAttribute('class')
            )[1];

            if (this.gameOn && !this.isComputersTurn() && grid[squareNum] === '') {
                let sym = this.currentPlayer.sym;

                UI.fillSquare(squareNum, sym);
                grid[squareNum] = sym;

                if (!this.gameIsOver()) {
                    this.nextPlayer();
                }
            }
        }
    }
    
    isComputersTurn() {
        return this.numPlayers === 1 &&
            this.currentPlayer === this.players[1]; // Computer is always Player 2
    }

    computersTurn() {
        this.computerPlayer.takeTurn(); 
        if (this.gameIsOver() === false) {
            this.nextPlayer();
        }        
    }

    nextPlayer() {
        this.currentPlayer = this.currentPlayer === this.players[0]
            ? this.players[1]
            : this.players[0];
    
        if (this.numPlayers === 1) {
            this.computersTurnTimer = this.isComputersTurn() ? setTimeout(() => {
                this.computersTurn(); // XXX this bound to Game!
            }, 1500) : null;
        }

        this.displayStatus(this.currentPlayer.name + '\'s Turn');
    }

    // Return true if current player just won the game
    currentPlayerWon() {
        let winStr = this.currentPlayer.sym.repeat(3);

        for (let i = 0; i < winningMoves.length; i++) {
            if (winStr == getWinningMoveStrings(i)) {
                break;
            }
        }

        if (i < winningMoves.length) {
            highlightWinningMove(i);
            return true;
        }
    
        return false;
    }
    
    isStalemate() {
        return findOpenSquare() === -1;
    }

    gameIsOver() {
        if (this.currentPlayerWon()) {
            this.displayStatus(this.currentPlayer.name ' wins');
            this.currentPlayer.score++;
            this.displayScore();
            this.gameOn = false;
            
            setTimeout(() => {
                this.startNewGame(); // XXX this bound to Game
            }, 3000);
        } else if (this.isStalemate()) {            
            this.displayStatus('Stalemate');
            this.gameOn = false;
            
            setTimeout(() => {
                this.startNewGame(); // XXX this bound to Game
            }, 3000);
        }

        return !this.gameOn;
    }

    displayStatus(status) {
        UI.status.innerText = status;
    }

    displayScore() {
        UI.player1Score.innerText = this.players[0].score;
        UI.player2Score.innerText = this.players[1].score;
    }

    resetScore() {
        this.players[0].score = 0;
        this.players[1].score = 0;

        this.displayScore();
    }
}

export default Game;
