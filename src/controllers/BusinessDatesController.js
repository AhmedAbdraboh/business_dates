const RespondUtil = require('../../utils/RespondUtil')
const BusinessDatesService = require('../services/BusinessDatesService')
const ResponseCodes = require('../../utils/ResponseCodes')
const ResponseGenerator = require('../../utils/ResponseGenerator')

module.exports = {
  getBusinessDates,
  isBusinessDate
}

function getBusinessDates (req, res) {
  const { initialDate, delay } = req.query
  const businessDates = BusinessDatesService.getBusinessDates({ initialDate, delay })
  const businessDatesResponse = ResponseGenerator.generateSuccessResponse(businessDates)
  return RespondUtil.sendReponse(req, res, ResponseCodes.STATUS_CODE_SUCESS, businessDatesResponse)
}

function isBusinessDate (req, res) {
  const { initialDate } = req.query
  const isBusinessDate = BusinessDatesService.isBusinessDate(initialDate)
  const isBusinessDateResponse = ResponseGenerator.generateSuccessResponse({ results: isBusinessDate })
  return RespondUtil.sendReponse(req, res, ResponseCodes.STATUS_CODE_SUCESS, isBusinessDateResponse)
}
