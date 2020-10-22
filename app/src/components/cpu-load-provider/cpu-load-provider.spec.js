import * as React from 'react'
import { shallow } from 'enzyme'

import { CPULoadProvider } from './cpu-load-provider'

describe('CPULoadProvider', () => {
  const child = <div>this is a child</div>
  const mockValue = [10, 20, 30]
  const mockSetValue = jest.fn()
  let useCallbackSpy
  let useEffectSpy
  let useStateSpy
  let wrapper

  beforeAll(() => {
    useCallbackSpy = jest.spyOn(React, 'useCallback')
    useEffectSpy = jest.spyOn(React, 'useEffect').mockImplementation(f => f())
    useStateSpy = jest.spyOn(React, 'useState')
      .mockImplementation(value => [mockValue, mockSetValue])

    wrapper = shallow(
      <CPULoadProvider>
        {child}
      </CPULoadProvider>
    )
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('calls useEffect with fetch function', () => {
    expect(useEffectSpy).toHaveBeenCalledWith(expect.any(Function), [expect.any(Function)])
  })

  it('renders children', () => {
    expect(wrapper.contains(child)).toBe(true)
  })

  it('sets provider value to match value from state', () => {
    expect(wrapper.prop('value')).toMatchObject(mockValue)
  })

  it('matches snapshot', () => {
    expect(wrapper.getElement()).toMatchSnapshot()
  })
})