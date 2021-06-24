import getFormattedTime from './timeCalculator.js';
import printText from './timerFunctions.js';
import lapTimerFunction from './lapCounter.js';
let passedTime = 0;
let timerInterval;
let elapsedTime = 0;
let startStopButton = document.getElementById("startStopButton");
let lapResetButton = document.getElementById("lapResetButton");
let runningStatus = "stopped";
let startButtonClickedTime;
const laps = document.getElementsByClassName("laps")[0];

startStopButton.onclick = () => {
    if (runningStatus == "stopped") { //true condition clicked on start, change text to stop, change reset to laps, 
        startStopButton.innerHTML = "Stop"
        lapResetButton.innerHTML = "Lap"
        runningStatus = "started";
        startTimerFunction();
    } else {
        startStopButton.innerHTML = "Start"
        lapResetButton.innerHTML = "Reset"
        pauseTimer();
        runningStatus = "stopped";
         // pause the timer 
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
        lapResetButton.innerHTML = "Lap";
        startStopButton.innerHTML = "Stop";
        lapTimerFunction(lapTimeStampWhenLapButtonClicked, startButtonClickedTime, runningStatus);
        runningStatus = true;
        // console.log("After clicking lap button the running status is " + runningStatus);

    } else if (runningStatus) {
        lapResetButton.innerHTML = "Reset";
        resetTimerClicked();
    }
}

export function resetTimerClicked() {
    clearInterval(timerInterval);
    printText("00 : 00 : 00");
    passedTime = 0;
    // numOfLaps = 0;
    laps.innerHTML = '';
    runningStatus = false;
    // laps.append(resetButton);
    // showStartPauseButton("Start");
    // showLapResetButton("Reset");
}

export function startTimerFunction() {
    let startButtonClickedTime = Date.now();
    // passedTime = Date.now() - startButtonClickedTime;
    console.log("this is start button clicked time " + getFormattedTime(startButtonClickedTime));
    if (elapsedTime == 0) {
        timerInterval = setInterval(function printTime() {
            passedTime = Date.now() - startButtonClickedTime;
            // console.log("this is passed time " + passedTime)
            printText(getFormattedTime(passedTime));
        }, 10);
    } else {
        timerInterval = setInterval(function printTime() {
            passedTime = (Date.now() - startButtonClickedTime) + elapsedTime;
            console.log("this is passed time " + (passedTime))
            printText(getFormattedTime(passedTime));
        }, 100);
    }
}

export function pauseTimer() {
    clearInterval(timerInterval);
     elapsedTime = Date.now();
    console.log("This is elapsed time " + (elapsedTime));
    // showStartPauseButton("PLAY");
}