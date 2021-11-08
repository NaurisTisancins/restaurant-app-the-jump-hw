const Reservation = require("../models/reservation/reservation.model");
const { errorHandler } = require("./utils");
const logger = require("./../logger");

// exports.getReservations = function (req, res) {
//   let query = {};
//   if (req.params.id) {
//     query._id = req.params.id;
//   }
// };//getReservations

exports.getOwnReservations = function (req, res) {
  let query = {
    customerID: req.user.sub,
  };
  if (req.params.id) {
    query._id = req.params.id;
  };
  Reservation.find(query).exec((err, reservations) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && orders.length === 0) {
      return res.status(404).send({ message: `No reservationswith ID: ${req.params.id}` });
    };
    return res.status(200).json(reservations);
  });
};//getOwnReservations

exports.addOwnReservation = function (req, res) {
  const reservationData = { ...req.body, customerID: req.user.sub };
  logger.info(`reservationData ${reservationData}`);
  logger.info(`user ${req.user}`);
  const newReservation = new Reservation(reservationData);
  newReservation.save((err, reservation) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(reservation);
  });
};//addReservation

exports.updateOwnReservation = function (req, res) {
  Reservation.updateOne({ _id: req.params.id, customerID: req.user.sub }, req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      logger.info(`result ${result}`);
      if (result.nModified === 0) {
        return res.status(404).send({ message: "No order with that ID" });
      };
      res.sendStatus(200);
    });
};//updateOwnReservation