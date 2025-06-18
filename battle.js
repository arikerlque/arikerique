
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
  currentHP: 92,
  lastHitTime: 0
};

const bones = [];
const boneWidth = 10;
const boneHeight = 40;
const boneSpeed = 2;
const boneSpawnRate = 60; // frames

let frameCount = 0;

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function spawnBone() {
  const x = Math.random() * (canvas.width - boneWidth);
  bones.push({ x, y: canvas.height, width: boneWidth, height: boneHeight });
}

function updateBones() {
  for (let i = bones.length - 1; i >= 0; i--) {
    bones[i].y -= boneSpeed;
    if (bones[i].y + bones[i].height < 0) {
      bones.splice(i, 1);
    }
  }
}

function checkBoneCollision() {
  const now = Date.now();
  for (const bone of bones) {
    if (
      player.x < bone.x + bone.width &&
      player.x + player.width > bone.x &&
      player.y < bone.y + bone.height &&
      player.y + player.height > bone.y
    ) {
      if (now - player.lastHitTime > 1000) {
        player.currentHP = Math.max(0, player.currentHP - 10);
        player.lastHitTime = now;
      }
    }
  }
}

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

  updateBones();
  checkBoneCollision();

  if (frameCount % boneSpawnRate === 0) {
    spawnBone();
  }

  frameCount++;
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

function drawBones() {
  ctx.fillStyle = 'white';
  for (const bone of bones) {
    ctx.fillRect(bone.x, bone.y, bone.width, bone.height);
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  drawBones();
  drawHealthBar();
  requestAnimationFrame(gameLoop);
}

gameLoop();
