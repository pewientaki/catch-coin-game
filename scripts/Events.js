class Events {
    constructor(elements, level, moveEvent) {
        this.obstaclesCreatingThreads = [];
        this.livesCreatingThreads = [];
        this.extraCreatingThreads = [];
        this.elements = elements;
        this.playerLevel = level;
        this.moveEvent = moveEvent;
    }

    // add a random extra element to game area & set interval
    createExtraCreator() {
        this.extraCreatingThreads.push(setInterval(() => {
            const extraObject = new Extra(this.elements.board)
            HtmlEvents.moveTarget(this.elements.board, extraObject)
            return extraObject;

        }, (6000 / this.playerLevel)))
    }
}