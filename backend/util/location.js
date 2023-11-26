const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;


const getCoordinatesForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`,
    { headers: { "accept-encoding": "*" } }
  );

  const data = response.data;
  console.log(response.data)

  // The address the user entered passed our validation, but Google Maps can't find it.
  // This may occur if the geocoder was passed a non-existent address.
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Oops! Could not find location for the specified address!",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordinatesForAddress;
