class GameArea extends Element {
    constructor(elementSelector) {
        super(elementSelector, 10)
    }

    get rightBorder() {
        return this.rightLimit + this.margin;
    }
    get leftBorder() {
        return this.leftLimit + this.margin;
    }
    get topBorder() {
        return this.topLimit + this.margin;
    }
    get bottomBorder() {
        return this.bottomLimit + this.margin;
    }

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
    }
}



