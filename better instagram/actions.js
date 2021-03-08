let firstImageSrc;
let secondImageSrc;
let firstDiv;
let lastDiv;

function dragStart(event){
    let clickedImage = event.target;
    firstImageSrc = clickedImage.src;
    firstDiv = clickedImage.id;
    // console.log(firstImageSrc);
    // console.log(firstDiv);
    return;
}

function dragOver(event){
    event.stopPropagation();
    event.preventDefault();

    let clickedDiv = event.target;
    secondImageSrc = clickedDiv.src;
    lastDiv = clickedDiv.id;
   
    return;
}

function swapImages(){
    document.getElementById(lastDiv).src = firstImageSrc;
    document.getElementById(firstDiv).src = secondImageSrc;
    return;
}

function dragEnd(){
    // console.log(firstImageSrc);
    // console.log(secondImageSrc);
    // console.log(firstDiv);
    // console.log(lastDiv); 
    swapImages();
}

document.querySelectorAll("img").forEach((image) => image.addEventListener('dragstart', dragStart));
document.querySelectorAll("img").forEach((image) => image.addEventListener('dragend', dragEnd));

const divs = document.querySelectorAll("img").forEach((div) => div.addEventListener('dragover', dragOver));

//{capture: false}
