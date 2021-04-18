let gameState = false;
let isOver = false;
let box = document.getElementsByClassName('box');
let gameController = document.getElementById('gameController');
let count = 0;
let playList = [[], [], []];
let currentPlayer = 1;

for (let i = 0; i < box.length; i++) {
  box[i].onclick = () => {
    paly(box[i], i);
  };
}

function paly(el, index) {
  if (!gameState || isOver) return;
  for (let i = 0; i < el.classList.length; i++)
    if (el.classList[i] == 'cross' || el.classList[i] == 'circle') return;
  let x, y;
  x = index % 3;
  y = Math.floor(index / 3);
  playList[y][x] = currentPlayer;
  el.classList.add(currentPlayer == 1 ? 'circle' : 'cross');
  currentPlayer = -currentPlayer;
  vactory(y, x);
  count++;
}

function vactory(row, col) {
  let vx = (vy = vr = vl = 0);
  for (let i = 0; i < 3; i++) {
    vy += playList[row][i];
    vx += playList[i][col];
    vr += playList[i][i];
    vl += playList[2 - i][i];
  }
  if (
    Math.abs(vy) === 3 ||
    Math.abs(vx) === 3 ||
    Math.abs(vr) === 3 ||
    Math.abs(vl) === 3
  ) {
    document.getElementById('res').innerText = `GAMEOVER ${
      currentPlayer == -1 ? 'O' : 'X'
    } WIN!`;
    isOver = true;
    gameController.innerText = 'RETRY';
  } else if (count === 8) {
    document.getElementById('res').innerText = `GAMEOVER FLAT`;
    isOver = true;
    gameController.innerText = 'RETRY';
  }
}

gameController.addEventListener('click', () => {
  if (!gameState) gameStart();
  else if (isOver) retry();
});

function gameStart() {
  gameState = true;
  gameController.innerText = 'PLAYING';
}
function retry() {
  isOver = false;
  count = 0;
  for (let i = 0; i < box.length; i++) {
    const element = box[i];
    element.className = 'box';
  }
  document.getElementById('res').innerText = ` `;
  playList = [[], [], []];
  gameController.innerText = 'PLAYING';
}
