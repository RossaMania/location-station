const { v4: uuidv4 } = require("uuid"); // import uuid to generate a random ID.
const HttpError = require("../models/http-error");

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

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS }); // return the users array.
};

const getUserById = (req, res, next) => {
  const userId = req.params.userId; // get the user ID from the URL.
  const user = DUMMY_USERS.find((u) => {
    return u.id === userId; // find the user with the id of userId.
  });
  res.json({ user: user }); // return the user.
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body; // get the data from the request body.

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError(
      "Oops! Email already exists! Could not create user!",
      422
    );
  } // check if the user already exists.

  const createdUser = {
    id: uuidv4(), // generate a random ID.
    name: name,
    email: email,
    password: password,
  };

  DUMMY_USERS.push(createdUser); // push the created user object into the DUMMY_USERS array.

  res.status(201).json({ user: createdUser }); // return the created user.
};

const login = (req, res, next) => {

  const { email, password } = req.body; // get the data from the request body.

  const identifiedUser = DUMMY_USERS.find(u => u.email === email); // find the user with the user email matching email in the request body.

  if (!identifiedUser || identifiedUser.password !== password) { // if there is no user with the email matching email in the request body or the password doesn't match the password in the request body...
    throw new HttpError("Oops! Could not identify user! Please check credentials!", 401);
};

res.json({ message: "Yay! Logged in successfully!"});

};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
