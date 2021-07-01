export default function laps() {
    console.log("Entered lap div");
    let lapList = document.createElement('li');
    let lapNumber = document.createElement('p');
    let lapTime = document.createElement('p');

    lapsContainer.prepend(lapList);

    let previousLaps = {
        ...LapsObject
    };

    lapList.classList.add('lapItem');
    lapList.append(lapNumber);
    lapList.append(lapTime);

    let currentLapTimeStamp = Date.now();
    lapNumber.innerHTML = `Lap ${LapsObject.numOfLaps + 1}`;
    lapList.id = LapsObject.numOfLaps + 1;
    console.log("This is lap list item id " + lapList.id)
    if (LapsObject.numOfLaps === 0) {
        let lapDuration = currentLapTimeStamp - startButtonClickedTime;
        LapsObject.numOfLaps += 1;
        lapTime.innerHTML = getFormattedTime(lapDuration);
        LapsObject.max = LapsObject.min = {
            specialCaseIndex: LapsObject.numOfLaps,
            duration: lapDuration
        };
        LapsObject.lastLapTimeStamp = currentLapTimeStamp;
        console.log("This is lap list current time " + LapsObject.lastLapTimeStamp)
        return;
    }

    let lapDuration = currentLapTimeStamp - LapsObject.lastLapTimeStamp;
    console.log("This is lap duration " + lapDuration)
    let lapType = "";
    LapsObject.numOfLaps += 1;

    if (startButtonClickedTime > LapsObject.lastLapTimeStamp) {
        lapDuration -= (startButtonClickedTime - stopButtonClickedTime);
    }
    LapsObject.lastLapTimeStamp = currentLapTimeStamp;
    lapTime.innerHTML = getFormattedTime(lapDuration);

    if (lapDuration < LapsObject.min.duration) {
        LapsObject.min = {
            specialCaseIndex: LapsObject.numOfLaps,
            duration: lapDuration
        };
        lapType = "minLap";
    } else if (lapDuration > LapsObject.max.duration) {
        LapsObject.max = {
            specialCaseIndex: LapsObject.numOfLaps,
            duration: lapDuration
        };
        lapType = "maxLap";
    }
    //only 2 laps in the list
    if (LapsObject.numOfLaps === 2) {
        lapsContainer.children[LapsObject.numOfLaps - LapsObject.min.specialCaseIndex].classList.add("minLap");
        lapsContainer.children[LapsObject.numOfLaps - LapsObject.max.specialCaseIndex].classList.add("maxLap");
        return;
    }


    // Feedback: try to avoid nested if statements
    //chaging color for minLap and maxLap - add css class minlap and maxLap
    if (lapType !== "") {
        if (lapType === "minLap") {
            lapsContainer.children[LapsObject.numOfLaps - previousLaps.min.specialCaseIndex].classList.remove(lapType);
            lapsContainer.children[LapsObject.numOfLaps - LapsObject.min.specialCaseIndex].classList.add(lapType);
        } else {
            lapsContainer.children[LapsObject.numOfLaps - previousLaps.max.specialCaseIndex].classList.remove(lapType);
            lapsContainer.children[LapsObject.numOfLaps - LapsObject.max.specialCaseIndex].classList.add(lapType);
        }
    }
}




// import getFormattedTime from "./timeCalculator.js";
// import printText from './timerFunctions.js';
// let lapArray = [];
// let numOfLaps = 0;
// const laps = document.getElementsByClassName("laps")[0];

// export default function lapTimerFunction(lapTimeStampWhenLapButtonClicked, startButtonClickedTime, runningStatus) {
//     // console.log('Testing function lap');
//     if(runningStatus == true){
//         let minimumLapTime = Number.MAX_VALUE;
//         let maximumLapTime = Number.MIN_VALUE;
    
//         console.log("Stopwatch start time is " + getFormattedTime(startButtonClickedTime));
//         // printText(getFormattedTime(lapTimeStampWhenLapButtonClicked));
    
//         const li = document.createElement("li");
//         const number = document.createElement("span");
//         const timeStamp = document.createElement("span");
//         let newLaps = [number, timeStamp]
//         let minLap = document.createElement("div");
//         // let startButtonClickedTime = startButtonClickedTime;
//         // console.log("Stopwatch start time is " + getFormattedTime(startTime));
//         let currentLapTime = getFormattedTime((lapTimeStampWhenLapButtonClicked - startButtonClickedTime));
//         if (!lapArray.length) { //condition for first lap
//             timeStamp.innerHTML = getFormattedTime(currentLapTime);
//         } else {
//             let previousLap = lapArray[lapArray.length - 1];
//             if (previousLap < minimumLapTime) {
//                 minimumLapTime = previousLap;
//                 //display in green
//                 console.log("The minimum lap time is " + getFormattedTime(minimumLapTime) );
//             }
//             if (previousLap > maximumLapTime) {
//                 maximumLapTime = previousLap;
//                 //display in red
//             }
//             timeStamp.innerHTML = getFormattedTime((lapTimeStampWhenLapButtonClicked - previousLap[1]));
//         }
//         lapArray.push([newLaps, lapTimeStampWhenLapButtonClicked]);
//         console.log(lapArray);
//         // console.log('Testing function lap');
//         minLap.innerHTML = getFormattedTime(minimumLapTime);
//         li.setAttribute("class", "li-item");
//         number.setAttribute("class", "number");
//         timeStamp.setAttribute("class", "timeStamp");
//         number.innerText = `${++numOfLaps}`;
//         // timeStamp.innerHTML = getFormattedTime((lapTimeStamp - startTime));
//         // timeStamp.innerHTML = getFormattedTime(passedTime);
//         li.append(number, timeStamp);
//         laps.append(li);
//     }
//     // else{
//     //     lapArray = [];
//     //     numOfLaps = 0;
//     // }
    
// }



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