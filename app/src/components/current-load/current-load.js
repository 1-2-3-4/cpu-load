import * as React from 'react'
import cx from 'classnames'
import { VictoryPie } from 'victory'

import { toPercent } from '../../utils/to-percent'
import { useCPULoad } from '../../utils/use-cpu-load'

import './current-load.css'

export const CHART_GREEN = '#14751a'
export const CHART_YELLOW = '#bf7814'
export const CHART_RED = '#b92511'

export const CurrentLoad = () => {
  const cpuLoad = useCPULoad()

  const loadAverage = cpuLoad.length > 0 ? cpuLoad[cpuLoad.length - 1] : 0
  const loadAverageDisplay = loadAverage ? toPercent(loadAverage) : 'loading'

  const chartColor = loadAverage >= 75
    ? CHART_RED
    : loadAverage >= 50 ? CHART_YELLOW : CHART_GREEN

  return (
    <div className={cx(
      'current-load-container',
      {
        'current-load-container-caution': loadAverage >= 50 && loadAverage < 75,
        'current-load-container-danger': loadAverage >= 75,
      }
    )}>
      <div className='current-load-text'>{`The current load is ${loadAverageDisplay}`}</div>
      { loadAverage &&
        <VictoryPie
          animate={{duration: 2000}}
          colorScale={[chartColor, '#252525']}
          data={[
            {x: 'Load Average', y: loadAverage},
            {x: 'Available CPU', y: 100 - loadAverage}
          ]}
          innerRadius={90}
          labelComponent={<div></div>}
        />
      }
    </div>
  )
}