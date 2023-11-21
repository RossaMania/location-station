const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u2",
  },
];

router.get("/:placeId", (req, res, next) => {
  const placeId = req.params.placeId; // get the place ID from the URL.
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId; // find the place with the id of placeId.
  });

  if (!place) {
    const error = new Error("Oops! No place found with that ID!");
    error.code = 404;
    throw error;
  }

  res.json({ place: place }); // return the place.
});

router.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId; // find the user with the id of userId.
  });

  if (!place) {
    const error = new Error("Oops! No place found with that user ID!");
    error.code = 404;
    return next(error);
  }

  res.json({ place: place }); // return the user.
});

module.exports = router;
