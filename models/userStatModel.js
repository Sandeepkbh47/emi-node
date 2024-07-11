const mongoose = require('mongoose')

const ustatSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    is_booked: {
        type: Boolean,
        default: false
    }
})

const Ustat = mongoose.model('Ustat', ustatSchema)

module.exports = Ustat