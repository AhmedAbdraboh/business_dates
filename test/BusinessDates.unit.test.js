process.env.NODE_ENV = 'test'
const BusinessService = require('../src/services/BusinessDatesService')
const chai = require('chai')
chai.should()

describe('BusinessDates Service', () => {
  describe('getBusinessDates', () => {
    it('should return November 15th, 2 weekend days and 1 holiday day when calling the getBusinessDates with date "November 10 2018", delay 3', function (done) {
      let actualResult = BusinessService.getBusinessDates({
        initialDate: '2018-11-10T10:10:10Z',
        delay: 3
      })
      let expectedResult = {
        'ok': true,
        'initialQuery': {
          'initialDate': '2018-11-10T10:10:10Z',
          'delay': 3
        },
        'results': {
          'businessDate': '2018-11-15T12:10:10.000+02:00',
          'totalDays': 6,
          'holidayDays': 1,
          'weekendDays': 2
        }
      }
      actualResult.should.deep.equal(expectedResult)
      done()
    })
  })
})
