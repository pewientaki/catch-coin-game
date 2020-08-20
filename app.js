let p1Button = document.querySelector("#p1");
let resetButton = document.querySelector("#reset");
let levelGif = document.querySelector('#levelUp');
let lostGif = document.querySelector('#lostGame');
let lifesDisplay = document.querySelector('#lifesDisplay');
// let deadfall = document.querySelectorAll('#obstacle');
let Score = 0;
let lifes = 5;
let score = Score;
let Display = document.querySelector("#display");
let gameOver = false;
let winningScore = 5;
let level = 1;
let numInput = document.querySelector("input");
let scoreLimit = document.querySelector("p span");
let levelDisplay = document.querySelector("#levelDisplay");
let scoreSelect = document.querySelector("input");
let board = new GameArea('#gameArea');

let gameArea = document.querySelector('#gameArea');
let startTop = gameArea.clientTop;
let startLeft = gameArea.clientLeft;
let height = gameArea.clientHeight;
let width = gameArea.clientWidth;
const borderMargin = 5;

let deadfall;

function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();
	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
};

const avatar = document.querySelector('#player');
const target = document.querySelector('#target');
let currentDirection;
let timerId = 0;
let interval = 10;
let stepPixels = 5;

function move() {
	if (!isInBorder(avatar)) {
		switch (currentDirection) {
			case 'Down':
				moveVertical(avatar, stepPixels);
				break;
			case 'Up':
				moveVertical(avatar, stepPixels * -1);
				break;
			case 'Right':
				moveHorizontal(avatar, stepPixels);
				break;
			case 'Left':
				moveHorizontal(avatar, stepPixels * -1);
				break;

			default:
				break;
		};
	};

	if (isTouching(avatar, target)) {
		moveTarget(target);
		addPoint();
	};

	document.querySelectorAll('.obstacle').forEach(obstacle => {
		if (isTouching(avatar, obstacle)) {
			gameArea.removeChild(obstacle)
			lifeMinus();
		};
	});

	document.querySelectorAll('.life').forEach(life => {
		if (isTouching(avatar, life)) {
			gameArea.removeChild(life)
			lifePlus();
		};
	});
};

window.addEventListener('keyup', function (event) {
	if (event.key === 'ArrowDown' || event.key === 'Down') {
		currentDirection = 'Down';
		avatar.style.transform = 'rotate(-0.7turn)';
	} else if (event.key === 'ArrowUp' || event.key === 'Up') {
		currentDirection = 'Up';
		avatar.style.transform = 'rotate(0.7turn)';
	} else if (event.key === 'ArrowRight' || event.key === 'Right') {
		currentDirection = 'Right';
		avatar.style.transform = 'scale(1, 1)';
	} else if (event.key === 'ArrowLeft' || event.key === 'Left') {
		currentDirection = 'Left';
		avatar.style.transform = 'scale(-1, 1)';
	}

	if (timerId === 0) {
		timerId = window.setInterval(move, interval)
	};
});

const moveVertical = (element, amount) => {

	const currTop = getPosition(element.style.top);
	element.style.top = `${currTop + amount}px`;

	// if (isTouching(avatar, gameArea)) {
	// 	console.log('colission!')
	// };
};

const isInBorder = (element) => {
	if (!currentDirection) return false;
	return isGettingToTopBorder(element)
		|| isGettingToBottomBorder(element)
		|| isGettingToLeftBorder(element)
		|| isGettingToRightBorder(element)
	// || (getPosition(element.style.left) + stepPixels + element.clientWidth > width + startLeft && currentDirection === 'Right');
};

const moveHorizontal = (element, amount) => {

	const currLeft = getPosition(element.style.left);
	element.style.left = `${currLeft + amount}px`;
};

function isGettingToTopBorder(element) {
	return getPosition(element.style.top) - stepPixels < board.margin && currentDirection === 'Up';
};

function isGettingToBottomBorder(element) {
	return getPosition(element.style.top) + stepPixels + element.clientHeight > board.bottomBorder - board.topBorder && currentDirection === 'Down';
};

function isGettingToLeftBorder(element) {
	return getPosition(element.style.left) - stepPixels + board.leftBorder < board.leftBorder && currentDirection === 'Left';
};

function isGettingToRightBorder(element) {
	return getPosition(element.style.left) + stepPixels + element.clientWidth > board.rightBorder && currentDirection === 'Right';
};

function getPosition(pos) {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
};

const moveTarget = (whatToMove) => {
	const x = startLeft + Math.floor(Math.random() * (width - whatToMove.clientWidth));
	const y = startTop + Math.floor(Math.random() * (height - whatToMove.clientHeight));

	whatToMove.style.top = `${y}px`;
	whatToMove.style.left = `${x}px`;
};

const levelUp = () => {
	levelGif.style.display = 'block';
	stepPixels = 0;

	setTimeout(() => {
		levelGif.style.display = 'none'
		stepPixels = 5;
	}, 1300)

	level++;
	lifePlus();
	randomLifes();
	speedUp();
	difficulty();
	levelDisplay.textContent = level;
	Score = 0;
	Display.textContent = Score;
};

// counter section
const addPoint = () => {
	Score++;
	if (Score === winningScore) {
		levelUp();
	};
	randomObstacle();
	Display.textContent = Score;
};

function speedUp() {
	interval *= 1.15;
};

resetButton.addEventListener("click", function () {
	reset();
});

numInput.addEventListener("change", function () {
	scoreLimit.textContent = this.value;
	winningScore = Number(this.value);
});

function reset() {
	Score = 0;
	level = 1;
	lifes = 5;
	interval = 10;
	stepPixels = 5;
	Display.textContent = Score;
	levelDisplay.textContent = level;
	lifesDisplay.textContent = lifes;
};