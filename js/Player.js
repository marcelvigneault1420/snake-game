class Player extends GameElement {
    constructor(name, color, pos) {
        super(color, pos);
        this.name = name;
        this.tail = [];
        this.tail.push(new Position(this.pos.X, this.pos.Y));
        this.size = 5;
        this.directionCache = [];
        this.currentDirection = Direction.RIGHT;
    }

    changeCharacterDirection(dir) {
        this.directionCache.push(dir);
    }

    changeCacheDirection() {
        let continueMove = false;

        do {
            if (this.directionCache.length > 0) {
                continueMove = true;

                let tempNextDir = this.directionCache.shift();

                if (tempNextDir == Direction.LEFT || tempNextDir == Direction.RIGHT) {
                    if (this.currentDirection != Direction.LEFT && this.currentDirection != Direction.RIGHT) {
                        this.currentDirection = tempNextDir;
                        continueMove = false;
                    }
                } else if (tempNextDir == Direction.UP || tempNextDir == Direction.DOWN) {
                    if (this.currentDirection != Direction.UP && this.currentDirection != Direction.DOWN) {
                        this.currentDirection = tempNextDir;
                        continueMove = false;
                    }
                }
            } else {
                continueMove = false;
            }
        } while (continueMove);
    }

    moveCharacter() {
        this.changeCacheDirection();

        this.pos.X += this.currentDirection[0];
        this.pos.Y += this.currentDirection[1];

        if (this.pos.X < 0) {
            this.pos.X = GRID_SIZE - 1;
        } else if (this.pos.Y < 0) {
            this.pos.Y = GRID_SIZE - 1;
        } else if (this.pos.X >= GRID_SIZE) {
            this.pos.X = 0;
        } else if (this.pos.Y >= GRID_SIZE) {
            this.pos.Y = 0;
        }

        this.tail.push(new Position(this.pos.X, this.pos.Y));

        if (this.tail.length > this.size) {
            this.tail.shift();
        }
    }

    contains(pos) {
        this.tail.forEach(p => {
            if (p.equals(this.pos)) {
                return true;
            }
        });

        return false;
    }
}