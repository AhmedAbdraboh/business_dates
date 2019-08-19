process.env.NODE_ENV = 'test'
const BusinessDatesPubSub = require('../src/pubSub/BusinessDatesPubSub')
describe('BusinessDates Pub/Sub', () => {
  describe('pub/sub', () => {
    it('should return November 15th, 2 weekend days and 1 holiday day if message is published with topic businessDates and channel BankWire with date "November 10 2018", delay 3', function (done) {
      let sub = BusinessDatesPubSub.subscribe(function (actualResult) {
        actualResult.should.deep.equal({
          'ok': true,
          'initialQuery': {
            'initialDate': '2018-11-10T10:10:10Z',
            'delay': 3
          },
          'results': {
            'businessDate': '2018-11-15T10:10:10.000Z',
            'totalDays': 6,
            'holidayDays': 1,
            'weekendDays': 2
          }
        })
        sub.unsubscribe()
        done()
      })

      BusinessDatesPubSub.publish({
        'initialDate': '2018-11-10T10:10:10Z',
        'delay': 3
      })
    })

    it('should return November 19th, 2 weekend days and 0 holiday day if message is published with topic businessDates and channel BankWire with date "November 15 2018", delay 3', function (done) {
      let sub = BusinessDatesPubSub.subscribe(function (res) {
        res.should.deep.equal({
          'ok': true,
          'initialQuery': {
            'initialDate': '2018-11-15',
            'delay': 3
          },
          'results': {
            'businessDate': '2018-11-19T00:00:00.000Z',
            'totalDays': 5,
            'holidayDays': 0,
            'weekendDays': 2
          }
        })
        sub.unsubscribe()
        done()
      })

      BusinessDatesPubSub.publish({
        'initialDate': '2018-11-15',
        'delay': 3
      })
    })

    it('should return January 24th 2019 8 weekend days and 3 holiday days if message is published with topic businessDates and channel BankWire with date "December 25 2018", delay 20', function (done) {
      let sub = BusinessDatesPubSub.subscribe(function (res) {
        res.should.deep.equal({
          'ok': true,
          'initialQuery': {
            'initialDate': '2018-12-25',
            'delay': 20
          },
          'results': {
            'businessDate': '2019-01-24T00:00:00.000Z',
            'totalDays': 31,
            'holidayDays': 3,
            'weekendDays': 8
          }
        })
        sub.unsubscribe()
        done()
      })

      BusinessDatesPubSub.publish({
        'initialDate': '2018-12-25',
        'delay': 20
      })
    })
  })
})
