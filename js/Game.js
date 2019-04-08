const GameState = {
    MENU: 0,
    PLAYING: 1,
    ENDGAME: 2,
}
const Direction = {
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP: [0, -1],
    DOWN: [0, 1],
}

class Game {
    constructor(canvas) {
        this.currentGameState = GameState.PLAYING;
        this.nbPlayer = 2;
        this.drawController = new DrawCanvas(canvas, canvas.getContext("2d"), GRID_SIZE);
    }

    resetGame() {
        this.currentGameState = GameState.PLAYING;
        this.generatePlayers();
        this.generateApple();
        this.drawController.drawPlaying(this.players, this.apple);
    }

    generatePlayers() {
        this.players = [];

        for (let index = 0; index < this.nbPlayer; index++) {
            this.players.push(new Player("Player " + (index + 1), getRandomColor(), this.randomizePosition()));
        }
    }

    generateApple() {
        this.apple = new GameElement(getRandomColor(), this.randomizePosition());
    }

    randomizePosition() {
        let randpos = undefined;
        do {
            randpos = new Position();
        } while (this.isPositionAlreadyTaken());

        return randpos;
    }

    isPositionAlreadyTaken() {
        this.players.forEach(e => {
            if (e.contains(this.pos)) {
                return true;
            }
        });

        return false;
    }

    playGame() {
        switch (this.currentGameState) {
            case GameState.PLAYING:
                this.playFrame();
                break;
            case GameState.ENDGAME:
                this.endGame();
                break;
            default:
                console.error('The gamestate is undefined');
                break;
        }
    }

    playFrame() {
        this.movePlayers();
        this.doEvents();
        this.checkState();
        this.drawController.drawPlaying(this.players, this.apple);
    }

    movePlayers() {
        this.players.forEach(p => {
            p.moveCharacter();
        });
    }

    doEvents() {
        let tempRegenApple = false;
        let alivePlayers = [];

        this.players.forEach(p => {
            if (p.pos.equals(this.apple.pos)) {
                p.size += 1;
                tempRegenApple = true;
            }

            let tempIsAlive = true;
            this.players.forEach(enemyP => {
                let tempTailSize = 0;

                if (p.name != enemyP.name) {
                    tempTailSize = enemyP.tail.length;
                } else {
                    tempTailSize = enemyP.tail.length - 1;
                }

                for (let index = 0; index < tempTailSize; index++) {
                    if (p.pos.equals(enemyP.tail[index])) {
                        tempIsAlive = false;
                    }
                }
            });

            if (tempIsAlive) {
                alivePlayers.push(p);
            }
        });

        this.players = alivePlayers;

        if (tempRegenApple) {
            this.apple.randomizePosition();
        }
    }

    checkState() {
        if (this.players.length < 2) {
            this.currentGameState = GameState.ENDGAME;
        }
    }

    moveCharacter(keyCode) {
        switch (keyCode) {
            case 37:
                this.players[0].changeCharacterDirection(Direction.LEFT)
                break;
            case 38:
                this.players[0].changeCharacterDirection(Direction.UP)
                break;
            case 39:
                this.players[0].changeCharacterDirection(Direction.RIGHT)
                break;
            case 40:
                this.players[0].changeCharacterDirection(Direction.DOWN)
                break;
            case 65:
                this.players[1].changeCharacterDirection(Direction.LEFT)
                break;
            case 87:
                this.players[1].changeCharacterDirection(Direction.UP)
                break;
            case 68:
                this.players[1].changeCharacterDirection(Direction.RIGHT)
                break;
            case 83:
                this.players[1].changeCharacterDirection(Direction.DOWN)
                break;
        }
    }

    endGame() {
        this.drawController.drawEndGame(this.players);
    }
}