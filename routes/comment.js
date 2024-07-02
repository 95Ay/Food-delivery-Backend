const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controllers/commentController");

router.post("/", authMiddleware, commentController.addComment);
router.get("/:orderId", commentController.getOrderComments);

module.exports = router;
