class ScoreManager {
    constructor(elements) {
        this.elements = elements;
        this.score = 0;
        this.winningScore = 10;
        this.interval = 10;
        this.stepPixels = 2;
        this.lives = 5;
        this.level = 1;
        this.gameOver = true;
        this.levelGif = document.querySelector('#levelUp');
        this.lostGif = document.querySelector('#lostGame');
        this.livesDisplay = document.querySelector('#livesDisplay');
        this.scoreDisplay = document.querySelector("#scoreDisplay");
        this.levelDisplay = document.querySelector("#levelDisplay");
        this.soundLevel = document.querySelector("#soundLevel");
        this.goal = document.querySelector('#scoreLimit');
    }

    // add point and increase level if relevant
    addPoint() {
        this.score++;
        if (this.score === this.winningScore) {
            this.levelUp();
        };
        this.scoreDisplay.textContent = this.score;
    }

    // increase level, avatar's speed, add life score & add life object to the game
    levelUp() {
        this.levelGif.style.display = 'block';
        this.stepPixels = 0;
        this.soundLevel.play();

        setTimeout(() => {
            this.levelGif.style.display = 'none'
            this.setSpeed();
        }, 1300)

        this.level++;
        this.lifePlus();

        this.levelDisplay.textContent = this.level;
        this.score = 0;
        this.scoreDisplay.textContent = this.score;
        this.elements.createObstacleCreator(this.level);
        this.elements.createLivesCreator(this.level);
    }

    // add one life & update life display
    lifePlus() {
        this.lives++;
        this.livesDisplay.textContent = this.lives;
    }

    // remove one life & end game if none's left
    lifeMinus() {
        this.lives--;
        this.livesDisplay.textContent = this.lives;
    }

    // change speed of avatar according to level
    setSpeed() {
        if (this.level < 3) {
            this.stepPixels = 2 + (this.level / 5);
        }
        else if (this.level >= 3) {
            this.stepPixels = 2 + (this.level / 4);
            this.setGoal(6);
            this.elements.createBombCreator();
        }
        else if (this.level > 6) {
            this.stepPixels = 2 + (this.level / 3.5);
            this.setGoal(7);
        } else if (this.level > 8) {
            this.stepPixels = 2 + (this.level / 3);
            this.setGoal(9);
            this.elements.createBombCreator();
        } else if (this.level > 10) {
            this.stepPixels = 2 + (this.level / 2);
            this.setGoal(10);
        }
    }

    // change goal to the next level
    setGoal(value) {
        this.winningScore = value;
        this.goal.textContent = this.winningScore;
    }
}