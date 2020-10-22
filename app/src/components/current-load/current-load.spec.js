import * as React from 'react'
import { shallow } from 'enzyme'
import { VictoryPie } from 'victory'

import {
  CurrentLoad,
  CHART_GREEN,
  CHART_YELLOW,
  CHART_RED
} from './current-load'
import * as useCPULoadUtil from '../../utils/use-cpu-load'

describe('CurrentLoad', () => {
  describe('when data is loading', () => {
    let wrapper

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([])

      wrapper = shallow(<CurrentLoad />)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('renders display text of `loading`', () => {
      expect(wrapper.find({ className: 'current-load-text' }).contains('The current load is loading')).toBe(true)
    })

    it('does not render pie chart', () => {
      expect(wrapper.find(VictoryPie).exists()).toBe(false)
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })

  describe('when current load is normal', () => {
    let wrapper
    const mockLoadAverage = 23.4

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([12.3, mockLoadAverage])

      wrapper = shallow(<CurrentLoad />)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('adds generic class to wrapper', () => {
      expect(wrapper.prop('className')).toBe('current-load-container')
    })

    it('renders display text for most current load value', () => {
      expect(wrapper.find({ className: 'current-load-text' }).contains('The current load is 23.40%')).toBe(true)
    })

    it('renders pie chart with green color scheme and current load value', () => {
      expect(wrapper.find(VictoryPie).props()).toMatchObject({
        colorScale: [CHART_GREEN, '#252525'],
        data: [
            {x: 'Load Average', y: mockLoadAverage },
            {x: 'Available CPU', y: 100 - mockLoadAverage}
          ]
      })
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })

  describe('when current load is in caution mode', () => {
    let wrapper
    const mockLoadAverage = 71.2

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([mockLoadAverage])

      wrapper = shallow(<CurrentLoad />)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('adds caution mode class to wrapper', () => {
      expect(wrapper.prop('className')).toBe('current-load-container current-load-container-caution')
    })

    it('renders display text for most current load value', () => {
      expect(wrapper.find({ className: 'current-load-text' }).contains('The current load is 71.20%')).toBe(true)
    })

    it('renders pie chart with green color scheme and current load value', () => {
      expect(wrapper.find(VictoryPie).props()).toMatchObject({
        colorScale: [CHART_YELLOW, '#252525'],
        data: [
            {x: 'Load Average', y: mockLoadAverage},
            {x: 'Available CPU', y: 100 - mockLoadAverage}
          ]
      })
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })

  describe('when current load is in danger mode', () => {
    let wrapper
    const mockLoadAverage = 98.1

    beforeAll(() => {
      jest.spyOn(useCPULoadUtil, 'useCPULoad').mockReturnValue([mockLoadAverage])

      wrapper = shallow(<CurrentLoad />)
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('adds caution mode class to wrapper', () => {
      expect(wrapper.prop('className')).toBe('current-load-container current-load-container-danger')
    })

    it('renders display text for most current load value', () => {
      expect(wrapper.find({ className: 'current-load-text' }).contains('The current load is 98.10%')).toBe(true)
    })

    it('renders pie chart with green color scheme and current load value', () => {
      expect(wrapper.find(VictoryPie).props()).toMatchObject({
        colorScale: [CHART_RED, '#252525'],
        data: [
            {x: 'Load Average', y: mockLoadAverage},
            {x: 'Available CPU', y: 100 - mockLoadAverage}
          ]
      })
    })

    it('matches snapshot', () => {
      expect(wrapper.getElement()).toMatchSnapshot()
    })
  })
})