const express = require('express')
const helmet = require('helmet')
const admin = require('sriracha')
const morgan = require('morgan')
require('dotenv').config()

require('./db.js')
const users = require('./routes/api/v1.0/users')

const app = express()

app.use(helmet())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/admin', admin())
app.use('/api/v1.0/users', users)

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API server listening on port ' + port)
})
