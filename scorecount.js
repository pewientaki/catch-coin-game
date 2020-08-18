let p1Button = document.querySelector("#p1");
let p2Button = document.querySelector("#p2");
let resetButton = document.querySelector("#reset");
let p1Score = 0;
let p2Score = 0;
let p1Display = document.querySelector("#p1Display");
let p2Display = document.querySelector("#p2Display");
let gameOver = false;
let winningScore = 5;
let numInput = document.querySelector("input");
let scoreLimit = document.querySelector("p span");
let scoreSelect = document.querySelector("input");

p1Button.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        console.log(p1Score, winningScore);
        if(p1Score === winningScore){
            gameOver = true;
            p1Display.classList.add("winner");
        }
        p1Display.textContent = p1Score;
    }  
});

p2Button.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        if(p2Score === winningScore){
            gameOver = true;
            p2Display.classList.add("winner");
        }
        p2Display.textContent = p2Score;
    }   
});

resetButton.addEventListener("click", function(){
   reset();
})

numInput.addEventListener("change", function(){
    scoreLimit.textContent = this.value;
    winningScore = Number(this.value);
    reset();
})

function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    gameOver = false;
}