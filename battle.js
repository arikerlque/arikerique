// battle.js with death logic

const canvas = document.getElementById('battleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let player = {
  x: 275,
  y: 300,
  width: 20,
  height: 20,
  speed: 4,
  color: "red",
  dx: 0,
  dy: 0
};

let keys = {};
let maxHP = 92;
let currentHP = maxHP;
let isDead = false;

let bones = [];
let boneSpeed = 2;
let damageCooldown = 0;

// Death screen
function drawDeathScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("YOU DIED", canvas.width / 2, canvas.height / 2);
  ctx.font = "16px Arial";
  ctx.fillText("Refresh to try again", canvas.width / 2, canvas.height / 2 + 30);
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
  if (keys['ArrowLeft']) player.dx = -player.speed;
  else if (keys['ArrowRight']) player.dx = player.speed;
  else player.dx = 0;

  if (keys['ArrowUp']) player.dy = -player.speed;
  else if (keys['ArrowDown']) player.dy = player.speed;
  else player.dy = 0;

  player.x += player.dx;
  player.y += player.dy;

  // boundaries
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function drawHealthBar() {
  const barWidth = 150;
  const barHeight = 20;
  const x = 10;
  const y = 10;

  ctx.strokeStyle = "white";
  ctx.strokeRect(x, y, barWidth, barHeight);

  ctx.fillStyle = "orange";
  ctx.fillRect(x, y, (currentHP / maxHP) * barWidth, barHeight);
}

function spawnBone() {
  bones.push({
    x: Math.random() * (canvas.width - 10),
    y: canvas.height,
    width: 10,
    height: 30
  });
}

function drawBones() {
  ctx.fillStyle = "white";
  for (let bone of bones) {
    ctx.fillRect(bone.x, bone.y, bone.width, bone.height);
  }
}

function moveBones() {
  for (let bone of bones) {
    bone.y -= boneSpeed;
  }
  bones = bones.filter(b => b.y + b.height > 0);
}

function checkCollisions() {
  if (damageCooldown > 0) {
    damageCooldown--;
    return;
  }

  for (let bone of bones) {
    if (player.x < bone.x + bone.width &&
        player.x + player.width > bone.x &&
        player.y < bone.y + bone.height &&
        player.y + player.height > bone.y) {
      currentHP -= 10;
      damageCooldown = 30; // about half a second
      if (currentHP <= 0) {
        isDead = true;
      }
      break;
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isDead) {
    drawDeathScreen();
    return;
  }

  movePlayer();
  moveBones();
  checkCollisions();

  drawPlayer();
  drawBones();
  drawHealthBar();
}

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

setInterval(() => {
  if (!isDead) spawnBone();
}, 1000);

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
