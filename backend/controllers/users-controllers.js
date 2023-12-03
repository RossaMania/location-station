const { v4: uuidv4 } = require("uuid"); // import uuid to generate a random ID.

const { validationResult } = require("express-validator"); // import validationResult to validate the request body.

const HttpError = require("../models/http-error");

const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password"); // find all users in the database, but don't return the password field.
  } catch (err) {
    const error = new HttpError(
      "Oops! Something went wrong! Please try again later!",
      500
    );
    console.log(err);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) }); // return the users.
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.

  let user;
  try {
    user = await User.findById(userId); // find the user with the id of userId.
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later",
      500
    );
    console.log(err);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) }); // return the user.
};

const signup = async (req, res, next) => {
  const errors = validationResult(req); // validate the request body.

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Oops! Invalid inputs passed! Please check your data!", 422)
    );
  } // check if there are any validation errors.

  const { name, email, password } = req.body; // get the data from the request body.

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Oops! Signing up failed! Please try again later!",
      500
    );
    console.log(err);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Oops! User already exists! Please login instead!",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    password: password, // this will be encrypted later.
    imageUrl: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg", // this will be a url to an image.
    places: [],
  });

  try {
    await createdUser.save(); // save the user to the database.
  } catch (err) {
    const error = new HttpError(
      "Oops! User sign up failed! Please try again!",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) }); // return the created user.
};

const login = async (req, res, next) => {
  const { email, password } = req.body; // get the data from the request body.

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Oops! Logging in failed! Please try again later!",
      500
    );
    console.log(err);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Oops! Invalid e-mail address OR password! Please try again!",
      401
    );
    console.log(error);
    return next(error);
  }

  res.json({ message: "Yay! Logged in successfully!", user: existingUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
