const RespondUtil = require('../../utils/RespondUtil')
const BusinessDatesService = require('../services/BusinessDatesService')
const ResponseCodes = require('../../utils/ResponseCodes')

module.exports = {
  getBusinessDate
}

function getBusinessDate (req, res) {
  let initialDate = req.query.initialDate
  let delay = req.query.delay
  let businessDates = BusinessDatesService.getBusinessDates({ initialDate, delay })
  return RespondUtil.sendReponse(req, res, ResponseCodes.STATUS_CODE_SUCESS, businessDates)
}
