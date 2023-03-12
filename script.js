window.onload = start;

let X_AXIS_POSITION = 0;
let Y_AXIS_POSITION = 0;

let POINTS = 0;

const windowXsize = window.innerWidth;
const windowYsize = window.innerHeight;

const BLOCK_SIZE = 32;

const PADDING_MARGIN_LIMITS = 4;

const FIELD_X_SIZE = windowXsize / BLOCK_SIZE - PADDING_MARGIN_LIMITS;

const FIELD_Y_SIZE = windowYsize / BLOCK_SIZE - PADDING_MARGIN_LIMITS;

let randomXposition = Math.floor(FIELD_X_SIZE / 2);
let randomYposition = Math.floor(FIELD_Y_SIZE / 2);

let DIRECTION = "Right";

const FPS = 100;

function start() {
  console.log("Game Start");
  generateViewBlocks();
  generateApple();

  setInterval(() => {
    switch (DIRECTION) {
      case "Right":
        goRight();
        break;
      case "Left":
        goLeft();
        break;
      case "Up":
        goUp();
        break;
      case "Down":
        goDown();
        break;
    }
    updateSnakePosition();
  }, FPS);
}

function resetGame() {
  DIRECTION = "Right";
  X_AXIS_POSITION = 0;
  Y_AXIS_POSITION = 0;
  POINTS = 0;
  const pointsLabel = document.getElementById("points");
  pointsLabel.innerText = `Pontos: ${POINTS}`;
  updateApplePosition();
  generateApple();
}

function generateViewBlocks() {
  const mainView = document.getElementById("main-platform");

  for (let i = 0; i <= FIELD_Y_SIZE; i++) {
    const block = document.createElement("div", "id");
    mainView.appendChild(block);
    block.classList.add("row");
    block.id = `row-${i}`;
    for (let j = 0; j <= FIELD_X_SIZE; j++) {
      const row = document.getElementById(`row-${i}`);
      const block = document.createElement("div");
      block.classList.add("block");
      block.id = `block-${j}`;

      row.appendChild(block);
    }
  }
}

function generateApple() {
  clearApples();
  const apple = document.createElement("div");
  apple.classList.add("apple");

  const RANDOM_ROW = document.getElementById(`row-${randomYposition}`);

  const RANDOM_APPLE_POSITION =
    RANDOM_ROW.getElementsByClassName("block")[randomXposition];

  RANDOM_APPLE_POSITION.appendChild(apple);
}

function updateApplePosition() {
  randomXposition = Math.floor(Math.random() * Math.floor(FIELD_X_SIZE));
  randomYposition = Math.floor(Math.random() * Math.floor(FIELD_Y_SIZE));
}

function clearApples() {
  const allApples = document.getElementsByClassName("apple");
  allApples[0]?.remove();
}

function updateSnakePosition() {
  clearSnakePosition();
  const snake = document.createElement("div");
  snake.classList.add("snake");

  const CURRENT_ROW = document.getElementById(`row-${Y_AXIS_POSITION}`);

  const CURRENT_SNAKE_LOCATION =
    CURRENT_ROW.getElementsByClassName("block")[X_AXIS_POSITION];

  CURRENT_SNAKE_LOCATION.appendChild(snake);

  if (
    X_AXIS_POSITION === randomXposition &&
    Y_AXIS_POSITION === randomYposition
  ) {
    updateApplePosition();
    generateApple();
    handlePoints();
  }
}

function handlePoints() {
  POINTS++;
  const pointsLabel = document.getElementById("points");
  pointsLabel.innerText = `Pontos: ${POINTS}`;
}

function clearSnakePosition() {
  const allSnakes = document.getElementsByClassName("snake");
  allSnakes[0]?.remove();
}

function gameOver() {
  resetGame();

  alert("Você perdeu ANIMAL");
}

function goRight() {
  if (X_AXIS_POSITION + 1 <= FIELD_X_SIZE) {
    X_AXIS_POSITION += 1;
    return;
  }
  gameOver();
}

function goLeft() {
  if (X_AXIS_POSITION - 1 >= 0) {
    X_AXIS_POSITION -= 1;
    return;
  }
  gameOver();
}

function goUp() {
  if (Y_AXIS_POSITION - 1 >= 0) {
    Y_AXIS_POSITION -= 1;
    return;
  }
  gameOver();
}

function goDown() {
  if (Y_AXIS_POSITION + 1 <= FIELD_Y_SIZE) {
    Y_AXIS_POSITION += 1;
    return;
  }
  gameOver();
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      DIRECTION = "Right";
      break;
    case "ArrowLeft":
      DIRECTION = "Left";
      break;
    case "ArrowUp":
      DIRECTION = "Up";
      break;
    case "ArrowDown":
      DIRECTION = "Down";
      break;
  }
});
