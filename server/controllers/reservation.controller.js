const Reservation = require("../models/reservation/reservation.model");
const { errorHandler } = require("./utils");
const logger = require("./../logger");


exports.addReservation = function (req, res) {
  const reservationData = req.body;
  logger.info(`reservationData ${reservationData}`);
  logger.info(`user ${req.user}`);
  const newReservation = new Reservation(reservationData);
  newReservation.save((err, reservation) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(reservation);
  });
};