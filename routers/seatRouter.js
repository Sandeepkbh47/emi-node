const express = require('express')
const router = express.Router()
const seatController = require('./../controllers/seatController')

router.route('/book')
    .post(seatController.bookSeat)

router.route('/')
    .post(seatController.createSeat)


module.exports = router