class Obstacle extends Element {
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

function randomObstacle() {
    const randomTime = Math.random() * (level * 1000);

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
    }, 4000)
};