const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have name"]
    },
})

const user = mongoose.model('User', userSchema)

module.exports = user