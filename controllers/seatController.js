const Seat = require('./../models/seatModel')
const Ustat = require('./../models/userStatModel')


exports.getSeat = async (req, res, next) => {
    const seat = await Seat.find()

    res.status(200).json({
        status: 'success',
        seat
    })
}

const getConsecutiveSeats = (seatAvail, seatAsked) => {
    let findConsecutive = false
    let consCount = null;
    let consSeats = []
    for (let i = 0; i < seatAvail.length; i++) {
        if (consCount == null) {
            consCount = seatAvail[i].seat_no
            consSeats.push(seatAvail[i])
        }
        else {
            if (seatAvail[i].seat_no - consCount == 1) {
                consCount = seatAvail[i].seat_no
                consSeats.push(seatAvail[i])
            } else {
                consCount = null
                consSeats = []
            }
        }
        if (consSeats.length == seatAsked) {
            findConsecutive = true
            break;
        }
    }
    if (findConsecutive) {
        return consSeats
    }
    else {
        return seatAvail.slice(0, seatAsked)
    }
}

exports.bookSeat = async (req, res, next) => {
    const userid = req.body.userid
    const seatAsked = req.body.seatAsked
    if (seatAsked > 7) {
        return next(new Error("Can't booked seats more then 7"))
    }
    const seatAvail = await Seat.find({ "booked": false })
    if (seatAvail.length == 0) {
        return next(new Error("All seats are booked"))
    }
    const seats = getConsecutiveSeats(seatAvail, seatAsked)
    if (seats.length != seatAsked) {
        return next(new Error("Not enough seats"))
    }
    const seatIds = seats.map(item => item.seat_no)
    await Seat.updateMany({ "seat_no": { $in: seatIds } }, { $set: { booked: true, user_id: userid } })
    res.status(200).json({
        status: 'success',
        data: {
            seats
        }
    })
}



exports.createSeat = async (req, res, next) => {
    const seat = await Seat.create(req.body)
    res.status(200).json({
        status: 'success',
        data: {
            seat
        }
    })
}