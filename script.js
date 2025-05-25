const cells = document.querySelectorAll('.cell');
const info = document.getElementById('info');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (!board[index] && !gameOver) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
        info.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
      } else if (board.every(cell => cell)) {
        info.textContent = "It's a draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        info.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  });
});

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function restartGame() {
  board = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameOver = false;
  info.textContent = "Player X's turn";
}
