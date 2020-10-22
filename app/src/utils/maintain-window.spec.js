import { maintainWindow } from './maintain-window'

describe('maintainWindow', () => {
  describe('when array length is less than window length', () => {
    const mockArray = [0,1,2,3,4,5]
    const mockWindowLength = 7
    let result

    beforeAll(() => {
      result = maintainWindow(mockArray, mockWindowLength)
    })

    it('returns original array', () => {
      expect(result).toMatchObject(mockArray)
    })
  })

  describe('when array length is greater than window length', () => {
    const mockArray = [0,1,2,3,4,5]
    const mockWindowLength = 5
    let result

    beforeAll(() => {
      result = maintainWindow(mockArray, mockWindowLength)
    })

    it('returns shifted array', () => {
      expect(result).toMatchObject([1,2,3,4,5])
    })
  })
})