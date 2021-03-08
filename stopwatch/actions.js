const hour=document.getElementById("hour");
const minute=document.getElementById("minute");
const second=document.getElementById("second");
const start=document.getElementById("start");
const pause=document.getElementById("pause");
const stop=document.getElementById("stop");

start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
stop.addEventListener("click", stopTimer);

let run_time=0;
let current_second=0;
let current_minute=0;
let current_hour=0;
function time(){
    current_second++;
    if(current_second==60)
    {
        current_second=0;
        current_minute++;
        if(current_minute==60)
        {
            current_minute=0;
            current_hour++;
            if(current_hour<10)
              hour.innerText='0'+current_hour;
            else
              hour.innerText=current_hour;
        }
        if(current_minute<10)
         minute.innerText='0'+current_minute;
        else
         minute.innerText=current_minute;
    }
    if(current_second<10)
      second.innerText='0'+current_second;
    else
      second.innerText=current_second;
}


function startTimer(){
    current_second=second.innerText;
    current_minute=minute.innerText;
    current_hour=hour.innerText;
    run_time=setInterval(time,1000);
    pause.disabled=false;
    stop.disabled=false;
    start.disabled=true;
    
} 

function pauseTimer(){
    if(pause.innerText==='pause')
    {
        clearInterval(run_time);
        pause.innerText='continue';
    }
    else
    {
        run_time=setInterval(time,1000);
        pause.innerText='pause';
    }
 }
 
function stopTimer(){
    clearInterval(run_time);
    second.innerText="00";
    minute.innerText="00";
    hour.innerText="00";
    pause.innerText='pause';
    start.disabled=false;
    pause.disabled=true;
    stop.disabled=true;
}