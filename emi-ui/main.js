function bookSeat() {
    let userid = document.getElementById("name").value
    let seat = document.getElementById("seat").value
    fetch('http://127.0.0.1:3000/api/v1/seat/book', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userid": userid,
            "seatAsked": seat
        })
    }).then(res => res.json())
        .then(res => {
            if (res.status = "success") {
                displaySeats(res.data.seats)
            }
            else {
                showError(res.message)
            }
        }).catch(err => showError())
}


function displaySeats(seats) {
    let seatApprv = document.getElementById("seatApprv")
    seats.forEach(element => {
        let divelement = document.createElement('div')
        divelement.innerHTML = "<span> row:" + element.row + "| seat:" + element.seat_no + "</span>"
        seatApprv.appendChild(divelement)
    });
}

function showError(msg) {
    let seatApprv = document.getElementById("seatApprv")
    seatApprv.innerHTML = ""
    let divelement = document.createElement('div')
    if (msg) {
        divelement.innerHTML = "<span>" + msg + "</span>"
    } else {
        divelement.innerHTML = "<span> Not able to process right now</span>"
    }

    seatApprv.appendChild(divelement)
}