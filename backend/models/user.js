const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator"); // import mongoose-unique-validator to use unique validator.

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true }, // name is a required string.
  email: { type: String, required: true, unique: true }, // email is a required string. It's also unique which means it's indexed.
  password: { type: String, required: true, minlength: 8 }, // password is a required string. It's also at least 6 characters long.
  imageUrl: { type: String, required: true }, // imageURL is a required string. It's just a url to an image.
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

// Apply the uniqueValidator plugin to userSchema.
// The unique validator will check for duplicate database entries and report them just like any other validation error.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema); // export the userSchema as a model named "User".