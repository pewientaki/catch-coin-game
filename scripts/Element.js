class Element {
    constructor(elementSelector, margin = 2) {
        let htmlElement = document.querySelector(elementSelector);

        this.htmlElement = htmlElement;
        this.margin = margin;
        this.height = htmlElement.clientHeight;
        this.width = htmlElement.clientWidth;
    };

    get rightLimit() {
        return this.width; //+this.left
    };
    
    get leftLimit() {
        return this.left;
    };

    get topLimit() {
        return this.top;
    };

    get bottomLimit() {
        return this.top + this.height;
    };

    get top() {
        return getPosition(this.htmlElement.style.top);
    };

    get left() {
        return getPosition(this.htmlElement.style.left);
    };

    getPosition(pos) {
        if (!pos) return 100;
        return parseInt(pos.slice(0, -2));
    };
};