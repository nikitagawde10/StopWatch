import getFormattedTime from "./timeCalculator.js";

export default function lapTimerFunction(lapTimeStampWhenLapButtonClicked, startButtonClickedTime) {
    console.log('Testing function lap');

    let minimumLapTime = Number.MAX_VALUE;
    let maximumLapTime = Number.MIN_VALUE;

    console.log("Stopwatch start time is " + getFormattedTime(lapTimeStampWhenLapButtonClicked));
    print(getFormattedTime(lapTimeStampWhenLapButtonClicked));

    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    let newLaps = [number, timeStamp]
    let minLap = document.createElement("div");
    // let startButtonClickedTime = startButtonClickedTime;
    // console.log("Stopwatch start time is " + getFormattedTime(startTime));
    let currentLapTime = getFormattedTime((lapTimeStampWhenLapButtonClicked - startButtonClickedTime));
    
    if (!lapArray.length) { //condition for first lap
        timeStamp.innerHTML = getFormattedTime(currentLapTime);
    } else {
        let previousLap = lapArray[lapArray.length - 1];
        if (previousLap < minimumLapTime) {
            minimumLapTime = previousLap;
            //display in green
        }
        if (previousLap > maximumLapTime) {
            maximumLapTime = previousLap;
            //display in red
        }
        timeStamp.innerHTML = getFormattedTime((lapTimeStampWhenLapButtonClicked - previousLap[1]));
    }
    lapArray.push([newLaps, lapTimeStampWhenLapButtonClicked]);
    console.log(lapArray);
    console.log('Testing function lap');
    minLap.innerHTML = getFormattedTime(minimumLapTime);
    li.setAttribute("class", "li-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timeStamp");
    number.innerText = `${++numOfLaps}`;
    // timeStamp.innerHTML = getFormattedTime((lapTimeStamp - startTime));
    // timeStamp.innerHTML = getFormattedTime(passedTime);
    li.append(number, timeStamp);
    laps.append(li);
}



    //logic for rendering individual timestamps as li on laps div
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