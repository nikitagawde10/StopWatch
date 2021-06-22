import getFormattedTime from "./timeCalculator.js";

export default function lapTimerFunction(lapTimeStampWhenLapButtonClicked, numOfLaps) {
    let minimumLapTime = Number.MAX_VALUE;
    let maximumLapTime = Number.MIN_VALUE;
    
    console.log("Stopwatch start time is " + getFormattedTime(startTime));
    print(getFormattedTime(passedTime));

    console.log('Testing function lap');

    //logic for rendering individual timestamps
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

    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    let newLaps = [number, timeStamp]

    console.log("Lap time stamp when lap button is clicked is " + getFormattedTime(lapTimeStamp));
    console.log("Stopwatch start time is " + getFormattedTime(startTime));
    // let currentLapTime = getFormattedTime((lapTimeStampWhenLapButtonClicked - startTime));
    if (!lapArray.length) {
        timeStamp.innerHTML = getFormattedTime((lapTimeStampWhenLapButtonClicked - startTime));
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
    li.setAttribute("class", "li-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timeStamp");
    number.innerText = `${++numOfLaps}`;
    // timeStamp.innerHTML = getFormattedTime((lapTimeStamp - startTime));
    // timeStamp.innerHTML = getFormattedTime(passedTime);
    li.append(number, timeStamp);
    laps.append(li);
}