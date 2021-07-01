import getFormattedTime from './timeCalculator.js';
// import laps from './lapCounter.js';
// import {changeButtonTextToStart , changeButtonTextToLap} from './timerFunctions.js'
const startStopButton = document.getElementById('startStopButton');
const lapResetButton = document.getElementById('lapResetButton');
const lapsContainer = document.getElementsByClassName('laps')[0];
const start_button = document.getElementsByClassName('startbutton')[0];
const displayTimerDiv = document.getElementById('displayTimerDiv');
let runningStatus = false;
let totalTime = 0;
let timeHandler = null;
let startButtonClickedTime = 0;
let stopButtonClickedTime = 0;
const START_TEXT = 'Start';
const RESET_TEXT = 'Reset';
const STOP_TEXT = 'Stop';
const LAP_TEXT = 'Lap';
let sessionStatus = false;
// define lapNumber
const LapState = {
  numOfLaps: 0,
  min: undefined,
  max: undefined,
  lastLapTimeStamp: undefined, // store previous lap
};
startStopButton.onclick = () => {
  if (!runningStatus) {
    sessionStatus = true; // isCurrentSession
    runningStatus = true; // isRunning
    changeButtonTextToStop();
    lapResetButton.disabled = false;
    lapResetButton.classList.remove('disabled');
    startButtonClickedTime = Date.now();
    startTimerLoop();
  } else {
    changeButtonTextToStart();
    stopButtonClickedTime = Date.now();
    totalTime += getDriftTimeSinceLastStart(stopButtonClickedTime);
    runningStatus = false;
    sessionStatus = true;
  }
};

lapResetButton.onclick = () => {
  if (sessionStatus && runningStatus) {
    laps();
  }
  if (!runningStatus) {
    resetTimer();
  }
};

function changeButtonTextToStop() {
  startStopButton.innerHTML = STOP_TEXT;
  lapResetButton.innerHTML = LAP_TEXT;
  start_button.classList.replace('green', 'red');
  if (lapResetButton.classList.contains('disabled')) {
    lapResetButton.classList.remove('disabled');
  }
}

function changeButtonTextToStart() {
  startStopButton.innerHTML = START_TEXT;
  lapResetButton.innerHTML = RESET_TEXT;
  start_button.classList.replace('red', 'green');
}

function changeButtonTextToLap() {
  lapResetButton.innerHTML = 'Lap';
  lapResetButton.disabled = true;
  lapResetButton.classList.add('disabled');
}

function getDriftTimeSinceLastStart(currentTime = Date.now()) { // calculate time difference
  if (!runningStatus) {
    return 0;
  }
  return currentTime - startButtonClickedTime;
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

const startTimerLoop = () => {
  timeHandler = requestAnimationFrame(startTimerLoop);
  displayTimerDiv.innerHTML = getFormattedTime((getTime()));
};

start_button.classList.add('green');
lapResetButton.disabled = true;
lapResetButton.classList.add('disabled');

function laps() {
  // LapState = createLapObject();
  const lapList = document.createElement('li');
  const lapNumber = document.createElement('p'); // use span
  const lapTime = document.createElement('p'); // use span

  lapsContainer.prepend(lapList);
  lapList.classList.add('lapItem');
  lapList.append(lapNumber);
  lapList.append(lapTime);
  const prevLapState = {
    ...LapState,
  };

  const currentLapTimeStamp = Date.now();

  lapNumber.innerHTML = `Lap ${LapState.numOfLaps + 1}`;
  if (LapState.numOfLaps === 0) {
    const lapDuration = currentLapTimeStamp - startButtonClickedTime;
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
  let lapType = '';
  LapState.numOfLaps += 1;

  if (startButtonClickedTime > LapState.lastLapTimeStamp) {
    lapDuration -= (startButtonClickedTime - stopButtonClickedTime);
  }
  LapState.lastLapTimeStamp = currentLapTimeStamp;
  lapTime.innerHTML = getFormattedTime(lapDuration);

  if (lapDuration < LapState.min.duration) {
    LapState.min = {
      index: LapState.numOfLaps,
      duration: lapDuration,
    };
    lapType = 'minLap';
  } else if (lapDuration > LapState.max.duration) {
    LapState.max = {
      index: LapState.numOfLaps,
      duration: lapDuration,
    };
    lapType = 'maxLap';
  }
  // let minLapIndex  = LapState.numOfLaps - prevLapState.min.index
  // let maxLapIndex = LapState.numOfLaps - LapState.max.index
  // only 2 laps in the list
  if (LapState.numOfLaps === 2) {
    lapsContainer.children[LapState.numOfLaps - LapState.min.specialCaseIndex].classList.add('minLap');
    lapsContainer.children[LapState.numOfLaps - LapState.max.specialCaseIndex].classList.add('maxLap');
    return;
  }

  // changing color for minLap and maxLap - add css class minlap and maxLap
  if (lapType !== '') {
    if (lapType === 'minLap') {
      lapsContainer.children[LapState.numOfLaps - prevLapState.min.specialCaseIndex].classList.remove(lapType);
      lapsContainer.children[LapState.numOfLaps - LapState.min.specialCaseIndex].classList.add(lapType);
    } else {
      lapsContainer.children[LapState.numOfLaps - prevLapState.max.specialCaseIndex].classList.remove(lapType);
      lapsContainer.children[LapState.numOfLaps - LapState.max.specialCaseIndex].classList.add(lapType);
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
  displayTimerDiv.innerHTML = '00 : 00 . 00';
  startButtonClickedTime = 0;
  runningStatus = false;
  totalTime = 0;
  lapsContainer.innerHTML = '';
  resetLapObject(LapState);
  changeButtonTextToLap();
  changeButtonTextToStart();
  lapResetButton.disabled = true;
  lapResetButton.classList.add('disabled');
}
// resetView(){
// all innerHTML, lapREesetButton disabled classList
// }

// function createLapObject(){
//     let lapList = document.createElement('li');
//     let lapNumber = document.createElement('p');
//     let lapTime = document.createElement('p');

//     lapsContainer.prepend(lapList);

//     lapList.classList.add('lapItem');
//     lapList.append(lapNumber);
//     lapList.append(lapTime);
// }