

console.log('connected!');

/* TO DOs
- build board
- function to detect a tie
- reset button (handle onClick event)

- rules of the game
- alternate between x and o player, keep track of how many placed onto board and swap per play
- after each play, check if diagonal or row or column filled up
- if yes, display winner 
- if no and board is filled up, there is a tie, display tie
*/



// constants 
const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

var board = Array.from(Array(9).keys());

var currentPlayer = 'X';
var previousPlayer = null; 

// event listener to see which cell was clicked 
document.addEventListener('click', function(e){
  if(e.target.className=="cell"){
   console.log(`clicked on cell--> ${e.target.id}`);
  }
});

let reset = document.getElementById('reset-button');

reset.addEventListener('click', (event) => {
  console.log('Resetting game now');
  // function to reset board will come later 
})





/*
- add event listeners to each div class
- start with player X and change innerText of div to 'X' when box is clicked
   - make sure board square is empty before placing
- keep track of how many times playerX and playerO makes a play on an array holding where they clicked
- push that element's box id onto the player's array 

togglePlayer
- if no wins/ties, switch to player O's turn
- once it's the end of a turn, check for a win

checkWin
compare the array of the turn with winningCombos array indexes

resetGame 
*/