const HEAVY_CPU_LOAD = 100

export const checkForLoadAndRecovery = (cpuLoad, timeWindow) => {
  const heavyWindowSum = timeWindow * HEAVY_CPU_LOAD
  const heavyLoadTimes = []
  const recoveryTimes = []

  if (cpuLoad.length < timeWindow) {
    return {
      heavyLoadTimes,
      recoveryTimes
    }
  }

  let left = 0
  let tempSum = 0
  let recoveryCounter = 0
  let hasHeavyLoad = false

  /* calculate initial window */
  for (let i = 0; i < timeWindow; i ++) {
    tempSum += cpuLoad[i]
  }

  for (let j = timeWindow; j < cpuLoad.length; j++) {
    /* mark the start time of heavy load */
    if (!hasHeavyLoad && tempSum >= heavyWindowSum) {
      hasHeavyLoad = true
      heavyLoadTimes.push(formatTimeIndex(left))
    }

    /* if there is heavy load, find full window of heavy load */
    while (hasHeavyLoad && recoveryCounter < timeWindow && j < cpuLoad.length) {
      if (cpuLoad[j] < HEAVY_CPU_LOAD) {
        recoveryCounter++
      } else {
        recoveryCounter = 0
      }
      tempSum = tempSum + cpuLoad[j] - cpuLoad[left]
      j++
      left++
    }

    /* if recovery threshhold is met, log recovery time and reset */
    if (recoveryCounter === timeWindow) {
      hasHeavyLoad = false
      recoveryCounter = 0
      recoveryTimes.push(formatTimeIndex(left))
    }

    /* advance window */
    tempSum = tempSum + cpuLoad[j] - cpuLoad[left]
    left++
  }

  return {
    heavyLoadTimes,
    recoveryTimes
  }
}

const formatTimeIndex = (num) => {
  let seconds = num * 10
  let minutes = 0

  while (seconds >= 60) {
    minutes++
    seconds -= 60
  }

  return `${minutes}m ${seconds}s`
}
