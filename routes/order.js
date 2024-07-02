const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, orderController.createOrder);
router.get("/", authMiddleware, orderController.getUserOrders);
router.get("/:id", authMiddleware, orderController.getOrderById); // New route
router.delete("/clear", authMiddleware, orderController.clearOrders);

module.exports = router;
