let p1Button = document.querySelector("#p1");
let resetButton = document.querySelector("#reset");
let levelGif = document.querySelector('#levelUp');
let p1Score = 0;
let score = p1Score;
let p1Display = document.querySelector("#p1Display");
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
const interval = 10;
let stepPixels = 10;

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
		moveTarget();
		addPoint();
	};
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
	if (isTouching(avatar, gameArea)) {
		console.log('colission!')
	}
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

const moveTarget = () => {
	const x = Math.floor(Math.random() * (width - target.clientWidth));
	const y = Math.floor(Math.random() * (height - target.clientHeight));
	console.log(x, y)
	if (x > width
		|| y > height) {
		moveTarget();
	}
	target.style.top = `${y}px`;
	target.style.left = `${x}px`;
};

const levelUp = () => {
	levelGif.style.display = 'block';
	setTimeout(() => { levelGif.style.display = 'none' }, 1300)
	level++;
	stepPixels++;
	levelDisplay.textContent = level;
	reset();
};

function isCollide(a, b) {
	var aRect = a.getBoundingClientRect();
	var bRect = b.getBoundingClientRect();

	return !(
		((aRect.top + aRect.height) < (bRect.top)) ||
		(aRect.top > (bRect.top + bRect.height)) ||
		((aRect.left + aRect.width) < bRect.left) ||
		(aRect.left > (bRect.left + bRect.width))
	);
}
// counter section
const addPoint = () => {
	if (!gameOver) {
		p1Score++;
		console.log(p1Score, winningScore);
		if (p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add("winner");
			levelUp();
		}
		p1Display.textContent = p1Score;
	};
};

resetButton.addEventListener("click", function () {
	reset();
});

numInput.addEventListener("change", function () {
	scoreLimit.textContent = this.value;
	winningScore = Number(this.value);
	reset();
});

function reset() {
	p1Score = 0;
	p1Display.textContent = p1Score;
	p1Display.classList.remove("winner");
	gameOver = false;
}