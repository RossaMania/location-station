const fs = require("fs");

const path = require("path");

const express = require("express");

require("dotenv").config(); // import dotenv to use environment variables.

const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const usersRoutes = require("./routes/users-routes");

const port = process.env.PORT;

const app = express();

app.use("/backend/uploads/images", express.static(path.join("backend", "uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow any domain to send requests to our API.
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // allow these headers to be sent.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // allow these methods to be sent on the front end.
  next();
});

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // => /api/places/...

app.use("/api/users", usersRoutes); // => /api/users/...

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


// app.use((req, res, next) => {

//   const error = new HttpError("Oops! This route doesn't exist!", 404);
//   throw error;

// }); // This is for routes that don't exist. This middleware will only run if we didn't send a response in any of the above middlewares.

app.use((error, req, res, next) => {
if (req.file) {
  fs.unlink(req.file.path, err => {
    console.log(err);
  });
}

if (res.headerSent) {
  return next(error);
}

const statusCode = error.code >= 100 && error.code < 600 ? error.code : 500;
res.status(statusCode);
res.json({ message: error.message || "Oops! An unknown error occurred!" });

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});