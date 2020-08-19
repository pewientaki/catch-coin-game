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
let level = 0;
let numInput = document.querySelector("input");
let scoreLimit = document.querySelector("p span");
let levelDisplay = document.querySelector("#levelDisplay");
let scoreSelect = document.querySelector("input");
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
	return (startTop + getPosition(element.style.top) - stepPixels < startTop + borderMargin && currentDirection === 'Up')
		|| (getPosition(element.style.top) + stepPixels + element.clientHeight > height + startTop && currentDirection === 'Down')
		|| (startLeft + getPosition(element.style.left) - stepPixels < startLeft + borderMargin && currentDirection === 'Left')
		|| (getPosition(element.style.left) + stepPixels + element.clientWidth > width + startLeft && currentDirection === 'Right');
};

const isLeft = (element) => {
	return getPosition(element.style.left) - stepPixels < 0;
};

const moveHorizontal = (element, amount) => {

	const currLeft = getPosition(element.style.left);
	element.style.left = `${currLeft + amount}px`;
};

function getPosition(pos) {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
};

const moveTarget = (whatToMove) => {
	const x = startLeft + Math.floor(Math.random() * (width - whatToMove.clientWidth));
	const y = startTop + Math.floor(Math.random() * (height - whatToMove.clientHeight));
	// if (x > width
	// 	|| y > height) {
	// 	moveTarget(whatToMove);
	// }

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
	interval *= 15;
	lifePlus();
	levelDisplay.textContent = level;
	Score = 0;
	Display.textContent = Score;
	randomLifes();
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

resetButton.addEventListener("click", function () {
	reset();
});

numInput.addEventListener("change", function () {
	scoreLimit.textContent = this.value;
	winningScore = Number(this.value);
});

function randomObstacle() {
	const randomTime = Math.random() * (10000);

	const obstacle = document.createElement('img');
	obstacle.src = 'https://cdn.lowgif.com/full/808f7bbed5c5cad4-pokemon-charizard-pixel-art-images-pokemon-images.gif';
	const newId = 'obstacle' + randomTime;
	obstacle.id = newId;
	obstacle.className = 'obstacle';
	gameArea.appendChild(obstacle);
	deadfall = document.querySelector('#obstacle');
	moveTarget(obstacle);

	setTimeout(() => {
		const tempObs = document.getElementById(newId);
		if (tempObs) {
			gameArea.removeChild(tempObs)
		}
	}, randomTime)
};

function randomLifes() {
	const randomTime = Math.random() * (10000);
	const life = document.createElement('img');
	life.src = 'https://66.media.tumblr.com/81200ff00a011fa6738675ea289b22b0/tumblr_mj61vaGDwS1rfjowdo1_500.gif';
	const newLifesId = 'life' + randomTime;
	life.id = newLifesId;
	life.className = 'life';
	gameArea.appendChild(life);
	moveTarget(life);

	setTimeout(() => {
		const newLife = document.getElementById(newLifesId);
		if (newLife) {
			gameArea.removeChild(newLife)
		}
	}, randomTime)
};

// lifes
const lifePlus = () => {
	lifes++;
	lifesDisplay.textContent = lifes;
};
const lifeMinus = () => {
	lifes--;
	lifesDisplay.textContent = lifes;
	if (lifes <= 0) {
		lostGif.style.display = 'block';
		stepPixels = 0;
		setTimeout(() => {
			lostGif.style.display = 'none'
			reset();
		}, 2500)
	}
};

// function isCollide(a, b) {
// 	var aRect = a.getBoundingClientRect();
// 	var bRect = b.getBoundingClientRect();

// 	return !(
// 		((aRect.top + aRect.height) < (bRect.top)) ||
// 		(aRect.top > (bRect.top + bRect.height)) ||
// 		((aRect.left + aRect.width) < bRect.left) ||
// 		(aRect.left > (bRect.left + bRect.width))
// 	);
// };



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