const { v4: uuidv4 } = require("uuid"); // import uuid to generate a random ID.

const { validationResult } = require("express-validator"); // import validationResult to validate the request body.

const mongoose = require("mongoose");

const HttpError = require("../models/http-error");

const getCoordinatesForAddress = require("../util/location");

const Place = require("../models/place");

const User = require("../models/user");

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

  let userWithPlaces;

  try {
    userWithPlaces = await User.findById(userId).populate("places") // find the user with the id of userId. Populate the places field.
  } catch (err) {
    const error = new HttpError("Oops! Fetching places failed! Please try again later!", 500);
    console.log(err)
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(new HttpError("Oops! No places found with that user ID!", 404));
  }

  res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) }); // return the user.
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req); // validate the request body.

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
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

  let user;

  try {
    user = await User.findById(creator); // find the user with the id of creator.
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Couldn't create a place!", 500);
    console.log(err);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Oops! No user found with that ID!", 404);
    return next(error);
  }

  console.log(user)


  try {
    const sess = await mongoose.startSession(); // start a new session.
    sess.startTransaction(); // start a transaction.
    await createdPlace.save({ session: sess }); // save the place to the database.
    user.places.push(createdPlace); // push the place to the user's places array.
    await user.save({ session: sess }); // save the updated user to the database.
    await sess.commitTransaction(); // commit the transaction.
  } catch (err) {
    const error = new HttpError("Oops! Couldn't create a place! Please try again!", 500);
    console.log(err)
    return next(error);
  }

  console.log(createdPlace)
  console.log("A place created successfully!")
  res.status(201).json({ place: createdPlace }); // return the created place.
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req); // validate the request body.

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError(
      "Oops! Invalid inputs passed! Please check your data!",
      422
    ));
  } // check if there are any validation errors.

  const { title, description } = req.body; // get the data from the request body.

  const placeId = req.params.placeId; // get the place ID from the URL.

  let place;

  try {
    place = await Place.findById(placeId); // find the place with the id of placeId.
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Couldn't find a place to update!", 500);
    console.log(err)
    return next(error);
  }

  place.title = title; // update the title of the place.

  place.description = description; // update the description of the place.

  try {
    await place.save(); // save the place to the database.
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Couldn't update the place!", 500);
    console.log(err)
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) }); // return the updated place.
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId; // get the place ID from the URL.

  let place;

  try {
    place = await Place.findById(placeId).populate("creator"); // find the place with the id of placeId.
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Couldn't find a place to delete!", 500);
    console.log(err)
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Oops! No existing place found with that ID!", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession(); // start a new session.
    sess.startTransaction(); // start a transaction.
    await place.deleteOne({ session: sess }); // remove the place from the database.
    place.creator.places.pull(place); // pull the place from the creator's places array.
    await place.creator.save({ session: sess }); // save the updated creator to the database.
    await sess.commitTransaction(); // commit the transaction.
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Couldn't delete the place!", 500);
    console.log(err)
    return next(error);
  }

  res.status(200).json({ message: "Yay! Place deleted successfully!" }); // return a message.
};

exports.getPlaceById = getPlaceById;

exports.getPlacesByUserId = getPlacesByUserId;

exports.createPlace = createPlace;

exports.updatePlace = updatePlace;

exports.deletePlace = deletePlace;
