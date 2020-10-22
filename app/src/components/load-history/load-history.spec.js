import * as React from 'react'
import { shallow } from 'enzyme'
import { VictoryArea, VictoryAxis, VictoryChart } from 'victory'

import { LoadHistory } from './load-history'
import * as useCPULoadUtil from '../../utils/use-cpu-load'

describe('LoadHistory', () => {
  describe('when there are less than 2 data points', () => {
    let wrapper
    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([])

      wrapper = shallow(<LoadHistory />)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('renders a loading spinner', () => {
      expect(wrapper.find('img').prop('className')).toBe('loading-spinner')
    })

    it('does not render an area chart', () => {
      expect(wrapper.find(VictoryArea).exists()).toBe(false)
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })

  describe('when there are more than 2 data points', () => {
    let wrapper
    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([10, 20, 30])

      wrapper = shallow(<LoadHistory />)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('does not render a loading spinner', () => {
      expect(wrapper.find('img').exists()).toBe(false)
    })

    it('passes transformed data to area chart', () => {
      expect(wrapper.find(VictoryArea).props()).toMatchObject({
        data: [
          { x: 0, y: 10 },
          { x: 1, y: 20 },
          { x: 2, y: 30 },
        ],
      })
    })

    it('renders x axis', () => {
      expect(wrapper.find(VictoryAxis).first().props()).toMatchObject({
        crossAxis: true,
        label: 'Time (s)'
      })
    })

    it('renders y axis', () => {
      expect(wrapper.find(VictoryAxis).last().props()).toMatchObject({
        crossAxis: true,
        dependentAxis: true,
        label: 'CPU Load (%)'
      })
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })
})