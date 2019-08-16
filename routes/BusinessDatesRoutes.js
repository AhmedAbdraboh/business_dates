const express = require('express')
const businessDatesRouter = express.Router()
const BusinessDatesController = require('../src/controllers/BusinessDatesController')
const BusinessDatesValidator = require('../src/validators/BusinessDatesValidator')

businessDatesRouter.get('/v1/businessDates/getBusinessDateWithDelay', BusinessDatesValidator.validateGetBusinessDatesParams, BusinessDatesController.getBusinessDate)
businessDatesRouter.post('/v1/businessDates/getBusinessDateWithDelay', BusinessDatesValidator.validateGetBusinessDatesParams, BusinessDatesController.getBusinessDate)

module.exports = businessDatesRouter
