class Ellipse {
    constructor(x, y, radiusX, radiusY) {
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.clockwise = false;
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = (radiusY ? radiusY : radiusX);
    }
    drawCircle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radiusX, this.startAngle, this.endAngle);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class Game {
    constructor(canvasId) {
        this.guessedLetter = [];
        this.attempts = 6;
        this.keyPress = (ev) => {
            console.log(`Key ${ev.key} has been pressed`);
            const lettersInWord = this.chosenWord.split("");
            console.log(lettersInWord);
            const test = [];
            lettersInWord.forEach((element, index) => {
                if (element === ev.key) {
                    console.log('match');
                    const temp = [];
                    temp.push(index);
                    temp.push(element);
                    test.push(temp);
                }
                console.log(this.chosenWord);
            });
            if (test.length > 0) {
                test.forEach((element) => {
                    const index = parseInt(element[0]);
                    const letter = element[1];
                    this.guessedLetter[index] = letter;
                });
            }
            else {
                this.attempts--;
                console.log(this.attempts);
            }
            console.log(this.guessedLetter);
            this.word.text = this.guessedLetter.join(' ');
            this.drawCanvas();
        };
        this.words = ['cakes',
            'annoy',
            'nutty',
            'worry',
            'absurd',
            'frightened',
            'robin',
            'protect',
            'eight',
            'office',
            'collar',
            'pink'];
        this.chosenWord = this.randomWord();
        const dashes = this.chosenWord.split("").map(e => "_").join(" ");
        this.guessedLetter = dashes.split("").filter(e => e !== " ");
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, "_ _ _ _ _ _ _ _");
        this.base = new Rectangle(cx - 300, cy * 1.75, 600, 50);
        this.base.fillStyle = "brown";
        this.verticalPole = new Line(1100, cy * 1.75, 1100, cy * 1);
        this.horizontalPole = new Line(800, cy * 1, 1100, cy * 1);
        this.verticalString = new Line(850, cy * 1, 850, cy * 1.2);
        this.head = new Ellipse(850, cy * 1.2, 70, cy * 1.2);
        this.body = new Line(850, cy * 1.2, 850, cy * 1.5);
        this.leftLeg = new Line(850, cy * 1.5, 900, cy * 1.7);
        this.rightLeg = new Line(850, cy * 1.5, 800, cy * 1.7);
        this.leftArm = new Line(850, cy * 1.3, 900, cy * 1.4);
        this.rightArm = new Line(850, cy * 1.3, 800, cy * 1.4);
        this.drawCanvas();
        window.addEventListener("keypress", this.keyPress);
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        this.base.drawRectangle(this.ctx);
        this.verticalPole.drawLine(this.ctx);
        this.horizontalPole.drawLine(this.ctx);
        this.verticalString.drawLine(this.ctx);
        if (this.attempts <= 5) {
            this.head.drawCircle(this.ctx);
        }
        if (this.attempts <= 4) {
            this.body.drawLine(this.ctx);
        }
        if (this.attempts <= 3) {
            this.leftLeg.drawLine(this.ctx);
        }
        if (this.attempts <= 2) {
            this.rightLeg.drawLine(this.ctx);
        }
        if (this.attempts <= 1) {
            this.leftArm.drawLine(this.ctx);
        }
        if (this.attempts <= 0) {
            this.rightArm.drawLine(this.ctx);
        }
        if (this.attempts <= -1) {
            prompt('game over');
            location.reload();
        }
    }
    randomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        const randomWord = this.words[randomIndex];
        return randomWord;
    }
}
let game = null;
window.addEventListener('load', function () {
    game = new Game(document.getElementById('canvas'));
});
class Line {
    constructor(x1, y1, x2, y2) {
        this.lineWidth = 4;
        this.strokeStyle = "white";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    drawLine(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class TextString {
    constructor(x, y, text) {
        this.font = "Edmunds";
        this.fontSize = 60;
        this.fillStyle = "white";
        this.textAlign = "center";
        this.textBaseline = "alphabetic";
        this.x = x;
        this.y = y;
        this.text = text;
    }
    drawText(ctx) {
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}
//# sourceMappingURL=app.js.map