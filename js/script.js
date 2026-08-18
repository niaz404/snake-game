// variables============================================
let direction = { x: 0, y: 0 };
let food;
let snakeArray = [
  { x: 10, y: 10 }, //head
];
let previousTime = 0;
let speed = 10;

// constant============================================
const a = 2;
const b = 18;
// dom elements
const board = document.getElementById("board");
// sounds
const moveSound = new Audio("../assets/sounds/move.mp3");
const eatSound = new Audio("../assets/sounds/food.mp3");
const gameOver = new Audio("../assets/sounds/gameover.mp3");

// game functions========================================
// random num generator
const randomCord = () => Math.round(a + (b - a) * Math.random());
food = { x: randomCord(), y: randomCord() };

// main
const main = (currentTime) => {
  window.requestAnimationFrame(main);
  if ((currentTime - previousTime) / 1000 < 1 / speed) return;
  previousTime = currentTime;
  gameEngine();
};

// collide
const isCollide = (snakeArr) => {
  if (
    snakeArr[0].x >= 20 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 20 ||
    snakeArr[0].y <= 0
  )
    return true;

  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y)
      return true;
  }
  return false;
};

// game engine
const gameEngine = () => {
  // game over
  if (isCollide(snakeArray)) {
    gameOver.play();
    alert("Game Over");
    food = { x: randomCord(), y: randomCord() };
    snakeArray = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
  }

  // eatfood and add body elements
  if (snakeArray[0].x == food.x && snakeArray[0].y == food.y) {
    eatSound.currentTime = 0;
    eatSound.play();

    food = { x: randomCord(), y: randomCord() };
    snakeArray.push({
      x: snakeArray[snakeArray.length - 1].x,
      y: snakeArray[snakeArray.length - 1].y,
    });
  }

  // move body
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  // move head
  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;

  board.innerHTML = "";

  // display snake
  snakeArray.forEach((item, index) => {
    const snakeElements = document.createElement("div");
    snakeElements.style.gridColumnStart = item.x;
    snakeElements.style.gridRowStart = item.y;
    if (index === 0) {
      snakeElements.classList.add("head", "snakeBody");
    } else {
      snakeElements.classList.add("snakeBody");
    }
    board.appendChild(snakeElements);
  });

  // display food
  const foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

// logic ============================================================
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  moveSound.currentTime = 0;
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      console.log("UP");
      break;
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      console.log("Down");
      break;
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      console.log("Right");
      break;
    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      console.log("Left");
      break;

    default:
      break;
  }
});
