class MoveEvent {
    constructor(elements, stepPixels, scoreManager) {

        // this.extra = extra;
        this.elements = elements;
        this.scoreManager = scoreManager;

        this.currentDirection = '';
        this.stepPixels = stepPixels;
        this.collisionDetector = new collisionDetector(elements, this.stepPixels, scoreManager);
    }

    // move avatar & detect any collisions
    runAvatar() {
        if (!this.collisionDetector.isInBorder(this.elements.avatar, this.currentDirection)) {
            switch (this.currentDirection) {
                case 'Down':
                    this.moveVertical(this.elements.avatar, this.stepPixels);
                    break;
                case 'Up':
                    this.moveVertical(this.elements.avatar, this.stepPixels * -1);
                    break;
                case 'Right':
                    this.moveHorizontal(this.elements.avatar, this.stepPixels);
                    break;
                case 'Left':
                    this.moveHorizontal(this.elements.avatar, this.stepPixels * -1);
                    break;

                default:
                    break;
            };

            this.collisionDetector.catchColission('target', this.elements.avatar);
            this.collisionDetector.catchColission('life', this.elements.avatar);
            this.collisionDetector.catchColission('obstacle', this.elements.avatar);
        }
    }

    moveVertical = (element, amount) => {
        element.htmlElementRoot.style.top = `${element.topLimit + amount}px`;
    };

    moveHorizontal = (element, amount) => {
        const currLeft = this.getPosition(element.htmlElementRoot.style.left);
        element.htmlElementRoot.style.left = `${currLeft + amount}px`;
    };

    determineMoveDirection(window, event) {
        if (event.key === 'ArrowDown' || event.key === 'Down') {
            this.currentDirection = 'Down';
            this.elements.avatar.htmlElementRoot.style.transform = 'rotate(-0.7turn)';
        } else if (event.key === 'ArrowUp' || event.key === 'Up') {
            this.currentDirection = 'Up';
            this.elements.avatar.htmlElementRoot.style.transform = 'rotate(0.7turn)';
        } else if (event.key === 'ArrowRight' || event.key === 'Right') {
            this.currentDirection = 'Right';
            this.elements.avatar.htmlElementRoot.style.transform = 'scale(1, 1)';
        } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
            this.currentDirection = 'Left';
            this.elements.avatar.htmlElementRoot.style.transform = 'scale(-1, 1)';
        }
    }

    // get position without 'px'
    getPosition(pos) {
        if (!pos) return 0;
        return parseInt(pos.slice(0, -2));
    };
}
