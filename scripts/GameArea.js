class GameArea extends Element {
    constructor(elementSelector) {
        super(elementSelector, 10)
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
};


