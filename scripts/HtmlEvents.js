class HtmlEvents {

    // move object at random location within game area 
    static moveTarget = (container, whatToMove) => {
        const x = Math.floor(Math.random() * (container.width - whatToMove.width));
        const y = Math.floor(Math.random() * (container.height - 50));

        whatToMove.htmlElementRoot.style.top = `${y}px`;
        whatToMove.htmlElementRoot.style.left = `${x}px`;
    }
}