const pubSub = require('./index')
const BuisnessService = require('../services/BusinessDatesService')
const constants = require('../../constants')
module.exports = {
  publish (data) {
    return pubSub.publishe(constants.BUSINESS_DATES_TOPIC, constants.BUSINESS_DATES_CHANNEL, data)
  },
  subscribe (cb) {
    return pubSub.subscribe(constants.BUSINESS_DATES_TOPIC, constants.BUSINESS_DATES_CHANNEL, function (data, evelop) {
      cb(BuisnessService.getBusinessDates(data))
    })
  }
}
