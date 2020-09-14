class HtmlEventsNew {
    constructor(collisionDetector) {
        this.collisionDetector = collisionDetector;
    }
    // move object at random location within game area 
    moveTarget = (whatToMove) => {
        while (true) {
            const x = Math.floor(Math.random() * (this.collisionDetector.elements.board.width - whatToMove.width));
            const y = Math.floor(Math.random() * (this.collisionDetector.elements.board.height - 50));

            if (!this.collisionDetector.isPotentiallyTouchingAnything(x, y, whatToMove.width, whatToMove.height)) {

                whatToMove.htmlElementRoot.style.top = `${y}px`;
                whatToMove.htmlElementRoot.style.left = `${x}px`;

                return;
            }
        }
    }

}