console.log("test success");
let root= document.getElementById("root");

let randomArray = [];
let score = 0;

let gameStateActive = true;


//making the grid:

let count = 0;
for(let i=1; i<10; i++){
    let row = document.createElement("div");
    row.setAttribute("class" , "grid");
    for(let j=1; j<10; j++){
        let column = document.createElement("div");
        column.setAttribute("id" , `cell_${++count}`);
        column.setAttribute("index" , `${count}`);
        column.setAttribute("class" , "box");
        row.appendChild(column);
    }
    root.appendChild(row);
}

generateRandomArray();

//generation of Random array
function generateRandomArray(){
    while(randomArray.length<10){
        // why this creates length = 10 and randomArray.length<=10, length was 11?????
        let number = Math.floor(Math.random()*81 +1);

        if(randomArray.length<=10 && !randomArray.includes(number)){
            randomArray.push(number);
        }
    }
    console.log(randomArray);
}


function restartGame(){
    gameStateActive =true;
    score = 0;
    displayScore();
    randomArray =[];
    generateRandomArray();
    //remove bckground colors
    document.getElementById("resultDisplay").innerHTML = "";
    document.querySelectorAll(".box").forEach((box)=>box.style.backgroundColor = "gray");
    document.querySelectorAll(".box").forEach((box)=>box.style.backgroundImage = "none");
}


function scoreCount(){
    score++;
    displayScore();
}

let scoreHeading = document.getElementById("gameScore");
let displayScore = ()=> scoreHeading.innerHTML = score;


function gameOver(){

    gameStateActive = false ;
    //display bomb
    for( let i =0; i<10; i++){
        let bombCell = document.getElementById(`cell_${randomArray[i]}`);
        bombCell.style.backgroundColor = "red";
        bombCell.style.backgroundImage = "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
        // not displaying the background image
    }
    //gameState-->inacive
    document.getElementById("resultDisplay").innerHTML = "game over";
}

function youWon(){
    document.getElementById("resultDisplay").innerHTML = "win";
} 

function handleCellClick(clickedCellEvent){
    if(!gameStateActive){
        return;
    }

    let clickedCell = clickedCellEvent.target;
    let clickedCellIndex = parseInt(clickedCell.getAttribute("index"));

    //1. hasBomb
    if(randomArray.includes(clickedCellIndex)){
        gameOver();
        return;
    }

    //2. check if clicked already
    if(clickedCell.style.backgroundColor === "green"){  
        //rgb(55, 148, 52)){
        return;
    }
    else{
        //3. change color to green
        clickedCell.style.backgroundColor = "green"; //rgb(55, 148, 52);
    }

    

    //4. increase score
    scoreCount();

    //5. win win?
    if(score == 71){
        youWon();
        return;
    }
}

document.querySelectorAll(".box").forEach((cell)=>cell.addEventListener("click",handleCellClick));

