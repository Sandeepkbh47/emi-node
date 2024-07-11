const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to database")
})


app.listen(PORT, '0.0.0.0', () => {
    console.log(`listening to the server at${process.env.PORT}`)
})