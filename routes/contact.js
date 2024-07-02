const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController"); // Ensure this line is added

router.post("/", submitContactForm);

module.exports = router;
