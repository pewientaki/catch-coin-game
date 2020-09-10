class collisionDetector {
    constructor(elements, stepPixels, scoreManager) {
        this.elements = elements;
        this.stepPixels = stepPixels;
        this.scoreManager = scoreManager;
		this.soundLife = document.querySelector("#soundLife");
    }

    // colission detector
    isTouching(a, b) {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return !(
            aRect.top + aRect.height < bRect.top ||
            aRect.top > bRect.top + bRect.height ||
            aRect.left + aRect.width < bRect.left ||
            aRect.left > bRect.left + bRect.width
        );
    };

    // border colission
    isInBorder = (element, currentDirection) => {
        if (!currentDirection) return false;
        return this.isGettingToTopBorder(element, currentDirection)
            || this.isGettingToBottomBorder(element, currentDirection)
            || this.isGettingToLeftBorder(element, currentDirection)
            || this.isGettingToRightBorder(element, currentDirection)
    };

    // limit game to board area 
    isGettingToTopBorder(element, currentDirection) {
        return element.topLimit - this.stepPixels < this.elements.board.topBorder && currentDirection === 'Up';
    };

    isGettingToBottomBorder(element, currentDirection) {
        return this.getPosition(element.htmlElementRoot.style.top) + this.stepPixels + element.htmlElementRoot.clientHeight > this.elements.board.bottomBorder - this.elements.board.topBorder && currentDirection === 'Down';
    };

    isGettingToLeftBorder(element, currentDirection) {
        return this.getPosition(element.htmlElementRoot.style.left) - this.stepPixels + this.elements.board.leftBorder < this.elements.board.leftBorder && currentDirection === 'Left';
    };

    isGettingToRightBorder(element, currentDirection) {
        return this.getPosition(element.htmlElementRoot.style.left) + this.stepPixels + element.htmlElementRoot.clientWidth > this.elements.board.rightBorder && currentDirection === 'Right';
    };

    catchColission(htmlElementName, avatar) {
        switch (htmlElementName) {
            case 'life':
                this.lifeColission(avatar);
                break;
            case 'obstacle':
                this.obstacleColission(avatar);
                break;
            case 'target':
                this.targetColission(avatar);
        }
    }

    lifeColission() {

        const lifeObjects = document.querySelectorAll('.life');
        if (lifeObjects !== undefined) {
            lifeObjects.forEach((lifeObject => {
                if (this.isTouching(lifeObject, this.elements.avatar.htmlElementRoot)) {
                    this.findElementAndRemove(lifeObject);
                    this.scoreManager.lifePlus();
                    this.soundLife.play();
                }
            }))

        }
    }

    obstacleColission() {
        const obstacleObjects = document.querySelectorAll('.obstacle');
        if (obstacleObjects !== undefined) {
            obstacleObjects.forEach((obstacleObject => {
                if (this.isTouching(obstacleObject, this.elements.avatar.htmlElementRoot)) {
                    // this.findElementAndRemove(obstacleObject.id);
                    this.findElementAndRemove(obstacleObject)
                    this.scoreManager.lifeMinus();
                }
            }))
        }
    }

    targetColission() {
        if (this.isTouching(this.elements.target.htmlElementRoot, this.elements.avatar.htmlElementRoot)) {
            HtmlEvents.moveTarget(this.elements.board, this.elements.target)
            this.scoreManager.addPoint();
            if (this.scoreManager.score === this.scoreManager.winningScore) {
                        this.elements.createLivesCreator();
                        this.elements.createObstacleCreator();
                    };
        }
    }

    findElementAndRemove(current) {
        // const toRemove = document.querySelector('#' + current)
        this.elements.board.htmlElementRoot.removeChild(current)
    }

    // get position without 'px'
    getPosition(pos) {
        if (!pos) return 0;
        return parseInt(pos.slice(0, -2));
    }
}