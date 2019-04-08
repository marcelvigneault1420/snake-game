const TILE_SIZE_DRAW = TILE_SIZE - 2;
class DrawCanvas {
    constructor(cv, ctx) {
        this.cv = cv;
        this.ctx = ctx;
    }
    drawBackground() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, GRID_SIZE * TILE_SIZE, GRID_SIZE * TILE_SIZE);
    }

    drawApple(a) {
        this.ctx.fillStyle = "#F00";
        this.ctx.fillRect(a.pos.X * TILE_SIZE, a.pos.Y * TILE_SIZE, TILE_SIZE_DRAW, TILE_SIZE_DRAW);
    }

    drawEndGame(ps) {
        this.drawBackground();

        this.ctx.font = (TILE_SIZE * 2) + "px Comic Sans MS";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", this.cv.width / 2, this.cv.height / 4 * 1);

        let text = "";

        if (ps.length == 0) {
            text = "Draw"
        } else if (ps.length == 1) {
            this.ctx.fillStyle = ps[0].color;
            text = ps[0].name + " win";
        } else {
            alert('Error');
            text = "Error"
        }

        this.ctx.fillText(text, this.cv.width / 2, this.cv.height / 2);

        this.ctx.fillStyle = "white";
        this.ctx.font = (TILE_SIZE) + "px Comic Sans MS";
        this.ctx.fillText("Click to restart", this.cv.width / 2, this.cv.height / 4 * 3);
    }

    drawPlayer(p) {
        p.tail.forEach(t => {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(t.X * TILE_SIZE, t.Y * TILE_SIZE, TILE_SIZE_DRAW, TILE_SIZE_DRAW);
        });
    }

    drawPlaying(ps, apple) {
        this.drawBackground();

        this.drawApple(apple);

        //draw
        ps.forEach(p => {
            this.drawPlayer(p);
        });
    }
}
