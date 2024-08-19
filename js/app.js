/*-------------------------------- Constants --------------------------------*/
const winningCombos = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
  

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let win;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const render = () => {
    updateBoard();
    updateMessage();
}

const updateBoard = () => {
    board.forEach(function(square, idx) {
        if (square === 'X') {
            squareEls[idx].textContent = 'X';
        } else if (square === 'O') {
            squareEls[idx].textContent = 'O';
        } else {
            squareEls[idx].textContent = '';
        }
    });
};

const updateMessage = () => {
    if (!win && !tie) {
        if (turn === 'X') {
          messageEl.textContent = "It's X's turn";
        } else {
          messageEl.textContent = "It's O's turn";
        }
      } else if (!win && tie) {
        messageEl.textContent = 'Tie game';
      } else {
        if (turn === 'X') {
          messageEl.textContent = 'X wins!';
        } else {
          messageEl.textContent = 'O wins!';
        }
      }
}

const handleClick = (event) => {
    const idx = event.target.id;
    const squareIsFull = board[idx] !== '';
    if (squareIsFull || win) {
        return;
    }
    placePiece(idx);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

const placePiece = (idx) => {
    board[idx] = turn;
};

const checkForTie = () => {
    if(
		(board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
		(board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
		(board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
		(board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
		(board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
		(board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
		(board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
		(board[2] !== '' && board[2] === board[4] && board[2] === board[6])
	) {
		winner = true;
	}
};

const checkForWinner = () => {
    if(
		(board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
		(board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
		(board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
		(board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
		(board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
		(board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
		(board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
		(board[2] !== '' && board[2] === board[4] && board[2] === board[6])
	) {
		winner = true;
	}
};
  
const switchPlayerTurn = () => {
    if (win) {
        return;
      }
      if (turn === 'X') {
        turn = 'O'
      } else {
        turn = 'X'
      }
};  

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    win = false;
    tie = false;
    render();
}

init();




/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {    
    square.addEventListener('click', handleClick)
});

resetBtnEl.addEventListener('click', init);