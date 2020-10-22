import { toPercent } from './to-percent'

describe('toPercent', () => {
  const mockNum = 23.4567890
  let result

  beforeAll(() => {
    result = toPercent(mockNum)
  })

  it('converts number to percent', () => {
    expect(result).toBe('23.46%')
  })
})