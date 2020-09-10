class ElementsProvider {
    constructor() {
        this.board = new GameArea('#gameArea');
        this.avatar = {};
        this.target = {};
        this.obstaclesCreatingThreads = [];
        this.livesCreatingThreads = [];
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
            return obstacleObject;

        }, (7000 / level)));
    }

    // add life object to game area & set interval according to the level
    createLivesCreator(level = 1) {
        this.livesCreatingThreads.push(setInterval(() => {
            const lifeObject = new Life(this.board)
            HtmlEvents.moveTarget(this.board, lifeObject)
            return lifeObject;

        }, 13000 / level));
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
            this.removeAvatarObject();
            this.removeTargetObject();
        } catch (error) {
            console.log(error);
        }
    }

    removeAllObstacles() {
        document.querySelectorAll('.obstacle').forEach(obstacle => this.board.htmlElementRoot.removeChild(obstacle));
    }

    removeAllLiveObjects() {
        document.querySelectorAll('.life').forEach(life => this.board.htmlElementRoot.removeChild(life));
    }

    removeAvatarObject() {
        this.board.htmlElementRoot.removeChild(this.avatar.htmlElementRoot);
    }

    removeTargetObject() {
        this.board.htmlElementRoot.removeChild(this.target.htmlElementRoot);
    }
}