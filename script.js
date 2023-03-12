window.onload = start;

let X_AXIS_POSITION = 0;
let Y_AXIS_POSITION = 0;

let GAME_POINTS = 0;

const windowXsize = window.innerWidth;
const windowYsize = window.innerHeight;

const BLOCK_SIZE = 32;

const PADDING_MARGIN_LIMITS = windowXsize < 1500 ? 4 : 8;

console.log(PADDING_MARGIN_LIMITS);

const FIELD_X_SIZE = windowXsize / BLOCK_SIZE - PADDING_MARGIN_LIMITS;

const FIELD_Y_SIZE = windowYsize / BLOCK_SIZE - PADDING_MARGIN_LIMITS;

let randomXposition = Math.floor(FIELD_X_SIZE / 2);
let randomYposition = Math.floor(FIELD_Y_SIZE / 2);

let DIRECTION = "Right";

let FPS = 100;

let isPaused = false;

function clearGameBoard() {
  const rows = document.getElementsByClassName("row");
  Array.from(rows).forEach((row) => {
    row.remove();
  });
}

function start() {
  console.log("Game Start");
  clearGameBoard();
  generateViewBlocks();
  generateApple();

  var runFrames = function () {
    const oldFPS = FPS;

    const timer = setInterval(() => {
      if (isPaused) {
        clearInterval(timer);
      }
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
      if (FPS !== oldFPS) {
        clearInterval(timer);
        runFrames();
      }
      updateSnakePosition();
    }, FPS);
  };
  runFrames();
}

function resetGame() {
  DIRECTION = "Right";
  X_AXIS_POSITION = 0;
  Y_AXIS_POSITION = 0;
  GAME_POINTS = 0;
  const pointsLabel = document.getElementById("points");
  pointsLabel.innerText = `Pontos: ${GAME_POINTS}`;
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
  GAME_POINTS++;
  const pointsLabel = document.getElementById("points");
  pointsLabel.innerText = `Pontos: ${GAME_POINTS}`;
}

function clearSnakePosition() {
  const allSnakes = document.getElementsByClassName("snake");
  allSnakes[0]?.remove();
}

function gameOver() {
  alert("Você perdeu, seus pontos foram: " + GAME_POINTS);

  resetGame();
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

function pause() {
  if (isPaused) {
    isPaused = false;
    start();
    return;
  }
  isPaused = true;
}

function setDificulty(dificulty) {
  switch (dificulty) {
    case "EXTREME":
      FPS = 25;
      break;
    case "HARD":
      FPS = 50;
      break;
    case "EASY":
      FPS = 100;
      break;
  }
}
