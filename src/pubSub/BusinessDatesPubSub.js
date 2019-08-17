const pubSub = require('./index')
const BuisnessService = require('../services/BusinessDatesService')
const constants = require('../../constants')
const ResponseGenerator = require('../../utils/ResponseGenerator')
module.exports = {
  publish (data) {
    return pubSub.publishe(constants.BUSINESS_DATES_TOPIC, constants.BUSINESS_DATES_CHANNEL, data)
  },
  subscribe (cb) {
    return pubSub.subscribe(constants.BUSINESS_DATES_TOPIC, constants.BUSINESS_DATES_CHANNEL, function (data, evelop) {
      const businessDates = BuisnessService.getBusinessDates(data)
      const businessDatesResponse = ResponseGenerator.generateSuccessResponse(businessDates)
      cb(businessDatesResponse)
    })
  }
}
