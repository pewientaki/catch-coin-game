class Target extends Element {
    constructor(height, width, xLocation, yLocation) {
        super(height, width, xLocation, yLocation)
    };

    get rightLimit() {
        return xLocation + width;
    };
    get leftLimit() {
        return xLocation;
    };
    get topLimit() {
        return yLocation;
    };
    get bottomLimit() {
        return yLocation + height;
    };
};