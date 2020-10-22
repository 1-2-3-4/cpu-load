import * as React from 'react'
import cx from 'classnames'

import { checkForLoadAndRecovery } from '../../utils/check-for-load-and-recovery'
import { useCPULoad } from '../../utils/use-cpu-load'

import './heavy-load.css'

const TEN_SECONDS = 10000
const TWO_MINUTES = 120000
export const TWO_MINUTE_WINDOW = TWO_MINUTES / TEN_SECONDS

export const HeavyLoad = () => {
  const cpuLoad = useCPULoad()
  const { heavyLoadTimes, recoveryTimes } = checkForLoadAndRecovery(cpuLoad, TWO_MINUTE_WINDOW)

  return (
    <div className='heavy-load-container'>
      <div className='heavy-load-text'>Heavy Load and Recovery</div>
      <div className='heavy-load-details-container'>
        {heavyLoadTimes.length === 0 &&
          <div>> No heavy CPU load logged</div>
        }
        {heavyLoadTimes.length > 0 && heavyLoadTimes.map((heavyLoadTime, i) => (
          <React.Fragment key={heavyLoadTime}>
            <div className={cx({
              'heavy-load-resolved': recoveryTimes[i],
              'heavy-load-unresolved': !recoveryTimes[i]
            })}>
              {`> Heavy Load started at ${heavyLoadTime}`}
            </div>
            {recoveryTimes[i] && <div className='recovery-time-resolved'>{`Recovered at ${recoveryTimes[i]}`}</div>}
            {!recoveryTimes[i] && <div className='recovery-time-unresolved'>Issue not resolved</div> }
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}