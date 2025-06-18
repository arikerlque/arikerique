
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const soul = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  color: 'red',
  speed: 3,
  vx: 0,
  vy: 0
};

const box = {
  x: 200,
  y: 150,
  width: 400,
  height: 300,
  color: 'white'
};

const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function updateSoul() {
  soul.vx = 0;
  soul.vy = 0;
  if (keys['arrowleft'] || keys['a']) soul.vx = -soul.speed;
  if (keys['arrowright'] || keys['d']) soul.vx = soul.speed;
  if (keys['arrowup'] || keys['w']) soul.vy = -soul.speed;
  if (keys['arrowdown'] || keys['s']) soul.vy = soul.speed;

  const nextX = soul.x + soul.vx;
  const nextY = soul.y + soul.vy;

  if (
    nextX - soul.size / 2 >= box.x &&
    nextX + soul.size / 2 <= box.x + box.width &&
    nextY - soul.size / 2 >= box.y &&
    nextY + soul.size / 2 <= box.y + box.height
  ) {
    soul.x = nextX;
    soul.y = nextY;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw box
  ctx.strokeStyle = box.color;
  ctx.lineWidth = 4;
  ctx.strokeRect(box.x, box.y, box.width, box.height);

  // Draw soul
  ctx.fillStyle = soul.color;
  ctx.beginPath();
  ctx.arc(soul.x, soul.y, soul.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function loop() {
  updateSoul();
  draw();
  requestAnimationFrame(loop);
}

loop();
