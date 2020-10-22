import * as React from 'react'
import { VictoryArea, VictoryAxis, VictoryChart } from 'victory'

import { useCPULoad } from '../../utils/use-cpu-load'

import loadingSpinner from './loading.svg'
import './load-history.css'

export const LoadHistory = () => {
  const cpuLoad = useCPULoad()

  if (cpuLoad.length < 2) {
    return (
      <div className='load-history-container'>
        <div className='load-history-text'>Load History</div>
        <div className='loading-spinner-container'>
          <img className='loading-spinner' src={loadingSpinner} alt='loading' />
        </div>
      </div>
    )
  }

  const cpuLoadData = cpuLoad.map((load, i) => ({
    x: i,
    y: load,
  }))

  return (
    <div className='load-history-container'>
      <div className='load-history-text'>Load History</div>
        <VictoryChart>
          <VictoryArea
            animate={{ duration: 2000 }}
            data={cpuLoadData}
          />
          <VictoryAxis
            crossAxis
            label="Time (s)"
            tickFormat={(t) => `${t * 10}s`}
          />
          <VictoryAxis
            crossAxis
            dependentAxis
            domain={[0, 100]}
            label="CPU Load (%)"
          />
        </VictoryChart>
    </div>
  )
}