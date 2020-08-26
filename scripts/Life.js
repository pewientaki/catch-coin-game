class Life extends Change {
    constructor(gameArea) {
        super(gameArea, 'life', 'https://66.media.tumblr.com/81200ff00a011fa6738675ea289b22b0/tumblr_mj61vaGDwS1rfjowdo1_500.gif')
        // const randomTime = Math.random() * (13000);
        // const newLivesId = 'life' + randomTime;
        // const idSelector = '#' + 'life1';
        // //lifeElement.id = newLivesId;
        // super(idSelector, 2)

        // this.timerId = setTimeout(() => {
        //     const htmlElement = document.getElementById(idSelector);

        //     if (htmlElement) {
        //         gameArea.removeChild(htmlElement)
        //     }
        // }, randomTime);
    }

    // static getNewLifeElement() {
    //     const lifeElement = document.createElement('img');
    //     lifeElement.src = 'https://66.media.tumblr.com/81200ff00a011fa6738675ea289b22b0/tumblr_mj61vaGDwS1rfjowdo1_500.gif';
    //     lifeElement.className = 'life';
    //     // lifeElement.id = 'life1';
    //     lifeElement.id = this.idSelector;
    //     return lifeElement;
    // };

    // static addNewLifeToGame(gameArea) {
    //     const lifeElement = Life.getNewLifeElement();
    //     gameArea.htmlElement.appendChild(lifeElement);
    //     gameArea.moveTarget(lifeElement);
    //     return new Life(lifeElement);
    // };
};
