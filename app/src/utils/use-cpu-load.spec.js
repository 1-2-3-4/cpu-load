import * as React from 'react'
import { useCPULoad } from './use-cpu-load'
import { CPULoadContext } from '../components/cpu-load-provider/cpu-load-context'

describe('useCPULoad', () => {
  let result
  const mockContextValue = [10, 20, 30]

  beforeAll(() => {
    jest.spyOn(React, 'useContext').mockReturnValue(mockContextValue)

    result = useCPULoad()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('calls React context with CPULoad Context', () => {
    expect(React.useContext).toHaveBeenCalledWith(CPULoadContext)
  })

  it ('returns cpu load', () => {
    expect(result).toMatchObject(mockContextValue)
  })
})