import getFormattedTime from './timeCalculator.js';
import {resetTimerClicked, startTimerFunction, pauseTimer} from './timerFunctions.js';
import lapTimerFunction from './lapCounter.js';
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


startStopButton.onclick = () => {
    if (!runningStatus) { //false condition click on start
        startStopButton.innerHTML //CHANGE BTN TEXT
        // startStopstatus = "start" dont need
        runningStatus = true;
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
        lapTimerFunction(lapTimeStampWhenLapButtonClicked,startButtonClickedTime);
        runningStatus = false;
    } else {
        console.log("this is lap time stamp when lap is clicked "+lapTimeStampWhenLapButtonClicked);
        resetTimerClicked();
        startTimerClicked();
    }
}

