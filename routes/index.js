const BusinessDatesRoutes = require('./BusinessDatesRoutes')
const prefix = 'api'
module.exports = function (app) {
  app.use(`/${prefix}`, BusinessDatesRoutes)
}
