const { v4: uuidv4 } = require("uuid"); // import uuid to generate a random ID.

const { validationResult } = require("express-validator"); // import validationResult to validate the request body.

const HttpError = require("../models/http-error");

const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Ricky Blowtorch",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 69,
  },
  {
    id: "u2",
    name: "Hannah Steele",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 420,
  },
  {
    id: "u3",
    name: "Gia Olson",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 80085,
  },
  {
    id: "u4",
    name: "Candee Maxx",
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2Fe410f6b3-617c-4210-b03a-793d69623fad%2Fddoaaml-b6fc78f4-6e91-4871-9dbc-3e9d598e2862.png%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0MTBmNmIzLTYxN2MtNDIxMC1iMDNhLTc5M2Q2OTYyM2ZhZFwvZGRvYWFtbC1iNmZjNzhmNC02ZTkxLTQ4NzEtOWRiYy0zZTlkNTk4ZTI4NjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Brk0FtuamlhfyalfunOPwsDo9SJ4I9q_9CVW-0_bFn0&tbnid=P1ummVfhGZzWvM&vet=12ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa..i&imgrefurl=https%3A%2F%2Fwww.deviantart.com%2Fcoolcsd1986%2Fart%2FTeenage-Mutant-Ninja-Turtles-1987-Version-826851405&docid=MNyTHM8PRrordM&w=1000&h=1300&q=teenage%20mutant%20ninja%20turtles%20deviantart&ved=2ahUKEwjnyeuWpbOCAxU6NN4AHcj4D8QQMygTegQIARBa",
    places: 13,
  },
  {
    id: "u5",
    name: "Bobby Blowtorch",
    email: "test@test.com",
    password: "testing",
  }
];

const getUsers = async (req, res, next) => {

  let users;

  try {
    users = await User.find({}, "-password"); // find all users in the database, but don't return the password field.
  } catch (err) {
    const error = new HttpError("Oops! Something went wrong! Please try again later!", 500);
    console.log(err);
    return next(error);
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) }); // return the users.


};

const getUserById = (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.
  const user = DUMMY_USERS.find((u) => {
    return u.id === userId; // find the user with the id of userId.
  });
  res.json({ user: user }); // return the user.
};

const signup = async (req, res, next) => {
  const errors = validationResult(req); // validate the request body.

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError(
      "Oops! Invalid inputs passed! Please check your data!",
      422
    ));
  } // check if there are any validation errors.

  const { name, email, password } = req.body; // get the data from the request body.

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Oops! Signing up failed! Please try again later!", 500);
    console.log(err)
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Oops! User already exists! Please login instead!", 422);
    return next(error);
  }


  const createdUser = new User({
    name: name,
    email: email,
    password: password, // this will be encrypted later.
    imageUrl: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg", // this will be a url to an image.
    places: []
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
    const error = new HttpError("Oops! Logging in failed! Please try again later!", 500);
    console.log(err)
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Oops! Invalid e-mail address OR password! Please try again!", 401);
  }

res.json({ message: "Yay! Logged in successfully!"});

};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
