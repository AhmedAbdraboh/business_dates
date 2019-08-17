const { DateTime } = require('luxon')
const ResponseUtil = require('../../utils/ResponseGenerator')
const StatusCodes = require('../../utils/ResponseCodes')
const RespondUtil = require('../../utils/RespondUtil')
const Logger = require('../../logger')
const isNumber = require('../../utils/isNumber')
const isDate = require('../../utils/isDate')
module.exports = {
  validateGetBusinessDatesParams (req, res, next) {
    const { initialDate, delay } = req.query

    if (!isValidInitialDate(initialDate) || !isValidDelay(delay)) {
      const errorResponse = ResponseUtil.generateFailedResponse({ message: 'invalid params' })
      Logger.error(errorResponse)
      return RespondUtil.sendReponse(req, res, StatusCodes.STATUS_CODE_INVALID_PARAMS, errorResponse)
    }
    return next()
  },
  validateIsBusinessDateParam (req, res, next) {
    const { initialDate } = req.query

    if (!isValidInitialDate(initialDate)) {
      const errorResponse = ResponseUtil.generateFailedResponse({ message: 'invalid params' })
      Logger.error(errorResponse)
      return RespondUtil.sendReponse(req, res, StatusCodes.STATUS_CODE_INVALID_PARAMS, errorResponse)
    }
    return next()
  }
}

function isValidInitialDate (initialDate) {
  if (!initialDate) return false
  let initialDateObj = DateTime.fromISO(initialDate)
  return isDate(initialDateObj)
}

function isValidDelay (delay) {
  return isNumber(delay)
}
