const express = require('express')
const cors = require('cors')
const seatRouter = require('./routers/seatRouter')
const userRouter = require('./routers/userRouter')

const app = express()
const corsConfig = {
    origin: "*",
    optionSuccessStatus: 200
}
app.use(cors(corsConfig))
app.use(express.json())

app.use('/api/v1/seat', seatRouter)
app.use('/api/v1/user', userRouter)

app.use((err, req, res, next) => {
    res.status(400).json({
        status: "error",
        message: err.message
    })
})


module.exports = app
