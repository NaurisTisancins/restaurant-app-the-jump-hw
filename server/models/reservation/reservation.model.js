const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  customerID: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  table: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
//A reservations will have a datetime; a table number; a name (of the person booking); an email, and; number of guests