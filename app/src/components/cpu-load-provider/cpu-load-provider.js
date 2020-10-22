import * as React from 'react'

import { CPULoadContext } from './cpu-load-context'
import { maintainWindow } from '../../utils/maintain-window'

const TEN_SECONDS = 10000
const TEN_MINUTES = 600000
const WINDOW_LENGTH = TEN_MINUTES / TEN_SECONDS

export const CPULoadProvider = ({ children }) => {
  const [cpuLoad, setCpuLoad] = React.useState([])

  const fetchCPU = React.useCallback(
    async () => {
      const { loadAverage } = await fetch('http://localhost:3000/cpu-load')
        .then(response => response.json()
          .then(data => data)
        )

      setCpuLoad(cpuLoad => maintainWindow([...cpuLoad, (loadAverage * 100)], WINDOW_LENGTH))
    }, [setCpuLoad]
  )

  React.useEffect(
    () => {
      fetchCPU()

      const interval = setInterval(() => {
        fetchCPU()
      }, TEN_SECONDS)

      return () => clearInterval(interval)
    }, [fetchCPU]
  )

  return (
    <CPULoadContext.Provider value={cpuLoad}>
      {children}
    </CPULoadContext.Provider>
  )
}