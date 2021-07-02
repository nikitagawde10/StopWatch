import getFormattedTime from './formattedUtils.js'
const startStopButton = document.getElementById('startStopButton')
const lapResetButton = document.getElementById('lapResetButton')
const lapsContainer = document.getElementsByClassName('laps')[0]
const primaryButton = document.getElementsByClassName('startbutton')[0]
const displayTimerDiv = document.getElementById('displayTimerDiv')
const START_TEXT = 'Start'
const RESET_TEXT = 'Reset'
const STOP_TEXT = 'Stop'
const LAP_TEXT = 'Lap'
let isRunning = false
let totalTime = 0
let timeHandler = null
let startTime = 0
let stopTime = 0
let isCurrentSession = false
let LapState = {
  numOfLaps: 0,
  min: undefined,
  max: undefined,
  lastLapTimeStamp: undefined, // store previous lap
}
let lapList 
let lapNumber
let lapTime
primaryButton.classList.add('green')
lapResetButton.disabled = true
lapResetButton.classList.add('disabled')

startStopButton.onclick = () => {
  if (!isRunning) {
    isCurrentSession = true
    isRunning = true
    changeButtonTextToStop()
    lapResetButton.disabled = false
    lapResetButton.classList.remove('disabled')
    startTime = Date.now()
    startTimerLoop()
  } else {
    changeButtonTextToStart()
    stopTime = Date.now()
    totalTime += getDriftTimeSinceLastStart(stopTime)
    isRunning = false
    isCurrentSession = true
  }
}

lapResetButton.onclick = () => {
  if (isCurrentSession && isRunning) {
    createlaps()
  }
  if (!isRunning) {
    resetTimer()
  }
}

let changeButtonTextToStop = () => {
  startStopButton.innerHTML = STOP_TEXT
  lapResetButton.innerHTML = LAP_TEXT
  primaryButton.classList.replace('green', 'red')
  if (lapResetButton.classList.contains('disabled')) {
    lapResetButton.classList.remove('disabled')
  }
}

let changeButtonTextToStart = () => {
  startStopButton.innerHTML = START_TEXT
  lapResetButton.innerHTML = RESET_TEXT
  primaryButton.classList.replace('red', 'green')
}

let changeButtonTextToLap = () => {
  lapResetButton.innerHTML = 'Lap'
  lapResetButton.disabled = true
  lapResetButton.classList.add('disabled')
}

let getDriftTimeSinceLastStart = () => {
  if (!isRunning) {
    return 0
  }
  return Date.now() - startTime
}

let getTime = () => {
  if (!startTime) {
    return 0
  }
  if (isRunning) {
    return totalTime + getDriftTimeSinceLastStart()
  }
  return totalTime
}

const startTimerLoop = () => {
  timeHandler = requestAnimationFrame(startTimerLoop)
  displayTimerDiv.innerHTML = getFormattedTime((getTime()))
}

let createLapState = () => {
  lapList = document.createElement('li')
  lapNumber = document.createElement('span')
  lapTime = document.createElement('span')
  lapsContainer.prepend(lapList)

  lapList.classList.add('lapItem')
  lapNumber.classList.add('lapNumber')
  lapTime.classList.add('lapTime')
  lapList.append(lapNumber, lapTime)
}

let createlaps = () => {
  let lapState = createLapState();
  let prevLapState = {
    ...LapState
  }

  let currentLapTimeStamp = Date.now()
  lapNumber.innerHTML = `Lap ${LapState.numOfLaps + 1}`
  if (LapState.numOfLaps === 0) {
    let lapDuration = currentLapTimeStamp - startTime
    LapState.numOfLaps += 1
    lapTime.innerHTML = getFormattedTime(lapDuration)
    LapState.max = LapState.min = {
      index: LapState.numOfLaps,
      duration: lapDuration
    }
    LapState.lastLapTimeStamp = currentLapTimeStamp
    return
  }

  let lapDuration = currentLapTimeStamp - LapState.lastLapTimeStamp
  let lapType = ""
  LapState.numOfLaps += 1

  if (startTime > LapState.lastLapTimeStamp) {
    lapDuration -= (startTime - stopTime)
  }
  LapState.lastLapTimeStamp = currentLapTimeStamp
  lapTime.innerHTML = getFormattedTime(lapDuration)

  if (lapDuration < LapState.min.duration) {
    LapState.min = {
      index: LapState.numOfLaps,
      duration: lapDuration
    }
    lapType = "minLap"
  } else if (lapDuration > LapState.max.duration) {
    LapState.max = {
      index: LapState.numOfLaps,
      duration: lapDuration
    }
    lapType = "maxLap"
  }
  //only 2 laps in the list
  // if (LapState.numOfLaps === 2) {
  //   lapsContainer.children[LapState.numOfLaps - LapState.min.index].classList.add("minLap")
  //   lapsContainer.children[LapState.numOfLaps - LapState.max.index].classList.add("maxLap")
  //   return
  // }

  //changing color for minLap and maxLap - add css class minlap and maxLap
    if (lapType === "minLap") {
      lapsContainer.children[LapState.numOfLaps - prevLapState.min.index].classList.remove(lapType)
      lapsContainer.children[LapState.numOfLaps - LapState.min.index].classList.add(lapType)
    } else if(lapType === "maxLap"){
      lapsContainer.children[LapState.numOfLaps - prevLapState.max.index].classList.remove(lapType)
      lapsContainer.children[LapState.numOfLaps - LapState.max.index].classList.add(lapType)
    }
}

let resetLapObject = () => {
  LapState.numOfLaps = 0
  LapState.min = undefined
  LapState.max = undefined
  LapState.lastLapTimeStamp = undefined
}

let resetTimer = () => {
  startTime = 0
  resetView()
  isRunning = false
  totalTime = 0
  resetLapObject(LapState)
  changeButtonTextToLap()
  changeButtonTextToStart()
  
}

let resetView = () => {
  lapResetButton.disabled = true
  lapResetButton.classList.add('disabled')
  lapsContainer.innerHTML = ''
  displayTimerDiv.innerHTML = '00 : 00 . 00'
}