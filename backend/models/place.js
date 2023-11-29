const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true }, // title is a required string.
  description: { type: String, required: true }, // description is a required string.
  imageUrl: { type: String, required: true }, // imageUrl is a required string. It's just a url to an image.
  address: { type: String, required: true }, // address is a required string.
  location: {
    lat: { type: Number, required: true }, // lat is a required number.
    lng: { type: Number, required: true }, // lng is a required number.
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" }, // creator is a required mongoose.Types.ObjectId. It's a reference to the User model.
});

module.exports = mongoose.model("Place", placeSchema);