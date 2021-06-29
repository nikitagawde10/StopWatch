import getFormattedTime from './timeCalculator.js';
import laps from './lapCounter.js';
let startStopButton = document.getElementById("startStopButton");
let lapResetButton = document.getElementById("lapResetButton");
let lapsContainer = document.getElementsByClassName("laps")[0];
let start_button = document.getElementsByClassName("startbutton")[0];
let displayTimerDiv = document.getElementById("displayTimerDiv");
let runningStatus = false;
let totalTime = 0;
let timeHandler;
let startButtonClickedTime = 0;
let stopButtonClickedTime = 0;
const START_TEXT = "Start";
const RESET_TEXT = "Reset";
const STOP_TEXT = "Stop";
const LAP_TEXT = "Lap";
let newSession = false;

let LapsObject = {
    numOfLaps: 0,
    min: undefined,
    max: undefined,
    lastLapTimeStamp: undefined //store previous lap 
}


start_button.classList.add("green");
lapResetButton.classList.add("disabled");

startStopButton.onclick = () => {
    if (!runningStatus) {
        newSession = true;
        runningStatus = true;
        changeButtonTextToStop();
        lapResetButton.classList.remove("disabled");
        startButtonClickedTime = Date.now();
        console.log("this is start button clicked time when clicked on startButton " + startButtonClickedTime);
        startTimerLoop();
        console.log("the running status when clicked on start is " + runningStatus);
        console.log("the session status when clicked on start is " + newSession);
    } else {
        changeButtonTextToStart();
        stopButtonClickedTime = Date.now()
        console.log("this is stop button clicked time when clicked on stopButton " + stopButtonClickedTime);
        totalTime += getDriftTimeSinceLastStart(stopButtonClickedTime);
        console.log("this is total time button clicked time when clicked on stopButton " + totalTime);
        runningStatus = false;
        newSession = true;
        console.log("the running status when clicked on stop is " + runningStatus);
        console.log("the session status when clicked on stop is " + newSession);
    }
};

lapResetButton.onclick = function () {
    if (newSession != true) {
        console.log("lap button clicked")
        laps();
    } else if (runningStatus == false) {
        resetTimer();
    }
}

function resetTimer() {
    displayTimerDiv.textContent = "00 : 00 . 00";
    startButtonClickedTime = 0;
    runningStatus = false;
    totalTime = 0;
    lapsContainer.innerHTML = '';
    console.log(LapsObject);
    resetLapObject();
    changeButtonTextToLap();
    changeButtonTextToStart();
}

function getDriftTimeSinceLastStart(currentTime = Date.now()) { //calculate time difference
    // console.log("this is start button clicked time in drift time" + startButtonClickedTime);
    if (!runningStatus) {
        return 0;
    }
    return currentTime - startButtonClickedTime;
}

let startTimerLoop = () => {
    timeHandler = requestAnimationFrame(startTimerLoop);
    displayTimerDiv.innerHTML = getFormattedTime((getTime()));
}

function getTime() {
    if (!startButtonClickedTime) {
        return 0;
    }
    if (runningStatus) {
        return totalTime + getDriftTimeSinceLastStart();
    }
    return totalTime;

}



function resetLapObject() {
    LapsObject.numOfLaps = 0;
    LapsObject.min = undefined;
    LapsObject.max = undefined;
    LapsObject.lastLapTimeStamp = undefined;
}


function changeButtonTextToStop() {
    startStopButton.innerHTML = STOP_TEXT;
    lapResetButton.innerHTML = LAP_TEXT;
    start_button.classList.replace("green", "red");
    if (lapResetButton.disabled) {
        lapResetButton.disabled = false;
        if (lapResetButton.classList.contains("disabled")) {
            lapResetButton.classList.remove("disabled");
        }
    }
}


function changeButtonTextToStart() {
    startStopButton.innerHTML = START_TEXT;
    lapResetButton.innerHTML = RESET_TEXT;
    start_button.classList.replace("red", "green");
}

function changeButtonTextToLap() {
    lapResetButton.innerHTML = "Lap";
    lapResetButton.disabled = true;
    lapResetButton.classList.add("disabled");
}