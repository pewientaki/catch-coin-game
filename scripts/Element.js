class Element {
    constructor(elementSelector, margin = 2) {
        this.htmlElementSelector = elementSelector;
        this.margin = margin;
    };

    get htmlElement() {
        return document.querySelector(this.htmlElementSelector);
    };

    get rightLimit() {
        return this.left + this.htmlElement.clientWidth;
    };

    get leftLimit() {
        return this.left;
    };

    get topLimit() {
        return this.top;
    };

    get bottomLimit() {
        return this.top + this.htmlElement.clientHeight;
    };

    get top() {
        return this.getPosition(this.htmlElement.style.top);
    };

    get left() {
        return this.getPosition(this.htmlElement.style.left);
    };

    getPosition(pos) {
        if (!pos) return 0;
        return parseInt(pos.slice(0, -2));
    };
};