
const canvas = document.getElementById("battleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const soul = {
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10,
  size: 20,
  speed: 150, // pixels per second
  color: "red"
};

const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

let lastTime = 0;

function update(deltaTime) {
  const distance = soul.speed * (deltaTime / 1000);

  if (keys["arrowup"] || keys["w"]) soul.y -= distance;
  if (keys["arrowdown"] || keys["s"]) soul.y += distance;
  if (keys["arrowleft"] || keys["a"]) soul.x -= distance;
  if (keys["arrowright"] || keys["d"]) soul.x += distance;

  // Constrain within the canvas
  soul.x = Math.max(0, Math.min(canvas.width - soul.size, soul.x));
  soul.y = Math.max(0, Math.min(canvas.height - soul.size, soul.y));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Battle box
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Soul
  ctx.fillStyle = soul.color;
  ctx.fillRect(soul.x, soul.y, soul.size, soul.size);

  // HP bar (for now just a simple one)
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 100, 10);
  ctx.strokeStyle = "black";
  ctx.strokeRect(10, 10, 100, 10);
}

function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
