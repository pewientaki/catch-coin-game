let p1Button = document.querySelector("#p1");
let resetButton = document.querySelector("#reset");
let p1Score = 0;
let score = p1Score;
let p1Display = document.querySelector("#p1Display");
let gameOver = false;
let winningScore = 5;
let numInput = document.querySelector("input");
let scoreLimit = document.querySelector("p span");
let scoreSelect = document.querySelector("input");
// let canvas = document.querySelector('#gameArea');
// let ctx = canvas.getContext('2d');
let startTop = 0;
let startLeft = 0;
let height = 600;
let width = 600;


// console.log(canvas.getBoundingClientRect())


function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();
	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const target = document.querySelector('#coin');
let currentDirection;
let timerId = 0;
const interval = 100;
const stepPixels = 50;

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
		}
	}

	if (isTouching(avatar, target)) {
		moveTarget();
		addPoint();
	}
}


window.addEventListener('keyup', function (event) {
	if (event.key === 'ArrowDown' || event.key === 'Down') {
		currentDirection = 'Down';
		// moveVertical(avatar, 50);

	} else if (event.key === 'ArrowUp' || event.key === 'Up') {
		currentDirection = 'Up';
		// moveVertical(avatar, -50);

	} else if (event.key === 'ArrowRight' || event.key === 'Right') {
		currentDirection = 'Right';
		// moveHorizontal(avatar, 50);
		avatar.style.transform = 'scale(1, 1)';
	} else if (event.key === 'ArrowLeft' || event.key === 'Left') {
		currentDirection = 'Left';
		// moveHorizontal(avatar, -50);

		avatar.style.transform = 'scale(-1, 1)';
	}
	// if (isTouching(avatar, target)) {
	// 	moveTarget();
	// 	addPoint();
	// }
	if (timerId === 0) {
		timerId = window.setInterval(move, interval)
	}
});

const moveVertical = (element, amount) => {
	const currTop = getPosition(element.style.top);
	element.style.top = `${currTop + amount}px`;
};

const isInBorder = (element) => {
	if (!currentDirection) return false;
	return startTop + getPosition(element.style.top) - stepPixels < startTop
		|| getPosition(element.style.top) + stepPixels > height + startTop
		|| startLeft + getPosition(element.style.left) - stepPixels < startLeft
		|| getPosition(element.style.left) + stepPixels > width + startLeft;
};

const isLeft = (element) => {
	return getPosition(element.style.left) - stepPixels < 0;
};

const moveHorizontal = (element, amount) => {
	const currLeft = getPosition(element.style.left);
	element.style.left = `${currLeft + amount}px`;
};

const getPosition = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
};

const moveTarget = () => {
	const x = Math.floor(Math.random() * canvas.width);
	const y = Math.floor(Math.random() * canvas.height);
	target.style.top = `${y}px`;
	target.style.left = `${x}px`;
};

const speed = (score) => {
	return amount * score;
}


// counter section
const addPoint = () => {
	if (!gameOver) {
		p1Score++;
		console.log(p1Score, winningScore);
		if (p1Score === winningScore) {
			gameOver = true;
			p1Display.classList.add("winner");
		}
		p1Display.textContent = p1Score;
	}
}



resetButton.addEventListener("click", function () {
	reset();
})

numInput.addEventListener("change", function () {
	scoreLimit.textContent = this.value;
	winningScore = Number(this.value);
	reset();
})

function reset() {
	p1Score = 0;
	p1Display.textContent = p1Score;
	p1Display.classList.remove("winner");
	gameOver = false;
}