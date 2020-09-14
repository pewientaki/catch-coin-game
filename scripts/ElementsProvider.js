class ElementsProvider {
    constructor() {
        this.board = new GameArea('#gameArea');
        this.avatar = {};
        this.target = {};
        this.bomb = {};
        this.obstaclesCreatingThreads = [];
        this.livesCreatingThreads = [];
        this.bombsCreatingThreads = [];
        this.changeElements = [];
    }
    // create new avatar element
    addNewAvatar() {
        let avatarHtmlElement = this.getNewHtmlImageElement('player',
            'https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif');
        this.avatar = new Avatar(avatarHtmlElement)
        return this.avatar;
    }

    // create new target element
    addNewTarget() {
        this.target = Target.addNewTargetToGame(this.board);
    };

    // add obstacle to game area & set interval according to the level
    createObstacleCreator(level = 1) {
        this.obstaclesCreatingThreads.push(setInterval(() => {
            const obstacleObject = new Obstacle(this.board)
            HtmlEvents.moveTarget(this.board, obstacleObject)
            this.changeElements.push(obstacleObject);
            this.createATimerForDisapearing(obstacleObject, obstacleObject.randomTime)
        }, (7000 / level)));
    }

    // add life object to game area & set interval according to the level
    createLivesCreator(level = 1) {
        this.livesCreatingThreads.push(setInterval(() => {
            const lifeObject = new Life(this.board)
            HtmlEvents.moveTarget(this.board, lifeObject)
            this.changeElements.push(lifeObject);
            this.createATimerForDisapearing(lifeObject, lifeObject.randomTime)
        }, 13000 / level));
    }

    // add an bomb object to game area
    createBombCreator() {

        this.bombsCreatingThreads.push(setInterval(() => {
            const bombObject = new Bomb(this.board)
            HtmlEvents.moveTarget(this.board, bombObject)
            this.changeElements.push(bombObject);
            this.createATimerForDisapearing(bombObject, bombObject.randomTime)
        }, (15000)));
    }
    getNewHtmlImageElement(id, src) {
        const htmlElement = document.createElement('img');
        htmlElement.src = src;
        htmlElement.id = id;

        this.addNewElementToGame(htmlElement)

        return htmlElement;
    }

    addNewElementToGame(htmlElement) {
        this.board.htmlElementRoot.appendChild(htmlElement);
    }

    // remove all elements from game area
    removeAllElementsFromGame() {
        try {
            this.removeAllLiveObjects();
            this.removeAllObstacles();
            this.removeAllBombObjects();
            this.removeAvatarObject();
            this.removeTargetObject();
        } catch (error) {
            console.log(error);
        }
    }

    removeAllObstacles() {
        document.querySelectorAll('.obstacle').forEach(obstacle => this.board.htmlElementRoot.removeChild(obstacle));
        this.changeElements = this.changeElements.filter(p => !(p instanceof Obstacle));
    }

    removeAllLiveObjects() {
        document.querySelectorAll('.life').forEach(life => this.board.htmlElementRoot.removeChild(life));
        this.changeElements = this.changeElements.filter(p => !(p instanceof Life));;
    }

    removeAllBombObjects() {
        document.querySelectorAll('.bomb').forEach(bomb => this.board.htmlElementRoot.removeChild(bomb));
        this.changeElements = this.changeElements.filter(p => !(p instanceof Bomb));;
    }

    removeAvatarObject() {
        this.board.htmlElementRoot.removeChild(this.avatar.htmlElementRoot);
    }

    removeTargetObject() {
        this.board.htmlElementRoot.removeChild(this.target.htmlElementRoot);
    }

    createATimerForDisapearing(tempElement, randomTime) {
        setTimeout(() => {
            const elementToRemove = this.changeElements.filter(p => p === tempElement)[0]

            if (elementToRemove) {
                this.findElementAndRemove(elementToRemove);
            }
        }, randomTime);
    }

    findElementAndRemove(current) {
        // const toRemove = document.querySelector('#' + current)
        this.changeElements = this.changeElements.filter(p => p !== current)
        this.board.htmlElementRoot.removeChild(current.htmlElementRoot)
    }

}