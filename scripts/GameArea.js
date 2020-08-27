class GameArea extends Element {
    constructor(elementSelector) {
        super(elementSelector, 10)
        this.lives = 5;
        this.score = 0;
        this.gameOver = true;
        this.winningScore = 5;
        this.level = 1;
        this.avatar = {};
        this.target = {};
    };
    get rightBorder() {
        return this.rightLimit + this.margin;
    };
    get leftBorder() {
        return this.leftLimit + this.margin;
    };
    get topBorder() {
        return this.topLimit + this.margin;
    };
    get bottomBorder() {
        return this.bottomLimit + this.margin;
    };

    // create avatar and target elements
    addElementsToGameArea() {
        this.avatar = Avatar.addNewAvatarToGame(this);
        this.target = Target.addNewTargetToGame(this);
    };

    // remove all elements from game area
    removeAllElementsFromGame() {
        try {
            document.querySelectorAll('.obstacle').forEach(obstacle => this.htmlElement.removeChild(obstacle));
            document.querySelectorAll('.life').forEach(life => this.htmlElement.removeChild(life));
            this.htmlElement.removeChild(this.avatar.htmlElement);
            this.htmlElement.removeChild(this.target.htmlElement);
        } catch (error) {
            console.log(error);
        }
    };

    // move object at random location within game area 
    moveTarget = (whatToMove) => {
        const x = this.leftBorder + Math.floor(Math.random() * (this.htmlElement.clientWidth - whatToMove.clientWidth));
        const y = this.topBorder + Math.floor(Math.random() * (this.htmlElement.clientHeight - whatToMove.clientHeight));

        whatToMove.style.top = `${y}px`;
        whatToMove.style.left = `${x}px`;
    };

    // colission detector
    isTouching(a, b) {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return !(
            aRect.top + aRect.height < bRect.top ||
            aRect.top > bRect.top + bRect.height ||
            aRect.left + aRect.width < bRect.left ||
            aRect.left > bRect.left + bRect.width
        );
    };
};


