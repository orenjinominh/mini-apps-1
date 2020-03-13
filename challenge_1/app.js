/* ----- constants------ */
const gameStatus = document.querySelector('.game-status');
const tallyTotal = document.querySelector('.tally-total');
const winnerDisplay = () => `Player ${currentPlayer} wins!`;
const whoseTurnDisplay = () => `Player ${currentPlayer}'s turn`;
const tieDisplay = () => `It's a tie! Wanna play again?`;
const winnerTallyDisplay = () => `X wins: ${XTally} O wins: ${OTally}`;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/* --- state (variables) -- */

var gameOn = true; 
var currentPlayer = 'X';
var winner; 
var currentBoard = [
  '','','',
  '','','',
  '','',''
];

var XTally = 0;
var OTally = 0;

/* ----- event listeners------ */

document.querySelector('.reset-button').addEventListener('click', restartGame);

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', hasCellBeenClicked));

window.onbeforeunload = resetTally();

/* ----- functions------ */
gameStatus.innerHTML = whoseTurnDisplay();

function hasCellBeenClicked(clickedEvent) {
  const clickedCell = clickedEvent.target; // this should give us the div 
  // grab the index of div clicked, parseInt changes from string to number
  const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));
  // console.log('clickedCellIndex here -->', clickedCellIndex);
  // check if the board at that index has already been filled up or game inactive
  if (currentBoard[clickedCellIndex] !== '' || !gameOn) {
    return; 
  };

  markCell(clickedCell, clickedCellIndex); 
  checkWinOrTie();
}

function markCell(clickedCell, clickedCellIndex) {
  currentBoard[clickedCellIndex] = currentPlayer; 
  clickedCell.innerHTML = currentPlayer; 
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.innerHTML = whoseTurnDisplay();
}

// we need to check if win or tie after cell is marked
// if no wins or ties, change player and continue gameplay
function checkWinOrTie() {
  var won = false; 
  // console.log('current board here--->', currentBoard);
  winningCombos.forEach(combo => {
    if (currentBoard[combo[0]] !== '' && currentBoard[combo[0]] === currentBoard[combo[1]] && currentBoard[combo[0]] === currentBoard[combo[2]]) {
      won = true; 
    }
  })

  if (won) {
    gameStatus.innerHTML = winnerDisplay();
    gameOn = false; 
    winner = currentPlayer; 
    // debugger; 
    renderTally();
    return;

  }

  var tie = !currentBoard.includes('');
  if (tie) {
    gameStatus.innerHTML = tieDisplay();
    gameOn = false; 
    return; 
  }

  changePlayer();
}

function renderTally() {
  console.log(winner);
  if (winner === 'X') {
    XTally += 1; 
  } else if (winner === 'O') {
    OTally +=1; 
  }

  tallyTotal.innerHTML = winnerTallyDisplay();


}

function restartGame() {
  // reset game status, currenBoard, gameStatus display, and clears innerHTML on DOM
  gameOn = true; 
  currentPlayer = winner; 
  currentBoard = [
  '','','',
  '','','',
  '','',''
  ];
  gameStatus.innerHTML = whoseTurnDisplay();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

function resetTally() {
  XTally = 0;
  OTally = 0;
  tallyTotal.innerHTML = winnerTallyDisplay();
}