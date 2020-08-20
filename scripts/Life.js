class Life extends Element {
    constructor(height, width, xLocation, yLocation) {
        super(height, width, xLocation, yLocation)
    };

    get rightLimit() {
        return xLocation + width;
    };
    get leftLimit() {
        return xLocation;
    };
    get topLimit() {
        return yLocation;
    };
    get bottomLimit() {
        return yLocation + height;
    };
};

function randomLifes() {
	const randomTime = Math.random() * (13000);
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