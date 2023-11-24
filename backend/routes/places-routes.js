const express = require("express");

const HttpError = require("../models/http-error");

const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:placeId", placesControllers.getPlaceById);

router.get("/user/:userId", placesControllers.getPlaceByUserId);

router.post("/", placesControllers.createPlace);

router.patch("/:placeId", placesControllers.updatePlace);

router.delete("/:placeId", placesControllers.deletePlace);

module.exports = router;
