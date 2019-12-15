var express = require('express')
var router = express.Router()

router.get('/status', function(req, res) {
    res.send('User status')
})

router.post('/login', function(req, res) {
    res.send('User login')
})

router.post('/register', function(req, res) {
    res.send('User register')
})

module.exports = router;
