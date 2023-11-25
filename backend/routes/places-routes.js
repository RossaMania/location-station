const express = require("express");

const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:placeId", placesControllers.getPlaceById);

router.get("/user/:userId", placesControllers.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").trim().notEmpty(), // check if the title is not empty.
    check("description").trim().isLength({ min: 5 }), // check if the description is at least 5 characters long.
    check("address").trim().notEmpty(), // check if the address is not empty.
  ],
  placesControllers.createPlace
);

router.patch("/:placeId", placesControllers.updatePlace);

router.delete("/:placeId", placesControllers.deletePlace);

module.exports = router;
