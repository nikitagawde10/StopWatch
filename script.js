import getFormattedTime from './timeCalculator.js';
// import {
//     resetTimerClicked,
//     startTimerFunction,
//     pauseTimer
// } from './timerFunctions.js';
import  printText  from './timerFunctions.js';
import lapTimerFunction from './lapCounter.js';
let passedTime = 0;
let timerInterval;
let startStopButton = document.getElementById("startStopButton");
let lapResetButton = document.getElementById("lapResetButton");

const laps = document.getElementsByClassName("laps")[0];
let runningStatus = false;
let startButtonClickedTime;


startStopButton.onclick = () => {
    if (!runningStatus) { //true condition clicked on start, change text to stop, change reset to laps, 
        startStopButton.innerHTML = "Stop"
        lapResetButton.innerHTML = "Lap"
        runningStatus = true;
        startTimerFunction();
    } else {
        lapResetButton.innerHTML = "reset"
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
    console.log("this is lap time stamp when lap is clicked " + getFormattedTime(lapTimeStampWhenLapButtonClicked));
    if (!runningStatus) { //true condition 
        let lapTimeStampWhenLapButtonClicked = Date.now();
        lapResetButton.innerHTML = "lap";
        startStopButton.innerHTML = "stop";
        lapTimerFunction(lapTimeStampWhenLapButtonClicked, startButtonClickedTime);
        runningStatus = true;
        console.log("After clicking lap button the running status is " + runningStatus);

    } else if(runningStatus){
        lapResetButton.innerHTML = "reset";
        resetTimerClicked();
    }
}

export function startTimerClicked() {
    if (startStopstatus == "start") {
        startStopButton.innerHTML = "Stop";
        lapResetButton.innerHTML = "Lap";
    } else if (startStopstatus == "stop") {
        startStopButton.innerHTML = "Start";
        lapResetButton.innerHTML = "Reset";
    }
}

export function resetTimerClicked() {
    clearInterval(timerInterval);
    printText("00 : 00 : 00");
    passedTime = 0;
    numOfLaps = 0;
    laps.innerHTML = '';
    // laps.append(resetButton);
    // showStartPauseButton("Start");
    // showLapResetButton("Reset");
}

export function startTimerFunction() {
    let startButtonClickedTime = Date.now();
    console.log("this is start button clicked time " + getFormattedTime(startButtonClickedTime));
    timerInterval = setInterval(function printTime() {
        passedTime = Date.now() - startButtonClickedTime;
        printText(getFormattedTime(passedTime));
    }, 10);
    // showStartPauseButton("Pause");
    // // showStartPauseButton("Stop");
    // ShowLapResetButton("LAP");
}

export function pauseTimer() {
    clearInterval(timerInterval);
    console.log(passedTime);
    // showStartPauseButton("PLAY");
}
