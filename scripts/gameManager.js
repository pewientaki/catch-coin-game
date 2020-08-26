class gameManager {
	constructor() {
		this.score = 0;
		this.winningScore = 10;
		this.timerId;
		this.obstacleInterval;
		this.lifeInterval;
		this.interval = 10;
		this.stepPixels = 5;
		this.lives = 5;
		this.level = 1;
		this.gameOver = false;
		this.board = new GameArea('#gameArea')
		this.startButton = document.querySelector("#start");
		this.p1Button = document.querySelector("#p1");
		this.resetButton = document.querySelector("#reset");
		this.levelGif = document.querySelector('#levelUp');
		this.lostGif = document.querySelector('#lostGame');
		this.livesDisplay = document.querySelector('#livesDisplay');
		this.scoreDisplay = document.querySelector("#scoreDisplay");
		this.levelDisplay = document.querySelector("#levelDisplay");
		this.soundLevel = document.querySelector("#soundLevel");
		this.soundLife = document.querySelector("#soundLife");

		this.currentDirection = '';

		// start button
		this.startButton.addEventListener('click', () => {
			if (this.gameOver) {
				return;
			}
			clearInterval(this.timerId);
			this.startGame();
		});

		// reset button
		this.resetButton.addEventListener('click', () => this.reset());
	}

	// create avatar and sushi elements, add first obstacle to the game
	startGame() {
		this.gameOver = false;
		this.board.showElements();
		this.timerId = setInterval(() => this.move(), this.interval);
		setTimeout(() => this.createObstacle(), 2000);
	}

	// end game, stop intervals
	endGame() {
		this.gameOver = true;
		this.lostGif.style.display = 'block';
		this.stepPixels = 0;
		this.board.hideElements();

		setTimeout(() => {
			this.lostGif.style.display = 'none'
			this.reset();
		}, 2500)
	}

	// add one life & update life display
	lifePlus() {
		this.lives++;
		this.livesDisplay.textContent = this.lives;
		this.soundLife.play();
	}

	// remove one life & end game if required
	lifeMinus() {
		this.lives--;
		this.livesDisplay.textContent = this.lives;
		if (this.lives <= 0) {
			this.endGame();
		}
	}

	// restore game to initial settings
	reset() {
		this.gameOver = false;
		clearInterval(this.timerId);
		clearInterval(this.obstacleInterval);
		this.score = 0;
		this.level = 1;
		this.lives = 5;
		this.interval = 1;
		this.stepPixels = 5;
		this.scoreDisplay.textContent = this.score;
		this.levelDisplay.textContent = this.level;
		this.livesDisplay.textContent = this.lives;
		this.currentDirection = '';
		this.board.hideElements();
	}

	// add point and increase level if relevant
	addPoint() {
		this.score++;
		if (this.score === this.winningScore) {
			this.levelUp();
		};
		this.scoreDisplay.textContent = this.score;
	}

	// increase level, avatar's speed, add life & add life object to the game
	levelUp() {
		this.levelGif.style.display = 'block';
		this.stepPixels = 0;
		this.soundLevel.play()

		setTimeout(() => {
			this.levelGif.style.display = 'none'
			this.stepPixels = 5 + this.level;
		}, 1300)

		this.level++;
		this.lifePlus();
		this.createLifeObject();
		this.createObstacle();


		this.levelDisplay.textContent = this.level;
		this.score = 0;
		this.scoreDisplay.textContent = this.score;
	}

	// move avatar & detects any collisions
	move() {
		if (!this.isInBorder(this.board.avatar)) {
			switch (this.currentDirection) {
				case 'Down':
					this.moveVertical(this.board.avatar, this.stepPixels);
					break;
				case 'Up':
					this.moveVertical(this.board.avatar, this.stepPixels * -1);
					break;
				case 'Right':
					this.moveHorizontal(this.board.avatar, this.stepPixels);
					break;
				case 'Left':
					this.moveHorizontal(this.board.avatar, this.stepPixels * -1);
					break;

				default:
					break;
			};
		};

		//  detect sushi catch
		if (this.board.isTouching(this.board.avatar.htmlElement, this.board.target.htmlElement)) {
			this.board.moveTarget(this.board.target.htmlElement);
			this.addPoint();
		};

		// detect colission with obstacle
		document.querySelectorAll('.obstacle').forEach(obstacle => {
			if (this.board.isTouching(this.board.avatar.htmlElement, obstacle)) {
				this.board.htmlElement.removeChild(obstacle)
				this.lifeMinus();
			};
		});

		// detect colission with life object
		document.querySelectorAll('.life').forEach(life => {
			if (this.board.isTouching(this.board.avatar.htmlElement, life)) {
				this.board.htmlElement.removeChild(life)
				this.lifePlus();
			};
		});
	}

	MoveEvent(window, event) {
		if (event.key === 'ArrowDown' || event.key === 'Down') {
			this.currentDirection = 'Down';
			this.board.avatar.htmlElement.style.transform = 'rotate(-0.7turn)';
		} else if (event.key === 'ArrowUp' || event.key === 'Up') {
			this.currentDirection = 'Up';
			this.board.avatar.htmlElement.style.transform = 'rotate(0.7turn)';
		} else if (event.key === 'ArrowRight' || event.key === 'Right') {
			this.currentDirection = 'Right';
			this.board.avatar.htmlElement.style.transform = 'scale(1, 1)';
		} else if (event.key === 'ArrowLeft' || event.key === 'Left') {
			this.currentDirection = 'Left';
			this.board.avatar.htmlElement.style.transform = 'scale(-1, 1)';
		}
	}

	// border colission
	isInBorder = (element) => {
		if (!this.currentDirection) return false;
		return this.isGettingToTopBorder(element)
			|| this.isGettingToBottomBorder(element)
			|| this.isGettingToLeftBorder(element)
			|| this.isGettingToRightBorder(element)
	};

	// limit game to board area 
	isGettingToTopBorder(element) {
		return element.topLimit - this.stepPixels < this.board.topBorder && this.currentDirection === 'Up';
	};

	isGettingToBottomBorder(element) {
		return this.getPosition(element.htmlElement.style.top) + this.stepPixels + element.htmlElement.clientHeight > this.board.bottomBorder - this.board.topBorder && this.currentDirection === 'Down';
	};

	isGettingToLeftBorder(element) {
		return this.getPosition(element.htmlElement.style.left) - this.stepPixels + this.board.leftBorder < this.board.leftBorder && this.currentDirection === 'Left';
	};

	isGettingToRightBorder(element) {
		return this.getPosition(element.htmlElement.style.left) + this.stepPixels + element.htmlElement.clientWidth > this.board.rightBorder && this.currentDirection === 'Right';
	};

	moveVertical = (element, amount) => {
		element.htmlElement.style.top = `${element.topLimit + amount}px`;
	};

	moveHorizontal = (element, amount) => {
		const currLeft = this.getPosition(element.htmlElement.style.left);
		element.htmlElement.style.left = `${currLeft + amount}px`;
	};

	// get position without 'px'
	getPosition(pos) {
		if (!pos) return 0;
		return parseInt(pos.slice(0, -2));
	};

	// add obstacle to game area & set interval according to the level
	createObstacle() {
		if (!this.gameOver) {
			this.obstacleInterval = setInterval(() => {
				const obstacleObject = new Obstacle(this.board)
				return obstacleObject;

			}, (7000 / this.level));
		}
	}

	// add life object to game area & set interval according to the level
	createLifeObject() {

		if (!this.gameOver) {
			clearInterval(this.lifeInterval);
			this.lifeInterval = setInterval(() => {
				const lifeObject = new Life(this.board)
				return lifeObject;

			}, 10000 / this.level);
		}
	}
}

