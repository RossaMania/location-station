const express = require("express");

require("dotenv").config({ path: "../.env" }); // import dotenv to use environment variables.

const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // => /api/places/...

app.use("/api/users", usersRoutes); // => /api/users/...

app.use((req, res, next) => {

  const error = new HttpError("Oops! This route doesn't exist!", 404);
  throw error;

}); // This is for routes that don't exist. This middleware will only run if we didn't send a response in any of the above middlewares.

app.use((error, req, res, next) => {
if (res.headerSent) {
  return next(error);
}

res.status(error.code || 500);
res.json({ message: error.message || "Oops! An unknown error occurred!" });

})


app.listen(5000);