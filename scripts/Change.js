class Change extends Element {
    constructor(gameArea, namePrefix, imageSource) {
        const randomTime = Math.round(Math.random() * (13000));
        const newChangeId = namePrefix + randomTime;
        const idSelector = '#' + newChangeId;

        const changeElement = document.createElement('img');
        changeElement.src = imageSource;
        changeElement.id = newChangeId;
        changeElement.className = namePrefix;

        gameArea.htmlElementRoot.appendChild(changeElement);

        super(idSelector, 2)

        setTimeout(() => {
            const changeToRemove = document.getElementById(newChangeId);

            if (changeToRemove) {
                gameArea.htmlElementRoot.removeChild(changeToRemove)
            }
        }, randomTime);
    };
};
