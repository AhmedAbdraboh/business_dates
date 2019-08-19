process.env.NODE_ENV = 'test'
const server = require('../app')
const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const should = chai.should()

describe('BusinessDates API', () => {
  describe('/api/v1/businessDates/', () => {
    it('should return error with invalid params if query delay or initialDate params are not found or invalid in get request to /api/v1/businessDates/getBusinessDateWithDelay', function (done) {
      chai.request(server).get('/api/v1/businessDates/getBusinessDateWithDelay').end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(400)
        res.body.message.should.equal('invalid params')
        done()
      })
    })
    it('should return November 15th, 2 weekend days and 1 holiday day when calling the API /api/v1/businessDates/getBusinessDateWithDelay with date "November 10 2018", delay 3, GET Request', function (done) {
      chai.request(server).get('/api/v1/businessDates/getBusinessDateWithDelay?delay=3&initialDate=2018-11-10T10:10:10Z').end(function (err, res) {
        should.equal(err, null)
        res.body.should.deep.equal({
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
        done()
      })
    })
    it('should return November 15th, 2 weekend days and 1 holiday day when calling the API /api/v1/businessDates/getBusinessDateWithDelay with date "November 10 2018", delay 3, POST Request', function (done) {
      chai.request(server).post('/api/v1/businessDates/getBusinessDateWithDelay?delay=3&initialDate=2018-11-10T10:10:10Z').end(function (err, res) {
        should.equal(err, null)
        res.body.should.deep.equal({
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
        done()
      })
    })

    it('should return November 19th, 2 weekend days and 0 holiday day when calling the API /api/v1/businessDates/getBusinessDateWithDelay with date "November 15 2018", delay 3, POST Request', function (done) {
      chai.request(server).post('/api/v1/businessDates/getBusinessDateWithDelay?delay=3&initialDate=2018-11-15').end(function (err, res) {
        should.equal(err, null)
        res.body.should.deep.equal({
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
        done()
      })
    })

    it('should return November 19th, 2 weekend days and 0 holiday day when calling the API /api/v1/businessDates/getBusinessDateWithDelay with date "November 15 2018", delay 3, GET Request', function (done) {
      chai.request(server).get('/api/v1/businessDates/getBusinessDateWithDelay?delay=3&initialDate=2018-11-15').end(function (err, res) {
        should.equal(err, null)
        res.body.should.deep.equal({
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
        done()
      })
    })

    it('should return January 24th 2019 8 weekend days and 3 holiday days when calling the API /api/v1/businessDates/getBusinessDateWithDelay with date "December 25 2018", delay 20, POST Request', function (done) {
      chai.request(server).post('/api/v1/businessDates/getBusinessDateWithDelay?delay=20&initialDate=2018-12-25').end(function (err, res) {
        should.equal(err, null)
        res.body.should.deep.equal({
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
        done()
      })
    })
    it('should return January 24th 2019 8 weekend days and 3 holiday days when calling the API /api/v1/businessDates/getBusinessDateWithDelay with date "December 25 2018", delay 20, GET Request', function (done) {
      chai.request(server).get('/api/v1/businessDates/getBusinessDateWithDelay?delay=20&initialDate=2018-12-25').end(function (err, res) {
        should.equal(err, null)
        res.body.should.deep.equal({
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
        done()
      })
    })
  })
  describe('/api/v1/businessDates/', () => {
    it('should return error with invalid params if initialDate param are not found or invalid in get request to /api/v1/businessDates/isBusinessDate', function (done) {
      chai.request(server).get('/api/v1/businessDates/isBusinessDate').end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(400)
        res.body.message.should.equal('invalid params')
        done()
      })
    })

    it('should return true with valid business date in get request to /api/v1/businessDates/isBusinessDate?initialDate=2018-11-10T10:10:10Z', function (done) {
      chai.request(server).get('/api/v1/businessDates/isBusinessDate?initialDate=2018-11-10T10:10:10Z').end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.deep.equal({
          ok: true,
          results: true
        })
        done()
      })
    })

    it('should return false with invalid business date in get request to /api/v1/businessDates/isBusinessDate?initialDate=2018-11-11T10:10:10Z', function (done) {
      chai.request(server).get('/api/v1/businessDates/isBusinessDate?initialDate=2018-11-11T10:10:10Z').end(function (err, res) {
        should.equal(err, null)
        res.should.have.status(200)
        res.body.should.deep.equal({
          ok: true,
          results: false
        })
        done()
      })
    })
  })
})
