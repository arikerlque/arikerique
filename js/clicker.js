let coins = 0;
let clickValue = 1;
let autoClickers = 0;

const coinCountEl = document.getElementById("coin-count");
const clickBtn = document.getElementById("click-button");
const autoBtn = document.getElementById("auto-clicker-btn");
const autoCountEl = document.getElementById("auto-clicker-count");
const doubleBtn = document.getElementById("double-click-btn");
const doubleCountEl = document.getElementById("double-click-count");
const afkMessage = document.getElementById("afk-message");
const afkCoinsEl = document.getElementById("afk-coins");
const claimAfkBtn = document.getElementById("claim-afk");

const coinSound = document.getElementById("coin-sound");
const clickSound = document.getElementById("click-sound");

function getAutoClickerCost() {
  return 10 * (autoClickers + 1);
}

function getDoubleClickCost() {
  return 20 * (clickValue / 1);
}

function updateAutoClickerVisuals() {
  const container = document.getElementById("auto-clicker-visuals");
  container.innerHTML = "";

  for (let i = 0; i < autoClickers; i++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("visual-clicker");

    const coin = document.createElement("img");
    coin.src = "https://cdn-icons-png.flaticon.com/512/138/138292.png";
    coin.classList.add("coin");

    const cursor = document.createElement("img");
    cursor.src = "https://cdn-icons-png.flaticon.com/512/32/32441.png";
    cursor.classList.add("cursor");

    wrapper.appendChild(coin);
    wrapper.appendChild(cursor);
    container.appendChild(wrapper);
  }
}

function updateDisplay() {
  coinCountEl.textContent = "Coins: " + coins;
  autoCountEl.textContent = "Owned: " + autoClickers;
  doubleCountEl.textContent = "Level: " + (clickValue / 1);
  autoBtn.textContent = `Buy Auto Clicker (${getAutoClickerCost()} coins)`;
  doubleBtn.textContent = `Buy Double Clicks (${getDoubleClickCost()} coins)`;
  updateAutoClickerVisuals();
}

function playSound(audio) {
  audio.currentTime = 0;
  audio.play();
}

function saveGame() {
  const saveData = {
    coins,
    clickValue,
    autoClickers
  };
  localStorage.setItem("clickerSave", JSON.stringify(saveData));
  console.log("Game saved!");
}

clickBtn.addEventListener("click", () => {
  coins += clickValue;
  updateDisplay();
  playSound(coinSound);
});

autoBtn.addEventListener("click", () => {
  const cost = getAutoClickerCost();
  if (coins >= cost) {
    coins -= cost;
    autoClickers += 1;
    updateDisplay();
  }
});

doubleBtn.addEventListener("click", () => {
  const cost = getDoubleClickCost();
  if (coins >= cost) {
    coins -= cost;
    clickValue *= 2;
    updateDisplay();
  }
});

setInterval(() => {
  coins += autoClickers;
  updateDisplay();
}, 1000);

setInterval(saveGame, 5000);
window.addEventListener("beforeunload", saveGame);

window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem("clickerSave"));
  if (savedData) {
    coins = savedData.coins || 0;
    clickValue = savedData.clickValue || 1;
    autoClickers = savedData.autoClickers || 0;
  }

  const savedTime = localStorage.getItem("lastAFKTime");
  const savedClickers = parseInt(localStorage.getItem("autoClickers")) || 0;
  if (savedTime && savedClickers > 0) {
    const timeAway = Math.floor((Date.now() - savedTime) / 1000);
    const earned = timeAway * savedClickers;
    if (earned > 0) {
      afkCoinsEl.textContent = earned;
      afkMessage.classList.remove("hidden");
      claimAfkBtn.onclick = () => {
        coins += earned;
        updateDisplay();
        afkMessage.classList.add("hidden");
      };
    }
  }

  updateDisplay();
});

window.addEventListener("DOMContentLoaded", () => {
  const saveNowBtn = document.getElementById("save-now");
  if (saveNowBtn) {
    saveNowBtn.addEventListener("click", () => {
      saveGame();
      alert("Game saved manually!");
    });
  }
});
