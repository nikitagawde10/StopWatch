import getFormattedTime from './timeCalculator.js';
let startTime;
let passedTime = 0;
let timerInterval;
let startStopButton = document.getElementById("startStopButton");
// let pauseButton = document.getElementById("pauseButton");
let lapResetButton = document.getElementById("lapResetButton");
let numOfLaps = 0;
const laps = document.getElementsByClassName("laps")[0];
let lapArray = [];

let status = "stop";
function print(text) {
    document.getElementById("displayTimerDiv").innerHTML = text;
}

function startStopButtonClicked() {
    if(status == "start"){
        startStopButton.innerHTML = "Stop";
        lapResetButton.innerHTML = "Lap";
    }
    if(status == "stop"){
        startStopButton.innerHTML = "Start";
        lapResetButton.innerHTML = "Reset";
    }
    // if(status == "stop"){
    //     //display start button
    // }
    // if(status == "start"){
    //     //display pause button
    // }
    // const buttonToShow = toggleValue === "PLAY" ? startButton : pauseButton;
    // const buttonToHide = toggleValue === "PLAY" ? pauseButton : startButton;
    // buttonToShow.style.display = "block";
    // buttonToHide.style.display = "none";
}
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(function printTime() {
        passedTime = Date.now() - startTime;
        print(getFormattedTime(passedTime));
    }, 100);
    showStartPauseButton("PAUSE");
}
startButton.onclick = () => {
    startTime = Date.now();
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

lapButton.onclick = () => {
    console.log("Stopwatch start time is " + getFormattedTime(startTime));
    print(getFormattedTime(passedTime));

    console.log('Testing function lap');
    // const li = document.createElement("li");
    // const number = document.createElement("span");
    // const timeStamp = document.createElement("span");
    // li.setAttribute("class", "li-item");
    // number.setAttribute("class", "number");
    // timeStamp.setAttribute("class", "timeStamp");
    // number.innerText = `${++numOfLaps}`;
    // timeStamp.innerHTML = getFormattedTime(passedTime);
    // li.append(number, timeStamp);
    // laps.append(li);
    let lapTimeStamp = Date.now();
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    let newLaps = [number, timeStamp]

    console.log("Lap time stamp when lap button is clicked is " + getFormattedTime(lapTimeStamp));
    console.log("Stopwatch start time is " + getFormattedTime(startTime));

    if (!lapArray.length) {
        timeStamp.innerHTML = getFormattedTime((lapTimeStamp - startTime));
    } else {
        let previousLap = lapArray[lapArray.length - 1];
        timeStamp.innerHTML = getFormattedTime((lapTimeStamp - previousLap[1]));
    }
    lapArray.push([newLaps, lapTimeStamp]);
    console.log(lapArray);
    console.log('Testing function lap');
    li.setAttribute("class", "li-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timeStamp");
    number.innerText = `${++numOfLaps}`;
    // timeStamp.innerHTML = getFormattedTime((lapTimeStamp - startTime));
    // timeStamp.innerHTML = getFormattedTime(passedTime);
    li.append(number, timeStamp);
    laps.append(li);
}