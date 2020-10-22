import { checkForLoadAndRecovery } from './check-for-load-and-recovery'

describe('checkForLoadAndRecovery', () => {
  describe('when the cpu data is shorter than the time window', () => {
    let result

    beforeAll(() => {
      result = checkForLoadAndRecovery([10], 2)
    })

    it('returns null values', () => {
      expect(result).toMatchObject({
        heavyLoadTimes: [],
        recoveryTimes: []
      })
    })
  })

  describe('when there is no heavy load', () => {
    let result

    beforeAll(() => {
      result = checkForLoadAndRecovery([10, 20, 30, 40], 4)
    })

    it('returns null values', () => {
      expect(result).toMatchObject({
        heavyLoadTimes: [],
        recoveryTimes: []
      })
    })
  })

  describe('when there is a window of heavy load', () => {
    let result

    beforeAll(() => {
      result = checkForLoadAndRecovery([20, 20, 100, 100, 100, 100, 100, 100, 20, 20], 4)
    })

    it('returns heavy load times', () => {
      expect(result).toMatchObject({
        heavyLoadTimes: ['0m 20s'],
        recoveryTimes: []
      })
    })
  })

  describe('when there is a window of heavy load and recovery time', () => {
    let result

    beforeAll(() => {
      result = checkForLoadAndRecovery([20, 20, 100, 100, 100, 100, 100, 80, 100, 20, 20, 20, 20], 4)
    })

    it('returns heavy load times and recovery times', () => {
      expect(result).toMatchObject({
        heavyLoadTimes: ['0m 20s'],
        recoveryTimes: ['1m 30s']
      })
    })
  })

  describe('when there are multiple windows of heavy load and multiple recovery times', () => {
    let result

    beforeAll(() => {
      result = checkForLoadAndRecovery([100, 100, 100, 100, 50, 100, 20, 20, 20, 20, 100, 80, 100, 100, 100, 100, 80, 100, 20, 20, 20, 20], 4)
    })

    it('returns heavy load times and recovery times', () => {
      expect(result).toMatchObject({
        heavyLoadTimes: ['0m 0s', '2m 0s'],
        recoveryTimes: ['1m 0s', '3m 0s']
      })
    })
  })
})
