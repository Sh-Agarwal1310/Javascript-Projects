let statusDisplay =  document.querySelector(".game--status");

let currentPlayer = "X";

let gameActive = true;

let gameState = ["","","","","","","","",""];

let winningMessage = () =>`player ${currentPlayer} has won!`;

let gameOverMessage =()=> `Game Over`;

let currentPlayerTurn =() => `${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditionsArray = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
];

function handlePlayerChange(){
    currentPlayer = currentPlayer==='X'?"O":"X" ;
    statusDisplay.innerHTML= currentPlayerTurn();
}

function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    // console.log(gameState);
}

function handleResultValidation(){
    let roundWon = false;
    for(let i=0; i<winningConditionsArray.length; i++){
        let winningCondition = winningConditionsArray[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];

        if(a===b && b===c && a!=""){
            roundWon = true;
            break;
        }

    }

    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundOver = !gameState.includes("");
    if(roundOver){
        statusDisplay.innerHTML= gameOverMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent){
    let clickedCell = clickedCellEvent.target;
    //node where that event was perormed 
    let clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
    
    if(gameState[clickedCellIndex] !==""  || !gameActive){
        return;
    } 

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function RestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=>cell.innerHTML="");
}

document.querySelectorAll(".cell").forEach((cell)=> cell.addEventListener("click",handleCellClick));

document.querySelector(".game--restart").addEventListener("click", RestartGame);
