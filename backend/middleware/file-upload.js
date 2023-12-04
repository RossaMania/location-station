const express = require("express");

const multer = require("multer");

const { v4: uuidv4 } = require('uuid'); // Import the uuid package.

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
}; // Create a MIME_TYPE_MAP object.

const fileUpload = multer({
limits: 500000, // Set the file size limit to 500000 bytes.
storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/images"); // Set the destination to the backend/uploads/images folder.
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype]; // Get the file extension.
    cb(null, uuidv4() + "." + ext); // Set the file name to a unique id and the file extension.
  }
}),
fileFilter: (req, file, cb) => {
  const isValid = !!MIME_TYPE_MAP[file.mimetype]; // Check if the file type is valid.
  let error = isValid ? null : new Error("Invalid mime type!"); // Set the error to null if the file type is valid.
  cb(error, isValid); // Call the callback function with the error and isValid.
} // Add a fileFilter function to the multer object to filter out invalid files.
});

module.exports = fileUpload;