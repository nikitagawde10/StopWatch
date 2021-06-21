import lapCount from './lapCounter.js';
import getFormattedTime from './timeCalculator.js';
// import lapCount from './lapCounter.js';
let startTime;
let passedTime = 0;
let timerInterval;
// let currentMinimumTime = 1000000000000;
let startButton = document.getElementById("startButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");
// let lapButton = document.getElementById("lapButton");
let numOfLaps = 0;

function print(text) {
    document.getElementById("displayTimerDiv").innerHTML = text;
}

function showStartPauseButton(toggleValue) {
    const buttonToShow = toggleValue === "PLAY" ? startButton : pauseButton;
    const buttonToHide = toggleValue === "PLAY" ? pauseButton : startButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}
// function showResetLapButton(toggleValue) {
//     const buttonToShow = toggleValue === "LAP" ? lapButton : resetButton;
//     const buttonToHide = toggleValue === "LAP" ? resetButton : lapButton;
//     buttonToShow.style.display = "block";
//     buttonToHide.style.display = "none";
// }
//research adding css to template literals for max min

startButton.onclick = () => {
    startTime = Date.now() - passedTime;
    timerInterval = setInterval(function printTime() {
        passedTime = Date.now() - startTime;
        print(getFormattedTime(passedTime));
    }, 100);
    showStartPauseButton("PAUSE");
    // showResetLapButton("LAP");
}

pauseButton.onclick = () => {
    clearInterval(timerInterval);
    console.log(passedTime);
    showStartPauseButton("PLAY");
}

resetButton.onclick = () => {
    clearInterval(timerInterval);
    print("00 : 00 : 00");
    passedTime = 0;
    // lapCounter = 0;
    // laps.innerHTML = '';
    // laps.append(resetButton);
    showStartPauseButton("PLAY");
}

// lapButton.onclick = () => {
//     clearInterval(timerInterval);
    //    numOfLaps++
    //    lapCounter(numOfLaps);
//             if(passedTime < currentMinimumTime){
//                 currentMinimumTime = passedTime;
//                // show currentMinimumTime in green color print(timeToString(currentMinimumTime));
//                 passedTime = 0;
//             }
//             else if(passedTime > currentMaximumTime){
//                 currentMaximumTime = passedTime;
//                 // show currentMaximumTime in green color print(timeToString(currentMaximumTime));
//                 passedTime = 0;
//             //    ******** startTimer() should begin here *********
//             }
//             else{
//                 print(timeToString(passedTime));
//                 passedTime = 0;
//             }
//     console.log('Testing function lap');
//     const li = document.createElement("li");
//     const number = document.createElement("span");
//     const timeStamp = document.createElement("span");
//     li.setAttribute("class", "li-item");
//     number.setAttribute("class", "number");
//     timeStamp.setAttribute("class", "timeStamp");
//     number.innerText = `${++lapCounter}`;
//     timeStamp.innerHTML = getFormattedTime(passedTime);
//     li.append(number, timeStamp);
//     laps.append(li);
// }