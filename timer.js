// let startTime = 0
// let totalTime = 0
// let isRunning = false
// const lapsContainer = document.getElementsByClassName('laps')[0]
// const primaryButton = document.getElementsByClassName('primary__button')[0]

// const START_TEXT = 'Start'
// const RESET_TEXT = 'Reset'


// const lapState = {
//   numOfLaps: 0,
//   min: undefined,
//   max: undefined,
//   lastLapTimeStamp: undefined, // store previous lap
// }
// export function resetTimer() {
//     startTime = 0
//     resetView()
//     isRunning = false
//     totalTime = 0
//     resetLapObject()
//     changeButtonTextToLap()
//     changeButtonTextToStart()
//   }
  
// let resetView = () => {
//   lapResetButton.disabled = true
//   lapResetButton.classList.add('disabled')
//   lapsContainer.innerHTML = ''
//   displayTimerDiv.innerHTML = '00 : 00 . 00'
// }

// let resetLapObject = () => {
//   lapState.numOfLaps = 0
//   lapState.min = undefined
//   lapState.max = undefined
//   lapState.lastLapTimeStamp = undefined
// }

// let changeButtonTextToLap = () => {
//   lapResetButton.innerHTML = 'Lap'
//   lapResetButton.disabled = true
//   lapResetButton.classList.add('disabled')
// }

// let changeButtonTextToStart = () => {
//   startStopButton.innerHTML = START_TEXT
//   lapResetButton.innerHTML = RESET_TEXT
//   primaryButton.classList.replace('red', 'green')
// }
