
const canvas = document.getElementById('battleCanvas');
const ctx = canvas.getContext('2d');

canvas.focus();

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 20,
  height: 20,
  speed: 3,
  color: 'red',
  dx: 0,
  dy: 0,
  maxHP: 92,
  currentHP: 92
};

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function update() {
  player.dx = 0;
  player.dy = 0;
  if (keys['ArrowLeft'] || keys['a']) player.dx = -player.speed;
  if (keys['ArrowRight'] || keys['d']) player.dx = player.speed;
  if (keys['ArrowUp'] || keys['w']) player.dy = -player.speed;
  if (keys['ArrowDown'] || keys['s']) player.dy = player.speed;

  player.x += player.dx;
  player.y += player.dy;

  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawHealthBar() {
  const barWidth = 200;
  const barHeight = 20;
  const x = 10;
  const y = 10;

  ctx.strokeStyle = 'white';
  ctx.strokeRect(x, y, barWidth, barHeight);

  const hpRatio = player.currentHP / player.maxHP;
  ctx.fillStyle = 'orange';
  ctx.fillRect(x, y, barWidth * hpRatio, barHeight);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  drawHealthBar();
  requestAnimationFrame(gameLoop);
}

gameLoop();
