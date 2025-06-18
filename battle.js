
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let player = {
  x: canvas.width / 2 - 10,
  y: canvas.height / 2 - 10,
  width: 20,
  height: 20,
  speed: 4,
  color: "red",
  hp: 92,
  maxHp: 92,
  isDead: false
};

let keys = {};

document.addEventListener("keydown", function (e) {
  keys[e.key] = true;
});

document.addEventListener("keyup", function (e) {
  keys[e.key] = false;
});

function updatePlayer() {
  if (player.isDead) return;

  if (keys["ArrowUp"] || keys["w"] || keys["W"]) player.y -= player.speed;
  if (keys["ArrowDown"] || keys["s"] || keys["S"]) player.y += player.speed;
  if (keys["ArrowLeft"] || keys["a"] || keys["A"]) player.x -= player.speed;
  if (keys["ArrowRight"] || keys["d"] || keys["D"]) player.x += player.speed;

  // Boundary conditions
  if (player.x < 0) player.x = 0;
  if (player.y < 0) player.y = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawHealthBar() {
  ctx.strokeStyle = "white";
  ctx.strokeRect(20, 20, 200, 20);
  ctx.fillStyle = "orange";
  ctx.fillRect(20, 20, (player.hp / player.maxHp) * 200, 20);
}

let bones = [];
let boneCooldown = 0;

function spawnBone() {
  bones.push({ x: Math.random() * (canvas.width - 10), y: canvas.height, width: 10, height: 30, speed: 3 });
}

function updateBones() {
  for (let i = 0; i < bones.length; i++) {
    bones[i].y -= bones[i].speed;

    // Collision detection
    if (
      !player.isDead &&
      boneCooldown <= 0 &&
      bones[i].x < player.x + player.width &&
      bones[i].x + bones[i].width > player.x &&
      bones[i].y < player.y + player.height &&
      bones[i].y + bones[i].height > player.y
    ) {
      player.hp -= 10;
      boneCooldown = 30;
      if (player.hp <= 0) {
        player.hp = 0;
        player.isDead = true;
      }
    }
  }
  bones = bones.filter(b => b.y + b.height > 0);
  if (boneCooldown > 0) boneCooldown--;
}

function drawBones() {
  ctx.fillStyle = "white";
  for (let b of bones) {
    ctx.fillRect(b.x, b.y, b.width, b.height);
  }
}

function drawDeathScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "48px sans-serif";
  ctx.fillText("YOU DIED", canvas.width / 2 - 120, canvas.height / 2);
  ctx.font = "20px sans-serif";
  ctx.fillText("Refresh to try again", canvas.width / 2 - 90, canvas.height / 2 + 40);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  updateBones();

  drawBones();
  drawPlayer();
  drawHealthBar();

  if (player.isDead) {
    drawDeathScreen();
  }

  requestAnimationFrame(gameLoop);
}

setInterval(spawnBone, 1000);
gameLoop();
