class Obstacle extends Change {
    constructor(gameArea) {
        super(gameArea, 'obstacle', 'https://cdn.lowgif.com/full/808f7bbed5c5cad4-pokemon-charizard-pixel-art-images-pokemon-images.gif' )
    };
};

// function randomObstacle() {
//     const randomTime = Math.random() * (level * 1000);

//     const obstacle = document.createElement('img');
//     obstacle.src = 'https://cdn.lowgif.com/full/808f7bbed5c5cad4-pokemon-charizard-pixel-art-images-pokemon-images.gif';
//     const newId = 'obstacle' + randomTime;
//     obstacle.id = newId;
//     obstacle.className = 'obstacle';
//     gameArea.appendChild(obstacle);
//     deadfall = document.querySelector('#obstacle');
//     board.moveTarget(obstacle);

//     setTimeout(() => {
//         const tempObs = document.getElementById(newId);
//         if (tempObs) {
//             gameArea.removeChild(tempObs)
//         }
//     }, 4000)
// };