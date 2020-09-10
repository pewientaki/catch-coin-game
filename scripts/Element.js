class Element {
    constructor(elementSelector, margin = 2) {
        this.htmlElementSelector = elementSelector;
        this.margin = margin;
    };

    get htmlElementRoot() {
        return document.querySelector(this.htmlElementSelector);
    };

    get rightLimit() {
        return this.left + this.htmlElementRoot.clientWidth - this.margin;
    };

    get width() {
        return this.htmlElementRoot.clientWidth;
    };

    get height() {
        return this.htmlElementRoot.clientHeight;
    };

    get leftLimit() {
        return this.left - this.margin;
    };

    get topLimit() {
        return this.top;
    };

    get bottomLimit() {
        return this.top + this.htmlElementRoot.clientHeight - this.margin;
    };

    get top() {
        return this.getPosition(this.htmlElementRoot.style.top);
    };

    get left() {
        return this.getPosition(this.htmlElementRoot.style.left);
    };

    getPosition(pos) {
        if (!pos) return 0;
        return parseInt(pos.slice(0, -2));
    };
};