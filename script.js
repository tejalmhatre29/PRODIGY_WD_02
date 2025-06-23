const startButton=document.getElementById("start");
const stopButton=document.getElementById("stop");
const pauseButton=document.getElementById("pause");
const continueButton = document.getElementById("continue"); 
const resetButton=document.getElementById("reset");
const lapButton=document.getElementById("lap");
const lapResetButton=document.getElementById("lap-reset");
const toggleButton=document.getElementById("toggle");
const display = document.getElementById("display");

let start_time=0;
let elapsed=0;
let isRunning=false;
let lap_count=0;
let interval;

const lap_list=document.createElement("ul");
lap_list.id="laps";
document.querySelector(".stopwatch-container").appendChild(lap_list);

function Time(ms)
{
    const hours=Math.floor(ms/(1000*60*60));
    const minutes=Math.floor((ms%(1000*60*60)) / (1000*60));
    const seconds=Math.floor((ms%(1000*60))/1000);
    const centiseconds=Math.floor((ms%1000)/10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function pad(n){
    return n.toString().padStart(2,"0");
}

function updateDisplay(){
    const now=Date.now();
    elapsed=now-start_time;
    display.textContent=Time(elapsed);
}

startButton.onclick=()=>{
    if(!isRunning)
    {
        start_time=Date.now()-elapsed;
        interval=setInterval(updateDisplay,50);
        isRunning=true;
    }
};

stopButton.onclick=()=>{
    clearInterval(interval);
    isRunning=false;
    elapsed=0;
    updateDisplay.textContent="00:00:00:00";
    continueButton.style.display = "none";

};

pauseButton.onclick=()=>{
  if(isRunning){
    clearInterval(interval);
    isRunning=false;
    continueButton.style.display = "inline-block";
  }

};

continueButton.onclick = () => {
    if (!isRunning) {
        start_time = Date.now() - elapsed;
        interval = setInterval(updateDisplay, 50);
        isRunning = true;
        continueButton.style.display = "none";
    }
};


lapButton.onclick=()=>{
    if(!isRunning) return;
    const li=document.createElement("li");
    li.textContent=`Lap ${++lap_count}: ${Time(elapsed)}`;
    lap_list.appendChild(li);
};

resetButton.onclick = () => {
    clearInterval(interval);
    isRunning = false;
    elapsed = 0;
    display.textContent = "00:00:00:00";
    lap_list.innerHTML = "";
    lap_count = 0;
    continueButton.style.display = "none";

};

toggleButton.onclick=()=>{
    document.body.classList.toggle("light-mode");
};


/* 
   24-june task1 done
   29-june task3 done
   07-june task4 done
   13-june task5 done       */