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
    if (board.includes('')) {
        tie = false;
    } else {
        tie = true;
    }
}

const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
        if (board[winningCombos[i][0]] === turn && board[winningCombos[i][1]] === turn && board[winningCombos[i][2]] === turn) {
            win = true;
        }
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