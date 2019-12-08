const express = require('express')
const helmet = require('helmet')
const admin = require('sriracha')
const morgan = require('morgan')

require('./db.js')

const app = express()

app.use(helmet())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/admin', admin())

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API server listening on port ' + port)
})
