import * as React from 'react'
import { shallow } from 'enzyme'

import { HeavyLoad } from './heavy-load'
import * as checkForLoadAndRecoveryUtil from '../../utils/check-for-load-and-recovery'
import * as useCPULoadUtil from '../../utils/use-cpu-load'

describe('HeavyLoad', () => {
  describe('when it renders with no heavy load', () => {
    let wrapper

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([10, 20, 30, 40])
      jest.spyOn(checkForLoadAndRecoveryUtil, 'checkForLoadAndRecovery').mockReturnValue({
        heavyLoadTimes: [],
        recoveryTimes: []
      })

      wrapper = shallow(<HeavyLoad />)
    })

    it('renders `no heavy load` message', () => {
      expect(wrapper.find({ className: 'heavy-load-details-container' }).contains('> No heavy CPU load logged')).toBe(true)
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })

  describe('when it renders heavy load and no recovery', () => {
    let wrapper

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([100, 100, 100, 100])
      jest.spyOn(checkForLoadAndRecoveryUtil, 'checkForLoadAndRecovery').mockReturnValue({
        heavyLoadTimes: ['1m 30s'],
        recoveryTimes: []
      })

      wrapper = shallow(<HeavyLoad />)
    })

    it('renders a heavy load message', () => {
      expect(wrapper.find({ className: 'heavy-load-unresolved' }).contains('> Heavy Load started at 1m 30s')).toBe(true)
    })

    it('renders a `issue not resolved` message', () => {
      expect(wrapper.find({ className: 'recovery-time-unresolved' }).contains('Issue not resolved')).toBe(true)
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })

  describe('when it renders with both heavy load and recovery', () => {
    let wrapper

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([100, 100, 100, 100, 20, 20, 20, 20])
      jest.spyOn(checkForLoadAndRecoveryUtil, 'checkForLoadAndRecovery').mockReturnValue({
        heavyLoadTimes: ['1m 30s'],
        recoveryTimes: ['5m 30s']
      })

      wrapper = shallow(<HeavyLoad />)
    })

    it('renders a heavy load message', () => {
      expect(wrapper.find({ className: 'heavy-load-resolved' }).contains('> Heavy Load started at 1m 30s')).toBe(true)
    })

    it('renders a recovery message', () => {
      expect(wrapper.find({ className: 'recovery-time-resolved' }).contains('Recovered at 5m 30s')).toBe(true)
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })
})