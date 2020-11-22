class GameManager {
	constructor() {
		this.stepPixels = 2;
		this.elements = new ElementsProvider();
		this.scoreManager = new ScoreManager(this.elements);
		this.moveEvents = new MoveEvents(this.elements, this.stepPixels, this.scoreManager, this.pause);
		this.events = new Events(this.elements, this.level, this.moveEvents, this.scoreManager);
		this.collisionDetector = new collisionDetector(this.elements, this.stepPixels, this.scoreManager);
		this.htmlEventsNew = new HtmlEventsNew(this.collisionDetector);
		this.timerId;
		this.interval = 20;
		this.startButton = document.querySelector('#start');
		this.resetButton = document.querySelector('#reset');
		this.levelGif = document.querySelector('#levelUp');
		this.lostGif = document.querySelector('#lostGame');
		this.attackGif = document.querySelector('#pikachuAttack');
		this.attackSound = document.querySelector('#pikachuAttackSound');

		// start button
		this.startButton.addEventListener('click', () => {
			if (!this.scoreManager.gameOver) {
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
		// key-press event listeners
		window.addEventListener('keyup', (event) => this.moveEvents.determineMoveDirection(this, event));
		this.reset();
		this.scoreManager.gameOver = false;
		this.elements.addNewAvatar();
		this.elements.addNewTarget();
		this.timerId = setInterval(() => this.runGameInterval(), this.interval);
		this.elements.createObstacleCreator();
	}

	runGameInterval() {
		this.moveEvents.runAvatar();

		// detect collision (sushi)
		if (this.collisionDetector.isAvatarColidingWithTarget()) {
			this.htmlEventsNew.moveTarget(this.elements.target);
			this.scoreManager.addPoint();
		}

		// post run checks
		if (this.scoreManager.lives === 0) {
			this.endGame();
		} else if (this.scoreManager.score === this.scoreManager.winningScore) {
			this.elements.createLivesCreator();
			this.elements.createObstacleCreator();
		}
		if (this.moveEvents.collisionDetector.bombCollided) {
			this.attackSound.play();
			this.pause(1600, this.attackGif);
			this.moveEvents.collisionDetector.bombCollided = false;
		}
	}

	// end game, clear intervals, display gameover gif
	endGame() {
		this.stepPixels = 0;
		this.reset();
		this.pause(1500, this.lostGif);
	}

	// restore game to initial settings
	reset() {
		this.scoreManager.gameOver = true;
		clearInterval(this.timerId);
		this.elements.obstaclesCreatingThreads.forEach((p) => clearInterval(p));
		this.elements.livesCreatingThreads.forEach((p) => clearInterval(p));
		this.elements.bombsCreatingThreads.forEach((p) => clearInterval(p));
		this.scoreManager.score = 0;
		this.scoreManager.level = 1;
		this.scoreManager.lives = 5;
		this.interval = 1;
		this.stepPixels = 2;
		this.scoreManager.setGoal(5);
		this.scoreManager.scoreDisplay.textContent = this.scoreManager.score;
		this.scoreManager.levelDisplay.textContent = this.scoreManager.level;
		this.scoreManager.livesDisplay.textContent = this.scoreManager.lives;
		this.moveEvents.currentDirection = '';
		this.elements.removeAllElementsFromGame();
	}

	pause(time, animation) {
		this.scoreManager.stepPixels = 0;
		const toShow = animation;
		toShow.style.display = 'block';
		setTimeout(() => {
			toShow.style.display = 'none';
			this.scoreManager.setSpeed();
		}, time);
	}
}
