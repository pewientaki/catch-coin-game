class HtmlEvents {

    // move object at random location within game area 
    static moveTarget = (container, whatToMove) => {
        const x = container.leftBorder + Math.floor(Math.random() * (container.width - whatToMove.width));
        const y = container.topBorder + Math.floor(Math.random() * (container.height + whatToMove.height));

        whatToMove.htmlElementRoot.style.top = `${y}px`;
        whatToMove.htmlElementRoot.style.left = `${x}px`;
    }
}