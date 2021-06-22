import getFormattedTime from './timeCalculator.js';
import lapTimerFunction from './lapCounter.js';
let startTime;
let passedTime = 0;
let timerInterval;
let startStopButton = document.getElementById("startStopButton");
let lapResetButton = document.getElementById("lapResetButton");
let numOfLaps = 0;
const laps = document.getElementsByClassName("laps")[0];
let runningStatus = false;
let startStopstatus = "stop";

function print(text) {
    document.getElementById("displayTimerDiv").innerHTML = text;
}

function startTimerClicked() {
    if (startStopstatus == "start") {
        startStopButton.innerHTML = "Stop";
        lapResetButton.innerHTML = "Lap";
    } else if (startStopstatus == "stop") {
        startStopButton.innerHTML = "Start";
        lapResetButton.innerHTML = "Reset";
    }
}

startStopButton.onclick = () => {
    if (runningStatus) { //false condition click on start
        startTimerClicked(); //handle button text
        startStopstatus = "start"
        runningStatus = true;
        startTime = Date.now();
        startTimerFunction();
    } else {
        // stopTimerClicked(); //handle button text
        startStopstatus = "stop"
        runningStatus = false;
        pauseTimer(); // pause the timer 
    }
    // timerInterval = setInterval(function printTime() {
    //     passedTime = Date.now() - startTime;
    //     print(getFormattedTime(passedTime));
    // }, 100);
    // showStartPauseButton("PAUSE");
    // showResetLapButton("LAP");
}

lapResetButton.onclick = () => {
    let lapTimeStampWhenLapButtonClicked = Date.now();
    console.log("this is lap time stamp when lap is clicked "+lapTimeStampWhenLapButtonClicked);
    if (!runningStatus) { //true condition
        startStopstatus = "stop";
        let lapTimeStampWhenLapButtonClicked = Date.now();
        lapTimerFunction(lapTimeStampWhenLapButtonClicked,numOfLaps);
        runningStatus = false;
    } else {
        console.log("this is lap time stamp when lap is clicked "+lapTimeStampWhenLapButtonClicked);
        resetTimerClicked();
        startTimerClicked();
    }
}

function resetTimerClicked() {
    clearInterval(timerInterval);
    print("00 : 00 : 00");
    passedTime = 0;
    numOfLaps = 0;
    laps.innerHTML = '';
    // laps.append(resetButton);
    showStartPauseButton("Start");
    showLapResetButton("Reset");
}

function startTimerFunction() {
    startButtonClickedTime = Date.now();
    console.log("this is start button clicked time " + getFormattedTime(startTimerClickedTime));
    timerInterval = setInterval(function printTime() {
        passedTime = Date.now() - startButtonClickedTime;
        print(getFormattedTime(passedTime));
    }, 1000);
    showStartPauseButton("Pause");
    // showStartPauseButton("PAUSE");
    ShowLapResetButton("LAP");
}

function pauseTimer() {
    clearInterval(timerInterval);
    console.log(passedTime);
    // showStartPauseButton("PLAY");
}