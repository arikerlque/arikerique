
const soul = document.getElementById('soul');
const battleBox = document.getElementById('battleBox');

const boxBounds = {
  left: 0,
  top: 0,
  right: battleBox.clientWidth - soul.clientWidth,
  bottom: battleBox.clientHeight - soul.clientHeight
};

let posX = 190;
let posY = 90;
const speed = 5;

document.addEventListener('keydown', (e) => {
  switch(e.key.toLowerCase()) {
    case 'arrowup':
    case 'w':
      posY = Math.max(boxBounds.top, posY - speed);
      break;
    case 'arrowdown':
    case 's':
      posY = Math.min(boxBounds.bottom, posY + speed);
      break;
    case 'arrowleft':
    case 'a':
      posX = Math.max(boxBounds.left, posX - speed);
      break;
    case 'arrowright':
    case 'd':
      posX = Math.min(boxBounds.right, posX + speed);
      break;
  }
  soul.style.left = posX + 'px';
  soul.style.top = posY + 'px';
});
