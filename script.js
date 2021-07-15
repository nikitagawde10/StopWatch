import getFormattedTime from './formattedUtils.js'

const startStopButton = document.getElementById('startStopButton')
const lapResetButton = document.getElementById('lapResetButton')
const lapsContainer = document.getElementsByClassName('laps')[0]
const primaryButton = document.getElementsByClassName('primary__button')[0]
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
let lapList 
let lapNumber
let lapTime

const lapState = {
  numOfLaps: 0,
  min: undefined,
  max: undefined,
  lastLapTimeStamp: undefined, // store previous lap
}


primaryButton.classList.add('green')
lapResetButton.disabled = true
lapResetButton.classList.add('disabled')

startStopButton.onclick = () => {
  if (!isRunning) {
    isCurrentSession = true
    isRunning = true
    changeButtonTextToStop()
    lapResetButton.disabled = false
    lapResetButton.classList.remove('disabled') //use pseudo selector in css
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

let changeButtonTextToStop = () => { //make consts
  startStopButton.innerHTML = STOP_TEXT
  lapResetButton.innerHTML = LAP_TEXT
  primaryButton.classList.replace('green', 'red')
  if (lapResetButton.classList.contains('disabled')) { //if disabled
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
  createLapState(); //newLapState
  let prevLapState = {
    ...lapState //lapState
  }

  let currentLapTimeStamp = Date.now()
  lapNumber.innerHTML = `Lap ${lapState.numOfLaps + 1}`
  if (lapState.numOfLaps === 0) {
    let lapDuration = currentLapTimeStamp - startTime
    lapState.numOfLaps += 1
    lapTime.innerHTML = getFormattedTime(lapDuration)
    lapState.max = lapState.min = {
      index: lapState.numOfLaps,
      duration: lapDuration
    }
    lapState.lastLapTimeStamp = currentLapTimeStamp
    return
  }

  let lapDuration = currentLapTimeStamp - lapState.lastLapTimeStamp
  let lapType = ""
  lapState.numOfLaps += 1

  if (startTime > lapState.lastLapTimeStamp) {
    lapDuration -= (startTime - stopTime)
  }
  lapState.lastLapTimeStamp = currentLapTimeStamp
  lapTime.innerHTML = getFormattedTime(lapDuration)

  if (lapDuration < lapState.min.duration) {
    lapState.min = {
      index: lapState.numOfLaps,
      duration: lapDuration
    }
    lapType = "minLap"
  } else if (lapDuration > lapState.max.duration) {
    lapState.max = {
      index: lapState.numOfLaps,
      duration: lapDuration
    }
    lapType = "maxLap"
  }
  let minLapIndex = lapState.min.index 
  let maxLapIndex = lapState.max.index
  let currentLapNumber = lapState.numOfLaps

  //only 2 laps in the list
  if (lapState.numOfLaps === 2) {
    lapsContainer.children[currentLapNumber - minLapIndex].classList.add("minLap")
    lapsContainer.children[currentLapNumber - maxLapIndex].classList.add("maxLap")
    return
  }

  //changing color for minLap and maxLap - add css class minlap and maxLap
    if (lapType === "minLap") {
      lapsContainer.children[currentLapNumber - prevLapState.min.index].classList.remove(lapType)
      lapsContainer.children[currentLapNumber - minLapIndex].classList.add(lapType)
    } else if(lapType === "maxLap"){
      lapsContainer.children[currentLapNumber - prevLapState.max.index].classList.remove(lapType)
      lapsContainer.children[currentLapNumber - maxLapIndex].classList.add(lapType)
    }
}

let resetLapObject = () => {
  lapState.numOfLaps = 0
  lapState.min = undefined
  lapState.max = undefined
  lapState.lastLapTimeStamp = undefined
}

let resetTimer = () => {
  startTime = 0
  resetView()
  isRunning = false
  totalTime = 0
  resetLapObject(lapState)
  changeButtonTextToLap()
  changeButtonTextToStart()
}

let resetView = () => {
  lapResetButton.disabled = true
  lapResetButton.classList.add('disabled')
  lapsContainer.innerHTML = ''
  displayTimerDiv.innerHTML = '00 : 00 . 00'
}