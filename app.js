const manager = new gameManager();

// key-press event listeners
window.addEventListener('keyup', (event) => manager.MoveEvent(this, event));


// // goal input
// numInput.addEventListener("change", function () {
// 	scoreLimit.textContent = this.value;
// 	winningScore = Number(this.value);
// });