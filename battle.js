
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let paused = false;

let player = {
  x: 400,
  y: 300,
  size: 20,
  color: "red",
  speed: 4
};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false
};

document.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    paused = true;
    console.log("Game paused.");
  } else {
    paused = false;
    console.log("Game resumed.");
  }
});

function update() {
  if (keys.ArrowUp || keys.w) player.y -= player.speed;
  if (keys.ArrowDown || keys.s) player.y += player.speed;
  if (keys.ArrowLeft || keys.a) player.x -= player.speed;
  if (keys.ArrowRight || keys.d) player.x += player.speed;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
  if (!paused) {
    update();
    render();
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
