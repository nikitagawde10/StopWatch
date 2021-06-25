import getFormattedTime from './timeCalculator.js';
import printText from './timerFunctions.js';
let startStopButton = document.getElementById("startStopButton");
let lapResetButton = document.getElementById("lapResetButton");
const lapsContainer = document.getElementsByClassName("laps")[0];
let timerDisplay = document.getElementById("displayTimerDiv");
let runningStatus = false;
let totalTime = 0;
let startButtonClickedTime = 0;
let stopButtonClickedTime = 0;

const Laps = {
    numOfLaps: 0,                           
    min: undefined,
    max: undefined,
    lastLapTimeStamp: undefined   //minLap/maxLap{specialCaseIndex : number ; duration: timestamp}
   
}
lapResetButton.disabled = true;


function getDriftTimeSinceLastStart(currentTime = Date.now()) {
    // console.log("this is start button clicked time in drift time" + startButtonClickedTime);
    if (!runningStatus) {
        return 0;
    }
    return currentTime - startButtonClickedTime;
}


let timer;
const timerInterval = () => {
    timer = requestAnimationFrame(timerInterval);
    timerDisplay.textContent = getFormattedTime((getTime()));

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

startStopButton.onclick = () => {
    if (!runningStatus) {
        changeButtonTextToStop();
        runningStatus = true;
        startButtonClickedTime = Date.now();
        console.log("this is start button clicked time when clicked on startButton " + startButtonClickedTime);
        requestAnimationFrame(timerInterval);

    } else {
        changeButtonTextToStart();
        cancelAnimationFrame(timer);
        stopButtonClickedTime = Date.now()
        console.log("this is stop button clicked time when clicked on stopButton " + stopButtonClickedTime);
        totalTime = totalTime + getDriftTimeSinceLastStart(stopButtonClickedTime);
        console.log("this is total time button clicked time when clicked on stopButton " + totalTime);
        runningStatus = false;

    }
};

lapResetButton.onclick = function () {
    if (String(lapResetButton.innerHTML).toLowerCase() === "lap") {
        let lapList = document.createElement('li');
        let lapNumber = document.createElement('p');
        let lapTime = document.createElement('p');

        lapsContainer.prepend(lapList);

        const previousLaps = {
            ...Laps
        };

        lapList.classList.add('lap-item');
        lapList.append(lapNumber);
        lapList.append(lapTime);

        let currentLapTimeStamp = Date.now();
        lapNumber.innerHTML = `Lap ${Laps.numOfLaps + 1}`;
        lapList.id = Laps.numOfLaps + 1;
        console.log("This is lap list item id " + lapList.id)
        if (Laps.numOfLaps === 0) {
            let lapDuration = currentLapTimeStamp - startButtonClickedTime;
            Laps.numOfLaps += 1;
            lapTime.innerHTML = getFormattedTime(lapDuration);
            Laps.max = Laps.min = {
                specialCaseIndex: Laps.numOfLaps,
                duration: lapDuration
            };
            Laps.lastLapTimeStamp = currentLapTimeStamp;
            console.log("This is lap list current time " + Laps.lastLapTimeStamp)
            return;
        }

        let lapDuration = currentLapTimeStamp - Laps.lastLapTimeStamp;
        console.log("This is lap duration " + lapDuration)
        let lapType = ""; 
        Laps.numOfLaps += 1;


        if (startButtonClickedTime > Laps.lastLapTimeStamp) {
            lapDuration -= (startButtonClickedTime - stopButtonClickedTime);
        }
        Laps.lastLapTimeStamp = currentLapTimeStamp;
        lapTime.innerHTML = getFormattedTime(lapDuration);

        if (lapDuration < Laps.min.duration) {
            Laps.min = {
                specialCaseIndex: Laps.numOfLaps,
                duration: lapDuration
            };
            lapType = "minLap";
        } else if (lapDuration > Laps.max.duration) {
            Laps.max = {
                specialCaseIndex: Laps.numOfLaps,
                duration: lapDuration
            };
            lapType = "maxLap";
        }
        //only 2 laps in the list
        if (Laps.numOfLaps === 2) {
            lapsContainer.children[Laps.numOfLaps - Laps.min.specialCaseIndex].classList.add("minLap");
            lapsContainer.children[Laps.numOfLaps - Laps.max.specialCaseIndex].classList.add("maxLap");
            return;
        }

        //chaging color for minLap and maxLap - add css class minlap and maxLap
        if (lapType !== "") {
            if (lapType === "minLap") {
                lapsContainer.children[Laps.numOfLaps - previousLaps.min.specialCaseIndex].classList.remove(lapType);
                lapsContainer.children[Laps.numOfLaps - Laps.min.specialCaseIndex].classList.add(lapType);
            } else {
                lapsContainer.children[Laps.numOfLaps - previousLaps.max.specialCaseIndex].classList.remove(lapType);
                lapsContainer.children[Laps.numOfLaps - Laps.max.specialCaseIndex].classList.add(lapType);
            }
        }


    } else if (String(lapResetButton.innerHTML).toLowerCase() === "reset") {
        timerDisplay.textContent = "00:00.00";
        startButtonClickedTime = 0;
        runningStatus = false;
        totalTime = 0;
        lapsContainer.innerHTML = '';
        console.log(Laps);
        resetLapObject()
        changeButtonTextToLap();
    }
}


function resetLapObject() {
    Laps.numOfLaps = 0;
    Laps.min = undefined;
    Laps.max = undefined;
    Laps.lastLapTimeStamp = undefined;
}

function changeButtonTextToStop() {
    startStopButton.innerHTML = "Stop";
    if (startStopButton.classList.contains("green")) {
        startStopButton.classList.remove("green").add("red");
        // startStopButton.classList.add("red");
    }
    lapResetButton.innerHTML = "Lap";
    if (lapResetButton.disabled) {
        lapResetButton.disabled = false;
        if (lapResetButton.classList.contains("disabled")) {
            lapResetButton.classList.remove("disabled");
        }
    }
}

function changeButtonTextToStart() {
    startStopButton.innerHTML = "Start";
    if (startStopButton.classList.contains("red")) {
        startStopButton.classList.remove("red").add("green");
    }
    lapResetButton.innerHTML = "Reset";
}

function changeButtonTextToLap() {
    lapResetButton.innerHTML = "Lap";
    lapResetButton.disabled = true;
    lapResetButton.classList.add("disabled");
}

// if (!runningStatus == "started") { //true condition 
//     let lapTimeStampWhenLapButtonClicked = Date.now();
//     lapResetButton.innerHTML = "Lap";
//     startStopButton.innerHTML = "Stop";
//     lapTimerFunction(lapTimeStampWhenLapButtonClicked, startButtonClickedTime, runningStatus);
//     runningStatus = true;
//     // console.log("After clicking lap button the running status is " + runningStatus);

// } else if (runningStatus == "stopped") {
//     lapResetButton.innerHTML = "Reset";
//     startStopButton.innerHTML = "Start";
//     resetTimerClicked();
// }


// function startButtonClickedTimerFunction() {
//     let startButtonClickedTime = Date.now();
//     // passedTime = Date.now() - startButtonClickedTime;
//     console.log("this is start button clicked time " + getFormattedTime(startButtonClickedTime));
//     if (elapsedTime == 0) {
//         timerInterval = setInterval(function printTime() {
//             passedTime = Date.now() - startButtonClickedTime;
//             // console.log("this is passed time " + passedTime)
//             printText(getFormattedTime(passedTime));
//         }, 10);
//     } else {
//         timerInterval = setInterval(function printTime() {
//             passedTime = (Date.now() - startButtonClickedTime) + elapsedTime;
//             console.log("this is passed time " + (passedTime))
//             printText(getFormattedTime(passedTime));
//         }, 100);
//     }
// }

// function pauseTimer() {
//     clearInterval(timerInterval);
//     elapsedTime = Date.now();
//     console.log("This is elapsed time " + (elapsedTime));
//     // showStartPauseButton("PLAY");
// }

// function resetTimerClicked() {
//     clearInterval(timerInterval);
//     printText("00 : 00 : 00");
//     passedTime = 0;
//     // numOfLaps = 0;
//     laps.innerHTML = '';
//     runningStatus = false;
//     // laps.append(resetButton);
//     // showStartPauseButton("Start");
//     // showLapResetButton("Reset");
// }