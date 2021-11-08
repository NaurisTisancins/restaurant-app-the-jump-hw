const path = require("path");
const express = require("express");
const logger = require("./../logger");
const router = express.Router();
const {
  getOwnReservations,
  addOwnReservation,
  updateOwnReservation,
  removeOwnReservation,
} = require("../controllers/reservation.controller");

const { checkPermissions } = require("../middleware/permissions.middleware");
const { checkJwt } = require("./../middleware/authz.middleware");

const {
  CreateReservation,
  CreateOwnReservation,
  ReadOwnReservation,
  ReadReservation,
  UpdateOwnReservation,
  UpdateReservation,
  DeleteOwnReservation,
  DeleteReservation,
} = require("../constants").ReservationPermission;

const logToken = (req, res, next) => {
  logger.info(`headers ${req.headers}`);
  next();
};

const logUser = (req, res, next) => {
  logger.info(`User ${req.user}`);
  next();
}

router
  .get("/:id?",
    logToken,
    checkJwt,
    checkPermissions(ReadOwnReservation),
    getOwnReservations
  )
  .post("/",
    logToken,
    checkJwt,
    checkPermissions(CreateOwnReservation),
    addOwnReservation
  )
  .put("/:id",
    checkJwt,
    checkPermissions(UpdateOwnReservation),
    updateOwnReservation
)
  .delete("/:id", checkJwt, checkPermissions(DeleteOwnReservation), removeOwnReservation)

module.exports = router;