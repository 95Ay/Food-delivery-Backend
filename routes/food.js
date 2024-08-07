const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const food = new Food({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
