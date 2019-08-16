const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(morgan('dev'))

require('./routes/index')(app)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app
