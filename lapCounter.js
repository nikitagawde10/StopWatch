import getFormattedTime from "./timeCalculator";

export default function lapCount(passedTimeInMilliseconds,numberOfLaps){
    const laps = document.getElementsByClassName("laps")[0];
    let lapTimeStamp = Date.now();
    console.log("Lap time stamp is " + lapTimeStamp);
    let lapArray = [];
    if(!lapArray.length){
        timeStamp.innerHTML = getFormattedTime((lapTimeStamp - passedTimeInMilliseconds));
    }
    else{
        let previousLap = lapArray[lapArray.length - 1];
        laps.innerHTML = getFormattedTime((lapTimeStamp - previousLap[1]));
    }
    lapArray.push([newLap, lapTimeStamp]);
    console.log('Testing function lap');
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");
    li.setAttribute("class", "li-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "timeStamp");
    number.innerText = `${++numberOfLaps}`;
    timeStamp.innerHTML = getFormattedTime((lapTimeStamp - passedTimeInMilliseconds));
    // timeStamp.innerHTML = getFormattedTime(passedTime);
    li.append(number, timeStamp);
    laps.append(li);
}