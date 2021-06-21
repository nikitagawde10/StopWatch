import getFormattedTime from './timeCalculator.js';
let startTime;
let passedTime = 0;
let timerInterval;
let startButton = document.getElementById("startButton");
let pauseButton = document.getElementById("pauseButton");
let lapButton = document.getElementById("lapButton");
let numOfLaps = 0;
const laps = document.getElementsByClassName("laps")[0];

function print(text) {
    document.getElementById("displayTimerDiv").innerHTML = text;
}

function showStartPauseButton(toggleValue) {
    const buttonToShow = toggleValue === "PLAY" ? startButton : pauseButton;
    const buttonToHide = toggleValue === "PLAY" ? pauseButton : startButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}
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
    numOfLaps = 0;
    laps.innerHTML = '';
    // laps.append(resetButton);
    showStartPauseButton("PLAY");
    // btn.innerHTML = "LAPS";
}

// lapButton.onclick = () => {
//     numOfLaps++;
//     lapCount(passedTime, numOfLaps);
//     // showLapResetButton("LAP")// }
lapButton.onclick = () => {
    // clearInterval(timerInterval);
//    numOfLaps++
//    lapCounter(numOfLaps);
            // if(passedTime < currentMinimumTime){
            //     currentMinimumTime = passedTime;
            //    // show currentMinimumTime in green color print(timeToString(currentMinimumTime));
            //     passedTime = 0;
            // }
            // else if(passedTime > currentMaximumTime){
            //     currentMaximumTime = passedTime;
            //     // show currentMaximumTime in green color print(timeToString(currentMaximumTime));
            //     passedTime = 0;
            // //    ******** startTimer() should begin here *********
            // }
            // else{
                print(getFormattedTime(passedTime));
                // passedTime = 0;
            // }
    console.log('Testing function lap');
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    li.setAttribute("class", "li-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timeStamp");
    number.innerText = `${++numOfLaps}`;
    timeStamp.innerHTML = getFormattedTime(passedTime);
    li.append(number, timeStamp);
    laps.append(li);
}