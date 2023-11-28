const { v4: uuidv4 } = require("uuid"); // import uuid to generate a random ID.

const { validationResult } = require("express-validator"); // import validationResult to validate the request body.

const HttpError = require("../models/http-error");

const getCoordinatesForAddress = require("../util/location");

const Place = require("../models/place");

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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId; // get the place ID from the URL.

  let place;

  try {
    place = await Place.findById(placeId); // find the place with the id of placeId.
    console.log("Found place by ID!")
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Couldn't find a place!", 500);
    console.log(err)
    return next(error);
  }


  if (!place) {
    const error = new HttpError("Oops! No existing place found with that ID!", 404);
    console.log(error)
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // return the place.
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.

  let places;
  try {
    places = await Place.find({ creator: userId }); // find the places with the creator of userId.
  } catch (err) {
    const error = new HttpError("Oops! Fetching places failed! Please try again later!", 500);
    console.log(err)
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(new HttpError("Oops! No places found with that user ID!", 404));
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) }); // return the user.
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req); // validate the request body.

  if (!errors.isEmpty()) {
    console.log(errors);
    next(
      new HttpError("Oops! Invalid inputs passed! Please check your data!", 422)
    );
  } // check if there are any validation errors.

  const { title, description, address, creator } = req.body; // get the data from the request body.

  let coordinates;

  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title: title,
    description: description,
    address: address,
    location: coordinates,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    creator: creator,
  }); // create a new place.

  try {
    await createdPlace.save(); // save the place to the database.
  } catch (err) {
    const error = new HttpError("Oops! Couldn't create a place! Please try again!", 500);
    console.log(err)
    return next(error);
  }

  res.status(201).json({ place: createdPlace }); // return the created place.
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req); // validate the request body.

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError(
      "Oops! Invalid inputs passed! Please check your data!",
      422
    );
  } // check if there are any validation errors.

  const { title, description } = req.body; // get the data from the request body.

  const placeId = req.params.placeId; // get the place ID from the URL.

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) }; // find the place with the id of placeId and copy it to updatedPlace.

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId); // find the index of the place with the id of placeId.

  updatedPlace.title = title; // update the title of the place.

  updatedPlace.description = description; // update the description of the place.

  DUMMY_PLACES[placeIndex] = updatedPlace; // update the place in the DUMMY_PLACES array.

  res.status(200).json({ place: updatedPlace }); // return the updated place.
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId; // get the place ID from the URL.

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Oops! No place found with that ID!", 404);
  }

  // filter out the place with the id of placeId. If id matches, this is the place to be deleted.
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place deleted successfully!" }); // return a message.
};

exports.getPlaceById = getPlaceById;

exports.getPlacesByUserId = getPlacesByUserId;

exports.createPlace = createPlace;

exports.updatePlace = updatePlace;

exports.deletePlace = deletePlace;
