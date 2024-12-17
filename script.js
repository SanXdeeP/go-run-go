let score = 0;
let cactusSpeed = 3;
let isJumping = false;
let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let scoreDisplay = document.getElementById("score");

// Create audio objects
const jumpSound = new Audio('sounds/jump.mp3');
const collisionSound = new Audio('sounds/collision.mp3');

// Handle jump action
document.addEventListener('keydown', (e) => {
  if (e.key === " " && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  jumpSound.play(); // Play jump sound
  dino.classList.add("jump");
  
  setTimeout(() => {
    isJumping = false;
    dino.classList.remove("jump");
  }, 500);
}

// Move the cactus
function moveCactus() {
  let cactusPosition = parseInt(cactus.style.left);
  
  if (cactusPosition < -40) {
    cactus.style.left = "100%"; // Reset cactus to start position
    updateScore(); // Update score when cactus passes Dino
  }
  
  cactus.style.left = cactusPosition - cactusSpeed + "px"; // Move cactus
}

// Update score and increase speed
function updateScore() {
  score++;
  scoreDisplay.innerText = "Score: " + score;

  if (score % 10 === 0) {
    cactusSpeed += 1; // Increase speed after every 10 points
  }
}

// Check for collision
function checkCollision() {
  let dinoRect = dino.getBoundingClientRect();
  let cactusRect = cactus.getBoundingClientRect();
  
  if (dinoRect.top < cactusRect.bottom &&
      dinoRect.bottom > cactusRect.top &&
      dinoRect.left < cactusRect.right &&
      dinoRect.right > cactusRect.left) {
    collisionSound.play(); // Play collision sound
    alert("Game Over! Final Score: " + score);
    resetGame();
  }
}

// Reset game when collision happens
function resetGame() {
  score = 0;
  cactusSpeed = 3;
  scoreDisplay.innerText = "Score: " + score;
  cactus.style.left = "100%";
}

// Game loop
function gameLoop() {
  moveCactus();
  checkCollision();
  requestAnimationFrame(gameLoop); // Keep the game running
}

gameLoop();
