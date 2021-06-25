import getFormattedTime from './timeCalculator.js';
import printText from './timerFunctions.js';
let startStopButton = document.getElementById("startStopButton");
let lapResetButton = document.getElementById("lapResetButton");
const lapsContainer = document.getElementsByClassName("laps")[0];

let runningStatus = false;
let startButtonClickedTime = 0;
let overallTime = 0;
let timer;


const lapsObject = {
    numOfLaps: 0,
    minLap: undefined,
    maxLap: undefined,
    previousLapTimeStamp: undefined
}

function resetLapsObject() {
    lapsObject.maxLap = undefined;
    lapsObject.minLap = undefined;
    lapsObject.numOfLaps = 0;
    lapsObject.previousLapTimeStamp = undefined;
}

lapResetButton.disabled = true;

startStopButton.onclick = () => {
    if (!runningStatus) { //true condition clicked on start, change text to stop, change reset to laps, 
        changeButtonToStop();
        runningStatus = true;
        startButtonClickedTime = Date.now();
        requestAnimationFrame(timerUpdate);
        // startStopButton.innerHTML = "Stop"
        // lapResetButton.innerHTML = "Lap"
        // startTimerFunction();
        //changeButtonToStop() change color to red once started timer
        //start the timer
    } else {
        changeButtonToStart();
        cancelAnimationFrame(timer);
        stopButtonClickedTime = Date.now();
        overallTime = overallTime + getDriftTime(stopButtonClickedTime);
        runningStatus = false;
        // startStopButton.innerHTML = "Start"
        // lapResetButton.innerHTML = "Reset"
        // changeButtonToStart() change color to green once stopped timer
        // pause the timer 
    }
}

function getDriftTime(currentTime = Date.now()) {
    if (!runningStatus) {
        return 0;
    }
    return currentTime - startButtonClickedTime;
}
const timerUpdate = () => {
    timer = requestAnimationFrame(timerUpdate);
    printText(getFormattedTime(getTime()));
}

function getTime() {
    if (!startButtonClickedTime) {
        return 0;
    }
    if (runningStatus) {
        return overallTime + getDriftTime();
    }
    return overallTime;
}

function changeButtonToStart() {
    startStopButton.innerHTML = "Start";
    if (startStopButton.classList.contains("red")) {
        startStopButton.classList.remove("red");
        startStopButton.classList.add("green");
    }
    lapResetButton.innerHTML = "Reset";
}

function changeButtonToStop() {
    startStopButton.innerHTML = "Stop";
    if (startStopButton.classList.contains("green")) {
        startStopButton.classList.remove("green");
        startStopButton.classList.add("red");
    }
    lapResetButton.innerHTML = "Lap";
    if (lapResetButton.disabled) {
        lapResetButton.disabled = false;
        if (lapResetButton.classList.contains("disabled")) {
            lapResetButton.classList.remove("disabled");
        }
    }
}

function changeToLap() {
    lapResetButton.innerHTML = "Lap";
    lapResetButton.disabled = true;
    lapResetButton.classList.add("disabled")
}

lapResetButton.onclick = () => {
    // let lapTimeStampWhenLapButtonClicked = Date.now();
    if (lapResetButton.innerHTML === "Lap") {
        let lapListItem = document.createElement("li");
        let number = document.createElement("span");
        let timeStamp = document.createElement("span");
        let previousLap = {
            ...lapsObject
        };
        // let minLap = document.createElement("div");
        lapsContainer.prepend(lapListItem);

        lapListItem.classList.add('li-item');
        lapListItem.append(number, timeStamp);

        let currentLapTimeStamp = Date.now();
        number.innerHTML = `Lap ${lapsObject.numOfLaps + 1}`;
        lapListItem.id = lapListItem.numOfLaps + 1;

        //condition for adding first lap
        if (lapsObject.numOfLaps == 0) {
            let durationOfSingleLap = currentLapTimeStamp - lapsObject.previousLapTimeStamp;
            lapsObject.numOfLaps++;
            timeStamp.innerHTML = getFormattedTime(durationOfSingleLap);
            lapsObject.previousLapTimeStamp = durationOfSingleLap;
            return;
        }
        let durationOfSingleLap = currentLapTimeStamp - lapsObject.previousLapTimeStamp;
        currentLapTimeStamp = "";
        lapsObject.numOfLaps++;

        if (startButtonClickedTime > lapsObject.previousLapTimeStamp) {
            let driftTime = startButtonClickedTime - stopButtonClickedTime;
            durationOfSingleLap = durationOfSingleLap - driftTime;
        }
        lapsObject.previousLapTimeStamp = currentLapTimeStamp;
        timeStamp.innerHTML = getFormattedTime(durationOfSingleLap);
        //find min lap and update
        if (durationOfSingleLap < lapsObject.minLap.duration) {
            lapsObject.minLap = {
                index: lapsObject.numOfLaps,
                duration: durationOfSingleLap
            };
            currentLapType = "shortestLap";
        }
        //find max lap and update
        else if (durationOfSingleLap > lapsObject.maxLap.duration) {
            lapsObject.maxLap = {
                index: lapsObject.numOfLaps,
                duration: durationOfSingleLap,
            };
            currentLapType = "longestLap";
        }
        if (lapsObject.numOfLaps == 2) { //only 2 laps present 
            lapsContainer.children[lapsObject.numOfLaps - lapsObject.minLap.index].classList.add("shortestLap");
            lapsContainer.children[lapsObject.numOfLaps - lapsObject.maxLap.index].classList.add("longestLap");
            return;
        }
        if (currentLapType != "") {
            if (currentLapType === "shortestLap") {
                lapsContainer.children[lapsObject.numOfLaps - lapsObject.previousLapTimeStamp.minLap.index].classList.remove(currentLapType);
                lapsContainer.children[lapsObject.numOfLaps - lapsObject.minLap.index].classList.add(currentLapType);
            } else {
                lapsContainer.children[lapsObject.numOfLaps - lapsObject.previousLapTimeStamp.maxLap.index].classList.remove(currentLapType);
                lapsContainer.children[lapsObject.numOfLaps - lapsObject.maxLap.index].classList.add(currentLapType);
            }
        }
    } else if (lapResetButton.innerHTML === "Reset") {
        printText("00 : 00 . 00");
        lapsContainer.innerHTML = '';
        runningStatus = false;
        overallTime = 0;
        resetLapsObject();
        console.log("lap object after reset button clicked" + lapsObject)
        changeToLap(); //change button text to lap
    }

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


// function startTimerFunction() {
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