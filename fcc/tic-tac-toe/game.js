import ComputerPlayer from './computer_players';
import { grid, findOpenSquare, winningMoves, getWinningMoveStrings } from './common';

export class Game {
    constructor(ui) {
        this.ui = ui;
        this.players = [
            {
                sym: null,
                score: 0,
                name: 'Player 1'
            },
            {
                sym: null,
                score: 0,
                name: 'Player 2'
            }
        ];

        this.gameOn = false;
    }

    chooseNumPlayers() {
        this.ui.chooseNumPlayers.onclick = (event) => {
            if (event.target.dataset.choice === '1' ||
                event.target.dataset.choice === '2') {
        
                this.numPlayers = parseInt(event.target.dataset.choice);

                if (this.numPlayers === 1) {
                    this.ui.player2Name.innerText = players[1].name = 'Computer';
                } else {
                    this.ui.player2Name.innerText = players[1].name = 'Player 2';
                }
        
                this.ui.chooseNumPlayers.style.display = 'none';
                this.ui.chooseSym.style.display = 'block';
                this.ui.gameboard.style.display = 'none';
            }
        }
    }

    chooseSymbol() {
        this.ui.chooseSym.onclick = (event) => {
            if (event.target.innerText === 'X' ||
                event.target.innerText === 'O') {

                this.players[0].sym = event.target.innerText.toLowerCase();
                this.players[1].sym = players[0].sym === 'x' ? 'o': 'x';

                if (this.numPlayers === 1) {
                    this.computerPlayer = new ComputerPlayer(this.players[1].sym, this.grid, this.ui);
                    this.computersTurnTimer = null;            
                }
                
                this.ui.chooseNumPlayers.style.display = 'none';
                this.ui.chooseSym.style.display = 'none';
                this.ui.gameboard.style.display = 'block';

                this.startNewGame();
            }
        };
    }
    
    startNewGame() {
        this.currentPlayer = 0;    
        this.computersTurnTimer = null; // clear any old timers?

        for (let i = 0; i < this.grid.length; i++) {
            this.ui.clearSquare(i);
            this.grid[i] = '';
        }

        this.resetScore();        
        this.gameOn = true;
        this.displayStatus(this.players[this.currentPlayer].name + '\'s Turn');
    }

    registerPlayersMoveHandler() {
        this.ui.grid.onclick = (event) => {
            let elem = event.target;
            let squareNum = /\bsquare(\d+)\b/.exec(
                elem.getAttribute('class')
            )[1];

            if (this.gameOn && !this.isComputersTurn() && this.grid[squareNum] === '') {
                let sym = this.players[this.currentPlayer].sym;

                this.ui.fillSquare(squareNum, sym);
                this.grid[squareNum] = sym;

                if (!this.gameIsOver()) {
                    this.nextPlayer();
                }
            }
        }
    }
    
    isComputersTurn() {
        return this.numPlayers === 1 &&
            this.currentPlayer === 1; // Computer is always Player 2
    }

    computersTurn() {
        this.computerPlayer.takeTurn(); 
        if (this.gameIsOver() === false) {
            this.nextPlayer();
        }        
    }

    nextPlayer() {
        this.currentPlayer ^= 1;
    
        if (this.numPlayers === 1) {
            this.computersTurnTimer = this.isComputersTurn() ? setTimeout(() => {
                this.computersTurn(); // XXX this bound to Game!
            }, 1500) : null;
        }

        this.displayStatus(this.players[currentPlayer].name + '\'s Turn');
    }

    // Return true if current player just won the game
    currentPlayerWon() {
        let winStr = this.players[this.currentPlayer].sym.repeat(3);

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
        return this.findOpenSquare() === -1;
    }

    gameIsOver() {
        if (this.currentPlayerWon()) {
            this.displayStatus(this.players[this.currentPlayer].name ' wins');
            this.players[this.currentPlayer].score++;
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
        this.ui.status.innerText = status;
    }

    displayScore() {
        this.ui.player1Score.innerText = this.players[0].score;
        this.ui.player2Score.innerText = this.players[1].score;
    }

    resetScore() {
        this.players[0].score = 0;
        this.players[1].score = 0;

        this.displayScore();
    }
}

