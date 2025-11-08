const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  if (!gameActive) return;
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    message.textContent = `${currentPlayer} Wins 🎉`;
    gameActive = false;
    return;
  }
  if ([...cells].every(cell => cell.textContent)) {
    message.textContent = "It's a Draw 🤝";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

restartBtn.addEventListener('click', () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = "X's Turn";
});
