const express = require('express')
const helmet = require('helmet')
var admin = require('sriracha')

const app = express()

app.use(helmet())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

app.use('/admin', admin())
