document.querySelector("#reset").style.visibility = "hidden";
document.querySelector("#btn").style.visibility = "hidden";

let imageClickArray =[];

let randomArray = [];

let activeState = true;

const para = document.getElementById("para");
const youWon = () => para.innerHTML = `You are a human. Congratulations!`;
const youLoose = () => para.innerHTML = `We can't verify you as a human. You selected the non-identical tiles.`;

const imageArray =[
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmP9ox6tQMQe0D6oLoBIzawKPKiHHmkwxVrA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-bIyhTzFiEtPnBZfv5IPsgXPpYS46d_bCw&usqp=CAU",
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PavvGqDp1jRhDXMvnL8RkZ6rKZlYM68dVw&usqp=CAU',
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzMo1x4rmOOYY_W-cjzSbl_WZUBkPFSzs4rg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ305E_jx0OZgPzgaSB3nQhGm5I8dvUPjs6YQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREK5djTSCG-OkY6LKcDOhEjAWnvp2fLE-Cxw&usqp=CAU"
];
// image array of size 6

function generateRandomArray(){
        while(randomArray.length < 2){
                // why this creates length = 10 and randomArray.length<=10, length was 11?????
                let number = Math.floor(Math.random()*6 +1);

                if(randomArray.length<2 && !randomArray.includes(number)){
                        randomArray.push(number);
                }
        }
        // console.log(randomArray);
}
//for these two objects in the array, set same images.


function setImage(){        
        for( var i=0; i<6;i++){
                let image = document.getElementById(`image_${i+1}`);
                // console.log(image);
                image.src = imageArray[i];
        }
}

function setMatchingImage(){        
        const src1 = document.getElementById(`image_${randomArray[0]}`).src;
        const src2 = document.getElementById(`image_${randomArray[1]}`);
        // console.log(src2);
        src2.src = src1;
}



function handleClickEvent(clickedCellEvent){
        if(activeState){
                document.querySelector("#reset").style.visibility = "visible";
                let image = clickedCellEvent.target;
                // console.log(image)
                if(imageClickArray.length < 2 && activeState){
                        imageClickArray.push(image);
                        // console.log(imageClickArray)
                }
                if(imageClickArray.length == 2){
                        document.querySelector("#btn").style.visibility = "visible";
                        activeState = false;
                }
        }
        else{
                return;
        }
}

function handleResetEvent(){
        activeState = true;
        imageClickArray =[];
        randomArray = [];
        para.innerHTML ="";

        setImage();
        generateRandomArray();
        setMatchingImage();
        document.querySelector("#reset").style.visibility = "hidden";
        document.querySelector("#btn").style.visibility = "hidden";
}

function handleVerifyEvent(){
        imageClickArray[0].src == imageClickArray[1].src  &&  imageClickArray[0].id != imageClickArray[1].id ? youWon() : youLoose() ;
        activeState = false;
}


setImage();
generateRandomArray();
setMatchingImage();
document.querySelectorAll("img").forEach((cell)=>cell.addEventListener("click",handleClickEvent));
document.querySelector("#reset").addEventListener("click",handleResetEvent);
document.querySelector("#btn").addEventListener("click",handleVerifyEvent);
