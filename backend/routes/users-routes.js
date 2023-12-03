const express = require("express");

const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload"); // Import the file-upload middleware.

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.get("/:userId", usersControllers.getUserById);

router.post(
  "/signup",
  fileUpload.single("image"), // Use the file-upload middleware to upload a single image.
  [
    check("name").trim().notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

module.exports = router;
