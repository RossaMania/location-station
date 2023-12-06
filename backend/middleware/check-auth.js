const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {

  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // get the token from the request headers. Authorization: "Bearer TOKEN" Split at the space and get the second element of the array.
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!"); // Authorization header isn't set at all, and split failed.
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share"); // verify the token.
    req.userData = { userId: decodedToken.userId }; // add the user data to the request.
    next(); // if the token is valid, continue.
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401); // Split succeeded, but token is undefined, null, or not valid.
    console.log(err);
    return next(error); // return the error here so no other code executes.
  }

};