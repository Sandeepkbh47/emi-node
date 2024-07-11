const mongoose = require('mongoose')



const seatSchema = mongoose.Schema({
    row: {
        type: Number
    },
    seat_no: {
        type: Number
    },
    booked: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

const Seat = mongoose.model('Seat', seatSchema)

module.exports = Seat