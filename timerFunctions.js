export function resetTimerClicked() {
    clearInterval(timerInterval);
    print("00 : 00 : 00");
    passedTime = 0;
    numOfLaps = 0;
    laps.innerHTML = '';
    // laps.append(resetButton);
    // showStartPauseButton("Start");
    // showLapResetButton("Reset");
}

export function startTimerFunction() {
    let startButtonClickedTime = Date.now();
    console.log("this is start button clicked time " + getFormattedTime(startButtonClickedTime));
    timerInterval = setInterval(function printTime() {
        passedTime = Date.now() - startButtonClickedTime;
        print(getFormattedTime(passedTime));
    }, 1000);
    // showStartPauseButton("Pause");
    // // showStartPauseButton("Stop");
    // ShowLapResetButton("LAP");
}

export function pauseTimer() {
    clearInterval(timerInterval);
    console.log(passedTime);
    // showStartPauseButton("PLAY");
}
export function startTimerClicked() {
    if (startStopstatus == "start") {
        startStopButton.innerHTML = "Stop";
        lapResetButton.innerHTML = "Lap";
    } else if (startStopstatus == "stop") {
        startStopButton.innerHTML = "Start";
        lapResetButton.innerHTML = "Reset";
    }
}