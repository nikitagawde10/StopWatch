// rather than time calculator it could be formattingUtils
import getFormattedTime from "./timeCalculator.js";
// import laps from './lapCounter.js';
// import {changeButtonTextToStart , changeButtonTextToLap} from './timerFunctions.js'
const startStopButton = document.getElementById("startStopButton");
const lapResetButton = document.getElementById("lapResetButton");
const lapsContainer = document.getElementsByClassName("laps")[0];
const primaryButton = document.getElementsByClassName("startbutton")[0];
const displayTimerDiv = document.getElementById("displayTimerDiv");
let isRunning = false;
let totalTime = 0;
let timeHandler = null;
let startButtonClickedTime = 0;
let stopButtonClickedTime = 0;
const START_TEXT = "Start";
const RESET_TEXT = "Reset";
const STOP_TEXT = "Stop";
const LAP_TEXT = "Lap";
let isCurrentSession = false;
// define lapNumber
const LapState = {
  numOfLaps: 0,
  min: undefined,
  max: undefined,
  lastLapTimeStamp: undefined, // store previous lap
};
startStopButton.onclick = () => {
  if (!isRunning) {
    isCurrentSession = true; // isCurrentSession
    isRunning = true; // isRunning
    changeButtonTextToStop();
    lapResetButton.disabled = false;
    lapResetButton.classList.remove("disabled");
    startButtonClickedTime = Date.now();
    startTimerLoop();
  } else {
    changeButtonTextToStart();
    stopButtonClickedTime = Date.now();
    totalTime += getDriftTimeSinceLastStart(stopButtonClickedTime);
    isRunning = false;
    isCurrentSession = true;
  }
};

lapResetButton.onclick = () => {
  if (isCurrentSession && isRunning) {
    laps();
  }
  if (!isRunning) {
    resetTimer();
  }
};

function changeButtonTextToStop() {
  startStopButton.innerHTML = STOP_TEXT;
  lapResetButton.innerHTML = LAP_TEXT;
  primaryButton.classList.replace("green", "red");
  if (lapResetButton.classList.contains("disabled")) {
    lapResetButton.classList.remove("disabled");
  }
}

function changeButtonTextToStart() {
  startStopButton.innerHTML = START_TEXT;
  lapResetButton.innerHTML = RESET_TEXT;
  primaryButton.classList.replace("red", "green");
}

function changeButtonTextToLap() {
  lapResetButton.innerHTML = "Lap";
  lapResetButton.disabled = true;
  lapResetButton.classList.add("disabled");
}

function getDriftTimeSinceLastStart(currentTime = Date.now()) {
  // calculate time difference
  if (!isRunning) {
    return 0;
  }
  return currentTime - startButtonClickedTime;
}

function getTime() {
  if (!startButtonClickedTime) {
    return 0;
  }
  if (isRunning) {
    return totalTime + getDriftTimeSinceLastStart();
  }
  return totalTime;
}

const startTimerLoop = () => {
  timeHandler = requestAnimationFrame(startTimerLoop);
  displayTimerDiv.innerHTML = getFormattedTime(getTime());
};

primaryButton.classList.add("green");
lapResetButton.disabled = true;
lapResetButton.classList.add("disabled");

function laps() {
  let lapList = document.createElement("li");
  let lapNumber = document.createElement("span");
  let lapTime = document.createElement("span");

  lapsContainer.prepend(lapList);

  let prevLapState = {
    ...LapState,
  };

  lapList.classList.add("lapItem");
  lapNumber.classList.add("lapNumber");
  lapTime.classList.add("lapTime");
  lapList.append(lapNumber, lapTime);
  // lapList.append(lapTime);

  let currentLapTimeStamp = Date.now();
  lapNumber.innerHTML = `Lap ${LapState.numOfLaps + 1}`;
  lapList.id = LapState.numOfLaps + 1;
  if (LapState.numOfLaps === 0) {
    let lapDuration = currentLapTimeStamp - startButtonClickedTime;
    LapState.numOfLaps += 1;
    lapTime.innerHTML = getFormattedTime(lapDuration);
    LapState.max = LapState.min = {
      index: LapState.numOfLaps,
      duration: lapDuration,
    };
    LapState.lastLapTimeStamp = currentLapTimeStamp;
    return;
  }

  let lapDuration = currentLapTimeStamp - LapState.lastLapTimeStamp;
  let lapType = "";
  LapState.numOfLaps += 1;

  if (startButtonClickedTime > LapState.lastLapTimeStamp) {
    lapDuration -= startButtonClickedTime - stopButtonClickedTime;
  }
  LapState.lastLapTimeStamp = currentLapTimeStamp;
  lapTime.innerHTML = getFormattedTime(lapDuration);

  if (lapDuration < LapState.min.duration) {
    LapState.min = {
      index: LapState.numOfLaps,
      duration: lapDuration,
    };
    lapType = "minLap";
  } else if (lapDuration > LapState.max.duration) {
    LapState.max = {
      index: LapState.numOfLaps,
      duration: lapDuration,
    };
    lapType = "maxLap";
  }
  //only 2 laps in the list
  if (LapState.numOfLaps === 2) {
    lapsContainer.children[
      LapState.numOfLaps - LapState.min.index
    ].classList.add("minLap");
    lapsContainer.children[
      LapState.numOfLaps - LapState.max.index
    ].classList.add("maxLap");
    return;
  }

  //changing color for minLap and maxLap - add css class minlap and maxLap
  if (lapType !== "") {
    if (lapType === "minLap") {
      lapsContainer.children[
        LapState.numOfLaps - prevLapState.min.index
      ].classList.remove(lapType);
      lapsContainer.children[
        LapState.numOfLaps - LapState.min.index
      ].classList.add(lapType);
    } else {
      lapsContainer.children[
        LapState.numOfLaps - prevLapState.max.index
      ].classList.remove(lapType);
      lapsContainer.children[
        LapState.numOfLaps - LapState.max.index
      ].classList.add(lapType);
    }
  }
}

function resetLapObject() {
  LapState.numOfLaps = 0;
  LapState.min = undefined;
  LapState.max = undefined;
  LapState.lastLapTimeStamp = undefined;
}

function resetTimer() {
  displayTimerDiv.innerHTML = "00 : 00 . 00";
  startButtonClickedTime = 0;
  isRunning = false;
  totalTime = 0;
  lapsContainer.innerHTML = "";
  resetLapObject(LapState);
  changeButtonTextToLap();
  changeButtonTextToStart();
  lapResetButton.disabled = true;
  lapResetButton.classList.add("disabled");
}
// resetView(){
// all innerHTML, lapREesetButton disabled classList
// }
