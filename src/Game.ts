class Game {

    /**
     * @internal Holds the canvas HTML element where this game should draw on. 
     * This variable knows the screen's size.
     * 
     * @see [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
     */
    private readonly canvas: HTMLCanvasElement;
    
    
    /**
     * @internal attribute that holds the RenderContext to draw on. This will
     * be used in the `draw()` method.
     * 
     * @see [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
     */
    private readonly ctx: CanvasRenderingContext2D;

    // The game screen components
    private title: TextString;
    private word: TextString;

    // The hangman parts
    //horizontalPole, verticalString, 
    //head, left arm, right arm, left leg, right leg
    
    private base: Rectangle;
    private verticalPole: Line;
    private horizontalPole: Line;
    private verticalString: Line;
    private head: Ellipse;
    private body: Line;
    private leftArm: Line;
    private rightArm: Line;
    private leftLeg: Line;
    private rightLeg: Line;
    // TODO declare the other parts of the hangman

    /**
     * Construct a new Game.
     * 
     * @param {HTMLCanvasElement} canvasId 
     */
    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        // Initialize the game items
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, "_ _ _ _ _ _ _ _");

        // The base of the hangman
        this.base = new Rectangle(cx - 300, cy * 1.75, 600, 50);
        this.base.fillStyle = "brown";
        // The vertical pole
        this.verticalPole = new Line(1100, cy * 1.75, 1100, cy * 1);
        this.horizontalPole = new Line(800, cy * 1, 1100, cy * 1);
        this.verticalString = new Line(850, cy * 1, 850, cy * 1.2);
        this.head = new Ellipse(850, cy * 1.2, 70, cy * 1.2);
        this.body = new Line(850, cy * 1.2, 850, cy * 1.5);
        this.leftLeg = new Line(850, cy * 1.5, 900, cy * 1.7);
        this.rightLeg = new Line(850, cy * 1.5, 800, cy * 1.7);
        this.leftArm = new Line(850, cy * 1.3, 900, cy * 1.4);
        this.rightArm = new Line(850, cy * 1.3, 800, cy * 1.4);
        // Draw the canvasbase, verticalPole, horizontalPole, verticalString, head, left arm, right arm, left leg, right leg
        this.drawCanvas();

        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);
    }


    /**
     * (Re)draws the canvas.
     */
    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        // Draw the hangman
        this.base.drawRectangle(this.ctx);
        this.verticalPole.drawLine(this.ctx);
        this.horizontalPole.drawLine(this.ctx);
        this.verticalString.drawLine(this.ctx);
        this.head.drawCircle(this.ctx);
        this.body.drawLine(this.ctx);
        this.leftLeg.drawLine(this.ctx);
        this.rightLeg.drawLine(this.ctx);
        this.leftArm.drawLine(this.ctx);
        this.rightArm.drawLine(this.ctx);
        // TODO draw the other parts of the hangman
    }

    /**
     * @internal Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyPress = (ev: KeyboardEvent) => {
        // TODO handle key pressed events
        console.log(`Key ${ev.key} has been pressed`);
    }


}

// DO NOT CHANGE THE CODE BELOW!

// Declare the game object as global variable for debugging purposes
let game = null;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', function () {
    game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
});
