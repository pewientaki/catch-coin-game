class Change extends Element {
    constructor(gameArea, namePrefix, imageSource) {
        const randomTime = Math.random() * (13000);
        const newLivesId = namePrefix + randomTime;
        const idSelector = '#' + newLivesId;

        const changeElement = document.createElement('img');
        changeElement.src = imageSource;
        changeElement.id = newLivesId;
        changeElement.className = namePrefix;

        gameArea.htmlElement.appendChild(changeElement);

        super(idSelector, 2)

        gameArea.moveTarget(changeElement);

        setTimeout(() => {
            const changeToRemove = document.getElementById(newLivesId);

            if (changeToRemove) {
                gameArea.htmlElement.removeChild(changeToRemove)
            }
        }, randomTime);
    };

    // static addNewObstacleToGame(gameArea) {
    //     const changeElement = Change.getNewChangeElement();
    //     gameArea.htmlElement.appendChild(changeElement);
    //     gameArea.moveTarget(changeElement);
    //     const change = new Obstacle(changeElement);

    //     setTimeout(() => {
    //         const htmlElement = document.getElementById(change.htmlElement.id);

    //         if (htmlElement) {
    //             gameArea.removeChild(htmlElement)
    //         }
    //     }, this.randomTime);

    //     return change;
    // }
    // static addNewLifeToGame(gameArea) {
    //     const changeElement = Change.getNewChangeElement();
    //     gameArea.htmlElement.appendChild(changeElement);
    //     gameArea.moveTarget(changeElement);
    //     const change = new Life(changeElement);

    //     setTimeout(() => {
    //         const htmlElement = document.getElementById(change.htmlElement.id);

    //         if (htmlElement) {
    //             gameArea.htmlElement.removeChild(htmlElement)
    //         }
    //     }, this.randomTime);

    //     return change;
    // }
};
