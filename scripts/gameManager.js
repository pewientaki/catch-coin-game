class gameManager {
	constructor() {
		this.stepPixels = 2;
		this.elements = new ElementsProvider();
		this.scoreManager = new ScoreManager(this.elements);
		this.moveEvent = new MoveEvent(this.elements, this.stepPixels, this.scoreManager);
		this.events = new Events(this.elements, this.level, this.moveEvent, this.scoreManager);
		this.timerId;
		this.interval = 20;
		this.startButton = document.querySelector("#start");
		this.resetButton = document.querySelector("#reset");
		this.levelGif = document.querySelector('#levelUp');
		this.lostGif = document.querySelector('#lostGame');

		// start button
		this.startButton.addEventListener('click', () => {
			if (this.scoreManager.gameOver) {
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
		window.addEventListener('keyup', (event) => this.moveEvent.determineMoveDirection(this, event));
		this.reset();
		this.scoreManager.gameOver = false;
		this.elements.addNewAvatar();
		this.elements.addNewTarget();
		this.timerId = setInterval(() => {
			this.moveEvent.runAvatar();
			// post run checks
			if (this.scoreManager.lives === 0) {
				this.endGame();
			}
		}, this.interval);
		this.elements.createObstacleCreator();
	}

	// end game, clear intervals, display gameover gif
	endGame() {
		this.scoreManager.gameOver = true;
		this.stepPixels = 0;
		this.reset();
		this.lostGif.style.display = 'block';
		setTimeout(() => {
			this.lostGif.style.display = 'none'
		}, 2500)
	}

	// restore game to initial settings
	reset() {
		this.scoreManager.gameOver = false;
		clearInterval(this.timerId);
		this.elements.obstaclesCreatingThreads.forEach(p => clearInterval(p));
		this.elements.livesCreatingThreads.forEach(p => clearInterval(p));
		this.scoreManager.score = 0;
		this.scoreManager.level = 1;
		this.scoreManager.lives = 5;
		this.interval = 1;
		this.stepPixels = 2;
		this.scoreManager.setGoal(5);
		this.scoreManager.scoreDisplay.textContent = this.scoreManager.score;
		this.scoreManager.levelDisplay.textContent = this.scoreManager.level;
		this.scoreManager.livesDisplay.textContent = this.scoreManager.lives;
		this.moveEvent.currentDirection = '';
		this.elements.removeAllElementsFromGame();
	}
}
