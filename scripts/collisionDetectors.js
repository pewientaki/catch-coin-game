class collisionDetector {
    constructor(elements, stepPixels, scoreManager) {
        this.elements = elements;
        this.stepPixels = stepPixels;
        this.scoreManager = scoreManager;
        this.soundLife = document.querySelector("#soundLife");
        this.bombCollided = false;
    }

    // colission detector
    isTouching(a, b) {
        const bRect = b.getBoundingClientRect();
        return this.isPotentiallyTouching(a, bRect.top, bRect.left, bRect.width, bRect.height);
    };

    // colission detector
    isPotentiallyTouching(source, targetTop, targetLeft, targetWidth, targetHeight) {
        const sourceRect = source.getBoundingClientRect();
        return !(
            sourceRect.top + sourceRect.height < targetTop ||
            sourceRect.top > targetTop + targetHeight ||
            sourceRect.left + sourceRect.width < targetLeft ||
            sourceRect.left > targetLeft + targetWidth
        );
    };

    // colission detector
    isPotentiallyTouchingAnything(targetTop, targetLeft, targetWidth, targetHeight) {
        return this.elements.changeElements.some(p =>
            this.isPotentiallyTouching(p.htmlElementRoot, targetTop, targetLeft, targetWidth, targetHeight))
            || this.isPotentiallyTouching(this.elements.target.htmlElementRoot, targetTop, targetLeft, targetWidth, targetHeight)
            || this.isPotentiallyTouching(this.elements.avatar.htmlElementRoot, targetTop, targetLeft, targetWidth, targetHeight);
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

    catchColission(htmlElementName) {
        switch (htmlElementName) {
            case 'life':
                this.lifeColission();
                break;
            case 'obstacle':
                this.obstacleColission();
                break;
            // case 'target':
            //     this.targetColission();
            case 'bomb':
                this.bombColission();
        }
    }

    lifeColission() {
        const lifeObjects = this.elements.changeElements.filter(p => p instanceof Life);
        if (lifeObjects !== undefined) {
            lifeObjects.forEach((lifeObject => {
                if (this.isTouching(lifeObject.htmlElementRoot, this.elements.avatar.htmlElementRoot)) {
                    this.elements.findElementAndRemove(lifeObject);
                    this.scoreManager.lifePlus();
                    this.soundLife.play();
                }
            }))

        }
    }

    obstacleColission() {
        const obstacleObjects = this.elements.changeElements.filter(p => p instanceof Obstacle);
        if (obstacleObjects !== undefined) {
            obstacleObjects.forEach((obstacleObject => {
                if (this.isTouching(obstacleObject.htmlElementRoot, this.elements.avatar.htmlElementRoot)) {
                    // this.findElementAndRemove(obstacleObject.id);
                    this.elements.findElementAndRemove(obstacleObject)
                    this.scoreManager.lifeMinus();
                }
            }))
        }
    }

    isAvatarColidingWithTarget() {
        return this.isTouching(this.elements.target.htmlElementRoot, this.elements.avatar.htmlElementRoot);
    }

    bombColission() {
        const bombObjects = this.elements.changeElements.filter(p => p instanceof Bomb);
        if (bombObjects !== undefined) {
            bombObjects.forEach((bombObject => {
                if (this.isTouching(bombObject.htmlElementRoot, this.elements.avatar.htmlElementRoot)) {
                    this.elements.findElementAndRemove(bombObject);
                    this.elements.removeAllObstacles();
                    this.elements.bombsCreatingThreads.forEach(p => clearInterval(p));
                    this.bombCollided = true;
                }
            }))
        }
    }

    // get position without 'px'
    getPosition(pos) {
        if (!pos) return 0;
        return parseInt(pos.slice(0, -2));
    }
}