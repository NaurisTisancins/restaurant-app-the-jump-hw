const path = require("path");
const express = require("express");
const logger = require("./../logger");
const router = express.Router();
const {
  addReservation,
} = require("../controllers/reservation.controller");

const { checkPermissions } = require("../middleware/permissions.middleware");
const { checkJwt } = require("./../middleware/authz.middleware");

const {
  CreateReservation,
  CreateOwnReservation,
} = require("../constants");

const logToken = (req, res, next) => {
  logger.info(`headers ${req.headers}`);
  next();
};

const logUser = (req, res, next) => {
  logger.info(`User ${req.user}`);
  next();
}

router.post("/", addReservation);

module.exports = router;