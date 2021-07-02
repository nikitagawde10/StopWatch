let startTime = 0

export function resetTimer() {
    startTime = 0
    resetView()
    isRunning = false
    totalTime = 0
    resetLapObject(LapState)
    changeButtonTextToLap()
    changeButtonTextToStart()
  }