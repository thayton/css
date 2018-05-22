import ComputerPlayer from './computer_player';

export class Game {
    constructor(ui, numPlayers, player1Sym, player2Sym) {
        this.ui = ui;
        this.grid = [
            '', '', '', // 0 1 2
            '', '', '', // 3 4 5
            '', '', ''  // 6 7 8
        ];

        this.players = [
            {
                sym: player1Sym,
                score: 0,
                name: 'Player 1'
            },
            {
                sym: player2Sym,
                score: 0,
                name: numPlayers === 1 ? 'Computer': 'Player 2';
            }
        ];

        this.currentPlayer = 0;        
        this.numPlayers = numPlayers;

        if (numPlayers === 1) {
            this.computerPlayer = new ComputerPlayer(player2Sym, grid, ui);
            this.computersTurnTimer = null;            
        }

        this.gameOn = false;
    }

    startNewGame() {
        this.currentPlayer = 0;    
        this.computersTurnTimer = null; // clear any old timers?
        this.gameOn = true;

        for (let i = 0; i < 9; i++) {
            this.ui.clearSquare(i);
            this.grid[i] = '';
        }

        let name = this.players[this.currentPlayer].name;
        this.updateStatus(`${name}'s Turn`);    
    }

    isComputersTurn() {
        return this.numPlayers === 1 &&
            this.currentPlayer === 1; // Computer is always Player 2
    }

    nextPlayer() {
        this.currentPlayer ^= 1;
    
        if (this.numPlayers === 1) {
            if (this.isComputersTurn()) {
                this.computersTurnTimer = setTimeout(() => {
                    this.computerPlayer.takeTurn(); // XXX this bound to Game!
                }, 1500);
            } else {
                this.computersTurnTimer = null;
            }
        }

        // XXX UI.status
        let name = this.players[currentPlayer].name;
        updateStatus(`${name}'s Turn`);    
    }

    // Return true if current player just won the game
    currentPlayerWon() {
        let i;
        let s = this.players[this.currentPlayer].sym.repeat(3);

        for (i = 0; i < winningMoves.length; i++) {
            if (s == getWinningMoveStrings(i)) {
                break;
            }
        }

        if (i < winningMoves.length) {
            let name = this.players[this.currentPlayer].name;
            highlightWinningMove(i);
            updateStatus(`${name} wins`); 
            return true;
        }
    
        return false;
    }

    isStalemate() {
        return findOpenSquare() === -1;
    }

    gameIsOver() {
        if (this.currentPlayerWon()) {
            this.players[this.currentPlayer].score++;
            this.updateScore();
        
            // Start next game
            this.gameOn = false;
            setTimeout(() => {
                this.startNewGame(); // XXX this bound to Game
            }, 3000);
        } else if (this.isStalemate()) {            
            this.updateStatus('Stalemate');
            this.gameOn = false;            
            setTimeout(() => {
                this.startNewGame(); // XXX this bound to Game
            }, 3000);
        }

        return !this.gameOn;
    }

    updateStatus(status) {
        this.ui.status.innerText = status;
    }

    updateScore() {
        this.ui.player1Score.innerText = this.players[0].score;
        this.ui.player2Score.innerText = this.players[1].score;
    }

    resetScore() {
        this.players[0].score = 0;
        this.players[1].score = 0;

        this.updateScore();
    },

    playerMove() {
        this.ui.grid.onclick = (event) => {
            let elem = event.target;
            let squareNum = /\bsquare(\d+)\b/.exec(
                elem.getAttribute('class')
            )[1];

            if (this.gameOn && !this.isComputersTurn() && this.grid[squareNum] === '') {
                let sym = this.players[this.currentPlayer].sym;

                this.ui.fillSquare(squareNum, sym);
                grid[squareNum] = sym;

                if (!this.gameIsOver()) {
                    this.nextPlayer();
                }
            }
        }
    }
}

