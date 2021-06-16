let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
let intervals = null;
let lapCounter = 0;
let startButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let resetButton = document.getElementById("resetButton");


const laps = document.getElementsByClassName("laps")[0];

function timeCounter() {
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }
    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }
    if (hours < 10) {
        displayHours = "0" + hours.toString();
    } else {
        displayHours = hours;
    }
    document.getElementById('displayTimerDiv').innerHTML = displayHours + " : " + displayMinutes + " : " + displaySeconds
}


startButton.onclick = function () {
    console.log('Testing function start');
    intervals = window.setInterval(timeCounter, 500);
}

resetButton.onclick = function () {
    console.log('Testing function reset');
    window.clearInterval(intervals);
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 0;
    laps.innerHTML = '';
    laps.append(resetButton);
    document.getElementById("displayTimerDiv").innerHTML = "00 : 00 : 00";
}

stopButton.onclick = function () {
    clearInterval(intervals);
    console.log(displayHours + " : " + displayMinutes + " : " + displaySeconds);
    console.log('Testing function stop');

}
const lap = () => {
    console.log('Testing function lap');
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    li.setAttribute("class", "li-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timeStamp");
    number.innerText = `${++lapCounter}`;
    timeStamp.innerHTML = `${displayHours} : ${displayMinutes} : ${displaySeconds}`;
    li.append(number, timeStamp);
    laps.append(li);
}

// const clearAll = () => {
//     laps.innerHTML = '';
//     // laps.append(resetButton);
// }

lapButton.addEventListener("click", lap);
// resetButton.addEventListener("click", clearAll);