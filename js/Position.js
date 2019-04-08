class Position {
    constructor(posX, posY) {
        if (posX == undefined) {
            posX = Math.floor(Math.random() * GRID_SIZE);
        }
        if (posY == undefined) {
            posY = Math.floor(Math.random() * GRID_SIZE);
        }
        this.X = posX;
        this.Y = posY;
    }

    equals(pos) {
        return this.X == pos.X && this.Y == pos.Y
    }
}