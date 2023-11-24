const { v4: uuidv4 } = require("uuid"); // import uuid to generate a random ID.

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId; // get the place ID from the URL.
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId; // find the place with the id of placeId.
  });

  if (!place) {
    throw new HttpError("Oops! No place found with that ID!", 404);
  }

  res.json({ place: place }); // return the place.
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId; // find the user with the id of userId.
  });

  if (!place) {
    return next(new HttpError("Oops! No place found with that user ID!", 404));
  }

  res.json({ place: place }); // return the user.
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body; // get the data from the request body.

  const createdPlace = {
    id: uuidv4(),
    title: title,
    description: description,
    location: coordinates,
    address: address,
    creator: creator,
  };

  DUMMY_PLACES.push(createdPlace); // push the created place to the DUMMY_PLACES array.

  res.status(201).json({ place: createdPlace }); // return the created place.
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body; // get the data from the request body.

  const placeId = req.params.placeId; // get the place ID from the URL.

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }; // find the place with the id of placeId and copy it to updatedPlace.

  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId); // find the index of the place with the id of placeId.

  updatedPlace.title = title; // update the title of the place.

  updatedPlace.description = description; // update the description of the place.

  DUMMY_PLACES[placeIndex] = updatedPlace; // update the place in the DUMMY_PLACES array.

  res.status(200).json({ place: updatedPlace }); // return the updated place.

};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId; // get the place ID from the URL.

  // filter out the place with the id of placeId. If id matches, this is the place to be deleted.
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place deleted successfully!" }); // return a message.
};




exports.getPlaceById = getPlaceById;

exports.getPlaceByUserId = getPlaceByUserId;

exports.createPlace = createPlace;

exports.updatePlace = updatePlace;

exports.deletePlace = deletePlace;
